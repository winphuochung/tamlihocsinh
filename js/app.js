/* ==========================================================================
   Main Application Router & Interactivity JS
   Trường Tiểu học và THCS Phước Hưng - Giáo viên tư vấn tâm lí
   ========================================================================== */

function switchTab(tabId) {
  // Reset game view nếu đang mở game
  if (typeof closeGame === 'function') {
    closeGame();
  }

  // Hide all tab views
  const views = document.querySelectorAll('.tab-view');
  views.forEach(view => view.classList.remove('active'));

  // Deactivate all sidebar nav items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  // Show active tab
  const targetView = document.getElementById(`tab-${tabId}`);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Highlight active sidebar item (hỗ trợ cả click tay và gọi tự động bằng JS)
  const targetNavItem = document.querySelector(`.nav-item[onclick*="${tabId}"]`);
  if (targetNavItem) {
    targetNavItem.classList.add('active');
  }
}

// Quick lookup from top widget
function quickLookup() {
  const codeInput = document.getElementById('quick-lookup-code');
  const code = codeInput ? codeInput.value.trim() : '';
  if (!code) {
    alert('Vui lòng nhập Mã Tra Cứu Bí Mật!');
    return;
  }

  switchTab('lookup');
  const lookupInput = document.getElementById('lookup-input-code');
  if (lookupInput) lookupInput.value = code;
  
  if (typeof executeLookup === 'function') {
    executeLookup();
  }
}

/**
 * KHỞI TẠO LỊCH TƯ VẤN TUẦN NÀY DỰA TRÊN THỜI GIAN THỰC TẾ (REALTIME)
 */
function initRealtimeWeeklyCalendar() {
  const monthYearEl = document.getElementById('calendar-month-year');
  const daysContainer = document.getElementById('calendar-days-grid');
  if (!daysContainer) return;

  const today = new Date();
  const jsDay = today.getDay(); // 0: CN, 1: T2, 2: T3, 3: T4, 4: T5, 5: T6, 6: T7

  // Tính ngày Thứ Hai (Monday) của tuần hiện tại
  const diffToMonday = jsDay === 0 ? -6 : 1 - jsDay;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  // Tạo mảng 7 ngày từ Thứ Hai đến Chủ Nhật
  const weekDays = [];
  const monthsInWeek = new Set();

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDays.push(d);
    monthsInWeek.add(d.getMonth() + 1);
  }

  // Cập nhật Tiêu đề Tháng & Năm
  if (monthYearEl) {
    const monthsArr = Array.from(monthsInWeek);
    const year = today.getFullYear();
    if (monthsArr.length === 1) {
      monthYearEl.textContent = `Tháng ${monthsArr[0]}, ${year}`;
    } else {
      monthYearEl.textContent = `T${monthsArr[0]} - T${monthsArr[1]}, ${year}`;
    }
  }

  const dayHeads = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  let html = dayHeads.map(h => `<div class="calendar-day-head">${h}</div>`).join('');

  weekDays.forEach((d, idx) => {
    const isToday = (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );

    // Lịch tiếp nhận tư vấn trực tiếp cố định tại Tiểu học và THCS Phước Hưng:
    // Thứ 3 (idx 1), Thứ 5 (idx 3), Thứ 6 (idx 4)
    const isConsultationDay = (idx === 1 || idx === 3 || idx === 4);

    let classes = ['calendar-day-num'];
    if (isToday) {
      classes.push('active');
    } else if (isConsultationDay) {
      classes.push('has-event');
    }

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const isoDateStr = `${yyyy}-${mm}-${dd}`;
    const displayDateStr = `${dd}/${mm}/${yyyy}`;
    const dayName = dayHeads[idx];

    html += `
      <div class="${classes.join(' ')}" 
           title="${isToday ? 'Hôm nay - ' : ''}Ngày ${dayName} (${displayDateStr})${isConsultationDay ? ' - Có lịch tư vấn trực tiếp' : ''}"
           onclick="selectCalendarDate('${isoDateStr}', '${dayName}')">
        ${d.getDate()}
      </div>
    `;
  });

  daysContainer.innerHTML = html;
}

/**
 * BẤM CHỌN NGÀY TRÊN LỊCH -> TỰ ĐỘNG CHUYỂN SANG FORM ĐẶT LỊCH HẸN VÀ ĐIỀN NGÀY
 */
function selectCalendarDate(isoDateStr, dayName) {
  switchTab('booking');
  const dateInput = document.getElementById('book-date');
  if (dateInput) {
    dateInput.value = isoDateStr;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initRealtimeWeeklyCalendar();
  console.log('🟢 Hệ thống Tư vấn Tâm lý Tiểu học và THCS Phước Hưng & Lịch thực tế đã sẵn sàng!');
});

/**
 * ==========================================================================
 * MINI-GAME TRẮC NGHIỆM CẢM XÚC ICON MẶT CƯỜI / MẶT MẾU (MOOD CHECK-IN)
 * ==========================================================================
 */
