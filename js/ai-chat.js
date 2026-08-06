/* ==========================================================================
   AI Counseling Engine 24/7 (NLP & Empathy Logic)
   Trường THCS Phước Hưng - An Giang
   ========================================================================== */

const AI_KNOWLEDGE = [
  {
    keywords: ["bắt nạt", "đánh", "chửi", "bạo lực", "đe dọa"],
    reply: "🌿 Tớ rất tiếc khi nghe em phải trải qua điều này. Bạo lực học đường hay sự đe dọa không bao giờ là lỗi của em! Em hãy giữ bình tĩnh, tránh đi một mình ở nơi vắng vẻ và hãy gửi ngay một lịch hẹn ẩn danh cho Cô Nguyễn Thị Ngọc Nga (TPT Đội) hoặc báo cho bố mẹ nhé. Tớ sẽ luôn bảo vệ em!"
  },
  {
    keywords: ["đuối nước", "bơi", "sông", "kênh", "tắm sông"],
    reply: "🏊 Em thân mến, vùng sông nước An Giang mình rất nguy hiểm với dòng chảy ngầm. Em tuyệt đối không được tự ý đi tắm sông, kênh rạch khi không có người lớn bơi giỏi đi cùng nhé. Nếu thấy bạn chìm, hãy tung phao/can nhựa hoặc hét to nhờ người lớn cứu, tuyệt đối không nhảy xuống cứu nếu em chưa học kỹ năng cứu nạn!"
  },
  {
    keywords: ["facebook", "mạng", "bắt nạt mạng", "ảnh", "bình luận", "xúc phạm"],
    reply: "🌐 Bị bắt nạt trên không gian mạng khiến em rất tổn thương đúng không? Lời khuyên cho em: 1. Hãy chụp lại màn hình bằng chứng; 2. Chặn tài khoản xấu đó; 3. Không đáp trả tiêu cực; 4. Đặt lịch gặp Cô Ngọc Nga để nhà trường phối hợp hỗ trợ em gỡ bỏ thông tin độc hại."
  },
  {
    keywords: ["áp lực", "thi", "điểm", "học", "mệt mỏi", "buồn"],
    reply: "💖 Tớ hiểu cảm giác áp lực thi cử và điểm số đối với học sinh THCS. Em đã rất cố gắng rồi! Hãy tự thưởng cho mình 15 phút nghỉ ngơi, nghe một bản nhạc dịu nhẹ và tập hít thở sâu nhé. Điểm số là một chặng đường, không phải là giá trị duy nhất của em!"
  },
  {
    keywords: ["xâm hại", "đụng chạm", "bí mật", "sờ"],
    reply: "🦺 Em hãy nhớ kỹ: Cơ thể em là của em! Không một ai có quyền chạm vào vùng đồ lót hay ép em giữ những bí mật khiến em cảm thấy sợ hãi/khó chịu. Hãy hét to 'KHÔNG', chạy đến nơi an toàn và kể ngay với Cô Ngô Nga hoặc Tổng đài Bảo vệ Trẻ em 111 nhé!"
  }
];

function handleChatKeyPress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

function sendChatMessage() {
  const inputEl = document.getElementById('chat-input');
  const messageText = inputEl.value.trim();

  if (!messageText) return;

  // Render User Bubble
  appendBubble(messageText, 'user');
  inputEl.value = '';

  // Show Bot Thinking Delay
  setTimeout(() => {
    const botReply = generateAIReply(messageText);
    appendBubble(botReply, 'bot');
  }, 600);
}

function appendBubble(text, sender) {
  const messagesBox = document.getElementById('chat-messages');
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.innerText = text;
  messagesBox.appendChild(bubble);
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

function generateAIReply(userText) {
  const textLower = userText.toLowerCase();

  for (const item of AI_KNOWLEDGE) {
    if (item.keywords.some(kw => textLower.includes(kw))) {
      return item.reply;
    }
  }

  return "🌸 Tớ luôn ở đây để lắng nghe em. Những cảm xúc hay băn khoăn của em đều rất đáng quý. Nếu cảm thấy lo lắng nhiều, em có thể sử dụng tính năng 'Đặt Lịch Hẹn Ẩn Danh' để trao đổi trực tiếp với Cô Nguyễn Thị Ngọc Nga (TPT Đội) nhé!";
}
