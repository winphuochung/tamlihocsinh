/* ==========================================================================
   Main Application Router & Interactivity JS
   Trường THCS Phước Hưng - Liên Đội - Cô Nguyễn Thị Ngọc Nga
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

    // Lịch tiếp nhận tư vấn trực tiếp cố định tại THCS Phước Hưng:
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
  console.log('🟢 Hệ thống Tư vấn Tâm lý THCS Phước Hưng & Lịch thực tế đã sẵn sàng!');
});
