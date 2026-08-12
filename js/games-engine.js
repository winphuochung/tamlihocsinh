/* ==========================================================================
   Gamified Scenario Engine - Complete 5 Multi-Stage Games
   Trường THCS Phước Hưng - Xã Nhơn Hội - An Giang
   ========================================================================== */

const GAME_DATA = {
  school_violence: {
    key: "school_violence",
    title: "🛡️ Phòng Chống Bạo Lực Học Đường",
    badge: "Hiệp Sĩ An Toàn Trường Học 🛡️",
    thumb: "images/game-thumb-1.jpg",
    questions: [
      {
        question: "Tình huống 1: Trong giờ ra chơi, em thấy một nhóm bạn lớp trên đang vây quanh một bạn lớp 6, đe dọa và bắt nộp tiền tiêu vặt. Em sẽ làm gì?",
        options: [
          { text: "A. Lao vào đánh nhau với nhóm bạn lớp trên để bảo vệ bạn.", correct: false, feedback: "❌ Chưa an toàn! Việc lao vào mâu thuẫn trực tiếp có thể khiến em bị tổn thương. Hãy tìm sự hỗ trợ từ người lớn!" },
          { text: "B. Bỏ đi coi như không thấy gì vì sợ bị trả thù.", correct: false, feedback: "❌ Chưa tối ưu! Thờ ơ với bạo lực khiến kẻ xấu càng lấn tới. Chúng ta có kênh báo cáo ẩn danh an toàn!" },
          { text: "C. Báo ngay cho Cô Nguyễn Thị Ngọc Nga (TPT Đội) hoặc bảo vệ nhà trường.", correct: true, feedback: "🎉 CHÍNH XÁC! Đây là cách xử lý thông minh và an toàn nhất. Thầy cô sẽ bảo vệ danh tính của em!" }
        ]
      },
      {
        question: "Tình huống 2: Một bạn trong lớp liên tục bị cả nhóm tẩy chay, nói xấu và cô lập không cho chơi chung. Đây có phải là bạo lực học đường không?",
        options: [
          { text: "A. Có, đây là bạo lực tinh thần/tâm lý rất nguy hiểm.", correct: true, feedback: "🎉 CHÍNH XÁC! Bạo lực tinh thần gây tổn thương tâm lý sâu sắc không kém bạo lực thể xác." },
          { text: "B. Không, chỉ là đùa giỡn bình thường giữa các bạn.", correct: false, feedback: "❌ Chưa đúng! Cô lập và nói xấu kéo dài là hình thức bạo lực tinh thần nghiêm trọng." }
        ]
      },
      {
        question: "Tình huống 3: Khi bạn thân rủ em đi 'xử lý' một bạn khác để trả thù mâu thuẫn nhỏ, em sẽ phản ứng thế nào?",
        options: [
          { text: "A. Đi cùng bạn để thể hiện tình bạn thân thiết.", correct: false, feedback: "❌ Sai lầm! Tình bạn chân chính không bao giờ lôi kéo nhau vào hành vi vi phạm pháp luật." },
          { text: "B. Khuyên bạn dừng lại, lắng nghe mâu thuẫn và đề xuất gặp Cô Ngọc Nga tư vấn hòa giải.", correct: true, feedback: "🎉 CHÍNH XÁC! Em là một người bạn tuyệt vời khi biết ngăn chặn bạn mình phạm sai lầm!" }
        ]
      }
    ]
  },
  cyberbullying: {
    key: "cyberbullying",
    title: "🌐 Phòng Chống Bắt Nạt Mạng (Cyberbullying)",
    badge: "Dũng Sĩ An Ninh Mạng 🌐",
    thumb: "images/game-thumb-2.jpg",
    questions: [
      {
        question: "Tình huống 1: Em phát hiện có người lập tài khoản giả mạo hình ảnh của em trên Facebook/TikTok và đăng những lời lẽ xúc phạm. Em nên xử lý như thế nào?",
        options: [
          { text: "A. Đăng bài chửi bới lại người đó trên mạng xã hội.", correct: false, feedback: "❌ Không nên! Đáp trả tiêu cực chỉ khiến cuộc chiến mạng leo thang và làm ảnh hưởng hình ảnh của em." },
          { text: "B. Chụp màn hình bằng chứng, báo cáo tài khoản và chia sẻ với Cô TPT Đội.", correct: true, feedback: "🎉 CHÍNH XÁC! Chụp màn hình giữ lại bằng chứng và nhờ thầy cô hỗ trợ xử lý là quy trình chuẩn!" },
          { text: "C. Khóc một mình và khóa tài khoản vĩnh viễn.", correct: false, feedback: "❌ Em không hề có lỗi! Đừng gánh chịu một mình, luôn có thầy cô và gia đình bên cạnh em." }
        ]
      },
      {
        question: "Tình huống 2: Thấy một video ghép ảnh chế giễu bạn cùng trường trong nhóm chat, em nên làm gì?",
        options: [
          { text: "A. Tuyệt đối không chia sẻ, nhắn tin động viên bạn và báo cáo quản trị viên xóa bài.", correct: true, feedback: "🎉 CHÍNH XÁC! Không lan truyền tin độc hại là hành động văn minh bảo vệ bạn bè." },
          { text: "B. Nhấn thả icon cười và chia sẻ sang các nhóm khác.", correct: false, feedback: "❌ Tiếp tay cho bắt nạt mạng gây tổn thương nghiêm trọng cho nạn nhân!" }
        ]
      },
      {
        question: "Tình huống 3: Quy tắc an toàn thông tin cá nhân nào dưới đây giúp em tránh bị kẻ xấu hack tài khoản?",
        options: [
          { text: "A. Đặt mật khẩu dài có ký tự đặc biệt và tuyệt đối không chia sẻ mật khẩu cho ai.", correct: true, feedback: "🎉 CHÍNH XÁC! Mật khẩu cá nhân là chìa khóa bảo vệ quyền riêng tư trực tuyến của em." },
          { text: "B. Dùng ngày sinh nhật làm mật khẩu và cho bạn thân dùng chung.", correct: false, feedback: "❌ Rất dễ bị đoán và đánh mất tài khoản mạng xã hội!" }
        ]
      }
    ]
  },
  child_abuse: {
    key: "child_abuse",
    title: "🦺 Quy Tắc 5 Ngón Tay Bảo Vệ Cơ Thể",
    badge: "Chuyên Gia Bảo Vệ Cơ Thể 🛡️",
    thumb: "images/game-thumb-3.jpg",
    questions: [
      {
        question: "Tình huống 1: Một người quen của gia đình cố tình đụng chạm vào vùng đồ lót của em và dặn 'Đây là bí mật của hai chú cháu'. Em sẽ làm gì?",
        options: [
          { text: "A. Giữ bí mật vì sợ người đó giận.", correct: false, feedback: "❌ Tuyệt đối KHÔNG! Không ai có quyền xâm phạm vùng riêng tư của em. Đó không bao giờ là lỗi của em." },
          { text: "B. Hét to 'KHÔNG', bỏ chạy đến nơi đông người và kể ngay với bố mẹ/Cô TPT.", correct: true, feedback: "🎉 CHÍNH XÁC! Áp dụng quy tắc 5 ngón tay: Hét to, Bỏ chạy và Kể lại ngay với người tin cậy!" },
          { text: "C. Im lặng nhưng lần sau không gặp nữa.", correct: false, feedback: "❌ Chưa đủ! Em cần báo ngay cho người lớn để ngăn chặn hành vi nguy hiểm này lặp lại." }
        ]
      },
      {
        question: "Tình huống 2: Vùng đồ lót (vùng riêng tư) trên cơ thể em ai là người duy nhất có quyền bảo vệ và đồng ý cho phép chạm vào khi khám chữa bệnh?",
        options: [
          { text: "A. Chính bản thân em (và bác sĩ/bố mẹ khi chăm sóc sức khỏe).", correct: true, feedback: "🎉 CHÍNH XÁC! Cơ thể em là của em. Không ai được phép chạm vào vùng riêng tư nếu chưa được phép." },
          { text: "B. Bất kỳ người lớn nào trong xóm.", correct: false, feedback: "❌ Sai rồi! Tuyệt đối bảo vệ vùng riêng tư trước người lạ hay người quen!" }
        ]
      },
      {
        question: "Tình huống 3: Ngón tay út trong quy tắc 5 ngón tay tượng trưng cho ai?",
        options: [
          { text: "A. Người lạ hoàn toàn: Hạn chế tiếp xúc, không đi theo, không nhận quà.", correct: true, feedback: "🎉 CHÍNH XÁC! Ngón út đại diện cho người lạ - giữ khoảng cách an toàn!" },
          { text: "B. Ông bà cha mẹ ruột.", correct: false, feedback: "❌ Ngón cái mới là người thân thiết nhất trong gia đình!" }
        ]
      }
    ]
  },
  drowning_prevention: {
    key: "drowning_prevention",
    title: "🏊 An Toàn Vùng Sông Nước An Giang",
    badge: "Dũng Sĩ Sông Nước An Giang 🏊",
    thumb: "images/game-thumb-4.jpg",
    questions: [
      {
        question: "Tình huống 1: Em cùng các bạn đi học về qua kênh/sông ở xã Nhơn Hội. Một bạn rủ nhảy xuống tắm sông dù không ai biết bơi. Em xử lý ra sao?",
        options: [
          { text: "A. Nhảy xuống tắm cùng bạn vì thấy sông không sâu lắm.", correct: false, feedback: "❌ Rất nguy hiểm! Dòng nước sông An Giang có chảy xiết và hố sâu bất ngờ. Tuyệt đối không tắm sông tự do!" },
          { text: "B. Kiên quyết từ chối, giải thích nguy cơ đuối nước và rủ bạn về nhà.", correct: true, feedback: "🎉 CHÍNH XÁC! An toàn sông nước là ưu tiên số 1. Chỉ bơi ở bể bơi có người lớn giám sát!" },
          { text: "C. Đứng trên bờ cổ vũ bạn tắm.", correct: false, feedback: "❌ Nguy hiểm! Nếu bạn bị đuối nước em sẽ không kịp ứng cứu. Hãy ngăn bạn ngay từ đầu!" }
        ]
      },
      {
        question: "Tình huống 2: Nhìn thấy một người bạn bị sảy chân ngã xuống kênh chới với, em không biết bơi. Hành động đúng nhất là gì?",
        options: [
          { text: "A. Nhảy ngay xuống sông để cứu bạn.", correct: false, feedback: "❌ Tuyệt đối không nhảy xuống nếu không biết bơi/không có kỹ năng cứu đuối, vì sẽ đe dọa mạng sống của chính em!" },
          { text: "B. Hét to cầu cứu người lớn xung quanh, đưa cành cây hoặc ném can nhựa/phao cho bạn bám.", correct: true, feedback: "🎉 CHÍNH XÁC! Quy tắc vàng cứu đuối: Giữ an toàn cho bản thân, hô hoán người lớn và dùng vật nổi gián tiếp!" }
        ]
      },
      {
        question: "Tình huống 3: Khi tham gia giao thông đường thủy (đi đò/thuyền qua sông ở An Giang), quy tắc bắt buộc là gì?",
        options: [
          { text: "A. Mặc áo phao hoặc cầm dụng cụ nổi an toàn suốt chuyến đi.", correct: true, feedback: "🎉 CHÍNH XÁC! Luôn mặc áo phao đúng cách khi đi đò thuyền!" },
          { text: "B. Đứng sát mép đò đùa giỡn cho mát.", correct: false, feedback: "❌ Dễ sẩy chân lật đò gây tai nạn nghiêm trọng!" }
        ]
      }
    ]
  },
  mental_health: {
    key: "mental_health",
    title: "💖 Giải Tỏa Áp Lực Học Tập & Thi Cử",
    badge: "Bậc Thầy Cân Bằng Cảm Xúc 🧘",
    thumb: "images/game-thumb-5.jpg",
    questions: [
      {
        question: "Tình huống 1: Ngày mai có bài kiểm tra quan trọng nhưng em cảm thấy dồn dập, tim đập nhanh và không thể tập trung học tiếp. Em nên làm gì?",
        options: [
          { text: "A. Uống cà phê đậm đặc và thức trắng đêm học vẹt.", correct: false, feedback: "❌ Thức đêm làm brain kiệt sức, gây hoảng loạn khi vào phòng thi." },
          { text: "B. Dừng lại 10 phút, tập bài thở sâu 4-7-8, uống 1 ly nước ấm và đi ngủ sớm.", correct: true, feedback: "🎉 CHÍNH XÁC! Giữ cho tâm trí thư thái và ngủ đủ giấc giúp bộ nào ghi nhớ tốt gấp 3 lần!" },
          { text: "C. Bỏ thi luôn vì nghĩ mình chắc chắn làm không được.", correct: false, feedback: "❌ Đừng tự giảm giá trị bản thân! Hãy trò chuyện với AI hoặc Cô Nga để lấy lại tinh thần nhé!" }
        ]
      },
      {
        question: "Tình huống 2: Khi bị điểm kém một bài kiểm tra toán, cảm xúc tiêu cực ùa về khiến em nghĩ 'Mình thật kém cỏi'. Em hãy thay đổi tư duy thế nào?",
        options: [
          { text: "A. Tự nhủ: 'Điểm kém lần này chỉ là cơ hội để mình nhận ra chỗ hổng kiến thức và sửa lại tốt hơn'.", correct: true, feedback: "🎉 CHÍNH XÁC! Tư duy phát triển (Growth Mindset) giúp em kiên cường trước thất bại!" },
          { text: "B. Nhốt mình trong phòng và dằn vặt bản thân suốt tuần.", correct: false, feedback: "❌ Hãy cởi mở chia sẻ tâm sự với Cô Ngọc Nga để tìm cách gỡ rối nhé!" }
        ]
      },
      {
        question: "Tình huống 3: Phương pháp quản lý thời gian Pomodoro giúp giảm áp lực học tập thực hiện thế nào?",
        options: [
          { text: "A. Học tập trung 25 phút -> Thư giãn 5 phút -> Lặp lại.", correct: true, feedback: "🎉 CHÍNH XÁC! Phương pháp 25-5 giúp bộ não duy trì sự minh mẫn và không bị quá tải!" },
          { text: "B. Học liên tục 5 tiếng không nghỉ.", correct: false, feedback: "❌ Khiến bộ não bị kiệt sức và giảm hiệu suất học tập." }
        ]
      }
    ]
  }
};

