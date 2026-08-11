/* ==========================================================================
   Anonymous Booking & Secret Lookup Engine (Synced with Supabase Cloud DB)
   Trường THCS Phước Hưng - Xã Nhơn Hội - An Giang
   Giáo viên TPT Đội: Cô Nguyễn Thị Ngọc Nga
   ========================================================================== */

const STORAGE_KEY = 'thcs_phuochung_bookings';

function getBookingsLocal() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }

  const seed = [
    {
      secret_code: "PH-8839-X",
      topic: "Phòng chống Bạo lực học đường",
      grade: "Khối 8",
      date: "2026-08-07",
      time: "Giờ ra chơi sáng (9:15 - 9:30)",
      content: "Em cảm thấy bị một bạn học khác lớp liên tục chặn đường hù dọa mỗi khi tan học.",
      status: "APPROVED",
      reply: "Chào em! Cô Ngọc Nga đã nhận được thông tin. Em yên tâm nhé, thứ Sáu tuần này giờ ra chơi 9:15 em hãy lên văn phòng Đội gặp cô. Cô sẽ bảo vệ em an toàn!",
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

  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

function saveBookingsLocal(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

/**
 * XỬ LÝ ĐĂNG KÝ HẸN GẶP ẨN DANH & LƯU SUPABASE + LOCALSTORAGE
 */
async function handleAnonymousBooking(e) {
  e.preventDefault();

  const topic = document.getElementById('book-topic').value;
  const grade = document.getElementById('book-grade').value;
  const date = document.getElementById('book-date').value;
  const time = document.getElementById('book-time').value;
  const content = document.getElementById('book-content').value;

  // Tự động sinh Mã Tra Cứu Bí Mật: PH-XXXX-A
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const secretCode = `PH-${randomNum}-${randomLetter}`;

  const newBooking = {
    secret_code: secretCode,
    topic,
    grade,
    student_grade: grade,
    date,
    preferred_date: date,
    time,
    preferred_time: time,
    content,
    status: 'PENDING',
    reply: '',
    teacher_reply: '',
    created_at: new Date().toISOString().split('T')[0]
  };

  // 1. Lưu LocalStorage dự phòng
  const currentBookings = getBookingsLocal();
  currentBookings.unshift(newBooking);
  saveBookingsLocal(currentBookings);

  // 2. Đồng bộ trực tiếp lên Supabase Cloud Database
  if (window.supabaseClient) {
    try {
      const { data, error } = await window.supabaseClient
        .from('anonymous_bookings')
        .insert([{
          secret_code: secretCode,
          topic: topic,
          student_grade: grade,
          preferred_date: date,
          preferred_time: time,
          content: content,
          status: 'PENDING',
          teacher_reply: ''
        }]);

      if (error) {
        console.warn("⚠️ Lưu Supabase gặp phản hồi (chưa có bảng hoặc cần SQL):", error.message);
      } else {
        console.log("🟢 Đã lưu Lịch hẹn Ẩn danh lên Supabase Cloud thành công!");
      }
    } catch (err) {
      console.warn("⚠️ Không thể kết nối Cloud Supabase, sử dụng bộ nhớ Local:", err);
    }
  }

  // Hiển thị Mã Tra Cứu cho Học sinh
  document.getElementById('booking-success-card').style.display = 'block';
  document.getElementById('generated-secret-code').innerText = secretCode;

  // Reset Form
  document.getElementById('anonymous-form').reset();
  document.getElementById('booking-success-card').scrollIntoView({ behavior: 'smooth' });
}

/**
 * TRA CỨU MÃ BÍ MẬT TỪ SUPABASE CLOUD & LOCALSTORAGE
 */
async function executeLookup() {
  const code = document.getElementById('lookup-input-code').value.trim().toUpperCase();
  const resultArea = document.getElementById('lookup-result-area');

  if (!code) {
    alert('Vui lòng nhập Mã Tra Cứu Bí Mật!');
    return;
  }

  resultArea.style.display = 'block';
  resultArea.innerHTML = `<div style="text-align:center; padding: 20px;"><i class="fa-solid fa-spinner fa-spin" style="font-size: 24px; color: var(--primary-lavender);"></i><p style="margin-top:8px; font-size:13px; color:var(--text-muted);">Đang truy vấn dữ liệu đám mây Supabase...</p></div>`;

  let match = null;

  // 1. Tra cứu trực tiếp từ Supabase Cloud
  if (window.supabaseClient) {
    try {
      const { data, error } = await window.supabaseClient
        .from('anonymous_bookings')
        .select('*')
        .eq('secret_code', code)
        .maybeSingle();

      if (data) {
        match = {
          secret_code: data.secret_code,
          topic: data.topic,
          grade: data.student_grade || data.grade,
          date: data.preferred_date || data.date,
          time: data.preferred_time || data.time,
          content: data.content,
          status: data.status,
          reply: data.teacher_reply || data.reply
        };
      }
    } catch (err) {
      console.warn("⚠️ Lỗi truy vấn Supabase:", err);
    }
  }

  // 2. Nếu chưa có trên Supabase, tìm trong LocalStorage dự phòng
  if (!match) {
    const localBookings = getBookingsLocal();
    match = localBookings.find(b => b.secret_code.toUpperCase() === code);
  }

  // 3. Hiển thị kết quả cho Học sinh
  if (!match) {
    resultArea.innerHTML = `
      <div style="background: #FEE2E2; border: 2px solid #FCA5A5; color: #991B1B; padding: 20px; border-radius: var(--radius-md); text-align: center;">
        ⚠️ Không tìm thấy kết quả nào cho mã <strong>"${code}"</strong>. Em vui lòng kiểm tra lại chính xác từng ký tự nhé!
      </div>
    `;
    return;
  }

  let statusBadge = '';
  if (match.status === 'PENDING') {
    statusBadge = '<span class="badge-status badge-pending">⏳ Chờ Cô Ngô Nga Tiếp Nhận</span>';
  } else if (match.status === 'APPROVED') {
    statusBadge = '<span class="badge-status badge-approved">✅ Đã Xếp Lịch Hẹn Gặp</span>';
  } else {
    statusBadge = '<span class="badge-status badge-completed">🎉 Đã Hoàn Thành Tư Vấn</span>';
  }

  resultArea.innerHTML = `
    <div style="background: #FFFFFF; border: 2px solid var(--primary-lavender-light); border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-clay);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <h3 style="font-size: 16px; font-weight: 800; color: var(--primary-lavender);">Mã: ${match.secret_code}</h3>
        ${statusBadge}
      </div>

      <p style="font-size: 13px; color: var(--text-main); margin-bottom: 8px;"><strong>Chủ đề:</strong> ${match.topic} (${match.grade})</p>
      <p style="font-size: 13px; color: var(--text-main); margin-bottom: 8px;"><strong>Thời gian đề xuất:</strong> ${match.date} (${match.time})</p>
      
      <div style="background: var(--bg-app); padding: 12px; border-radius: var(--radius-sm); margin: 12px 0; font-size: 13px; color: var(--text-muted);">
        <strong>Nội dung tâm sự:</strong> "${match.content}"
      </div>

      <div style="background: linear-gradient(135deg, #FFF6E5 0%, #FFF0F5 100%); border-left: 4px solid var(--primary-pink); padding: 16px; border-radius: 8px; margin-top: 16px;">
        <h4 style="font-size: 14px; font-weight: 800; color: #D97706; margin-bottom: 6px;">💌 Phản Hồi Từ Cô Nguyễn Thị Ngọc Nga (TPT Đội):</h4>
        <p style="font-size: 13px; color: var(--text-main); line-height: 1.5;">
          ${match.reply ? match.reply : '<em>Cô Ngọc Nga đang rà soát và sẽ phản hồi sớm cho em tại đây. Em hãy giữ mã bí mật này để quay lại xem nhé!</em>'}
        </p>
      </div>
    </div>
  `;
}
