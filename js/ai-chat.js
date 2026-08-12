/* ==========================================================================
   Advanced AI Psychological Counselor Engine (Chuyên Gia Tư Vấn Tâm Lý Học Đường)
   Trường THCS Phước Hưng - Xã Nhơn Hội - An Giang
   Giáo viên TPT Đội: Cô Nguyễn Thị Ngọc Nga
   ========================================================================== */

// Lưu trữ lịch sử hội thoại trong phiên trò chuyện
let counselingHistory = [];

/**
 * BỘ TỪ KHÓA BÁO ĐỘNG KHẨN CẤP (CRISIS RED FLAGS)
 */
const CRISIS_PATTERNS = [
  "muốn chết", "tự tử", "rạch tay", "kết thúc cuộc sống", "bớt đau khổ",
  "không muốn sống", "tự hại", "uống thuốc tử", "buông xuôi", "chết đi cho xong", "nhảy cầu"
];

/**
 * TỰ ĐỘNG PHÂN TÍCH BỐI CẢNH & CẢM XÚC (ADVANCED PSYCHOLOGICAL ANALYZER)
 */
function analyzeStudentState(text) {
  const t = text.toLowerCase();
  
  // Trích xuất Khối lớp nếu có
  let grade = "";
  if (t.includes("lớp 6") || t.includes("khối 6")) grade = "Khối 6";
  else if (t.includes("lớp 7") || t.includes("khối 7")) grade = "Khối 7";
  else if (t.includes("lớp 8") || t.includes("khối 8")) grade = "Khối 8";
  else if (t.includes("lớp 9") || t.includes("khối 9")) grade = "Khối 9";

  // Phân loại miền tâm lý chuyên sâu
  let domain = "general";
  if (/áp lực|thi|điểm|học|kiểm tra|học lực|thức đêm|khảo sát|sợ rớt|học sút|mệt mỏi/i.test(t)) {
    domain = "academic";
  } else if (/bắt nạt|đánh|chửi|bạo lực|đe dọa|chặn đường|tẩy chay|cô lập|vây|nộp tiền|xô xát/i.test(t)) {
    domain = "violence";
  } else if (/facebook|tiktok|mạng|ảnh|bình luận|nhắn tin|bóc phốt|group|lừa đảo|bắt nạt mạng/i.test(t)) {
    domain = "cyber";
  } else if (/xâm hại|đụng chạm|bí mật|vùng kín|đồ lót|sờ|ép buộc|sợ hãi|người lạ|dụ dỗ/i.test(t)) {
    domain = "abuse";
  } else if (/đuối nước|bơi|sông|kênh|tắm sông|an giang|nhơn hội|tắm/i.test(t)) {
    domain = "drowning";
  } else if (/bố mẹ|ba mẹ|gia đình|cãi nhau|không hiểu|áp đặt|nổi giận|tủi thân|so sánh|mắng|chửi/i.test(t)) {
    domain = "family";
  } else if (/cô đơn|tự ti|kém cỏi|không ai chơi|bỏ rơi|buồn|khóc|bế tắc|lo âu|mệt/i.test(t)) {
    domain = "emotion";
  }

  return { domain, grade, rawText: text };
}

/**
 * TẠO PHẢN HỒI CHUYÊN GIA TÂM LÝ CÁ NHÂN HÓA (CBT + ROGERIAN EMPATHY MODEL)
 */
