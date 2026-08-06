/* ==========================================================================
   Professional AI Psychological Counseling Engine (Chuyên Gia Tư Vấn Tâm Lý Học Đường)
   Trường THCS Phước Hưng - Xã Nhơn Hội - An Giang
   Giáo viên TPT Đội: Cô Nguyễn Thị Ngọc Nga
   ========================================================================== */

/**
 * BỘ TRI THỨC TÂM LÝ CHUYÊN SÂU (CLINICAL PSYCHOLOGICAL KNOWLEDGE BASE)
 * Dựa trên Chuẩn Tư vấn Tâm lý Học đường & Liệu pháp Nhận thức Hành vi (CBT)
 */
const PSYCHOLOGICAL_DOMAINS = [
  // 1. ÁP LỰC HỌC TẬP & THI CỬ
  {
    category: "academic_stress",
    keywords: ["áp lực", "thi", "điểm", "học", "mệt mỏi", "học sút", "thức đêm", "kiểm tra", "học quá sức", "sợ điểm kém", "thầy cô mắng", "bố mẹ ép"],
    response: {
      empathy: "💖 Tớ cảm nhận được sự mệt mỏi và dồn dập mà em đang phải gánh chịu. Áp lực thi cử và sự kỳ vọng của người lớn đôi khi thật sự nặng nề với lứa tuổi chúng mình.",
      analysis: "🧠 <strong>Góc nhìn chuyên gia tâm lý:</strong> Điểm số là thước đo cho một bài làm tại một thời điểm, hoàn toàn KHÔNG định nghĩa giá trị hay tương lai của em. Khi não bộ bị căng quá mức, khả năng ghi nhớ sẽ giảm tới 60%.",
      steps: [
        "<strong>1. Tạm dừng 15 phút:</strong> Áp dụng phương pháp <i>Pomodoro</i> (Học 25 phút, nghỉ 5 phút) để não bộ phục hồi.",
        "<strong>2. Bài tập Thở Thư giãn:</strong> Hít vào sâu trong 4 giây -> Giữ hơi 7 giây -> Thở ra nhẹ nhàng qua miệng trong 8 giây (Lặp lại 3 lần).",
        "<strong>3. Chia nhỏ mục tiêu:</strong> Đừng nhìn cả cuốn sách dày, hãy học từng mục nhỏ mỗi ngày."
      ],
      referral: "Nếu em vẫn thấy dồn dập hoặc lo lắng mất ngủ, em có thể nhấn nút <strong>'Đặt Lịch Hẹn Ẩn Danh'</strong> để Cô Nguyễn Thị Ngọc Nga đồng hành và hỗ trợ gỡ rối cùng em nhé!"
    }
  },

  // 2. BẠO LỰC HỌC ĐƯỜNG & XUNG ĐỘT BẠN BÈ
  {
    category: "school_violence",
    keywords: ["bắt nạt", "đánh", "chửi", "bạo lực", "đe dọa", "chặn đường", "tẩy chay", "cô lập", "vây quanh", "đánh hội đồng", "bắt nộp tiền"],
    response: {
      empathy: "🛡️ Tớ rất tiếc và đồng cảm sâu sắc với tổn thương em đang trải qua. Em hãy nhớ kỹ: Bạo lực hay sự đe dọa tuyệt đối KHÔNG PHẢI LÀ LỖI CỦA EM!",
      analysis: "⚖️ <strong>Góc nhìn chuyên gia tâm lý:</strong> Hành vi hành hung hoặc cô lập người khác là vi phạm pháp luật và quy định nhà trường. Sự im lặng thương lượng với kẻ bắt nạt thường khiến chúng càng lấn tới.",
      steps: [
        "<strong>1. Ưu tiên An toàn Thân thể:</strong> Tránh đi một mình ở góc khuất, hành lang vắng hoặc cổng trường lúc tan học.",
        "<strong>2. Giữ Thái độ Bình tĩnh:</strong> Nhìn thẳng, nói ngắn gọn 'Tôi không đồng ý' và di chuyển ngay đến nơi có thầy cô hoặc đông người.",
        "<strong>3. Tìm Sự Bảo vệ Chính thức:</strong> Kể lại sự việc với người lớn mà em tin tưởng nhất."
      ],
      referral: "🔒 Liên Đội THCS Phước Hưng luôn bảo vệ em! Em hãy gửi thông tin ẩn danh cho <strong>Cô Nguyễn Thị Ngọc Nga (TPT Đội)</strong> ngay lập tức. Nhà trường sẽ xử lý kín đáo và bảo mật 100% danh tính của em."
    }
  },

  // 3. BẮT NẠT TRÊN KHÔNG GIAN MẠNG (CYBERBULLYING)
  {
    category: "cyberbullying",
    keywords: ["facebook", "mạng", "bắt nạt mạng", "ảnh xấu", "bình luận", "xúc phạm", "tin đồn", "dốc phốt", "tài khoản giả", "nhắn tin đe dọa", "group chửi"],
    response: {
      empathy: "🌐 Tớ hiểu cảm giác bối rối và tổn thương khi thông tin hoặc hình ảnh của mình bị lăng mạ trực tuyến. Đừng dằn dặn bản thân em nhé!",
      analysis: "🔍 <strong>Góc nhìn chuyên gia tâm lý:</strong> Kẻ bắt nạt mạng thường lợi dụng tính ẩn danh để gây hoảng loạn. Khi em không đáp trả tiêu cực, chúng sẽ nhanh chóng mất đi điểm tựa gây hại.",
      steps: [
        "<strong>1. Quy tắc Bằng chứng:</strong> Chụp màn hình ngay lập tức tất cả tin nhắn, bình luận ác ý làm bằng chứng (không xóa).",
        "<strong>2. Chặn & Báo cáo (Block & Report):</strong> Chặn tài khoản độc hại và báo cáo xấu lên nền tảng mạng xã hội.",
        "<strong>3. Tạm Ngắt Kết Nối Mạng:</strong> Rời khỏi màn hình điện thoại 24h để xoa dịu tâm trí."
      ],
      referral: "Cô Nguyễn Thị Ngọc Nga và nhà trường sẽ phối hợp yêu cầu gỡ bỏ bài viết xấu. Em hãy gửi mã tra cứu ẩn danh để cô hỗ trợ xử lý nhé!"
    }
  },

  // 4. TAI NẠN THƯƠNG TÍCH & AN TOÀN SÔNG NƯỚC AN GIANG
  {
    category: "drowning_safety",
    keywords: ["đuối nước", "bơi", "sông", "kênh", "tắm sông", "trôi nước", "sông nhơn hội", "tai nạn", "sợ ngã nước", "suýt chìm"],
    response: {
      empathy: "🏊 Tớ rất trân trọng vì em đã chủ động tìm hiểu về an toàn sông nước - đây là kỹ năng sinh tồn đặc biệt quan trọng tại vùng sông nước An Giang mình!",
      analysis: "🌊 <strong>Góc nhìn chuyên gia tâm lý:</strong> Nước sông/kênh ở xã Nhơn Hội có các dòng chảy xiết ngầm và hố sâu bất ngờ. Nỗi sợ sông nước là phản ứng tự nhiên của cơ thể để bảo vệ sự sống.",
      steps: [
        "<strong>1. Nguyên tắc 3 KHÔNG:</strong> KHÔNG tự ý tắm sông/kênh rạch; KHÔNG nhảy xuống nước cứu bạn khi chưa được huấn luyện cứu hộ; KHÔNG đi dạo sát bờ kênh một mình.",
        "<strong>2. Kỹ năng Ứng cứu An toàn:</strong> Nếu thấy bạn gặp nguy hiểm dưới nước -> Hét to nhờ người lớn -> Tìm sào dài, dây thừng hoặc quăng can nhựa/phao tự chế xuống cho bạn bấu vào.",
        "<strong>3. Học Bơi An Toàn:</strong> Đăng ký học bơi tại bể bơi đạt chuẩn có người lớn giám sát."
      ],
      referral: "Em có thể tham khảo thêm tài liệu hướng dẫn an toàn sông nước của Cô Ngọc Nga tại mục 'Thư Viện Tâm Lý' nhé!"
    }
  },

  // 5. XÂM HẠI TRẺ EM & RANH GIỚI CƠ THỂ
  {
    category: "child_protection",
    keywords: ["xâm hại", "đụng chạm", "bí mật", "sờ", "vùng kín", "đồ lót", "ép buộc", "dọa nạt", "cho tiền", "sợ hãi"],
    response: {
      empathy: "🦺 Tớ ở đây bên em. Hãy hít một hơi thật sâu... Em rất dũng cảm khi chia sẻ điều này. Em KHÔNG CÓ LỖI và tuyệt đối không phải dằn dằn vì bất kỳ điều gì!",
      analysis: "🛡️ <strong>Góc nhìn chuyên gia tâm lý:</strong> Cơ thể của em là của riêng em. Không một ai (kể cả người thân quen) có quyền đụng chạm vào vùng riêng tư hoặc ép em giữ những bí mật gây sợ hãi.",
      steps: [
        "<strong>1. Áp dụng Quy tắc 5 Ngón Tay:</strong> Hét thật to <i>'KHÔNG! ĐỪNG CHẠM VÀO TÔI!'</i>.",
        "<strong>2. Bỏ Chạy Ngay Lập Tức:</strong> Chạy đến nơi đông người, cửa hàng hoặc đồn công an gần nhất.",
        "<strong>3. Kể Ngay Với Người Tin Cẩn:</strong> Báo với bố mẹ, Cô Ngọc Nga hoặc gọi hotline bảo vệ trẻ em."
      ],
      referral: "🚨 <strong>HỖ TRỢ KHẨN CẤP 24/7:</strong> Gọi ngay <strong>Tổng đài Quốc gia Bảo vệ Trẻ em: 111</strong> (Hoàn toàn miễn phí) hoặc gửi Yêu cầu khẩn cho Cô Ngọc Nga tại trang web này!"
    }
  },

  // 6. RỐI LOẠN CẢM XÚC TUỔI DẬY THÌ & MÂU THUẪN GIA ĐÌNH
  {
    category: "family_puberty",
    keywords: ["bố mẹ", "ba mẹ", "gia đình", "cãi nhau", "không hiểu", "áp đặt", "nổi giận", "tủi thân", "so sánh", "bị chửi", "bị đánh"],
    response: {
      empathy: "🏡 Tớ rất hiểu cảm giác bế tắc và tủi thân khi cảm thấy người thân yêu nhất lại không hiểu hay lắng nghe mình.",
      analysis: "🌱 <strong>Góc nhìn chuyên gia tâm lý:</strong> Tuổi 11 - 15 là giai đoạn não bộ có sự thay đổi hormone mạnh mẽ, khiến cảm xúc dễ bộc phát. Bố mẹ đôi khi vì lo lắng quá mức nên dùng sai cách truyền đạt.",
      steps: [
        "<strong>1. Tránh Đối Đầu Lúc Căng Thẳng:</strong> Khi không khí nảy lửa, hãy xin phép vào phòng riêng hoặc đi uống nước để hạ nhiệt cảm xúc.",
        "<strong>2. Dùng Thông Điệp 'Em Cảm Thấy':</strong> Thay vì trách 'Bố mẹ không thương con', hãy thử nói: <i>'Con cảm thấy rất buồn và áp lực khi bố mẹ so sánh con với người khác...'</i>",
        "<strong>3. Viết Thư Tâm Sự:</strong> Nếu khó nói trực tiếp, hãy viết một bức thư ngắn chân thành gửi bố mẹ."
      ],
      referral: "Cô Nguyễn Thị Ngọc Nga luôn sẵn sàng làm cầu nối lắng nghe và hỗ trợ em trao đổi hòa giải với gia đình!"
    }
  },

  // 7. CÔ ĐƠN, TỰ TI & MẤT PHƯƠNG HƯỚNG
  {
    category: "self_esteem",
    keywords: ["cô đơn", "tự ti", "xấu xí", "kém cỏi", "không ai chơi", "bị bỏ rơi", "mất phương hướng", "buồn chán", "thất vọng", "khóc"],
    response: {
      empathy: "🌸 Em thân mến, tớ muốn ôm em một cái thật chặt. Cảm giác cô đơn hay tự ti là điều ai trong chúng mình cũng từng trải qua ít nhất một lần.",
      analysis: "✨ <strong>Góc nhìn chuyên gia tâm lý:</strong> Mỗi người trong chúng ta là một phiên bản độc bản duy nhất trên thế giới. Em có những ưu điểm riêng mà có thể chính em chưa nhận ra.",
      steps: [
        "<strong>1. Dừng So Sánh Bản Thân:</strong> Mạng xã hội chỉ đăng những điều đẹp đẽ nhất của người khác, đó không phải là toàn bộ thực tế.",
        "<strong>2. Bài Tập 3 Điều Tích Cực:</strong> Mỗi tối trước khi ngủ, hãy viết ra 3 điều nhỏ bé em đã làm tốt trong ngày (VD: Giúp bạn, hoàn thành bài tập, mỉm cười).",
        "<strong>3. Tham Gia Hoạt Động Đội:</strong> Tham gia các câu lạc bộ, phong trào Đội tại THCS Phước Hưng để kết nối những người bạn mới."
      ],
      referral: "Hãy tự hào về bản thân em nhé! Tớ và Cô Ngọc Nga luôn tin tưởng vào năng lượng tích cực của em!"
    }
  }
];

