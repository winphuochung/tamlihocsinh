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
    school: 'Trường THCS Phước Hưng - Xã Nhơn Hội - An Giang',
    teacher: 'Cô Nguyễn Thị Ngọc Nga - TPT Đội',
    timestamp: new Date()
  });
});

/**
 * ==========================================================================
 * ENTERPRISE AI COUNSELOR ENDPOINT (/api/ai-counselor)
 * Chuyên Gia Tư Vấn Tâm Lý Học Đường Thông Minh
 * THCS Phước Hưng - An Giang
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
            Em hãy nhấn ngay vào mục <strong>'Hẹn Gặp Cô TPT'</strong> ở thanh menu bên trái để Cô Nguyễn Thị Ngọc Nga trực tiếp hỗ trợ và bảo vệ an toàn cho em nhé!
          </p>
        `
      });
    }

    // 2. NẾU CÓ GEMINI API KEY -> GỌI GEMINI AI MODEL TỰ ĐỘNG
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (apiKey) {
      try {
        const systemPrompt = `Bạn là Chuyên gia Tư vấn Tâm lý Học đường uy tín, ấm áp, thấu cảm thuộc Trường THCS Phước Hưng (Xã Nhơn Hội, An Giang), đồng hành cùng Cô Nguyễn Thị Ngọc Nga (TPT Đội).
Đối tượng tư vấn: Học sinh THCS (từ 11 đến 15 tuổi).
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
      cbtAnalysis = `⚖️ <strong>Góc nhìn chuyên gia tâm lý & Pháp luật:</strong> Đe dọa, đánh đập hay cô lập người khác là hành vi vi phạm nghiêm trọng nội quy học đường và pháp luật. Việc im lặng nhượng bộ thường khiến kẻ bắt nạt càng lấn tới. Em hoàn toàn có quyền được bảo vệ an toàn tại THCS Phước Hưng!`;
      steps = [
        "<strong>1. An toàn Thân thể là số 1:</strong> Tránh đi một mình ở hành lang vắng, khu vực tối hoặc cổng trường lúc tan học.",
        "<strong>2. Nguyên tắc 'Nhìn Thẳng & Nói Ngắn':</strong> Giữ thái độ bình tĩnh, nhìn thẳng, nói rõ <i>'Tôi không đồng ý'</i> và nhanh chóng di chuyển đến nơi có thầy cô hoặc đông bạn bè.",
        "<strong>3. Báo Tin Bảo Vệ Ẩn Danh:</strong> Thu thập thông tin (ai đe dọa, ở đâu) và gửi ngay cho Cô TPT Ngọc Nga qua kênh bảo mật trang web này."
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
      🤝 <i>Em cũng có thể chọn <strong>'Hẹn Gặp Cô TPT'</strong> ở menu bên trái để gửi tin nhắn bí mật cho Cô Nguyễn Thị Ngọc Nga nhé!</i>
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