function generateProfessionalCounselingReply(userText) {
  const textLower = userText.toLowerCase();

  // 1. KIỂM TRA BÁO ĐỘNG NGUY CƠ KHẨN CẤP
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

  // 2. PHÂN TÍCH TRẠNG THÁI HỌC SINH
  const state = analyzeStudentState(userText);
  counselingHistory.push(userText);

  let empathyPart = "";
  let analysisPart = "";
  let stepsPart = [];
  let questionPart = "";

  switch (state.domain) {
    case "academic":
      empathyPart = `💖 Chào em ${state.grade ? `học sinh ${state.grade}` : ''}! Thầy/Cô Chuyên gia Tư vấn cảm nhận được áp lực thi cử và sự dồn dập đang đè nặng lên vai em. Cảm giác sợ bị điểm kém hay sợ người lớn thất vọng là nỗi lo rất thật mà học sinh lứa tuổi em thường trải qua.`;
      analysisPart = `🧠 <strong>Giải mã góc nhìn tâm lý CBT:</strong> Bộ não con người khi gặp áp lực thi cử kéo dài sẽ tiết ra lượng lớn hormone Cortisol gây mệt mỏi và giảm khả năng tập trung tới 50%. Điểm số là thước đo phản ánh một bài làm tại một thời điểm, hoàn toàn <i>không định giá năng lực hay tương lai cả đời của em</i>.`;
      stepsPart = [
        "<strong>1. Hạ nhiệt căng thẳng 15 phút:</strong> Áp dụng phương pháp <i>Pomodoro</i> (Học tập trung 25 phút -> Nghỉ ngơi 5 phút). Tuyệt đối không thức sau 23h đêm thi.",
        "<strong>2. Bài tập Thở Cân Bằng Cảm Xúc (4-7-8):</strong> Hít vào bằng mũi 4 giây -> Giữ hơi 7 giây -> Thở ra nhẹ nhàng bằng miệng 8 giây để xoa dịu thần kinh.",
        "<strong>3. Chiến thuật 'Chia Nhỏ Khối Lượng':</strong> Đừng nhìn toàn bộ cuốn sách, hãy liệt kê 3 mục nhỏ nhất cần hoàn thành trong hôm nay."
      ];
      questionPart = "Bây giờ em cảm thấy căng thẳng nhất ở môn học nào hay ở kỳ thi sắp tới? Em có muốn chia sẻ cụ thể hơn với Thầy/Cô không?";
      break;

    case "violence":
      empathyPart = `🛡️ Chào em! Thầy/Cô rất tiếc và lắng nghe bằng tất cả sự thấu cảm với tổn thương em đang gặp phải. Xin em nhớ rõ điều này: <strong>Bạo lực hay hành vi bắt nạt tuyệt đối KHÔNG PHẢI LÀ LỖI CỦA EM!</strong>`;
      analysisPart = `⚖️ <strong>Góc nhìn chuyên gia tâm lý & Pháp luật:</strong> Đe dọa, đánh đập hay cô lập người khác là hành vi vi phạm nghiêm trọng nội quy học đường và pháp luật. Việc im lặng thương lượng thường khiến kẻ bắt nạt càng lấn tới. Em có quyền được bảo vệ an toàn tại THCS Phước Hưng!`;
      stepsPart = [
        "<strong>1. An toàn Thân thể là số 1:</strong> Tránh đi một mình ở hành lang vắng, khu vực tối hoặc cổng trường lúc tan học.",
        "<strong>2. Nguyên tắc 'Nhìn Thẳng & Nói Ngắn':</strong> Giữ thái độ bình tĩnh, nhìn thẳng, nói rõ <i>'Tôi không đồng ý'</i> và nhanh chóng di chuyển đến nơi có đông thầy cô/bạn bè.",
        "<strong>3. Sử dụng Kênh Báo Báo Ẩn Danh:</strong> Thu thập thông tin (thời gian, người đe dọa) và gửi cho nhà trường."
      ];
      questionPart = "Tình huống bắt nạt này xảy ra ở lớp hay ngoài cổng trường vậy em? Em đã kể điều này cho ai nghe chưa?";
      break;

    case "cyber":
      empathyPart = `🌐 Chào em! Thầy/Cô rất hiểu sự bối rối, lo âu và cảm giác tổn thương khi thông tin hoặc hình ảnh riêng tư của em bị xúc phạm trên không gian mạng. Đừng tự trách mình nhé em!`;
      analysisPart = `🔍 <strong>Góc nhìn chuyên gia tâm lý mạng:</strong> Kẻ bắt nạt trực tuyến thường lợi dụng tính ẩn danh để gây hoảng loạn tâm lý. Khi em không phản ứng tiêu cực hay tranh cãi trên mạng, đối phương sẽ nhanh chóng mất đi điểm tựa gây hại.`;
      stepsPart = [
        "<strong>1. Lưu giữ Bằng Chứng:</strong> Chụp màn hình tất cả tin nhắn, bài viết, bình luận ác ý (không xóa tin nhắn làm bằng chứng).",
        "<strong>2. Quy tắc 3B (Block - Report - Breathe):</strong> Chặn tài khoản độc hại, Báo cáo vi phạm lên mạng xã hội và Hít thở sâu ngắt kết nối mạng 24h.",
        "<strong>3. Nhờ Thầy Cô Can Thiệp:</strong> Nhà trường sẽ phối hợp yêu cầu gỡ bỏ thông tin xấu độc bảo vệ em."
      ];
      questionPart = "Sự việc này xảy ra trên Facebook, Zalo hay TikTok vậy em? Em có cần Thầy/Cô hướng dẫn cách lưu lại bằng chứng không?";
      break;

    case "abuse":
      empathyPart = `🦺 Em thân mến, Thầy/Cô ở đây bên em. Em rất dũng cảm khi mở lòng chia sẻ điều này. Xin em khắc ghi: <strong>Cơ thể em là của riêng em, em KHÔNG CÓ LỖI và không phải tự dằn dặt vì bất kỳ hành vi đụng chạm sai trái nào của người khác!</strong>`;
      analysisPart = `🛡️ <strong>Góc nhìn chuyên gia tâm lý bảo vệ trẻ em:</strong> Không ai (kể cả người quen hay họ hàng) có quyền đụng chạm vào vùng riêng tư (vùng đồ lót) hoặc ép em giữ những bí mật làm em sợ hãi.`;
      stepsPart = [
        "<strong>1. Áp dụng Quy tắc 5 Ngón Tay:</strong> Kiên quyết hét to <i>'KHÔNG! ĐỪNG CHẠM VÀO TÔI!'</i>.",
        "<strong>2. Bỏ Chạy Ngay Lập Tức:</strong> Di chuyển nhanh đến nơi có đông người, cửa hàng hoặc đồn công an.",
        "<strong>3. Kể Ngay Với Người Tin Cẩn:</strong> Báo với cha mẹ, Cô Ngọc Nga hoặc gọi Tổng đài 111."
      ];
      questionPart = "Em có đang ở nơi an toàn lúc này không? Em có muốn Thầy/Cô kết nối khẩn cấp với Cô TPT Ngọc Nga để bảo vệ em ngay bây giờ không?";
      break;

    case "drowning":
      empathyPart = `🏊 Chào em! Thầy/Cô đánh giá rất cao tinh thần chủ động tìm hiểu an toàn sông nước của em - đây là kỹ năng sống cực kỳ quan trọng tại vùng sông nước An Giang mình!`;
      analysisPart = `🌊 <strong>Góc nhìn chuyên gia an toàn sông nước:</strong> Kênh rạch tại xã Nhơn Hội có các dòng chảy xoáy và hố sâu bất ngờ. Việc trang bị kiến thức an toàn giúp em bảo vệ bản thân và bạn bè xung quanh.`;
      stepsPart = [
        "<strong>1. Quy tắc 3 KHÔNG:</strong> Không tự ý tắm sông/kênh; Không tự nhảy xuống nước cứu bạn khi chưa được huấn luyện; Không đi chơi sát bờ kênh một mình.",
        "<strong>2. Cứu Nạn Gián Tiếp:</strong> Hô to nhờ người lớn -> Tìm sào dài, dây thừng hoặc ném can nhựa nắp kín/phao xuống cho bạn bám.",
        "<strong>3. Mặc Áo Phao Bắt Bắt Buộc:</strong> Luôn mặc áo phao đúng cách khi đi đò/thuyền qua sông."
      ];
      questionPart = "Em hoặc các bạn trong lớp có thường xuyên đi qua khu vực kênh sông không? Em có muốn học thêm các bài tập bơi an toàn không?";
      break;

    case "family":
      empathyPart = `🏡 Chào em! Thầy/Cô lắng nghe thấy sự tủi thân, hụt hẫng và cảm giác bế tắc khi em cảm thấy người thân yêu nhất lại không hiểu hay lắng nghe mình.`;
      analysisPart = `🌱 <strong>Góc nhìn chuyên gia tâm lý gia đình:</strong> Tuổi THCS là giai đoạn em đang hình thành cá tính riêng. Bố mẹ đôi khi vì lo lắng hoặc áp lực cuộc sống nên đã chọn sai cách truyền đạt khiến em cảm thấy bị áp đặt hay so sánh.`;
      stepsPart = [
        "<strong>1. Hạ Nhiệt Lúc Căng Thẳng:</strong> Khi bầu không khí nảy lửa, hãy xin phép vào phòng riêng hoặc đi uống nước để giữ bình tĩnh.",
        "<strong>2. Dùng Thông Điệp 'Em Cảm Thấy':</strong> Thay vì trách <i>'Bố mẹ không thương con'</i>, hãy thử nói: <i>'Con cảm thấy rất buồn khi bố mẹ so sánh con với người khác...'</i>",
        "<strong>3. Viết Thư Tâm Sự:</strong> Nếu khó nói trực tiếp, hãy viết một bức thư ngắn chân thành gửi bố mẹ."
      ];
      questionPart = "Chuyện mâu thuẫn gia đình gần nhất xảy ra về vấn đề học tập hay sinh hoạt vậy em? Em cảm thấy buồn nhất ở điều gì?";
      break;

    case "emotion":
      empathyPart = `🌸 Em thân mến, Thầy/Cô muốn gửi đến em một cái ôm ấm áp. Cảm giác cô đơn, tự ti hay mất phương hướng là trải nghiệm tâm lý mà ai trong lứa tuổi học sinh cũng từng trải qua.`;
      analysisPart = `✨ <strong>Góc nhìn chuyên gia tâm lý:</strong> Mỗi người chúng ta là một phiên bản độc bản duy nhất. Những cảm xúc buồn bã tạm thời không định nghĩa con người em. Em có những giá trị và tiềm năng rất riêng.`;
      stepsPart = [
        "<strong>1. Ngừng So Sánh Bản Thân:</strong> Mạng xã hội chỉ đăng những điều đẹp đẽ nhất của người khác, đó không phải toàn bộ thực tế.",
        "<strong>2. Nhật Ký 3 Điều Tích Cực:</strong> Mỗi tối trước khi ngủ, hãy viết ra 3 việc nhỏ em đã làm tốt trong ngày (VD: Giúp bạn, hoàn thành bài tập, mỉm cười).",
        "<strong>3. Mở Lòng Kết Nối:</strong> Tham gia các câu lạc bộ, phong trào Đội tại THCS Phước Hưng để tìm kiếm những người bạn đồng điệu."
      ];
      questionPart = "Hôm nay điều gì làm em cảm thấy tủi thân hay cô đơn nhất? Em có muốn tâm sự cùng Thầy/Cô không?";
      break;

    default:
      empathyPart = `🌱 <strong>Chào em! Thầy/Cô Chuyên gia Tư vấn tâm lý rất vui vì em đã tin tưởng và mở lòng chia sẻ.</strong>`;
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
 * XỬ LÝ SỰ KIỆN PHÍM ENTER
 */
function handleChatKeyPress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

/**
 * XỬ LÝ GỬI TIN NHẮN TỪ HỌC SINH
 */
function sendChatMessage() {
  const inputEl = document.getElementById('chat-input');
  const messageText = inputEl.value.trim();

  if (!messageText) return;

  // 1. Hiển thị bong bóng tin nhắn của Học sinh
  appendBubble(messageText, 'user');
  inputEl.value = '';

  // 2. Tạo hiệu ứng AI đang suy nghĩ (Typing indicator)
  const typingBubbleId = showTypingIndicator();

  // 3. Phân tích tâm lý & phản hồi sau 800ms
  setTimeout(() => {
    removeTypingIndicator(typingBubbleId);
    const botReplyHtml = generateProfessionalCounselingReply(messageText);
    appendBubble(botReplyHtml, 'bot', true);
  }, 800);
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

