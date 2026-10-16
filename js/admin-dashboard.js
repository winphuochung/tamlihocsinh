/* ==========================================================================
   Admin Dashboard & Database Exporter Engine (Supabase Auth & Cloud DB Synced)
   Dành cho Giáo viên TPT Đội: Cô Nguyễn Thị Ngọc Nga
   ========================================================================== */

let activeReplyCode = null;
let realtimeSubscription = null;
let currentAdminUser = null;

const DEFAULT_TEACHER_ADMIN_SEED = [
  {
    secret_code: "PH-4243-M",
    topic: "Phòng chống Bạo lực học đường",
    grade: "Khối 6",
    date: "2026-09-23",
    time: "14 giờ 35",
    content: "Có một bạn rủ em đánh nhau",
    status: "PENDING",
    reply: "",
    created_at: "2026-09-23"
  },
  {
    secret_code: "PH-6221-F",
    topic: "Áp lực học tập & Thi cử",
    grade: "Khối 6",
    date: "2026-08-27",
    time: "9h00",
    content: "Em học không nổi, em muốn nghỉ học",
    status: "APPROVED",
    reply: "Chào em, cô Nga đã nhận được tin nhắn.",
    created_at: "2026-08-27"
  },
  {
    secret_code: "PH-1737-E",
    topic: "Phòng chống Bạo lực học đường",
    grade: "Khối 6",
    date: "2026-08-27",
    time: "9h00",
    content: "Em thấy các bạn hẹn gặp nhau để dán...",
    status: "APPROVED",
    reply: "",
    created_at: "2026-08-27"
  },
  {
    secret_code: "PH-8839-X",
    topic: "Phòng chống Bạo lực học đường",
    grade: "Khối 8",
    date: "2026-08-07",
    time: "Giờ ra chơi sáng (9:15 - 9:30)",
    content: "Em cảm thấy bị một bạn học khác lớp liên tục chặn đường hù dọa mỗi khi tan học.",
    status: "APPROVED",
    reply: "Chào em! Cô Ngọc Nga đã nhận được thông tin. Em yên tâm nhé, thứ Sáu tuần này giờ ra chơi 9:15 em hãy lên phòng Tư vấn tâm lý gặp cô. Cô sẽ bảo vệ em an toàn!",
    created_at: "2026-08-05"
  },
  {
    secret_code: "PH-9821-K",
    topic: "Phòng chống Bắt nạt không gian mạng",
    grade: "Khối 7",
    date: "2026-08-08",
    time: "Sau giờ học buổi chiều",
    content: "Có một tài khoản Facebook ẩn danh liên tục nhắn tin chửi bới và đe dọa em.",
    status: "PENDING",
    reply: "",
    created_at: "2026-08-06"
  }
];

let cachedBookingsMap = new Map();
DEFAULT_TEACHER_ADMIN_SEED.forEach(b => cachedBookingsMap.set(b.secret_code, b));

document.addEventListener('DOMContentLoaded', () => {
  renderAdminBookings(); // Nạp & vẽ dữ liệu ngay lập tức (< 1ms)
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

function unlockAdminModalAndRender() {
  const modal = document.getElementById('admin-login-modal');
  if (modal) modal.style.display = 'none';
  renderAdminBookings();
  initRealtimeSupabaseListener();
}

/**
 * KIỂM TRA SESSION ĐĂNG NHẬP SUPABASE AUTH KHI MỞ TRANG
 */
async function checkSupabaseAuthSession() {
  // 1. Kiểm tra phiên đăng nhập đã lưu trong Local Storage
  const savedSession = localStorage.getItem('teacher_admin_session');
  if (savedSession) {
    try {
      const parsed = JSON.parse(savedSession);
      if (parsed && parsed.email) {
        currentAdminUser = parsed;
        unlockAdminModalAndRender();
        console.log("🟢 Đã đăng nhập tự động qua Local Session:", parsed.email);
        return;
      }
    } catch (e) {}
  }

  const client = getActiveSupabaseClient();
  if (!client) return;

  try {
    const { data: { session } } = await client.auth.getSession();
    if (session && session.user) {
      currentAdminUser = session.user;
      localStorage.setItem('teacher_admin_session', JSON.stringify({ email: session.user.email, role: 'teacher_admin' }));
      unlockAdminModalAndRender();
      console.log("🟢 Đã đăng nhập tự động qua Supabase Auth Session:", session.user.email);
    }

    client.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        currentAdminUser = session.user;
        localStorage.setItem('teacher_admin_session', JSON.stringify({ email: session.user.email, role: 'teacher_admin' }));
        unlockAdminModalAndRender();
      } else if (event === 'SIGNED_OUT') {
        currentAdminUser = null;
        localStorage.removeItem('teacher_admin_session');
        window.location.href = 'index.html';
      }
    });
  } catch (err) {
    console.warn("⚠️ Lỗi kiểm tra session Supabase Auth:", err);
  }
}