/**
 * TỪ KHÓA BÁO ĐỘNG NGUY CƠ KHẨN CẤP (CRISIS SAFETY SYSTEM)
 */
const CRISIS_KEYWORDS = ["muốn chết", "tự tử", "rạch tay", "kết thúc cuộc sống", "bớt đau khổ", "không muốn sống", "tự hại", "uống thuốc tử", "buông xuôi"];

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
 * ĐỘNG CƠ PHÂN TÍCH TÂM LÝ CHUYÊN GIA (PROFESSIONAL COUNSELING LOGIC)
 */
function generateProfessionalCounselingReply(userText) {
  const textLower = userText.toLowerCase();

  // A. KIỂM TRA PHẢN ỨNG KHẨN CẤP AN TOÀN (CRISIS EMERGENCY CHECK)
  if (CRISIS_KEYWORDS.some(kw => textLower.includes(kw))) {
    return `
      <div style="border-left: 4px solid #EF4444; padding-left: 12px; margin-bottom: 8px;">
        <h4 style="color: #DC2626; font-size: 15px; font-weight: 800;">🚨 TỚ Ở ĐÂY BÊN EM - HÃY GIỮ BÌNH TĨNH!</h4>
        <p style="font-size: 13px; color: var(--text-main); margin-top: 6px;">
          Em thân mến, tớ cảm nhận được nỗi đau và sự bế tắc quá lớn mà em đang gánh chịu. Nhưng xin em hãy dừng lại một chút, <strong>cuộc sống và sự an toàn của em là điều quý giá nhất trên đời!</strong> Em không phải gánh chịu điều này một mình.
        </p>
      </div>
      <div style="background: #FEE2E2; border: 2px solid #FCA5A5; padding: 14px; border-radius: 12px; margin: 10px 0;">
        <p style="font-size: 13px; color: #991B1B; font-weight: 700; margin-bottom: 6px;">📞 HÃY GỌI NGAY CÁC KÊNH HỖ TRỢ KHẨN CẤP (MIỄN PHÍ 24/7):</p>
        <ul style="font-size: 13px; color: #7F1D1D; margin-left: 20px; line-height: 1.6;">
          <li><strong>Tổng đài Quốc gia Bảo vệ Trẻ em:</strong> <a href="tel:111" style="color: #DC2626; font-weight: 800;">111</a></li>
          <li><strong>Tổng đài Cấp cứu Y tế:</strong> <a href="tel:115" style="color: #DC2626; font-weight: 800;">115</a></li>
        </ul>
      </div>
      <p style="font-size: 13px; color: var(--text-main);">
        Em hãy nhấn ngay vào mục <strong>'Hẹn Gặp Cô TPT'</strong> ở menu bên trái để Cô Nguyễn Thị Ngọc Nga hỗ trợ bảo vệ em trực tiếp và an toàn tuyệt đối nhé!
      </p>
    `;
  }

  // B. RÀ SOÁT BỘ TRI THỨC TÂM LÝ CHUYÊN SÂU
  for (const domain of PSYCHOLOGICAL_DOMAINS) {
    if (domain.keywords.some(kw => textLower.includes(kw))) {
      const r = domain.response;
      return `
        <p style="margin-bottom: 10px;">${r.empathy}</p>
        <p style="margin-bottom: 10px;">${r.analysis}</p>
        <div style="background: var(--bg-app); padding: 12px 16px; border-radius: 12px; margin: 10px 0; border: 1px solid #EAE3F7;">
          <p style="font-size: 13px; font-weight: 700; color: var(--primary-lavender); margin-bottom: 6px;">💡 Lời khuyên từng bước dành cho em:</p>
          <ul style="font-size: 13px; color: var(--text-main); margin-left: 18px; line-height: 1.6;">
            ${r.steps.map(step => `<li style="margin-bottom: 4px;">${step}</li>`).join('')}
          </ul>
        </div>
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">🤝 ${r.referral}</p>
      `;
    }
  }

  // C. CHẾ ĐỘ TƯ VẤN THẤU CẢM CHUNG (GENERAL EMPATHETIC COUNSELING)
  return `
    <p style="margin-bottom: 8px;">🌱 <strong>Chào em! Tớ rất vui vì em đã tin tưởng và mở lòng chia sẻ.</strong></p>
    <p style="margin-bottom: 10px; font-size: 13.5px; line-height: 1.5;">
      Mọi suy nghĩ, băn khoăn hay cảm xúc của em dù là nhỏ nhất đều thật sự quan trọng và đáng được tôn trọng. Khi em cảm thấy bối rối hay lo âu, việc nói ra đã là bước đầu tiên rất dũng cảm rồi đấy!
    </p>
    <div style="background: var(--primary-lavender-light); padding: 12px 16px; border-radius: 12px; margin: 10px 0;">
      <p style="font-size: 12.5px; font-weight: 700; color: var(--primary-lavender); margin-bottom: 4px;">✨ Gợi ý câu hỏi em có thể trao đổi cùng tớ:</p>
      <ul style="font-size: 12.5px; color: var(--text-main); margin-left: 16px; line-height: 1.5;">
        <li>"Làm sao để hết căng thẳng trước giờ kiểm tra?"</li>
        <li>"Tớ bị bạn bè trêu chọc/cô lập thì làm thế nào?"</li>
        <li>"Bị ai đó đe dọa hoặc đụng chạm khó chịu thì xử lý ra sao?"</li>
        <li>"Làm sao để bơi an toàn vùng sông nước Nhơn Hội?"</li>
      </ul>
    </div>
    <p style="font-size: 13px; color: var(--text-muted);">
      Em cũng có thể chọn <strong>'Hẹn Gặp Cô TPT'</strong> để trao đổi ẩn danh trực tiếp với Cô Nguyễn Thị Ngọc Nga nhé!
    </p>
  `;
}

/**
 * GỢI Ý CHỦ ĐỀ NHANH (QUICK SUGGESTION CHIPS)
 */
function sendQuickQuery(queryText) {
  document.getElementById('chat-input').value = queryText;
  sendChatMessage();
}