const MOOD_DATA = {
  hao_hung: {
    emoji: "🤩",
    title: "Tuyệt vời! Em đang tràn đầy năng lượng & hào hứng!",
    color: "#8B73E6",
    message: "Thầy/Cô rất vui khi thấy em có một ngày phấn chấn như vậy! Hãy giữ nụ cười rạng rỡ này để cùng học tập thật tốt và lan tỏa niềm vui đến các bạn xung quanh nhé! 🌟",
    isNegative: false,
    suggestedAction: "Chơi thử thách kỹ năng để ghi điểm cao nào!"
  },
  vui_ve: {
    emoji: "😊",
    title: "Thật ấm áp! Hôm nay là một ngày vui vẻ & bình yên!",
    color: "#10B981",
    message: "Một tinh thần thoải mái, an nhiên là chìa khóa vàng giúp em học bài nhanh thuộc và gắn kết bạn bè. Chúc em có thêm nhiều kỷ niệm đẹp trong ngày hôm nay! 🍀",
    isNegative: false,
    suggestedAction: "Đọc cẩm nang kỹ năng sống để tích lũy thêm mẹo hay!"
  },
  binh_thuong: {
    emoji: "😐",
    title: "Tâm trạng ổn định, nhẹ nhàng!",
    color: "#6B7280",
    message: "Mọi thứ diễn ra êm ả cũng là một điều đáng trân quý. Nếu có điều gì bất ngờ hay câu chuyện nhỏ trong lớp, em luôn có thể chia sẻ cùng Giáo viên tư vấn tâm lí nhé! ☕",
    isNegative: false,
    suggestedAction: "Thử tài Game Kỹ năng để kích hoạt sự hứng khởi nào!"
  },
  buon_ba: {
    emoji: "😢",
    title: "Thầy/Cô ở đây bên em - Mọi chuyện rồi sẽ ổn thôi!",
    color: "#3B82F6",
    message: "Có những ngày mây đen kéo đến khiến em thấy buồn bã, mệt mỏi. Không sao cả, việc em cảm thấy buồn là hoàn toàn bình thường. Em hãy cho phép bản thân nghỉ ngơi một chút và đừng ôm nỗi buồn một mình nhé! 🫂",
    isNegative: true,
    suggestedAction: "Tâm sự ngay với Trợ lý AI hoặc Giáo viên tư vấn tâm lí"
  },
  tuc_gian: {
    emoji: "😡",
    title: "Bình tĩnh một chút nào - Đừng để cơn giận làm tổn thương em!",
    color: "#EF4444",
    message: "Khi tức giận, lồng ngực em có thể đang nóng lên. Hãy dừng lại 5 giây, không vội nói hay hành động gì lúc này. Hãy hít thật sâu theo vòng tròn thở bên dưới để hạ nhiệt cơn giận nhé! 🔥",
    isNegative: true,
    suggestedAction: "Hạ hỏa bằng bài tập thở và chia sẻ gỡ rối"
  },
  lo_lang: {
    emoji: "😰",
    title: "Em đang thấy lo âu hoặc bất an? Thầy/Cô lắng nghe em đây!",
    color: "#F59E0B",
    message: "Nỗi lo bài vở, điểm số hay mâu thuẫn bạn bè đang đè nặng lên em đúng không? Em rất dũng cảm khi nhận diện được cảm xúc này. Hãy thở đều và cùng Thầy/Cô gỡ từng nút thắt một nhé! 🕊️",
    isNegative: true,
    suggestedAction: "Gửi tâm sự ẩn danh để được định hướng an toàn"
  }
};

function selectMood(moodKey) {
  const data = MOOD_DATA[moodKey];
  if (!data) return;

  // Phát âm thanh chạm cảm xúc lấp lánh nhẹ nhàng
  if (typeof playSparkleSound === 'function') {
    playSparkleSound();
  }

  // Active state on buttons
  const buttons = document.querySelectorAll('.mood-emoji-btn');
  buttons.forEach(b => b.classList.remove('active'));

  const clickedBtn = event?.currentTarget;
  if (clickedBtn) clickedBtn.classList.add('active');

  const feedbackBox = document.getElementById('mood-feedback-box');
  if (!feedbackBox) return;

  let breatheHtml = '';
  if (data.isNegative) {
    breatheHtml = `
      <div style="text-align: center; margin: 12px 0;">
        <div class="breathe-circle">🌸 Hít Thở 🌸</div>
        <p style="font-size: 11.5px; color: #065F46; font-weight: 700; margin: 4px 0 0 0;">
          Hít vào chậm 4 giây ➔ Giữ hơi 4 giây ➔ Thở ra nhẹ nhàng 4 giây
        </p>
      </div>
    `;
  }

  feedbackBox.style.display = 'block';
  feedbackBox.innerHTML = `
    <div style="display: flex; align-items: flex-start; gap: 14px;">
      <span style="font-size: 40px; line-height: 1;">${data.emoji}</span>
      <div style="flex: 1;">
        <h4 style="margin: 0 0 6px 0; font-size: 15px; font-weight: 800; color: ${data.color};">${data.title}</h4>
        <p style="margin: 0; font-size: 13.5px; line-height: 1.6; color: var(--text-main);">${data.message}</p>
        
        ${breatheHtml}

        <div style="margin-top: 14px; display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn-clay" style="font-size: 12px; padding: 7px 14px;" onclick="openMoodAiCounselor('${data.emoji}', '${data.title}')">
            <i class="fa-solid fa-robot"></i> Trò Chuyện Cùng AI Về Cảm Xúc Này
          </button>
          <button class="btn-clay-secondary" style="font-size: 12px; padding: 7px 14px;" onclick="switchTab('booking')">
            <i class="fa-solid fa-calendar-check"></i> Hẹn Gặp Giáo viên tư vấn tâm lí
          </button>
        </div>
      </div>
    </div>
  `;

  // Tự động lưu nhật ký cảm xúc vào LocalStorage
  try {
    const log = { mood: moodKey, timestamp: new Date().toISOString() };
    const history = JSON.parse(localStorage.getItem('mood_history') || '[]');
    history.push(log);
    if (history.length > 30) history.shift();
    localStorage.setItem('mood_history', JSON.stringify(history));
  } catch (e) {}
}

function openMoodAiCounselor(emoji, title) {
  switchTab('ai-counselor');
  const inputEl = document.getElementById('chat-input');
  if (inputEl) {
    inputEl.value = `Hôm nay tớ cảm thấy ${title}`;
    inputEl.focus();
  }
}