let currentGameState = {
  gameKey: null,
  questionIndex: 0,
  score: 0,
  totalQuestions: 0
};

/**
 * BẮT ĐẦU TRÒ CHƠI KỸ NĂNG TƯƠNG TÁC (TÍCH HỢP NATIVE - CHUẨN MOBI/DESKTOP)
 */
function startGame(gameKey) {
  console.log("🎮 Đang mở Trò Chơi Kỹ Năng:", gameKey);
  const game = GAME_DATA[gameKey];
  if (!game) return;

  // 1. Tự động chuyển sang Tab Trò Chơi Kỹ Năng
  if (typeof switchTab === 'function') {
    switchTab('games');
  }

  currentGameState = {
    gameKey: gameKey,
    questionIndex: 0,
    score: 0,
    totalQuestions: game.questions.length
  };

  // 2. Ẩn danh sách thẻ game, Mở khung chơi game tích hợp
  const grid = document.getElementById('games-grid');
  if (grid) grid.style.display = 'none';

  const container = document.getElementById('game-container');
  if (container) {
    // Reset cấu trúc khung game
    document.getElementById('game-body').innerHTML = `
      <p id="game-question" style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 20px; line-height: 1.6; background: #F8F5FE; padding: 16px 20px; border-radius: var(--radius-md); border-left: 5px solid var(--primary-lavender);"></p>
      <div id="game-options" style="display: flex; flex-direction: column; gap: 12px;"></div>
      <div id="game-feedback" style="margin-top: 20px; padding: 18px; border-radius: var(--radius-md); display: none;"></div>
    `;

    container.style.display = 'block';
    renderCurrentQuestion();

    // Cuộn trang mượt về đúng đầu khung game
    setTimeout(() => {
      const yOffset = -80;
      const y = container.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 100);
  }
}

/**
 * RENDER CÂU HỎI HIỆN TẠI
 */
function renderCurrentQuestion() {
  const game = GAME_DATA[currentGameState.gameKey];
  const qData = game.questions[currentGameState.questionIndex];

  document.getElementById('game-title').innerText = `${game.title} (Câu ${currentGameState.questionIndex + 1}/${currentGameState.totalQuestions})`;
  document.getElementById('game-question').innerText = qData.question;

  const optionsBox = document.getElementById('game-options');
  optionsBox.innerHTML = '';

  qData.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'btn-clay-secondary';
    btn.style.textAlign = 'left';
    btn.style.padding = '14px 18px';
    btn.style.fontSize = '14px';
    btn.style.borderRadius = 'var(--radius-md)';
    btn.style.width = '100%';
    btn.style.whiteSpace = 'normal';
    btn.innerText = opt.text;
    btn.onclick = () => selectGameOption(idx);
    optionsBox.appendChild(btn);
  });

  const feedbackBox = document.getElementById('game-feedback');
  feedbackBox.style.display = 'none';
}

