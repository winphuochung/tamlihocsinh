/* ==========================================================================
   Sound FX Engine (Web Audio API Synthesizer)
   Trường Tiểu học và THCS Phước Hưng - Xã Nhơn Hội - An Giang
   Tích hợp âm thanh chuông leng keng vui nhộn & tiếng nhắc nhở ấm áp
   100% Native Web Audio API - Không phụ thuộc file mạng, không độ trễ
   ========================================================================== */

let soundFxAudioCtx = null;

/**
 * Khởi tạo hoặc kích hoạt AudioContext an toàn
 */
function getSoundAudioContext() {
  if (!soundFxAudioCtx) {
    const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
    if (AudioCtxClass) {
      soundFxAudioCtx = new AudioCtxClass();
    }
  }
  if (soundFxAudioCtx && soundFxAudioCtx.state === 'suspended') {
    soundFxAudioCtx.resume().catch(() => {});
  }
  return soundFxAudioCtx;
}

/**
 * Kiểm tra trạng thái bật/tắt âm thanh (Mặc định: Bật)
 */
function isGameSoundEnabled() {
  try {
    return localStorage.getItem('tamli_sound_enabled') !== 'false';
  } catch (e) {
    return true;
  }
}

/**
 * Bật / Tắt âm thanh trò chơi và cập nhật giao diện nút bấm
 */
function toggleGameSound() {
  const current = isGameSoundEnabled();
  const newState = !current;
  try {
    localStorage.setItem('tamli_sound_enabled', newState ? 'true' : 'false');
  } catch (e) {}

  updateSoundButtonUI(newState);

  if (newState) {
    // Phát tiếng chuông nhẹ xác nhận đã bật âm thanh
    playChimeTone(659.25, 0, 0.15, 0.18, 'triangle');
  }
}

/**
 * Cập nhật biểu tượng trên tất cả các nút bật/tắt âm thanh
 */
function updateSoundButtonUI(enabled) {
  const buttons = document.querySelectorAll('#game-sound-toggle-btn, .btn-sound-toggle');
  buttons.forEach(btn => {
    if (enabled) {
      btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Âm thanh: Bật';
      btn.classList.remove('btn-clay-secondary');
      btn.classList.add('btn-clay');
      btn.title = "Bấm để tắt âm thanh";
    } else {
      btn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> Âm thanh: Tắt';
      btn.classList.remove('btn-clay');
      btn.classList.add('btn-clay-secondary');
      btn.title = "Bấm để bật âm thanh";
    }
  });
}

/**
 * Tạo một nốt nhạc chuông (Bell / Chime tone) mượt mà với đường bao âm lượng (Envelope)
 */
function playChimeTone(freq, delaySeconds = 0, duration = 0.35, maxGain = 0.22, waveType = 'sine') {
  if (!isGameSoundEnabled()) return;
  const ctx = getSoundAudioContext();
  if (!ctx) return;

  const startTime = ctx.currentTime + delaySeconds;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = waveType;
  osc.frequency.setValueAtTime(freq, startTime);

  // Đường bao mượt: Tăng âm nhanh (attack 10ms) -> Ngân vang giảm dần (decay)
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(maxGain, startTime + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

/**
 * 🌟 ÂM THANH KHI CHỌN ĐÚNG: Chuông leng keng 4 nốt vui nhộn (C5 - E5 - G5 - C6)
 * Âm sắc sáng trong, bay bổng, tạo cảm xúc hứng khởi và khen ngợi học sinh
 */
function playCorrectSound() {
  if (!isGameSoundEnabled()) return;
  const ctx = getSoundAudioContext();
  if (!ctx) return;

  // Hợp âm Arpeggio vui nhộn: Đô5 -> Mi5 -> Sol5 -> Đô6
  playChimeTone(523.25, 0.00, 0.22, 0.20, 'triangle'); // C5
  playChimeTone(659.25, 0.07, 0.24, 0.22, 'triangle'); // E5
  playChimeTone(783.99, 0.14, 0.28, 0.24, 'triangle'); // G5
  playChimeTone(1046.50, 0.21, 0.50, 0.28, 'sine');    // C6 ngân dài

  // Thêm một lớp hài âm chuông phụ leng keng nhẹ nhàng ở nốt đỉnh
  playChimeTone(2093.00, 0.22, 0.35, 0.08, 'sine');
}

/**
 * 🌸 ÂM THANH KHI CHỌN CHƯA ĐÚNG: Tiếng nhắc nhở ấm áp, nhẹ nhàng (Sol4 -> Mi4)
 * Không dùng tiếng còi/buzz khó chịu! Dùng 2 nốt ấm êm dịu mang tính động viên
 */
function playEncouragingSound() {
  if (!isGameSoundEnabled()) return;
  const ctx = getSoundAudioContext();
  if (!ctx) return;

  // Giai điệu nhẹ nhàng an ủi: Sol4 (392Hz) -> Mi4 (329.63Hz)
  playChimeTone(392.00, 0.00, 0.26, 0.16, 'sine');
  playChimeTone(329.63, 0.12, 0.42, 0.18, 'sine');
}

/**
 * 🏆 ÂM THANH CHIẾN THẮNG KHI HOÀN THÀNH TRÒ CHƠI: Fanfare vinh danh
 */
function playVictorySound() {
  if (!isGameSoundEnabled()) return;
  const ctx = getSoundAudioContext();
  if (!ctx) return;

  const notes = [
    { freq: 523.25, time: 0.00, dur: 0.18 }, // C5
    { freq: 659.25, time: 0.12, dur: 0.18 }, // E5
    { freq: 783.99, time: 0.24, dur: 0.22 }, // G5
    { freq: 1046.50, time: 0.38, dur: 0.30 }, // C6
    { freq: 1318.51, time: 0.52, dur: 0.65 }  // E6 ngân vang rực rỡ
  ];

  notes.forEach(n => {
    playChimeTone(n.freq, n.time, n.dur, 0.22, 'triangle');
  });

  // Hài âm lấp lánh phụ
  playChimeTone(2637.02, 0.54, 0.55, 0.10, 'sine');
}

/**
 * ✨ ÂM THANH CHẠM CẢM XÚC: Tiếng lấp lánh (Sparkle chime)
 */
function playSparkleSound() {
  if (!isGameSoundEnabled()) return;
  playChimeTone(880.00, 0.00, 0.18, 0.15, 'triangle');
  playChimeTone(1320.00, 0.08, 0.28, 0.18, 'sine');
}

// Khởi tạo trạng thái nút bấm khi DOM tải xong
document.addEventListener('DOMContentLoaded', () => {
  updateSoundButtonUI(isGameSoundEnabled());
});