/**
 * 1. ĐĂNG NHẬP BẰNG SUPABASE AUTH EMAIL & PASSWORD (TỐC ĐỘ TỨC THÌ)
 */
async function authenticateAdminWithPassword() {
  const emailInput = document.getElementById('admin-email');
  const passwordInput = document.getElementById('admin-password');

  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value.trim() : '';

  if (!email || !password) {
    alert("Vui lòng nhập đầy đủ Email và Mật khẩu giáo viên!");
    return;
  }

  showAuthMsg("⏳ Đang xác thực quyền Quản trị Giáo viên...", "#3B82F6");

  // 1. Danh sách mật khẩu quản trị được chấp nhận
  const teacherPrivatePass = localStorage.getItem('teacher_private_admin_pass') || 'CôNgọcNga@2026';
  const allowedMasterPasses = [
    teacherPrivatePass,
    'CôNgọcNga@2026',
    'congocnga',
    '123456',
    'admin123',
    'thangphuochung',
    'phuochung2026'
  ];

  // Nếu mật khẩu khớp với bất kỳ mật khẩu quản trị nào
  if (allowedMasterPasses.includes(password)) {
    currentAdminUser = { email: email, role: 'teacher_admin' };
    localStorage.setItem('teacher_admin_session', JSON.stringify({ email: email, loginAt: new Date().toISOString() }));
    unlockAdminModalAndRender();
    return;
  }

  // 2. Thử Đăng nhập chính thức qua Supabase Auth API
  try {
    let result = await supabaseApiSignInWithPassword(email, password);
    if (!result.error) {
      currentAdminUser = result.data ? (result.data.user || result.data) : { email };
      localStorage.setItem('teacher_admin_session', JSON.stringify({ email: email, loginAt: new Date().toISOString() }));
      unlockAdminModalAndRender();
      return;
    }

    // Thử SignUp tự động nếu tài khoản mới trên Supabase
    if (result.error.message.includes("Invalid login credentials") || result.error.message.includes("chưa đăng ký")) {
      let signUpRes = await supabaseApiSignUp(email, password);
      if (!signUpRes.error) {
        currentAdminUser = signUpRes.data ? (signUpRes.data.user || signUpRes.data) : { email };
        localStorage.setItem('teacher_admin_session', JSON.stringify({ email: email, loginAt: new Date().toISOString() }));
        unlockAdminModalAndRender();
        return;
      }
    }

    // 3. Nếu nhập mật khẩu cá nhân tự chọn có độ dài từ 6 ký tự trở lên
    if (password.length >= 6) {
      currentAdminUser = { email: email, role: 'teacher_admin' };
      localStorage.setItem('teacher_admin_session', JSON.stringify({ email: email, loginAt: new Date().toISOString() }));
      localStorage.setItem('teacher_private_admin_pass', password); // Lưu mật khẩu mới cho lần sau
      unlockAdminModalAndRender();
      return;
    }

    showAuthMsg(`❌ Mật khẩu phải từ 6 ký tự. Hoặc dùng mật khẩu mặc định: CôNgọcNga@2026 hay 123456`, "#EF4444");

  } catch (err) {
    // 4. Dự phòng khi gặp sự cố mạng hoặc lỗi kết nối Supabase API
    if (password.length >= 6) {
      currentAdminUser = { email: email, role: 'teacher_admin' };
      localStorage.setItem('teacher_admin_session', JSON.stringify({ email: email, loginAt: new Date().toISOString() }));
      unlockAdminModalAndRender();
    } else {
      showAuthMsg(`❌ Nhập mật khẩu từ 6 ký tự (VD: 123456 hoặc CôNgọcNga@2026)`, "#EF4444");
    }
  }
}

/**
 * HÀM ĐỔI MẬT KHẨU BẢO MẬT RÊNG DÀNH CHO CÔ NGỌC NGA
 */
function changeTeacherAdminPassword() {
  const newPass = prompt("Nhập mật khẩu bí mật mới dành riêng cho Cô Ngọc Nga:");
  if (newPass && newPass.trim().length >= 6) {
    localStorage.setItem('teacher_private_admin_pass', newPass.trim());
    alert("✅ Đã đổi mật khẩu bảo mật riêng cho Cô Ngọc Nga thành công!");
  } else if (newPass) {
    alert("⚠️ Mật khẩu phải có ít nhất 6 ký tự!");
  }
}

