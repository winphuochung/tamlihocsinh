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

  // Highlight active sidebar item
  event?.currentTarget?.classList.add('active');
}

// Quick lookup from top widget
function quickLookup() {
  const code = document.getElementById('quick-lookup-code').value.trim();
  if (!code) {
    alert('Vui lòng nhập Mã Tra Cứu Bí Mật!');
    return;
  }

  switchTab('lookup');
  document.getElementById('lookup-input-code').value = code;
  if (typeof executeLookup === 'function') {
    executeLookup();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Hệ thống Tư vấn Tâm lý THCS Phước Hưng đã sẵn sàng!');
});
