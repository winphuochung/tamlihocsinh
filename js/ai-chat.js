/* ==========================================================================
   Advanced AI Psychological Counselor Client Engine (Chuyên Gia Tư Vấn Tâm Lý Học Đường)
   Trường THCS Phước Hưng - Xã Nhơn Hội - An Giang
   Giáo viên TPT Đội: Cô Nguyễn Thị Ngọc Nga
   ========================================================================== */

let counselingHistory = [];

/**
 * BỘ TỪ KHÓA BÁO ĐỘNG KHẨN CẤP (CRISIS RED FLAGS)
 */
const CRISIS_PATTERNS = [
  "muốn chết", "tự tử", "rạch tay", "kết thúc cuộc sống", "bớt đau khổ",
  "không muốn sống", "tự hại", "uống thuốc tử", "buông xuôi", "chết đi cho xong", "nhảy cầu"
];

/**
 * XỬ LÝ SỰ KIỆN PHÍM ENTER
 */
function handleChatKeyPress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

/**
 * XỬ LÝ GỬI TIN NHẮN TỪ HỌC SINH (GỌI API TƯ VẤN THÔNG MINH)
 */
async function sendChatMessage() {
  const inputEl = document.getElementById('chat-input');
  const messageText = inputEl.value.trim();

  if (!messageText) return;

  // 1. Hiển thị bong bóng tin nhắn của Học sinh
  appendBubble(messageText, 'user');
  inputEl.value = '';
  counselingHistory.push(messageText);

  // 2. Tạo hiệu ứng AI đang suy nghĩ (Typing indicator)
  const typingBubbleId = showTypingIndicator();

  try {
    // 3. GỌI API SERVERLESS TƯ VẤN THÔNG MINH (/api/ai-counselor)
    const response = await fetch('/api/ai-counselor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: messageText,
        history: counselingHistory.slice(-6)
      })
    });

    removeTypingIndicator(typingBubbleId);

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.reply) {
        appendBubble(data.reply, 'bot', true);
        return;
      }
    }
  } catch (err) {
    console.warn('Lỗi kết nối API Serverless, sử dụng Động cơ Tâm lý Client dự phòng:', err);
  }

  // 4. NẾU LỖI MẠNG HOẶC KHÔNG KẾT NỐI ĐƯỢC API -> DÙNG ĐỘNG CƠ DỰ PHÒNG TẠI CLIENT
  removeTypingIndicator(typingBubbleId);
  const fallbackHtml = generateFallbackCounselingReply(messageText);
  appendBubble(fallbackHtml, 'bot', true);
}

/**
 * ĐỘNG CƠ PHÂN TÍCH TÂM LÝ DỰ PHÒNG TẠI CLIENT (CLIENT-SIDE DYNAMIC NLP ENGINE)
 */
function analyzeStudentState(text) {
  const t = text.toLowerCase();
  
  let grade = "";
  if (/\b(lớp 6|khối 6)\b/i.test(t)) grade = "Khối 6";
  else if (/\b(lớp 7|khối 7)\b/i.test(t)) grade = "Khối 7";
  else if (/\b(lớp 8|khối 8)\b/i.test(t)) grade = "Khối 8";
  else if (/\b(lớp 9|khối 9)\b/i.test(t)) grade = "Khối 9";

  if (/xâm hại|đụng chạm|vùng kín|đồ lót|sờ|ép buộc|người lạ dụ|chụp ảnh nhạy cảm/i.test(t)) return { domain: "abuse", grade, rawText: text };
  if (/bắt nạt|bạo lực|đánh|chửi|đe dọa|chặn đường|tẩy chay|cô lập|vây|nộp tiền|xô xát|bị bạn/i.test(t)) return { domain: "violence", grade, rawText: text };
  if (/facebook|tiktok|zalo|bắt nạt mạng|bình luận ác|xúc phạm|bóc phốt|group|lừa đảo|lộ ảnh/i.test(t)) return { domain: "cyber", grade, rawText: text };
  if (/đuối nước|bơi|tắm sông|tắm kênh|chìm|sông nhơn hội|trôi nước/i.test(t)) return { domain: "drowning", grade, rawText: text };
  if (/bố mẹ|ba mẹ|gia đình|cãi nhau|áp đặt|nổi giận|tủi thân|so sánh|bị mắng|bị chửi/i.test(t)) return { domain: "family", grade, rawText: text };
  if (/áp lực học|thi cử|điểm kém|kiểm tra|học lực|thức đêm|khảo sát|sợ rớt|học sút|áp lực thi|mệt mỏi học/i.test(t)) return { domain: "academic", grade, rawText: text };
  if (/cô đơn|tự ti|kém cỏi|không ai chơi|bỏ rơi|buồn|khóc|bế tắc|lo âu|mệt mỏi/i.test(t)) return { domain: "emotion", grade, rawText: text };

  return { domain: "general", grade, rawText: text };
}