/**
 * XỬ LÝ KHI CHỌN ĐÁP ÁN
 */
function selectGameOption(optionIdx) {
  const game = GAME_DATA[currentGameState.gameKey];
  const qData = game.questions[currentGameState.questionIndex];
  const selected = qData.options[optionIdx];
  const feedbackBox = document.getElementById('game-feedback');

  // Vô hiệu hóa nút tạm thời
  const buttons = document.querySelectorAll('#game-options button');
  buttons.forEach(btn => btn.disabled = true);

  feedbackBox.style.display = 'block';

  if (selected.correct) {
    currentGameState.score += 10;
    feedbackBox.style.background = '#DCFCE7';
    feedbackBox.style.color = '#15803D';
    feedbackBox.style.border = '2px solid #86EFAC';
    feedbackBox.innerHTML = `${selected.feedback} <br><br><strong style="color:#059669;">+10 Điểm Kỹ Năng!</strong>`;
  } else {
    feedbackBox.style.background = '#FEE2E2';
    feedbackBox.style.color = '#991B1B';
    feedbackBox.style.border = '2px solid #FCA5A5';
    feedbackBox.innerHTML = selected.feedback;
  }

  // Bổ sung nút Tiếp Theo hoặc Hoàn Thành
  setTimeout(() => {
    let nextBtn = document.createElement('button');
    nextBtn.className = 'btn-clay';
    nextBtn.style.marginTop = '14px';
    nextBtn.style.width = '100%';
    nextBtn.style.justifyContent = 'center';

    if (currentGameState.questionIndex < currentGameState.totalQuestions - 1) {
      nextBtn.innerText = 'Tình Huống Tiếp Theo ➔';
      nextBtn.onclick = () => {
        currentGameState.questionIndex++;
        renderCurrentQuestion();
      };
    } else {
      nextBtn.innerText = '🏆 Xem Kết Quả & Nhận Huy Chương';
      nextBtn.onclick = finishGame;
    }
    feedbackBox.appendChild(nextBtn);
  }, 300);
}

