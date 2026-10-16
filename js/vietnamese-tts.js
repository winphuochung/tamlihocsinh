/**
 * ==========================================================================
 * NATIVE VIETNAMESE TEXT-TO-SPEECH (TTS) GLOBAL SOUND ENGINE
 * Phát âm thanh giọng đọc tiếng Việt của người Việt Nam chuẩn 100%
 * Tích hợp đa tầng:
 * 1. Audio stream chuẩn Google Voice tiếng Việt (Tự nhiên, trong trẻo, không lỗi phụ thuộc máy tính)
 * 2. Fallback Web Speech Synthesis với bộ lọc tiếng Việt chuẩn
 * ==========================================================================
 */

let globalAudioPlayer = null;
let currentSpeakingBtn = null;

/**
 * Lọc sạch văn bản HTML, bỏ emoji phức tạp, ký tự markdown trước khi đọc
 */
function cleanTextForSpeech(rawText) {
  if (!rawText) return '';
  return rawText
    .replace(/<[^>]*>/g, ' ') // bỏ thẻ html
    .replace(/[`*#_~\[\]()]/g, ' ') // bỏ markdown
    .replace(/[🧸🌸⭐💖🌈🎒🖐️🏊🛡️💻🦺🧘‍♀️💡💬🎉❌🚨📞🔊⏹️👉]/gu, '') // bỏ icon emoji để giọng đọc không bị khựng
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Dừng phát âm thanh đang đọc
 */
function stopVietnameseSpeech() {
  if (globalAudioPlayer) {
    try {
      globalAudioPlayer.pause();
      globalAudioPlayer.currentTime = 0;
    } catch (e) {}
    globalAudioPlayer = null;
  }

  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }

  if (currentSpeakingBtn) {
    resetSpeakerButton(currentSpeakingBtn);
    currentSpeakingBtn = null;
  }
}

/**
 * Đặt lại trạng thái ban đầu của nút bấm
 */
function resetSpeakerButton(btn) {
  if (!btn) return;
  btn.classList.remove('speaking');
  const originalHtml = btn.getAttribute('data-original-html');
  if (originalHtml) {
    btn.innerHTML = originalHtml;
  } else {
    btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Nghe đọc';
  }
}

/**
 * Đặt trạng thái đang phát âm thanh cho nút bấm
 */
function setSpeakerButtonSpeaking(btn) {
  if (!btn) return;
  if (!btn.getAttribute('data-original-html')) {
    btn.setAttribute('data-original-html', btn.innerHTML);
  }
  btn.classList.add('speaking');
  btn.innerHTML = '<i class="fa-solid fa-circle-stop"></i> Dừng đọc';
  currentSpeakingBtn = btn;
}

/**
 * HÀM PHÁT GIỌNG ĐỌC TIẾNG VIỆT CHUẨN TOÀN CỤC
 * @param {string} textToSpeak - Văn bản cần đọc
 * @param {HTMLElement} triggerBtn - Nút bấm kích hoạt (để đổi icon trạng thái)
 * @param {Function} onFinish - Hàm gọi lại khi đọc xong
 */
function playVietnameseSpeech(textToSpeak, triggerBtn = null, onFinish = null) {
  const cleanText = cleanTextForSpeech(textToSpeak);
  if (!cleanText) return;

  // Nếu nút này đang phát -> Bấm lần nữa để dừng lại
  if (triggerBtn && currentSpeakingBtn === triggerBtn) {
    stopVietnameseSpeech();
    return;
  }

  // Dừng phát bài đang đọc dở trước đó
  stopVietnameseSpeech();

  if (triggerBtn) {
    setSpeakerButtonSpeaking(triggerBtn);
  }

  const handleEnd = () => {
    if (triggerBtn) resetSpeakerButton(triggerBtn);
    currentSpeakingBtn = null;
    if (typeof onFinish === 'function') onFinish();
  };

  // Chia nhỏ văn bản thành các câu hoặc đoạn dưới 180 ký tự để Google TTS stream ổn định
  const sentenceChunks = splitTextIntoSentenceChunks(cleanText, 160);

  if (sentenceChunks.length > 0) {
    playAudioChunksSequentially(sentenceChunks, 0, handleEnd, () => {
      // Nếu không kết nối được qua Audio Server, fallback sang Web Speech Synthesis có voice tiếng Việt
      fallbackBrowserSpeech(cleanText, handleEnd);
    });
  } else {
    handleEnd();
  }
}

/**
 * Chia nhỏ văn bản thành các đoạn ngắn hợp ngữ nghĩa (dấu chấm, phẩy, hỏi, than)
 */
function splitTextIntoSentenceChunks(text, maxLength = 160) {
  const rawSentences = text.match(/[^.?!,;:\n]+[.?!,;:\n]*|.+/g) || [text];
  const chunks = [];
  let current = '';

  rawSentences.forEach(s => {
    const trimmed = s.trim();
    if (!trimmed) return;
    if ((current + ' ' + trimmed).length <= maxLength) {
      current = current ? (current + ' ' + trimmed) : trimmed;
    } else {
      if (current) chunks.push(current);
      if (trimmed.length > maxLength) {
        // Cắt theo từ nếu 1 câu quá dài
        const words = trimmed.split(' ');
        let temp = '';
        words.forEach(w => {
          if ((temp + ' ' + w).length <= maxLength) {
            temp = temp ? (temp + ' ' + w) : w;
          } else {
            if (temp) chunks.push(temp);
            temp = w;
          }
        });
        if (temp) current = temp;
        else current = '';
      } else {
        current = trimmed;
      }
    }
  });

  if (current) chunks.push(current);
  return chunks;
}

/**
 * Phát tuần tự từng đoạn âm thanh giọng đọc tiếng Việt của Google
 */
function playAudioChunksSequentially(chunks, index, onAllFinished, onNetworkError) {
  if (index >= chunks.length) {
    onAllFinished();
    return;
  }

  const chunkText = chunks[index];
  const audioUrl = `/api/tts?text=${encodeURIComponent(chunkText)}`;

  globalAudioPlayer = new Audio();
  globalAudioPlayer.src = audioUrl;

  globalAudioPlayer.onended = () => {
    playAudioChunksSequentially(chunks, index + 1, onAllFinished, onNetworkError);
  };

  globalAudioPlayer.onerror = (e) => {
    console.warn("⚠️ Audio stream error, trying fallback:", e);
    if (index === 0 && typeof onNetworkError === 'function') {
      onNetworkError();
    } else {
      playAudioChunksSequentially(chunks, index + 1, onAllFinished, onNetworkError);
    }
  };

  const playPromise = globalAudioPlayer.play();
  if (playPromise !== undefined) {
    playPromise.catch(err => {
      console.warn("⚠️ Autoplay policy blocked audio, switching fallback:", err);
      if (index === 0 && typeof onNetworkError === 'function') {
        onNetworkError();
      }
    });
  }
}

/**
 * Trình phát dự phòng sử dụng Web Speech Synthesis với tiếng Việt chuẩn
 */
function fallbackBrowserSpeech(text, onEnd) {
  if (!('speechSynthesis' in window)) {
    if (typeof onEnd === 'function') onEnd();
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'vi-VN';
  utterance.rate = 0.95;

  const voices = window.speechSynthesis.getVoices();
  const viVoice = voices.find(v => v.lang === 'vi-VN' || v.lang === 'vi_VN' || (v.lang && v.lang.startsWith('vi')));
  if (viVoice) {
    utterance.voice = viVoice;
  }

  utterance.onend = onEnd;
  utterance.onerror = onEnd;

  window.speechSynthesis.speak(utterance);
}
