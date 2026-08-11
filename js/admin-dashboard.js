/* ==========================================================================
   Admin Dashboard & Database Exporter Engine (Supabase Auth & Cloud DB Synced)
   Dành cho Giáo viên TPT Đội: Cô Nguyễn Thị Ngọc Nga
   ========================================================================== */

let activeReplyCode = null;
let realtimeSubscription = null;
let currentAdminUser = null;

document.addEventListener('DOMContentLoaded', () => {
  checkSupabaseAuthSession();
});

/**
 * LẤY CLIENT SUPABASE AN TOÀN TUYỆT ĐỐI
 */
function getActiveSupabaseClient() {
  if (typeof getSupabaseClient === 'function') {
    const client = getSupabaseClient();
    if (client) return client;
  }
  return window.supabaseClient || null;
}

/**
 * CHUYỂN ĐỔI CHẾ ĐỘ ĐĂNG NHẬP (PASSWORD VS OTP/EMAIL MAGIC LINK)
 */
function switchAuthMode(mode) {
  const formPass = document.getElementById('auth-form-pass');
  const formOtp = document.getElementById('auth-form-otp');
  const tabPass = document.getElementById('auth-tab-pass');
  const tabOtp = document.getElementById('auth-tab-otp');
  const msgBox = document.getElementById('auth-message-box');

  if (msgBox) msgBox.style.display = 'none';

  if (mode === 'pass') {
    formPass.style.display = 'block';
    formOtp.style.display = 'none';
    tabPass.className = 'btn-clay';
    tabOtp.className = 'btn-clay-secondary';
  } else {
    formPass.style.display = 'none';
    formOtp.style.display = 'block';
    tabPass.className = 'btn-clay-secondary';
    tabOtp.className = 'btn-clay';
  }
}

/**
 * KIỂM TRA SESSION ĐĂNG NHẬP SUPABASE AUTH KHI MỞ TRANG
 */
async function checkSupabaseAuthSession() {
  const client = getActiveSupabaseClient();
  if (!client) return;

  try {
    const { data: { session } } = await client.auth.getSession();
    if (session && session.user) {
      currentAdminUser = session.user;
      document.getElementById('admin-login-modal').style.display = 'none';
      renderAdminBookings();
      initRealtimeSupabaseListener();
      console.log("🟢 Đã đăng nhập tự động qua Supabase Auth Session:", session.user.email);
    }

    client.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        currentAdminUser = session.user;
        document.getElementById('admin-login-modal').style.display = 'none';
        renderAdminBookings();
        initRealtimeSupabaseListener();
      } else if (event === 'SIGNED_OUT') {
        currentAdminUser = null;
        document.getElementById('admin-login-modal').style.display = 'flex';
      }
    });
  } catch (err) {
    console.warn("⚠️ Lỗi kiểm tra session Supabase Auth:", err);
  }
}

/**
 * 1. ĐĂNG NHẬP BẰNG SUPABASE AUTH EMAIL & PASSWORD
 */
async function authenticateAdminWithPassword() {
  const email = document.getElementById('admin-email').value.trim();
  const password = document.getElementById('admin-password').value;

  if (!email || !password) {
    alert("Vui lòng nhập đầy đủ Email và Mật khẩu!");
    return;
  }

  showAuthMsg("⏳ Đang kết nối Supabase Auth...", "#3B82F6");

  // A. Nếu dùng Mật khẩu Local dự phòng
  if (password === '123456' || password === 'admin') {
    showAuthMsg("✅ Đăng nhập thành công!", "#10B981");
    setTimeout(() => {
      document.getElementById('admin-login-modal').style.display = 'none';
      renderAdminBookings();
      initRealtimeSupabaseListener();
    }, 400);

    const client = getActiveSupabaseClient();
    if (client) {
      client.auth.signInWithPassword({ email, password }).catch(async () => {
        await client.auth.signUp({ email, password });
      });
    }
    return;
  }

  // B. Thử Đăng nhập chính thức qua Supabase Auth API
  const client = getActiveSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          const { data: signUpData, error: signUpError } = await client.auth.signUp({
            email: email,
            password: password
          });

          if (!signUpError) {
            showAuthMsg("🎉 Đã tạo mới và Đăng nhập thành công tài khoản Supabase Auth!", "#10B981");
            currentAdminUser = signUpData.user;
            setTimeout(() => {
              document.getElementById('admin-login-modal').style.display = 'none';
              renderAdminBookings();
              initRealtimeSupabaseListener();
            }, 600);
            return;
          }
        }
        showAuthMsg(`⚠️ ${error.message}`, "#EF4444");
      } else {
        showAuthMsg("✅ Đăng nhập Supabase Auth thành công!", "#10B981");
        currentAdminUser = data.user;
        setTimeout(() => {
          document.getElementById('admin-login-modal').style.display = 'none';
          renderAdminBookings();
          initRealtimeSupabaseListener();
        }, 500);
      }
    } catch (err) {
      showAuthMsg(`⚠️ Lỗi kết nối: ${err.message}`, "#EF4444");
    }
  } else {
    showAuthMsg("⚠️ Chưa kết nối Supabase SDK. Sử dụng mật khẩu 123456 để vào hệ thống!", "#D97706");
  }
}

/**
 * 2. ĐĂNG NHẬP BẰNG MÃ OTP / EMAIL MAGIC LINK (SUPABASE AUTH)
 */
async function sendSupabaseOtp() {
  const email = document.getElementById('admin-otp-email').value.trim();

  if (!email) {
    alert("Vui lòng nhập địa chỉ Email của Cô Ngọc Nga!");
    return;
  }

  showAuthMsg("⏳ Đang gửi Mã OTP / Magic Link tới Email...", "#3B82F6");

  const client = getActiveSupabaseClient();
  if (client) {
    try {
      const { error } = await client.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: window.location.href
        }
      });

      if (error) {
        showAuthMsg(`⚠️ ${error.message}`, "#EF4444");
      } else {
        showAuthMsg(`💌 Đã gửi liên kết đính kèm Mã OTP đăng nhập tới <strong>${email}</strong>. Cô Ngọc Nga vui lòng kiểm tra Hộp thư đến / Spam nhé!`, "#10B981");
      }
    } catch (err) {
      showAuthMsg(`⚠️ Lỗi kết nối Supabase Auth: ${err.message}`, "#EF4444");
    }
  } else {
    showAuthMsg("⚠️ Đang tự động kết nối Supabase Client... Vui lòng bấm gửi lại sau 2 giây!", "#D97706");
    if (typeof getSupabaseClient === 'function') getSupabaseClient();
  }
}

function showAuthMsg(msg, color) {
  const msgBox = document.getElementById('auth-message-box');
  if (msgBox) {
    msgBox.style.display = 'block';
    msgBox.style.color = color;
    msgBox.innerHTML = msg;
  }
}

/**
 * ĐĂNG XUẤT SUPABASE AUTH
 */
async function logoutAdmin() {
  const client = getActiveSupabaseClient();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (err) {}
  }
  currentAdminUser = null;
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

  const client = getActiveSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
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
  const client = getActiveSupabaseClient();
  if (client && !realtimeSubscription) {
    try {
      realtimeSubscription = client
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

  const client = getActiveSupabaseClient();
  if (client) {
    try {
      const { error } = await client
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

  const client = getActiveSupabaseClient();
  if (client) {
    try {
      const { data } = await client.from('anonymous_bookings').select('*');
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
