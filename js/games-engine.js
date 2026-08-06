/* ==========================================================================
   Gamified Scenario Engine (5 Topics)
   Trường THCS Phước Hưng - An Giang
   ========================================================================== */

const GAME_DATA = {
  school_violence: {
    title: "🛡️ Thử Thách: Phòng Chống Bạo Lực Học Đường",
    question: "Tình huống: Trong giờ ra chơi, em thấy một nhóm bạn lớp trên đang vây quanh một bạn lớp 6, đe dọa và bắt bạn đó phải nộp tiền tiêu vặt. Em sẽ làm gì?",
    options: [
      { text: "A. Lao vào đánh nhau với nhóm bạn lớp trên để bảo vệ bạn.", correct: false, feedback: "❌ Chưa an toàn! Việc lao vào mâu thuẫn trực tiếp có thể khiến em bị tổn thương. Hãy tìm sự hỗ trợ từ người lớn!" },
      { text: "B. Bỏ đi coi như không thấy gì vì sợ bị trả thù.", correct: false, feedback: "❌ Chưa tối ưu! Thờ ơ với bạo lực khiến kẻ xấu càng lấn tới. Chúng ta có kênh báo cáo ẩn danh an toàn!" },
      { text: "C. Báo ngay cho Cô Nguyễn Thị Ngọc Nga (TPT Đội) hoặc bảo vệ nhà trường.", correct: true, feedback: "🎉 CHÍNH XÁC! Đây là cách xử lý thông minh và an toàn nhất. Thầy cô sẽ bảo vệ danh tính của em!" }
    ]
  },
  cyberbullying: {
    title: "🌐 Thử Thách: Phòng Chống Bắt Nạt Trực Tuyến",
    question: "Tình huống: Em phát hiện có người lập tài khoản giả mạo hình ảnh của em trên Facebook và đăng những lời lẽ xúc phạm. Em nên xử lý như thế nào?",
    options: [
      { text: "A. Đăng bài chửi bới lại người đó trên mạng xã hội.", correct: false, feedback: "❌ Không nên! Đáp trả tiêu cực chỉ khiến cuộc chiến mạng leo thang và làm ảnh hưởng hình ảnh của em." },
      { text: "B. Chụp màn hình bằng chứng, báo cáo tài khoản và chia sẻ với Cô TPT Đội.", correct: true, feedback: "🎉 CHÍNH XÁC! Chụp màn hình giữ lại bằng chứng và nhờ thầy cô hỗ trợ xử lý là quy trình chuẩn!" },
      { text: "C. Khóc một mình và khóa tài khoản vĩnh viễn.", correct: false, feedback: "❌ Em không hề có lỗi! Đừng gánh chịu một mình, luôn có thầy cô và gia đình bên cạnh em." }
    ]
  },
  child_abuse: {
    title: "🦺 Thử Thách: Quy Tắc 5 Ngón Tay Bảo Vệ Cơ Thể",
    question: "Tình huống: Một người quen của gia đình cố tình đụng chạm vào vùng đồ lót của em và dặn 'Đây là bí mật của hai chú cháu'. Em sẽ làm gì?",
    options: [
      { text: "A. Giữ bí mật vì sợ người đó giận.", correct: false, feedback: "❌ Tuyệt đối KHÔNG! Không ai có quyền xâm phạm vùng riêng tư của em. Đó không bao giờ là lỗi của em." },
      { text: "B. Hét to 'KHÔNG', bỏ chạy đến nơi đông người và kể ngay với bố mẹ/Cô TPT.", correct: true, feedback: "🎉 CHÍNH XÁC! Áp dụng quy tắc 5 ngón tay: Hét to, Bỏ chạy và Kể lại ngay với người tin cậy!" },
      { text: "C. Im lặng nhưng lần sau không gặp nữa.", correct: false, feedback: "❌ Chưa đủ! Em cần báo ngay cho người lớn để ngăn chặn hành vi nguy hiểm này lặp lại." }
    ]
  },
  drowning_prevention: {
    title: "🏊 Thử Thách: An Toàn Vùng Sông Nước An Giang",
    question: "Tình huống: Em cùng các bạn đi học về qua kênh/sông ở xã Nhơn Hội. Một bạn rủ xuống sông tắm mát dù không ai biết bơi. Em xử lý ra sao?",
    options: [
      { text: "A. Nhảy xuống tắm cùng bạn vì thấy sông không sâu lắm.", correct: false, feedback: "❌ Rất nguy hiểm! Dòng nước sông An Giang có chảy xiết và hố sâu bất ngờ. Tuyệt đối không tắm sông tự do!" },
      { text: "B. Kiên quyết từ chối, giải thích nguy cơ đuối nước và rủ bạn về nhà.", correct: true, feedback: "🎉 CHÍNH XÁC! An toàn sông nước là ưu tiên số 1. Chỉ bơi ở bể bơi có người lớn giám sát!" },
      { text: "C. Đứng trên bờ cổ vũ bạn tắm.", correct: false, feedback: "❌ Nguy hiểm! Nếu bạn bị đuối nước em sẽ không kịp ứng cứu. Hãy ngăn bạn ngay từ đầu!" }
    ]
  },
  mental_health: {
    title: "💖 Thử Thách: Giải Tỏa Áp Lực Thi Cử",
    question: "Tình huống: Ngày mai có bài kiểm tra quan trọng nhưng em cảm thấy dồn dập, tim đập nhanh và không thể tập trung học tiếp. Em nên làm gì?",
    options: [
      { text: "A. Uống cà phê đậm đặc và thức trắng đêm học vẹt.", correct: false, feedback: "❌ Thức đêm làm não bộ kiệt sức, gây hoảng loạn khi vào phòng thi." },
      { text: "B. Dừng lại 10 phút, tập bài thở sâu 4-7-8, uống 1 ly nước ấm và đi ngủ sớm.", correct: true, feedback: "🎉 CHÍNH XÁC! Giữ cho tâm trí thư thái và ngủ đủ giấc giúp bộ não ghi nhớ tốt gấp 3 lần!" },
      { text: "C. Bỏ thi luôn vì nghĩ mình chắc chắn làm không được.", correct: false, feedback: "❌ Đừng tự giảm giá trị bản thân! Hãy trò chuyện với AI hoặc Cô Nga để lấy lại tinh thần nhé!" }
    ]
  }
};