function generateFallbackCounselingReply(userText) {
  const textLower = userText.toLowerCase();

  if (CRISIS_PATTERNS.some(p => textLower.includes(p))) {
    return `
      <div style="border-left: 4px solid #EF4444; padding-left: 14px; margin-bottom: 10px;">
        <h4 style="color: #DC2626; font-size: 15px; font-weight: 800; margin: 0 0 6px 0;">🚨 TỚ Ở ĐÂY BÊN EM - XIN EM HÃY DỪNG LẠI MỘT CHÚT!</h4>
        <p style="font-size: 13.5px; color: var(--text-main); line-height: 1.6; margin: 0;">
          Em thân mến, tớ lắng nghe thấy nỗi đau và sự kiệt sức quá lớn trong lòng em lúc này. Nhưng xin em hãy nhớ: <strong>Mọi tổn thương đều có thể chữa lành, và sự sống của em là điều vô giá!</strong> Em không cô độc một mình.
        </p>
      </div>
      <div style="background: #FEE2E2; border: 2px solid #FCA5A5; padding: 14px; border-radius: 14px; margin: 12px 0;">
        <p style="font-size: 13px; color: #991B1B; font-weight: 800; margin-bottom: 6px;">📞 HÃY GỌI NGAY CHO CÁC KÊNH BẢO VỆ KHẨN CẤP (MIỄN PHÍ 24/7):</p>
        <ul style="font-size: 13px; color: #7F1D1D; margin-left: 20px; line-height: 1.7;">
          <li><strong>Tổng đài Quốc gia Bảo vệ Trẻ em:</strong> <a href="tel:111" style="color: #DC2626; font-weight: 800; text-decoration: underline;">111</a></li>
          <li><strong>Cấp cứu Y tế Khẩn cấp:</strong> <a href="tel:115" style="color: #DC2626; font-weight: 800; text-decoration: underline;">115</a></li>
        </ul>
      </div>
      <p style="font-size: 13px; color: var(--text-main); line-height: 1.5;">
        Em hãy nhấn ngay vào mục <strong>'Hẹn Gặp Cô TPT'</strong> ở thanh menu bên trái để Cô Nguyễn Thị Ngọc Nga trực tiếp hỗ trợ và bảo vệ an toàn cho em nhé!
      </p>
    `;
  }

  const state = analyzeStudentState(userText);
  let empathyPart = "";
  let analysisPart = "";
  let stepsPart = [];
  let questionPart = "";

  switch (state.domain) {
    case "violence":
      empathyPart = `🛡️ Chào em ${state.grade ? `học sinh ${state.grade}` : ''}! Thầy/Cô Chuyên gia Tư vấn lắng nghe thấy sự lo lắng và tổn thương trong lời nhắn của em: <i>"${userText}"</i>. Xin em hãy nhớ kỹ điều này: <strong>Bắt nạt hay bạo lực học đường tuyệt đối KHÔNG PHẢI LÀ LỖI CỦA EM!</strong>`;
      analysisPart = `⚖️ <strong>Góc nhìn chuyên gia tâm lý & Pháp luật:</strong> Đe dọa, đánh đập hay cô lập người khác là hành vi vi phạm nghiêm trọng nội quy học đường và pháp luật. Việc im lặng nhượng bộ thường khiến kẻ bắt nạt càng lấn tới. Em hoàn toàn có quyền được bảo vệ an toàn tại THCS Phước Hưng!`;
      stepsPart = [
        "<strong>1. An toàn Thân thể là số 1:</strong> Tránh đi một mình ở hành lang vắng, khu vực tối hoặc cổng trường lúc tan học.",
        "<strong>2. Nguyên tắc 'Nhìn Thẳng & Nói Ngắn':</strong> Giữ thái độ bình tĩnh, nhìn thẳng, nói rõ <i>'Tôi không đồng ý'</i> và nhanh chóng di chuyển đến nơi có thầy cô hoặc đông bạn bè.",
        "<strong>3. Báo Tin Bảo Vệ Ẩn Danh:</strong> Thu thập thông tin (ai đe dọa, ở đâu) và gửi ngay cho Cô TPT Ngọc Nga qua trang web này."
      ];
      questionPart = "Tình huống bắt nạt này xảy ra ở trong lớp hay ngoài cổng trường vậy em? Em đã kể điều này cho thầy cô hoặc cha mẹ nghe chưa?";
      break;

    case "academic":
      empathyPart = `💖 Chào em ${state.grade ? `học sinh ${state.grade}` : ''}! Thầy/Cô Chuyên gia Tư vấn cảm nhận được áp lực thi cử đang đè nặng lên em trong lời tâm sự: <i>"${userText}"</i>. Cảm giác sợ bị điểm kém hay sợ người lớn thất vọng là nỗi lo rất thật mà học sinh lứa tuổi em thường trải qua.`;
      analysisPart = `🧠 <strong>Giải mã góc nhìn tâm lý CBT:</strong> Bộ não con người khi gặp áp lực thi cử kéo dài sẽ tiết ra lượng lớn hormone Cortisol gây mệt mỏi và giảm khả năng tập trung tới 50%. Điểm số là thước đo phản ánh một bài làm tại một thời điểm, hoàn toàn <i>không định giá năng lực hay tương lai cả đời của em</i>.`;
      stepsPart = [
        "<strong>1. Hạ nhiệt căng thẳng 15 phút:</strong> Áp dụng phương pháp <i>Pomodoro</i> (Học tập trung 25 phút -> Nghỉ ngơi 5 phút). Tuyệt đối không thức sau 23h đêm thi.",
        "<strong>2. Thở Cân Bằng Cảm Xúc (4-7-8):</strong> Hít vào bằng mũi 4 giây -> Giữ hơi 7 giây -> Thở ra nhẹ nhàng bằng miệng 8 giây để xoa dịu thần kinh.",
        "<strong>3. Chiến thuật 'Chia Nhỏ Khối Lượng':</strong> Đừng nhìn toàn bộ cuốn sách, hãy liệt kê 3 mục nhỏ nhất cần hoàn thành trong hôm nay."
      ];
      questionPart = "Bây giờ em cảm thấy căng thẳng nhất ở môn học nào hay ở kỳ thi sắp tới? Em có muốn chia sẻ cụ thể hơn với Thầy/Cô không?";
      break;

    default:
      empathyPart = `🌱 <strong>Chào em! Thầy/Cô Chuyên gia Tư vấn tâm lý rất vui vì em đã tin tưởng và mở lòng chia sẻ: <i>"${userText}"</i>.</strong>`;
      analysisPart = `Mọi băn khoăn, cảm xúc dù là nhỏ nhất của em đều thật sự quan trọng và đáng được tôn trọng. Khi em cảm thấy bối rối, việc cởi mở nói ra đã là một bước tiến rất dũng cảm rồi đấy!`;
      stepsPart = [
        "<strong>1. Nhận diện cảm xúc:</strong> Hãy thử đặt tên cho cảm xúc lúc này của em (Lo lắng, buồn bã, hay giận dữ?).",
        "<strong>2. Chia sẻ cụ thể:</strong> Kể cho Thầy/Cô nghe hoàn cảnh hoặc câu chuyện làm em trăn trở.",
        "<strong>3. Cùng tìm giải pháp:</strong> Thầy/Cô sẽ đồng hành cùng em gỡ rối từng chút một."
      ];
      questionPart = "Em đang gặp khó khăn ở chuyện học hành, bạn bè hay chuyện gia đình vậy em? Em hãy kể cho Thầy/Cô nghe nhé!";
      break;
  }

  return `
    <p style="margin-bottom: 10px; font-size: 14px; line-height: 1.6;">${empathyPart}</p>
    <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.6;">${analysisPart}</p>
    
    <div style="background: #F8F5FE; padding: 14px 18px; border-radius: 16px; margin: 12px 0; border-left: 4px solid var(--primary-lavender); box-shadow: 0 2px 8px rgba(139, 115, 230, 0.08);">
      <p style="font-size: 13.5px; font-weight: 800; color: var(--primary-lavender); margin-bottom: 8px;">💡 Định hướng liệu pháp 3 bước dành cho em:</p>
      <ul style="font-size: 13px; color: var(--text-main); margin-left: 18px; line-height: 1.65;">
        ${stepsPart.map(s => `<li style="margin-bottom: 6px;">${s}</li>`).join('')}
      </ul>
    </div>

    <div style="background: linear-gradient(135deg, #FFF5F7 0%, #F5F1FA 100%); padding: 12px 16px; border-radius: 14px; margin-top: 12px; border: 1px dashed var(--primary-pink);">
      <p style="font-size: 13.5px; font-weight: 700; color: var(--primary-pink); margin-bottom: 4px;">💬 Thầy/Cô muốn lắng nghe em nhiều hơn:</p>
      <p style="font-size: 13px; color: var(--text-main); line-height: 1.5; margin: 0;">${questionPart}</p>
    </div>

    <p style="font-size: 12px; color: var(--text-muted); margin-top: 10px;">
      🤝 <i>Em cũng có thể chọn <strong>'Hẹn Gặp Cô TPT'</strong> ở menu bên trái để gửi tin nhắn bí mật cho Cô Nguyễn Thị Ngọc Nga nhé!</i>
    </p>
  `;
}

/**
 * HIỂN THỊ BONG BÓNG CHAT (HỖ TRỢ HTML RICH FORMAT)
 */
function appendBubble(content, sender, isHtml = false) {
  const messagesBox = document.getElementById('chat-messages');
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  
  if (isHtml) {
    bubble.innerHTML = content;
  } else {
    bubble.innerText = content;
  }
  
  messagesBox.appendChild(bubble);
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

/**
 * HIỆU ỨNG AI ĐANG SOẠN TIN NHẮN
 */
function showTypingIndicator() {
  const messagesBox = document.getElementById('chat-messages');
  const bubble = document.createElement('div');
  const id = 'typing-' + Date.now();
  bubble.id = id;
  bubble.className = 'chat-bubble bot';
  bubble.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin" style="color: var(--primary-lavender);"></i> <em>Chuyên gia tâm lý đang lắng nghe và suy ngẫm câu trả lời...</em>';
  messagesBox.appendChild(bubble);
  messagesBox.scrollTop = messagesBox.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

/**
 * GỢI Ý CHỦ ĐỀ NHANH (QUICK SUGGESTION CHIPS)
 */
function sendQuickQuery(queryText) {
  document.getElementById('chat-input').value = queryText;
  sendChatMessage();
}