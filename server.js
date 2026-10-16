const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

// Phục vụ file tĩnh (CSS, JS, Ảnh)
app.use(express.static(path.join(__dirname)));

// Route phục vụ trang chủ Student Portal index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route phục vụ trang Admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// API Kiểm tra sức khỏe hệ thống
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    school: 'Trường Tiểu học và THCS Phước Hưng - Xã Nhơn Hội - An Giang',
    teacher: 'Giáo viên tư vấn tâm lí',
    timestamp: new Date()
  });
});

/**
 * ==========================================================================
 * ANONYMOUS BOOKINGS & SECRET LOOKUP SERVER API (/api/bookings)
 * Đồng bộ dữ liệu lịch hẹn ẩn danh từ học sinh tới giáo viên trên mọi thiết bị
 * ==========================================================================
 */
const serverBookingsStore = [
  {
    secret_code: "PH-4243-M",
    topic: "Phòng chống Bạo lực học đường",
    grade: "Khối 6",
    student_grade: "Khối 6",
    date: "2026-09-23",
    preferred_date: "2026-09-23",
    time: "14 giờ 35",
    preferred_time: "14 giờ 35",
    content: "Có một bạn rủ em đánh nhau",
    status: "PENDING",
    reply: "",
    teacher_reply: "",
    created_at: "2026-09-23"
  },
  {
    secret_code: "PH-6221-F",
    topic: "Áp lực học tập & Thi cử",
    grade: "Khối 6",
    student_grade: "Khối 6",
    date: "2026-08-27",
    preferred_date: "2026-08-27",
    time: "9h00",
    preferred_time: "9h00",
    content: "Em học không nổi, em muốn nghỉ học",
    status: "APPROVED",
    reply: "Chào em, cô đã nhận được thông tin. Sáng thứ 5 tuần này giờ ra chơi em hãy lên phòng Tư vấn tâm lý gặp cô nhé!",
    teacher_reply: "Chào em, cô đã nhận được thông tin. Sáng thứ 5 tuần này giờ ra chơi em hãy lên phòng Tư vấn tâm lý gặp cô nhé!",
    created_at: "2026-08-25"
  },
  {
    secret_code: "PH-1737-E",
    topic: "Phòng chống Bạo lực học đường",
    grade: "Khối 6",
    student_grade: "Khối 6",
    date: "2026-08-27",
    preferred_date: "2026-08-27",
    time: "9h00",
    preferred_time: "9h00",
    content: "Em thấy các bạn hẹn gặp nhau để dán xé đồ của bạn khác.",
    status: "APPROVED",
    reply: "Cô trân trọng tinh thần dũng cảm của em. Cô sẽ can thiệp để bảo vệ các bạn an toàn.",
    teacher_reply: "Cô trân trọng tinh thần dũng cảm của em. Cô sẽ can thiệp để bảo vệ các bạn an toàn.",
    created_at: "2026-08-25"
  },
  {
    secret_code: "PH-8839-X",
    topic: "Phòng chống Bạo lực học đường",
    grade: "Khối 8",
    student_grade: "Khối 8",
    date: "2026-08-07",
    preferred_date: "2026-08-07",
    time: "Giờ ra chơi sáng (9:15 - 9:30)",
    preferred_time: "Giờ ra chơi sáng (9:15 - 9:30)",
    content: "Em cảm thấy bị một bạn học khác lớp liên tục chặn đường hù dọa mỗi khi tan học.",
    status: "APPROVED",
    reply: "Chào em! Giáo viên tư vấn tâm lí đã nhận được thông tin. Em yên tâm nhé, thứ Sáu tuần này giờ ra chơi 9:15 em hãy lên phòng Tư vấn tâm lý gặp cô. Cô sẽ bảo vệ em an toàn!",
    teacher_reply: "Chào em! Giáo viên tư vấn tâm lí đã nhận được thông tin. Em yên tâm nhé, thứ Sáu tuần này giờ ra chơi 9:15 em hãy lên phòng Tư vấn tâm lý gặp cô. Cô sẽ bảo vệ em an toàn!",
    created_at: "2026-08-05"
  },
  {
    secret_code: "PH-9821-K",
    topic: "Phòng chống Bắt nạt không gian mạng",
    grade: "Khối 7",
    student_grade: "Khối 7",
    date: "2026-08-08",
    preferred_date: "2026-08-08",
    time: "Sau giờ học buổi chiều",
    preferred_time: "Sau giờ học buổi chiều",
    content: "Có một tài khoản Facebook ẩn danh liên tục nhắn tin chửi bới và đe dọa em.",
    status: "PENDING",
    reply: "",
    teacher_reply: "",
    created_at: "2026-08-06"
  }
];