let currentActiveGame = null;

function startGame(gameKey) {
  const game = GAME_DATA[gameKey];
  if (!game) return;

  currentActiveGame = gameKey;
  document.getElementById('game-container').style.display = 'block';
  document.getElementById('game-title').innerText = game.title;
  document.getElementById('game-question').innerText = game.question;

  const optionsBox = document.getElementById('game-options');
  optionsBox.innerHTML = '';

  game.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'btn-clay-secondary';
    btn.style.textAlign = 'left';
    btn.style.padding = '14px 18px';
    btn.style.fontSize = '14px';
    btn.style.borderRadius = 'var(--radius-md)';
    btn.style.width = '100%';
    btn.innerText = opt.text;
    btn.onclick = () => selectGameOption(idx);
    optionsBox.appendChild(btn);
  });

  const feedbackBox = document.getElementById('game-feedback');
  feedbackBox.style.display = 'none';

  // Scroll smooth to game container
  document.getElementById('game-container').scrollIntoView({ behavior: 'smooth' });
}

function selectGameOption(optionIdx) {
  const game = GAME_DATA[currentActiveGame];
  const selected = game.options[optionIdx];
  const feedbackBox = document.getElementById('game-feedback');

  feedbackBox.style.display = 'block';
  feedbackBox.innerText = selected.feedback;

  if (selected.correct) {
    feedbackBox.style.background = '#DCFCE7';
    feedbackBox.style.color = '#15803D';
    feedbackBox.style.border = '2px solid #86EFAC';
  } else {
    feedbackBox.style.background = '#FEE2E2';
    feedbackBox.style.color = '#991B1B';
    feedbackBox.style.border = '2px solid #FCA5A5';
  }
}

function closeGame() {
  document.getElementById('game-container').style.display = 'none';
}