/**
 * HOÀN THÀNH TRÒ CHƠI & TRAO HUY CHƯƠNG KỸ NĂNG
 */
async function finishGame() {
  const game = GAME_DATA[currentGameState.gameKey];
  const maxScore = currentGameState.totalQuestions * 10;
  const score = currentGameState.score;

  const gameBody = document.getElementById('game-body');
  gameBody.innerHTML = `
    <div style="text-align: center; padding: 24px;">
      <div style="font-size: 64px; margin-bottom: 12px;">🏆</div>
      <h3 style="font-size: 22px; font-weight: 800; color: var(--primary-lavender); margin-bottom: 8px;">Chúc Mừng Em Hoàn Thành Thử Thách!</h3>
      <p style="font-size: 15px; color: var(--text-main); margin-bottom: 16px;">Em đã đạt <strong>${score} / ${maxScore} Điểm Kỹ Năng</strong></p>
      
      <div style="background: linear-gradient(135deg, #FFF4D9 0%, #FFEBEF 100%); border: 3px dashed #F59E0B; padding: 16px; border-radius: var(--radius-md); display: inline-block; margin-bottom: 24px;">
        <span style="font-size: 13px; color: #B45309; font-weight: 700;">Huy Chương Vinh Danh:</span>
        <h4 style="font-size: 18px; color: #D97706; font-weight: 800; margin-top: 4px;">${game.badge}</h4>
      </div>

      <div style="display: flex; gap: 12px; justify-content: center;">
        <button class="btn-clay-secondary" onclick="startGame('${currentGameState.gameKey}')">🔄 Chơi Lại</button>
        <button class="btn-clay" onclick="closeGame()">🎮 Chọn Trò Chơi Khác</button>
      </div>
    </div>
  `;

  // Lưu điểm vào Supabase Cloud nếu có kết nối
  if (typeof getActiveSupabaseClient === 'function') {
    const client = getActiveSupabaseClient();
    if (client) {
      try {
        await client.from('game_logs').insert([{
          game_category: game.key,
          score: score,
          badge_earned: game.badge
        }]);
        console.log("🟢 Đã lưu kết quả chơi game lên Supabase!");
      } catch (err) {}
    }
  }
}

function closeGame() {
  const container = document.getElementById('game-container');
  if (container) container.style.display = 'none';

  const grid = document.getElementById('games-grid');
  if (grid) grid.style.display = 'grid';

  // Reset game body
  document.getElementById('game-body').innerHTML = `
    <p id="game-question" style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 20px; line-height: 1.6; background: #F8F5FE; padding: 16px 20px; border-radius: var(--radius-md); border-left: 5px solid var(--primary-lavender);"></p>
    <div id="game-options" style="display: flex; flex-direction: column; gap: 12px;"></div>
    <div id="game-feedback" style="margin-top: 20px; padding: 18px; border-radius: var(--radius-md); display: none;"></div>
  `;
}
