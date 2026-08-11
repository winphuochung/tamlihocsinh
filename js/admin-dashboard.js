/* ==========================================================================
   Admin Dashboard & Database Exporter Engine (Supabase Cloud Synced)
   Dành cho Giáo viên TPT Đội: Cô Nguyễn Thị Ngọc Nga
   ========================================================================== */

let activeReplyCode = null;
let realtimeSubscription = null;

function authenticateAdmin() {
  const pass = document.getElementById('admin-password').value;
  if (pass === '123456' || pass === 'admin') {
    document.getElementById('admin-login-modal').style.display = 'none';
    renderAdminBookings();
    initRealtimeSupabaseListener();
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

/**
 * ĐỒNG BỘ & RENDER TẤT CẢ LỊCH HẸN TỪ SUPABASE CLOUD & LOCALSTORAGE
 */
async function renderAdminBookings() {
  const tbody = document.getElementById('admin-booking-tbody');
  if (!tbody) return;

  let bookings = [];

  // 1. Tải dữ liệu thời gian thực từ Supabase Cloud
  if (window.supabaseClient) {
    try {
      const { data, error } = await window.supabaseClient
        .from('anonymous_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        bookings = data.map(b => ({
          secret_code: b.secret_code,
          topic: b.topic,
          grade: b.student_grade || b.grade || 'Khối 8',
          date: b.preferred_date || b.date,
          time: b.preferred_time || b.time,
          content: b.content,
          status: b.status,
          reply: b.teacher_reply || b.reply,
          created_at: b.created_at
        }));
      }
    } catch (err) {
      console.warn("⚠️ Không thể tải Supabase, sử dụng bộ nhớ Local:", err);
    }
  }

  // 2. Dự phòng nếu Supabase trống/chưa tạo bảng
  if (bookings.length === 0) {
    const localData = localStorage.getItem('thcs_phuochung_bookings');
    bookings = localData ? JSON.parse(localData) : [];
  }

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

/**
 * THỜI GIỜ THỰC (REALTIME SUBSCRIPTION TỪ SUPABASE CLOUD)
 */
function initRealtimeSupabaseListener() {
  if (window.supabaseClient && !realtimeSubscription) {
    try {
      realtimeSubscription = window.supabaseClient
        .channel('public:anonymous_bookings')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'anonymous_bookings' }, (payload) => {
          console.log("🔔 Có dữ liệu mới từ học sinh gửi lên Supabase Realtime!", payload);
          renderAdminBookings();
        })
        .subscribe();
    } catch (err) {
      console.warn("⚠️ Lỗi khởi tạo Realtime Supabase:", err);
    }
  }
}

function openReplyModal(secretCode) {
  activeReplyCode = secretCode;
  document.getElementById('reply-secret-code').innerText = secretCode;

  // Lấy câu trả lời hiện tại từ bảng UI
  const localData = localStorage.getItem('thcs_phuochung_bookings');
  const bookings = localData ? JSON.parse(localData) : [];
  const match = bookings.find(b => b.secret_code === secretCode);

  document.getElementById('reply-text').value = match ? (match.reply || match.teacher_reply || '') : '';
  document.getElementById('reply-modal').style.display = 'flex';
}

function closeReplyModal() {
  document.getElementById('reply-modal').style.display = 'none';
}

/**
 * GỬI PHẢN HỒI BÍ MẬT TỚI HỌC SINH TẠI SUPABASE CLOUD & LOCALSTORAGE
 */
async function submitReply() {
  const replyText = document.getElementById('reply-text').value.trim();
  if (!replyText) {
    alert('Vui lòng nhập nội dung phản hồi dành cho học sinh!');
    return;
  }

  // 1. Cập nhật Supabase Cloud Database
  if (window.supabaseClient) {
    try {
      const { error } = await window.supabaseClient
        .from('anonymous_bookings')
        .update({
          teacher_reply: replyText,
          status: 'APPROVED'
        })
        .eq('secret_code', activeReplyCode);

      if (error) console.warn("⚠️ Lỗi cập nhật Supabase:", error.message);
      else console.log("🟢 Đã cập nhật phản hồi của Cô Nga lên Supabase!");
    } catch (err) {
      console.warn("⚠️ Lỗi kết nối Supabase:", err);
    }
  }

  // 2. Cập nhật LocalStorage dự phòng
  const data = localStorage.getItem('thcs_phuochung_bookings');
  let bookings = data ? JSON.parse(data) : [];

  bookings = bookings.map(b => {
    if (b.secret_code === activeReplyCode) {
      return {
        ...b,
        reply: replyText,
        teacher_reply: replyText,
        status: 'APPROVED'
      };
    }
    return b;
  });

  localStorage.setItem('thcs_phuochung_bookings', JSON.stringify(bookings));
  closeReplyModal();
  renderAdminBookings();
  alert('Đã gửi phản hồi ẩn danh thành công cho học sinh trên Supabase Cloud!');
}

/* DATABASE EXPORTER ENGINE (Excel/CSV/JSON) */
async function exportFullDatabase(format) {
  let bookings = [];

  // Tải toàn bộ dữ liệu mới nhất từ Supabase Cloud
  if (window.supabaseClient) {
    try {
      const { data } = await window.supabaseClient.from('anonymous_bookings').select('*');
      if (data && data.length > 0) {
        bookings = data;
      }
    } catch (err) {}
  }

  if (bookings.length === 0) {
    const data = localStorage.getItem('thcs_phuochung_bookings');
    bookings = data ? JSON.parse(data) : [];
  }

  if (format === 'csv_bookings' || format === 'excel') {
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "MaTraCuu,ChuDe,KhoiLop,NgayHen,GioHen,NoiDungTamSu,TrangThai,PhanHoiCoNga,NgayTao\n";

    bookings.forEach(b => {
      const row = [
        `"${b.secret_code}"`,
        `"${b.topic}"`,
        `"${b.student_grade || b.grade || ''}"`,
        `"${b.preferred_date || b.date || ''}"`,
        `"${b.preferred_time || b.time || ''}"`,
        `"${(b.content || '').replace(/"/g, '""')}"`,
        `"${b.status}"`,
        `"${(b.teacher_reply || b.reply || '').replace(/"/g, '""')}"`,
        `"${b.created_at}"`
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CSDL_Supabase_TuVan_TamLy_THCS_PhuocHung_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } else if (format === 'json_backup') {
    const jsonStr = JSON.stringify(bookings, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CSDL_Backup_Supabase_THCS_PhuocHung_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
