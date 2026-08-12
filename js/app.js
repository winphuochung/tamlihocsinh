/* ==========================================================================
   Main Application Router & Interactivity JS
   Trường THCS Phước Hưng - Liên Đội - Cô Nguyễn Thị Ngọc Nga
   ========================================================================== */

function switchTab(tabId) {
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

document.addEventListener('DOMContentLoaded', () => {
  console.log('🟢 Hệ thống Tư vấn Tâm lý THCS Phước Hưng đã sẵn sàng!');
});