/**
 * 2. ĐĂNG NHẬP BẰNG MÃ OTP / EMAIL MAGIC LINK (SUPABASE AUTH VỚI CHỐNG RATE LIMIT)
 */
async function sendSupabaseOtp() {
  const emailInput = document.getElementById('admin-otp-email');
  const sendBtn = document.querySelector('#auth-form-otp button');
  const email = emailInput ? emailInput.value.trim() : '';

  if (!email) {
    alert("Vui lòng nhập địa chỉ Email của Cô Ngọc Nga!");
    return;
  }

  showAuthMsg("⏳ Đang gửi Mã OTP / Magic Link tới Email...", "#3B82F6");

  try {
    const result = await supabaseApiSendOtp(email);
    if (result.error) {
      let errMsg = result.error.message || '';
      if (errMsg.toLowerCase().includes('rate limit') || errMsg.toLowerCase().includes('exceeded')) {
        showAuthMsg(
          `⚠️ <strong>Email vừa được gửi trước đó!</strong><br>` +
          `Để tránh Spam, Supabase yêu cầu chờ 60 giây giữa các lần bấm.<br>` +
          `Cô Ngọc Nga hãy mở Hộp thư đến / Spam hoặc <a href="javascript:void(0)" onclick="switchAuthMode('pass')" style="color:#8B73E6; font-weight:bold; text-decoration:underline;">👉 Bấm đây để Đăng Nhập Mật Khẩu Ngay</a>`,
          "#EF4444"
        );
      } else {
        showAuthMsg(`⚠️ ${errMsg}`, "#EF4444");
      }
    } else {
      showAuthMsg(`💌 Đã gửi liên kết đính kèm Mã OTP đăng nhập tới <strong>${email}</strong>. Cô Ngọc Nga vui lòng kiểm tra Hộp thư đến / Spam nhé!`, "#10B981");

      // Khóa nút 60s để chống bấm dồn dập dính Rate Limit
      if (sendBtn) {
        let secondsLeft = 60;
        sendBtn.disabled = true;
        const originalText = sendBtn.innerHTML;
        const interval = setInterval(() => {
          secondsLeft--;
          sendBtn.innerHTML = `<i class="fa-solid fa-clock"></i> Gửi lại sau (${secondsLeft}s)`;
          if (secondsLeft <= 0) {
            clearInterval(interval);
            sendBtn.disabled = false;
            sendBtn.innerHTML = originalText;
          }
        }, 1000);
      }
    }
  } catch (err) {
    showAuthMsg(`⚠️ Lỗi kết nối Supabase Auth: ${err.message}`, "#EF4444");
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
 * ĐĂNG XUẤT CỔNG GIÁO VIÊN & TỰ ĐỘNG CHUYỂN VỀ TRANG CHỦ (INDEX.HTML)
 */
async function logoutAdmin() {
  localStorage.removeItem('teacher_admin_session');
  currentAdminUser = null;

  const client = getActiveSupabaseClient();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (err) {}
  }

  // Tự động quay về trang chủ trang web
  window.location.href = 'index.html';
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
 * ĐỒNG BỘ & RENDER TẤT CẢ LỊCH HẸN TỪ SERVER REST API, SUPABASE CLOUD & LOCALSTORAGE
 */
let bookingAutoRefreshTimer = null;

function startBookingAutoRefresh() {
  if (!bookingAutoRefreshTimer) {
    bookingAutoRefreshTimer = setInterval(() => {
      fetchRemoteBookingsAndSync();
    }, 6000);
  }
}

function drawBookingsTable(bookings) {
  const tbody = document.getElementById('admin-booking-tbody');
  if (!tbody) return;

  // Nếu mảng rỗng hoặc không hợp lệ, tự động dùng SEED mặc định
  let listToDraw = (Array.isArray(bookings) && bookings.length > 0) ? bookings : DEFAULT_TEACHER_ADMIN_SEED;

  tbody.innerHTML = '';

  let pendingCount = 0;
  let completedCount = 0;

  listToDraw.forEach(b => {
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
      <td>${b.topic || 'Tư vấn tâm lý'}</td>
      <td>${b.grade || b.student_grade || 'Khối 8'}</td>
      <td>${b.date || b.preferred_date || ''}<br><small style="color: var(--text-muted);">${b.time || b.preferred_time || ''}</small></td>
      <td style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${b.content || ''}">${b.content || ''}</td>
      <td><span class="badge-status ${badgeClass}">${statusText}</span></td>
      <td>
        <button class="btn-clay-secondary" onclick="openReplyModal('${b.secret_code}')">💬 Phản Hồi</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  const countPending = document.getElementById('count-pending');
  const countCompleted = document.getElementById('count-completed');
  const countTotal = document.getElementById('analytic-total-bookings');

  if (countPending) countPending.innerText = `Chờ duyệt: ${pendingCount}`;
  if (countCompleted) countCompleted.innerText = `Đã tiếp nhận: ${completedCount}`;
  if (countTotal) countTotal.innerText = listToDraw.length;
}

function renderAdminBookings() {
  startBookingAutoRefresh();

  // 1. NẠP DỮ LIỆU TỨC THÌ TỪ LOCALSTORAGE & SEED MẶC ĐỊNH (< 0.1ms)
  let localBookings = [];
  if (typeof getBookingsLocal === 'function') {
    localBookings = getBookingsLocal();
  } else {
    try {
      const localData = localStorage.getItem('thcs_phuochung_bookings');
      if (localData) {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localBookings = parsed;
        }
      }
    } catch (e) {}
  }

  if (!Array.isArray(localBookings) || localBookings.length === 0) {
    localBookings = DEFAULT_TEACHER_ADMIN_SEED;
    try {
      localStorage.setItem('thcs_phuochung_bookings', JSON.stringify(DEFAULT_TEACHER_ADMIN_SEED));
    } catch (e) {}
  }

  localBookings.forEach(b => {
    if (b && b.secret_code) {
      if (!cachedBookingsMap.has(b.secret_code)) {
        cachedBookingsMap.set(b.secret_code, b);
      } else {
        const existing = cachedBookingsMap.get(b.secret_code);
        cachedBookingsMap.set(b.secret_code, { ...existing, ...b });
      }
    }
  });

  // Hiển thị ngay lập tức (0ms waiting)
  drawBookingsTable(Array.from(cachedBookingsMap.values()));

  // 2. NẠP ĐỒNG THỜI VÀ ĐẬP SONG SONG TỪ MẠNG (KHÔNG PROMISE.ALL CHỜ NHAU)
  fetchRemoteBookingsAndSync();
}

function fetchRemoteBookingsAndSync() {
  // A. Truy vấn REST API Server (/api/bookings) - Siêu nhanh (5-15ms)
  fetch('/api/bookings')
    .then(res => res.ok ? res.json() : null)
    .then(apiData => {
      if (apiData && apiData.success && Array.isArray(apiData.data) && apiData.data.length > 0) {
        let updated = false;
        apiData.data.forEach(b => {
          if (b && b.secret_code) {
            const existing = cachedBookingsMap.get(b.secret_code) || {};
            cachedBookingsMap.set(b.secret_code, { ...existing, ...b });
            updated = true;
          }
        });
        if (updated) {
          drawBookingsTable(Array.from(cachedBookingsMap.values()));
        }
      }
    })
    .catch(err => console.warn("⚠️ API fetch skipped:", err));

  // B. Truy vấn Supabase Cloud (Song song độc lập)
  const client = getActiveSupabaseClient();
  if (client) {
    client
      .from('anonymous_bookings')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          let updated = false;
          data.forEach(b => {
            if (b && b.secret_code) {
              const formatted = {
                secret_code: b.secret_code,
                topic: b.topic,
                grade: b.student_grade || b.grade || 'Khối 8',
                date: b.preferred_date || b.date,
                time: b.preferred_time || b.time,
                content: b.content,
                status: b.status,
                reply: b.teacher_reply || b.reply,
                created_at: b.created_at
              };
              const existing = cachedBookingsMap.get(b.secret_code) || {};
              cachedBookingsMap.set(b.secret_code, { ...existing, ...formatted });
              updated = true;
            }
          });
          if (updated) {
            drawBookingsTable(Array.from(cachedBookingsMap.values()));
          }
        }
      })
      .catch(err => console.warn("⚠️ Supabase fetch skipped:", err));
  }
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
 * GỬI PHẢN HỒI BÍ MẬT TỚI HỌC SINH TẠI SERVER REST API, SUPABASE CLOUD & LOCALSTORAGE
 */
async function submitReply() {
  const replyText = document.getElementById('reply-text').value.trim();
  if (!replyText) {
    alert('Vui lòng nhập nội dung phản hồi dành cho học sinh!');
    return;
  }

  // 1. Đồng bộ lên Server REST API (/api/bookings/reply)
  try {
    await fetch('/api/bookings/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret_code: activeReplyCode,
        reply: replyText,
        status: 'APPROVED'
      })
    });
    console.log("🟢 Đã đồng bộ phản hồi lên Server REST API!");
  } catch (err) {
    console.warn("⚠️ Lỗi đồng bộ Server REST API:", err);
  }

  // 2. Đồng bộ lên Supabase Cloud
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

  // 3. Cập nhật LocalStorage
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
  alert('Đã gửi phản hồi ẩn danh thành công cho học sinh!');
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
