/* ==========================================================================
   Admin Dashboard & Database Exporter Engine
   Dành cho Giáo viên TPT Đội: Cô Nguyễn Thị Ngọc Nga
   ========================================================================== */

let activeReplyCode = null;

function authenticateAdmin() {
  const pass = document.getElementById('admin-password').value;
  if (pass === '123456' || pass === 'admin') {
    document.getElementById('admin-login-modal').style.display = 'none';
    renderAdminBookings();
  } else {
    alert('Mật khẩu quản trị chưa đúng. Vui lòng kiểm tra lại!');
  }
}

function logoutAdmin() {
  document.getElementById('admin-login-modal').style.display = 'flex';
}

function switchAdminTab(tabId) {
  const views = document.querySelectorAll('.tab-view');
  views.forEach(view => view.classList.remove('active'));

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  const targetView = document.getElementById(`admin-tab-${tabId}`);
  if (targetView) {
    targetView.classList.add('active');
  }

  event?.currentTarget?.classList.add('active');

  if (tabId === 'bookings') {
    renderAdminBookings();
  }
}

function renderAdminBookings() {
  const data = localStorage.getItem('thcs_phuochung_bookings');
  const bookings = data ? JSON.parse(data) : [];

  const tbody = document.getElementById('admin-booking-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  let pendingCount = 0;
  let completedCount = 0;

  bookings.forEach(b => {
    if (b.status === 'PENDING') pendingCount++;
    else completedCount++;

    const tr = document.createElement('tr');

    let badgeClass = 'badge-pending';
    let statusText = 'Chờ duyệt';
    if (b.status === 'APPROVED') {
      badgeClass = 'badge-approved';
      statusText = 'Đã hẹn gặp';
    } else if (b.status === 'COMPLETED') {
      badgeClass = 'badge-completed';
      statusText = 'Hoàn thành';
    }

    tr.innerHTML = `
      <td><strong style="color: var(--primary-lavender);">${b.secret_code}</strong></td>
      <td>${b.topic}</td>
      <td>${b.grade}</td>
      <td>${b.date}<br><small style="color: var(--text-muted);">${b.time}</small></td>
      <td style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${b.content}">${b.content}</td>
      <td><span class="badge-status ${badgeClass}">${statusText}</span></td>
      <td>
        <button class="btn-clay-secondary" onclick="openReplyModal('${b.secret_code}')">💬 Phản Hồi</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  document.getElementById('count-pending').innerText = `Chờ duyệt: ${pendingCount}`;
  document.getElementById('count-completed').innerText = `Đã tiếp nhận: ${completedCount}`;
  document.getElementById('analytic-total-bookings').innerText = bookings.length;
}

function openReplyModal(secretCode) {
  activeReplyCode = secretCode;
  document.getElementById('reply-secret-code').innerText = secretCode;

  const data = localStorage.getItem('thcs_phuochung_bookings');
  const bookings = data ? JSON.parse(data) : [];
  const match = bookings.find(b => b.secret_code === secretCode);

  document.getElementById('reply-text').value = match ? (match.reply || '') : '';
  document.getElementById('reply-modal').style.display = 'flex';
}

function closeReplyModal() {
  document.getElementById('reply-modal').style.display = 'none';
}

function submitReply() {
  const replyText = document.getElementById('reply-text').value.trim();
  if (!replyText) {
    alert('Vui lòng nhập nội dung phản hồi dành cho học sinh!');
    return;
  }

  const data = localStorage.getItem('thcs_phuochung_bookings');
  let bookings = data ? JSON.parse(data) : [];

  bookings = bookings.map(b => {
    if (b.secret_code === activeReplyCode) {
      return {
        ...b,
        reply: replyText,
        status: 'APPROVED'
      };
    }
    return b;
  });

  localStorage.setItem('thcs_phuochung_bookings', JSON.stringify(bookings));
  closeReplyModal();
  renderAdminBookings();
  alert('Đã gửi phản hồi ẩn danh thành công cho học sinh!');
}

/* DATABASE EXPORTER ENGINE (Excel/CSV/JSON) */
function exportFullDatabase(format) {
  const data = localStorage.getItem('thcs_phuochung_bookings');
  const bookings = data ? JSON.parse(data) : [];

  if (format === 'csv_bookings' || format === 'excel') {
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "MaTraCuu,ChuDe,KhoiLop,NgayHen,GioHen,NoiDungTamSu,TrangThai,PhanHoiCoNga,NgayTao\n";

    bookings.forEach(b => {
      const row = [
        `"${b.secret_code}"`,
        `"${b.topic}"`,
        `"${b.grade}"`,
        `"${b.date}"`,
        `"${b.time}"`,
        `"${b.content.replace(/"/g, '""')}"`,
        `"${b.status}"`,
        `"${(b.reply || '').replace(/"/g, '""')}"`,
        `"${b.created_at}"`
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CSDL_TuVan_TamLy_THCS_PhuocHung_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } else if (format === 'json_backup') {
    const jsonStr = JSON.stringify(bookings, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CSDL_Backup_THCS_PhuocHung_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