// API Lấy toàn bộ danh sách lịch hẹn
app.get('/api/bookings', (req, res) => {
  res.json({ success: true, data: serverBookingsStore });
});

// API Học sinh gửi đăng ký hẹn mới
app.post('/api/bookings', (req, res) => {
  try {
    const booking = req.body;
    if (!booking || !booking.secret_code) {
      return res.status(400).json({ success: false, error: 'Dữ liệu không hợp lệ' });
    }

    const existingIndex = serverBookingsStore.findIndex(b => b.secret_code === booking.secret_code);
    if (existingIndex >= 0) {
      serverBookingsStore[existingIndex] = { ...serverBookingsStore[existingIndex], ...booking };
    } else {
      serverBookingsStore.unshift({
        secret_code: booking.secret_code,
        topic: booking.topic || 'Tư vấn tâm lý',
        grade: booking.grade || booking.student_grade || 'Khối 8',
        student_grade: booking.grade || booking.student_grade || 'Khối 8',
        date: booking.date || booking.preferred_date || new Date().toISOString().split('T')[0],
        preferred_date: booking.date || booking.preferred_date || new Date().toISOString().split('T')[0],
        time: booking.time || booking.preferred_time || 'Giờ ra chơi',
        preferred_time: booking.time || booking.preferred_time || 'Giờ ra chơi',
        content: booking.content || '',
        status: booking.status || 'PENDING',
        reply: booking.reply || booking.teacher_reply || '',
        teacher_reply: booking.reply || booking.teacher_reply || '',
        created_at: booking.created_at || new Date().toISOString().split('T')[0]
      });
    }

    console.log(`📌 Đã nhận lịch hẹn mới từ học sinh: ${booking.secret_code} (${booking.topic})`);
    res.json({ success: true, message: 'Đã lưu lịch hẹn thành công', data: booking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// API Tra cứu phản hồi bí mật bằng mã bí mật
app.get('/api/bookings/lookup/:code', (req, res) => {
  const code = req.params.code ? req.params.code.trim().toUpperCase() : '';
  const match = serverBookingsStore.find(b => b.secret_code.toUpperCase() === code);
  if (match) {
    res.json({ success: true, data: match });
  } else {
    res.status(404).json({ success: false, error: 'Không tìm thấy thông tin cho mã này' });
  }
});

// API Giáo viên gửi phản hồi cho học sinh
app.post('/api/bookings/reply', (req, res) => {
  try {
    const { secret_code, reply, status } = req.body;
    if (!secret_code) {
      return res.status(400).json({ success: false, error: 'Mã bí mật không hợp lệ' });
    }

    const match = serverBookingsStore.find(b => b.secret_code.toUpperCase() === secret_code.toUpperCase());
    if (match) {
      match.reply = reply || match.reply;
      match.teacher_reply = reply || match.teacher_reply;
      match.status = status || (reply ? 'APPROVED' : match.status);
      res.json({ success: true, message: 'Đã cập nhật phản hồi thành công', data: match });
    } else {
      res.status(404).json({ success: false, error: 'Không tìm thấy mã đặt lịch' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ==========================================================================
 * ENTERPRISE AI COUNSELOR ENDPOINT (/api/ai-counselor)
 * Chuyên Gia Tư Vấn Tâm Lý Học Đường Thông Minh
 * Tiểu học và THCS Phước Hưng - An Giang
 * ==========================================================================
 */
app.post('/api/ai-counselor', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: 'Tin nhắn không hợp lệ' });
    }

    const userText = message.trim();
    const t = userText.toLowerCase();

    // 1. KIỂM TRA BÁO ĐỘNG NGUY CƠ KHẨN CẤP (CRISIS EMERGENCY CHECK)
    const crisisKeywords = ["muốn chết", "tự tử", "rạch tay", "kết thúc cuộc sống", "bớt đau khổ", "không muốn sống", "tự hại", "uống thuốc tử", "buông xuôi", "chết đi cho xong", "nhảy cầu"];
    if (crisisKeywords.some(kw => t.includes(kw))) {
      return res.json({
        success: true,
        isCrisis: true,
        reply: `
          <div style="border-left: 4px solid #EF4444; padding-left: 14px; margin-bottom: 10px;">
            <h4 style="color: #DC2626; font-size: 15px; font-weight: 800; margin: 0 0 6px 0;">🚨 TỚ Ở ĐÂY BÊN EM - XIN EM HÃY DỪNG LẠI MỘT CHÚT!</h4>
            <p style="font-size: 13.5px; color: #1F2937; line-height: 1.6; margin: 0;">
              Em thân mến, tớ lắng nghe thấy nỗi đau và sự kiệt sức quá lớn trong lòng em lúc này. Nhưng xin em hãy nhớ: <strong>Mọi tổn thương đều có thể chữa lành, và sự sống của em là điều vô giá!</strong> Em không cô độc một mình.
            </p>
          </div>
          <div style="background: #FEE2E2; border: 2px solid #FCA5A5; padding: 14px; border-radius: 14px; margin: 12px 0;">
            <p style="font-size: 13px; color: #991B1B; font-weight: 800; margin-bottom: 6px;">📞 HÃY GỌI NGAY CÁC KÊNH BẢO VỆ KHẨN CẤP (MIỄN PHÍ 24/7):</p>
            <ul style="font-size: 13px; color: #7F1D1D; margin-left: 20px; line-height: 1.7;">
              <li><strong>Tổng đài Quốc gia Bảo vệ Trẻ em:</strong> <a href="tel:111" style="color: #DC2626; font-weight: 800; text-decoration: underline;">111</a></li>
              <li><strong>Cấp cứu Y tế Khẩn cấp:</strong> <a href="tel:115" style="color: #DC2626; font-weight: 800; text-decoration: underline;">115</a></li>
            </ul>
          </div>
          <p style="font-size: 13px; color: #374151; line-height: 1.5;">
            Em hãy nhấn ngay vào mục <strong>'Hẹn Gặp Giáo viên tư vấn tâm lí'</strong> ở thanh menu bên trái để Giáo viên tư vấn tâm lí trực tiếp hỗ trợ và bảo vệ an toàn cho em nhé!
          </p>
        `
      });
    }

    // 2. NẾU CÓ GEMINI API KEY -> GỌI GEMINI AI MODEL TỰ ĐỘNG
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (apiKey) {
      try {
        const systemPrompt = `Bạn là Chuyên gia Tư vấn Tâm lý Học đường uy tín, ấm áp, thấu cảm thuộc Trường Tiểu học và THCS Phước Hưng (Xã Nhơn Hội, An Giang), đảm nhận vai trò Giáo viên tư vấn tâm lí.
Đối tượng tư vấn: Học sinh Tiểu học và THCS (từ 6 đến 15 tuổi).
Phong cách: Xưng "Thầy/Cô tư vấn" hoặc "Tớ", gọi "Em". Tuyệt đối chân thành, tôn trọng, không phán xét, không lên lớp.
Mô hình tư vấn:
1. Lắng nghe và phản chiếu cảm xúc (trích dẫn nhẹ lời em vừa nói).
2. Giải thích tâm lý ngắn gọn (CBT) giúp em hiểu tại sao mình cảm thấy như vậy.
3. Đưa ra 3 bước hành động cụ thể, khả thi với học sinh THCS.
4. Đặt 1 câu hỏi mở nhẹ nhàng để mời em tiếp tục chia sẻ.
Hãy trả lời bằng định dạng HTML đẹp (dùng <p>, <strong>, <i>, <ul>, <li>, <div> có inline style tinh tế).`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: `${systemPrompt}\n\nHọc sinh tâm sự: "${userText}"` }] }
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return res.json({ success: true, reply: replyText, source: 'gemini-ai' });
          }
        }
      } catch (aiErr) {
        console.error('Lỗi gọi Gemini AI API, chuyển sang Động cơ Phân tích Tâm lý Chuyên sâu:', aiErr.message);
      }
    }

    // 3. ĐỘNG CƠ PHÂN TÍCH TÂM LÝ CHUYÊN SÂU NỘI BỘ (ADVANCED NLP SYNTHESIS ENGINE)
    const replyHtml = buildExpertPsychologicalReply(userText);
    return res.json({ success: true, reply: replyHtml, source: 'expert-engine' });

  } catch (err) {
    console.error('API Counselor Error:', err);
    return res.status(500).json({ success: false, error: 'Có lỗi xảy ra trong quá trình tư vấn tâm lý' });
  }
});

/**
 * ĐỘNG CƠ TỔNG HỢP TÂM LÝ CHUYÊN GIA DYNAMIC NLP
 */
function buildExpertPsychologicalReply(userText) {
  const t = userText.toLowerCase();

  // Trích xuất từ ngữ cảm xúc
  let detectedEmotion = "băn khoăn và bối rối";
  if (t.includes("lo") || t.includes("sợ") || t.includes("hoảng")) detectedEmotion = "lo âu và sợ hãi";
  else if (t.includes("buồn") || t.includes("khóc") || t.includes("tủn")) detectedEmotion = "buồn bã và tủi thân";
  else if (t.includes("giận") || t.includes("ức") || t.includes("căm")) detectedEmotion = "bất an và tức giận";
  else if (t.includes("mệt") || t.includes("áp lực") || t.includes("đuối")) detectedEmotion = "căng thẳng và mệt mỏi";

  // Nhận diện bối cảnh
  let domain = "general";
  if (/bắt nạt|đánh|chửi|đe dọa|chặn đường|tẩy chay|cô lập|vây|nộp tiền|xô xát|bị bạn/i.test(t)) domain = "violence";
  else if (/áp lực học|thi cử|điểm kém|kiểm tra|học lực|thức đêm|khảo sát|sợ rớt|học sút|áp lực thi|mệt mỏi học/i.test(t)) domain = "academic";
  else if (/facebook|tiktok|zalo|bắt nạt mạng|bình luận ác|xúc phạm|bóc phốt|group|lừa đảo|lộ ảnh/i.test(t)) domain = "cyber";
  else if (/xâm hại|đụng chạm|vùng kín|đồ lót|sờ|ép buộc|người lạ dụ|chụp ảnh nhạy cảm/i.test(t)) domain = "abuse";
  else if (/đuối nước|bơi|tắm sông|tắm kênh|chìm|sông nhơn hội|trôi nước/i.test(t)) domain = "drowning";
  else if (/bố mẹ|ba mẹ|gia đình|cãi nhau|áp đặt|nổi giận|tủi thân|so sánh|bị mắng|bị chửi/i.test(t)) domain = "family";
  else if (/cô đơn|tự ti|kém cỏi|không ai chơi|bỏ rơi|buồn|khóc|bế tắc|lo âu|mệt mỏi/i.test(t)) domain = "emotion";

  let titleEmpathy = "";
  let cbtAnalysis = "";
  let steps = [];
  let openQuestion = "";

  switch (domain) {
    case "violence":
      titleEmpathy = `🛡️ Chào em! Thầy/Cô Chuyên gia Tư vấn lắng nghe thấy sự ${detectedEmotion} rất lớn trong lời nhắn của em: <i>"${userText}"</i>. Xin em hãy nhớ kỹ điều này: <strong>Bắt nạt hay bạo lực học đường tuyệt đối KHÔNG PHẢI LÀ LỖI CỦA EM!</strong>`;
      cbtAnalysis = `⚖️ <strong>Góc nhìn chuyên gia tâm lý & Pháp luật:</strong> Đe dọa, đánh đập hay cô lập người khác là hành vi vi phạm nghiêm trọng nội quy học đường và pháp luật. Việc im lặng nhượng bộ thường khiến kẻ bắt nạt càng lấn tới. Em hoàn toàn có quyền được bảo vệ an toàn tại Tiểu học và THCS Phước Hưng!`;
      steps = [
        "<strong>1. An toàn Thân thể là số 1:</strong> Tránh đi một mình ở hành lang vắng, khu vực tối hoặc cổng trường lúc tan học.",
        "<strong>2. Nguyên tắc 'Nhìn Thẳng & Nói Ngắn':</strong> Giữ thái độ bình tĩnh, nhìn thẳng, nói rõ <i>'Tôi không đồng ý'</i> và nhanh chóng di chuyển đến nơi có thầy cô hoặc đông bạn bè.",
        "<strong>3. Báo Tin Bảo Vệ Ẩn Danh:</strong> Thu thập thông tin (ai đe dọa, ở đâu) và gửi ngay cho Giáo viên tư vấn tâm lí qua kênh bảo mật trang web này."
      ];
      openQuestion = "Tình huống này diễn ra ở trong lớp hay ngoài cổng trường vậy em? Em đã kể điều này cho ai lắng nghe chưa?";
      break;

    case "academic":
      titleEmpathy = `💖 Chào em! Thầy/Cô Chuyên gia Tư vấn cảm nhận được nỗi ${detectedEmotion} đè nặng lên vai em khi em chia sẻ: <i>"${userText}"</i>. Cảm giác sợ bị điểm kém hay sợ làm người lớn thất vọng là nỗi lo rất thật mà nhiều bạn lứa tuổi em đang trải qua.`;
      cbtAnalysis = `🧠 <strong>Giải mã góc nhìn tâm lý CBT:</strong> Bộ não khi chịu áp lực học tập kéo dài sẽ tiết ra hormone Cortisol gây suy giảm khả năng tập trung và ghi nhớ tới 50%. Điểm số là thước đo phản ánh bài làm tại một thời điểm, <i>hoàn toàn không định giá giá trị con người em</i>.`;
      steps = [
        "<strong>1. Hạ nhiệt căng thẳng 15 phút:</strong> Áp dụng phương pháp <i>Pomodoro</i> (Học tập trung 25 phút -> Nghỉ ngơi 5 phút). Tuyệt đối không thức quá 23h đêm.",
        "<strong>2. Thở Cân Bằng Cảm Xúc (4-7-8):</strong> Hít vào bằng mũi 4 giây -> Giữ hơi 7 giây -> Thở ra bằng miệng 8 giây để xoa dịu thần kinh.",
        "<strong>3. Chia Nhỏ Mục Tiêu:</strong> Liệt kê 3 mục nhỏ nhất cần hoàn thành trong hôm nay thay vì lo lắng cho cả cuốn sách."
      ];
      openQuestion = "Bây giờ em cảm thấy căng thẳng nhất ở môn học nào hay bài kiểm tra nào sắp tới? Em có muốn tâm sự thêm với Thầy/Cô không?";
      break;

    case "cyber":
      titleEmpathy = `🌐 Chào em! Thầy/Cô rất thấu hiểu cảm giác ${detectedEmotion} khi thông tin hay hình ảnh riêng tư của em bị xúc phạm trên mạng: <i>"${userText}"</i>. Đừng tự dằn dằn bản thân em nhé!`;
      cbtAnalysis = `🔍 <strong>Góc nhìn chuyên gia tâm lý mạng:</strong> Kẻ bắt nạt trực tuyến thường lợi dụng tính ẩn danh để gây hoảng loạn tâm lý. Khi em không đáp trả tiêu cực, đối phương sẽ nhanh chóng mất đi điểm tựa gây hại.`;
      steps = [
        "<strong>1. Lưu Giữ Bằng Chứng:</strong> Chụp màn hình ngay tất cả tin nhắn, bài viết ác ý (không xóa tin nhắn).",
        "<strong>2. Quy tắc 3B (Block - Report - Breathe):</strong> Chặn tài khoản độc hại, Báo xấu lên mạng xã hội và Tạm ngắt kết nối mạng 24h.",
        "<strong>3. Nhờ Thầy Cô Can Thiệp:</strong> Nhà trường sẽ phối hợp yêu cầu gỡ bỏ thông tin xấu độc bảo vệ em."
      ];
      openQuestion = "Sự việc này xảy ra trên nền tảng mạng xã hội nào vậy em? Em có cần Thầy/Cô hướng dẫn cách chụp lưu lại bằng chứng không?";
      break;

    case "family":
      titleEmpathy = `🏡 Chào em! Thầy/Cô lắng nghe thấy sự ${detectedEmotion} khi em cảm thấy người thân yêu nhất lại chưa hiểu hay lắng nghe mình: <i>"${userText}"</i>.`;
      cbtAnalysis = `🌱 <strong>Góc nhìn chuyên gia tâm lý gia đình:</strong> Tuổi THCS là giai đoạn em đang hình thành cá tính riêng. Bố mẹ đôi khi vì áp lực cuộc sống nên đã chọn sai cách giao tiếp khiến em cảm thấy bị so sánh hay áp đặt.`;
      steps = [
        "<strong>1. Hạ Nhiệt Lúc Căng Thẳng:</strong> Khi bầu không khí nảy lửa, hãy xin phép vào phòng riêng hoặc đi uống nước để giữ bình tĩnh.",
        "<strong>2. Dùng Thông Điệp 'Em Cảm Thấy':</strong> Thay vì trách <i>'Bố mẹ không thương con'</i>, hãy thử nói: <i>'Con cảm thấy rất buồn khi bố mẹ so sánh con...'</i>",
        "<strong>3. Viết Thư Tâm Sự:</strong> Nếu khó nói trực tiếp, hãy viết một bức thư ngắn chân thành gửi bố mẹ."
      ];
      openQuestion = "Chuyện mâu thuẫn gia đình gần đây xảy ra về vấn đề học tập hay sinh hoạt vậy em? Em cảm thấy buồn nhất ở lời nói nào?";
      break;

    default:
      titleEmpathy = `🌱 Chào em! Thầy/Cô Chuyên gia Tư vấn tâm lý rất trân trọng vì em đã tin tưởng và mở lòng chia sẻ câu chuyện của mình: <i>"${userText}"</i>. Cảm giác ${detectedEmotion} của em là hoàn toàn chính đáng và đáng được lắng nghe.`;
      cbtAnalysis = `✨ <strong>Góc nhìn chuyên gia tâm lý:</strong> Mọi cảm xúc bối rối hay trăn trở ở tuổi học sinh đều là một phần tự nhiên trong quá trình trưởng thành. Việc em cởi mở nói ra đã là một bước tiến rất dũng cảm rồi đấy!`;
      steps = [
        "<strong>1. Đặt tên cảm xúc:</strong> Hãy thử lắng nghe xem cảm xúc lớn nhất lúc này của em là gì?",
        "<strong>2. Chia sẻ hoàn cảnh:</strong> Kể cho Thầy/Cô nghe điều gì đã khiến em cảm thấy như vậy.",
        "<strong>3. Cùng gỡ rối:</strong> Thầy/Cô sẽ đồng hành cùng em tìm ra hướng giải quyết phù hợp nhất."
      ];
      openQuestion = "Hôm nay điều gì đang làm em trăn trở nhất? Em hãy kể thêm cho Thầy/Cô nghe nhé!";
      break;
  }

  return `
    <p style="margin-bottom: 10px; font-size: 14px; line-height: 1.6;">${titleEmpathy}</p>
    <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.6;">${cbtAnalysis}</p>
    
    <div style="background: #F8F5FE; padding: 14px 18px; border-radius: 16px; margin: 12px 0; border-left: 4px solid var(--primary-lavender); box-shadow: 0 2px 8px rgba(139, 115, 230, 0.08);">
      <p style="font-size: 13.5px; font-weight: 800; color: var(--primary-lavender); margin-bottom: 8px;">💡 Định hướng liệu pháp 3 bước dành cho em:</p>
      <ul style="font-size: 13px; color: var(--text-main); margin-left: 18px; line-height: 1.65;">
        ${steps.map(s => `<li style="margin-bottom: 6px;">${s}</li>`).join('')}
      </ul>
    </div>

    <div style="background: linear-gradient(135deg, #FFF5F7 0%, #F5F1FA 100%); padding: 12px 16px; border-radius: 14px; margin-top: 12px; border: 1px dashed var(--primary-pink);">
      <p style="font-size: 13.5px; font-weight: 700; color: var(--primary-pink); margin-bottom: 4px;">💬 Thầy/Cô muốn lắng nghe em nhiều hơn:</p>
      <p style="font-size: 13px; color: var(--text-main); line-height: 1.5; margin: 0;">${openQuestion}</p>
    </div>

    <p style="font-size: 12px; color: var(--text-muted); margin-top: 10px;">
      🤝 <i>Em cũng có thể chọn <strong>'Hẹn Gặp Giáo viên tư vấn tâm lí'</strong> ở menu bên trái để gửi tin nhắn bí mật cho Giáo viên tư vấn tâm lí nhé!</i>
    </p>
  `;
}

// Route dự phòng tự động chuyển về index.html cho các đường dẫn SPA (không chứa extension file như .css, .js)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api/') && !req.path.includes('.')) {
    return res.sendFile(path.join(__dirname, 'index.html'));
  }
  next();
});

// Chạy server khi ở môi trường Localhost
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
  });
}

// Xuất app cho Vercel Serverless Function
module.exports = app;
