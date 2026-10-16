/* ==========================================================================
   Gamified Scenario Engine - Complete 5 Multi-Stage Games
   Trường Tiểu học và THCS Phước Hưng - Xã Nhơn Hội - An Giang
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
          { text: "C. Báo ngay cho Giáo viên tư vấn tâm lí hoặc bảo vệ nhà trường.", correct: true, feedback: "🎉 CHÍNH XÁC! Đây là cách xử lý thông minh và an toàn nhất. Thầy cô sẽ bảo vệ danh tính của em!" }
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
          { text: "B. Khuyên bạn dừng lại, lắng nghe mâu thuẫn và đề xuất gặp Giáo viên tư vấn tâm lí để hòa giải.", correct: true, feedback: "🎉 CHÍNH XÁC! Em là một người bạn tuyệt vời khi biết ngăn chặn bạn mình phạm sai lầm!" }
        ]
      },
      {
        question: "Tình huống 4: Thấy hai bạn trong lớp hẹn nhau ra ngoài cổng trường sau giờ học để 'quyết đấu', em sẽ làm gì?",
        options: [
          { text: "A. Ra xem và hò reo cổ vũ.", correct: false, feedback: "❌ Cổ vũ bạo lực là hành vi vi phạm nội quy nhà trường và tiếp tay cho nguy hiểm!" },
          { text: "B. Khuyên can hai bạn và báo ngay cho Giáo viên chủ nhiệm hoặc Giáo viên tư vấn tâm lí.", correct: true, feedback: "🎉 CHÍNH XÁC! Kịp thời báo tin sẽ ngăn chặn những chấn thương đáng tiếc xảy ra!" }
        ]
      },
      {
        question: "Tình huống 5: Em bị một nhóm bạn vô cớ chặn đường đe dọa, đòi tiền hoặc bắt làm giúp bài tập. Em nên ứng phó ra sao?",
        options: [
          { text: "A. Giữ bình tĩnh, không thỏa hiệp, di chuyển đến chỗ đông người và báo ngay cho nhà trường/gia đình.", correct: true, feedback: "🎉 CHÍNH XÁC! Không im lặng chịu đựng kẻ bắt nạt là chìa khóa để bảo vệ bản thân!" },
          { text: "B. Lặng lẽ đưa tiền cho yên chuyện.", correct: false, feedback: "❌ Nhượng bộ sẽ khiến đối phương tiếp tục hạch sách và bắt nạt em nhiều lần sau!" }
        ]
      },
      {
        question: "Tình huống 6: Một bạn học bị người khác quay lén video xô xát và dọa đăng lên mạng nếu không nộp tiền. Bạn ấy rất sợ hãi. Em giúp bạn thế nào?",
        options: [
          { text: "A. Động viên bạn bình tĩnh và cùng bạn đến gặp Giáo viên tư vấn tâm lí để nhà trường bảo vệ và xử lý kẻ tống tiền.", correct: true, feedback: "🎉 CHÍNH XÁC! Hành vi cưỡng đoạt, tống tiền là vi phạm pháp luật nghiêm trọng, nhà trường sẽ can thiệp ngay!" },
          { text: "B. Khuyên bạn vay tiền nộp cho xong.", correct: false, feedback: "❌ Tống tiền sẽ không dừng lại nếu em tiếp tục nộp tiền cho kẻ xấu!" }
        ]
      },
      {
        question: "Tình huống 7: Một bạn học thường xuyên bị bạn cùng bàn cố tình giấu cặp sách, ném dép, phá hoại đồ dùng học tập. Đây là loại bạo lực nào?",
        options: [
          { text: "A. Bạo lực tài sản & phá hoại đồ dùng cá nhân.", correct: true, feedback: "🎉 CHÍNH XÁC! Cố ý phá hoại đồ dùng học tập của bạn là một hình thức bạo lực học đường!" },
          { text: "B. Trò đùa trêu ghẹo vô hại giữa bạn bè.", correct: false, feedback: "❌ Nếu hành vi gây tổn thất tài sản và khiến bạn ức chế thì không phải là trò đùa!" }
        ]
      },
      {
        question: "Tình huống 8: Trong lớp có bạn hay bị đặt biệt danh miệt thị ngoại hình (body shaming) hoặc hoàn cảnh gia đình. Em nên có thái độ thế nào?",
        options: [
          { text: "A. Nhắc nhở các bạn dừng lại, đồng thời kết bạn và trò chuyện thân thiện với bạn ấy.", correct: true, feedback: "🎉 CHÍNH XÁC! Sự cảm thông và đồng hành của em giúp bạn vượt qua sự tự ti!" },
          { text: "B. Hùa theo gán ghép biệt danh cho vui.", correct: false, feedback: "❌ Đặt biệt danh miệt thị làm tổn thương sâu sắc lòng tự trọng của bạn!" }
        ]
      },
      {
        question: "Tình huống 9: Khi em gặp mâu thuẫn tức giận với bạn cùng lớp và thấy lồng ngực nóng lên muốn dùng nắm đấm, em làm gì?",
        options: [
          { text: "A. Hít một hơi thật sâu, đếm từ 1 đến 10, bước ra khỏi chỗ đó và tìm người tư vấn.", correct: true, feedback: "🎉 CHÍNH XÁC! Kiểm soát cơn giận 5 giây đầu giúp em tránh khỏi những hối hận về sau!" },
          { text: "B. Xung đột ngay lập tức để không bị coi là yếu thế.", correct: false, feedback: "❌ Dùng bạo lực giải quyết mâu thuẫn chỉ tạo ra thêm nhiều bạo lực!" }
        ]
      },
      {
        question: "Tình huống 10: Lớp em muốn xây dựng phong trào 'Lớp Học Hạnh Phúc - Không Bạo Lực'. Em có thể đóng góp gì?",
        options: [
          { text: "A. Tích cực tham gia các buổi sinh hoạt Đội, lắng nghe giúp đỡ bạn bè và lan tỏa yêu thương.", correct: true, feedback: "🎉 CHÍNH XÁC! Em chính là một đại sứ hòa bình tuyệt vời của Tiểu học và THCS Phước Hưng!" },
          { text: "B. Chỉ quan tâm đến bản thân mình, không cần tham gia hoạt động tập thể.", correct: false, feedback: "❌ Sự đoàn kết của tập thể là sức mạnh ngăn chặn mọi hành vi bạo lực học đường!" }
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
          { text: "B. Chụp màn hình bằng chứng, báo cáo tài khoản và chia sẻ với Giáo viên tư vấn tâm lí.", correct: true, feedback: "🎉 CHÍNH XÁC! Chụp màn hình giữ lại bằng chứng và nhờ thầy cô hỗ trợ xử lý là quy trình chuẩn!" },
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
      },
      {
        question: "Tình huống 4: Nhận được tin nhắn từ tài khoản lạ đe dọa tung hình ảnh nhạy cảm/chế giễu của em nếu không chuyển tiền hoặc nạp thẻ game. Em xử lý sao?",
        options: [
          { text: "A. Tuyệt đối không nạp tiền, chụp ảnh màn hình làm bằng chứng và báo ngay cho cha mẹ/thầy cô.", correct: true, feedback: "🎉 CHÍNH XÁC! Kẻ tống tiền trực tuyến sẽ tiếp tục đe dọa nếu em nộp tiền. Hãy để người lớn bảo vệ em!" },
          { text: "B. Lo sợ và tìm cách vay tiền nạp theo yêu cầu.", correct: false, feedback: "❌ Thỏa hiệp với kẻ xấu trên mạng chỉ khiến em rơi vào bẫy nguy hiểm hơn!" }
        ]
      },
      {
        question: "Tình huống 5: Bạn thân của em bị 'bão phẫn nộ' và vô số bình luận công kích từ những người không quen biết dưới một bài viết Facebook. Em giúp bạn thế nào?",
        options: [
          { text: "A. Khuyên bạn tạm thời ẩn bài viết, khóa bình luận lạ và rời xa mạng xã hội vài ngày.", correct: true, feedback: "🎉 CHÍNH XÁC! Ngắt kết nối với năng lượng độc hại giúp tinh thần bạn ổn định trở lại!" },
          { text: "B. Nhảy vào chửi nhau với từng người bình luận tiêu cực.", correct: false, feedback: "❌ Tranh cãi với cộng đồng mạng độc hại chỉ làm ngọn lửa tấn công bạn em thêm bùng cháy!" }
        ]
      },
      {
        question: "Tình huống 6: Khi muốn bình luận ý kiến cá nhân dưới bài đăng của bạn bè hoặc người khác trên mạng xã hội, em cần chú ý điều gì?",
        options: [
          { text: "A. Tôn trọng người đọc, dùng từ ngữ lịch sự, không lăng mạ hay dùng từ thô tục.", correct: true, feedback: "🎉 CHÍNH XÁC! Bình luận văn minh thể hiện nét đẹp văn hóa của học sinh Tiểu học và THCS Phước Hưng!" },
          { text: "B. Thoải mái chửi bới vì mạng xã hội là ảo, không ai làm gì được mình.", correct: false, feedback: "❌ Luật An ninh mạng xử phạt rất nghiêm các hành vi xúc phạm danh dự người khác trên internet!" }
        ]
      },
      {
        question: "Tình huống 7: Một bạn rủ em tham gia nhóm chat kín có tên 'Bóc phốt thầy cô và các bạn trong trường'. Em phản ứng ra sao?",
        options: [
          { text: "A. Từ chối tham gia, khuyên bạn dừng lại và báo cáo với Giáo viên tư vấn tâm lí để ngăn chặn tin độc hại.", correct: true, feedback: "🎉 CHÍNH XÁC! Nói 'Không' với các hội nhóm nói xấu giúp môi trường học đường luôn lành mạnh!" },
          { text: "B. Tham gia ngay để hóng hớt thông tin giật gân.", correct: false, feedback: "❌ Tham gia nhóm bóc phốt khiến em dễ bị lôi kéo vào hành vi vu khống bạn bè!" }
        ]
      },
      {
        question: "Tình huống 8: Em nhận được đường link lạ gửi qua Messenger thông báo 'Bạn đã trúng thưởng 5.000 kim cương Free Fire, hãy nhấp vào để nhận'. Em làm gì?",
        options: [
          { text: "A. Cảnh giác không bấm vào link, xóa tin nhắn và báo cho bạn bè tránh bẫy lừa đảo.", correct: true, feedback: "🎉 CHÍNH XÁC! Các đường link trúng thưởng giả mạo nhằm chiếm đoạt tài khoản của em!" },
          { text: "B. Nhấp ngay vào link và nhập tài khoản mật khẩu để nhận quà.", correct: false, feedback: "❌ Nhập tài khoản vào link lạ sẽ bị cướp mất nick game và tài khoản mạng xã hội!" }
        ]
      },
      {
        question: "Tình huống 9: Một bạn học bị lộ địa chỉ nhà và số điện thoại trên mạng, bị nhiều số lạ gọi điện nhắn tin quấy rối ban đêm. Em khuyên bạn thế nào?",
        options: [
          { text: "A. Bật chế độ chặn cuộc gọi số lạ, thông báo với cha mẹ và nhờ công an địa phương hỗ trợ.", correct: true, feedback: "🎉 CHÍNH XÁC! Khi bị quấy rối thông tin cá nhân, cần sự bảo vệ từ gia đình và cơ quan chức năng!" },
          { text: "B. Nhắn tin chửi lại từng số điện thoại quấy rối.", correct: false, feedback: "❌ Đáp trả số lạ chỉ khiến họ tiếp tục làm phiền em nhiều hơn!" }
        ]
      },
      {
        question: "Tình huống 10: Làm thế nào để trở thành một 'Công Dân Số Văn Minh' tại Tiểu học và THCS Phước Hưng?",
        options: [
          { text: "A. Chia sẻ thông tin tích cực, kiểm chứng tin tức trước khi đăng và bảo vệ bạn bè trên mạng.", correct: true, feedback: "🎉 CHÍNH XÁC! Em là tấm gương sáng về văn hóa ứng xử trên không gian mạng!" },
          { text: "B. Đăng các tin đồn chưa kiểm chứng để thu hút lượt like và view.", correct: false, feedback: "❌ Lan truyền tin giả gây ảnh hưởng xấu đến uy tín của cá nhân và nhà trường!" }
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
          { text: "B. Hét to 'KHÔNG', bỏ chạy đến nơi đông người và kể ngay với bố mẹ/Giáo viên tư vấn tâm lí.", correct: true, feedback: "🎉 CHÍNH XÁC! Áp dụng quy tắc 5 ngón tay: Hét to, Bỏ chạy và Kể lại ngay với người tin cậy!" },
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
      },
      {
        question: "Tình huống 4: Một người lạ đi xe máy dừng lại trước cổng trường, xưng là bạn của bố mẹ và rủ em lên xe để chở về nhà cho kẹo/đồ chơi. Em làm gì?",
        options: [
          { text: "A. Lên xe ngay vì muốn được cho quà.", correct: false, feedback: "❌ Cực kỳ nguy hiểm! Tuyệt đối không lên xe với người lạ vì nguy cơ bị bắt cóc/xâm hại rất cao!" },
          { text: "B. Từ chối thẳng thắn 'Cháu không đi đâu', lùi lại xa xe và chạy vào cổng trường báo bác bảo vệ.", correct: true, feedback: "🎉 CHÍNH XÁC! Luôn giữ khoảng cách an toàn với người lạ và nhờ sự giúp đỡ của bảo vệ!" }
        ]
      },
      {
        question: "Tình huống 5: Một người quen ép em ngồi vào lòng, cố tình đùi/ngực và ôm hôn khiến em thấy rất khó chịu. Em ứng phó thế nào?",
        options: [
          { text: "A. Đẩy người đó ra, nói to 'Cháu không thích', di chuyển ngay tới chỗ đông người và báo cha mẹ.", correct: true, feedback: "🎉 CHÍNH XÁC! Em có quyền từ chối mọi hành vi đụng chạm làm em cảm thấy bất an!" },
          { text: "B. Cố gắng chịu đựng vì đó là người lớn trong quen biết.", correct: false, feedback: "❌ Dù là người quen hay họ hàng, không ai được phép có hành vi xâm phạm cơ thể em!" }
        ]
      },
      {
        question: "Tình huống 6: Ngón cái trong Quy tắc 5 ngón tay đại diện cho những ai?",
        options: [
          { text: "A. Người thân ruột thịt (Bố mẹ, ông bà, anh chị em ruột).", correct: true, feedback: "🎉 CHÍNH XÁC! Ngón cái là ôm hôn, chăm sóc chỉ dành cho người thân ruột thịt!" },
          { text: "B. Thầy cô giáo và bạn bè cùng lớp.", correct: false, feedback: "❌ Thầy cô bạn bè thuộc ngón trỏ và ngón giữa (nắm tay, khoác vai)!" }
        ]
      },
      {
        question: "Tình huống 7: Thấy một bạn học bị người lạ lôi kéo ép đi vào khu vực nhà vệ sinh vắng vẻ ở công viên. Em làm gì?",
        options: [
          { text: "A. Hô to 'Cứu với', chạy gọi thầy cô hoặc người lớn xung quanh đến ứng cứu ngay lập tức.", correct: true, feedback: "🎉 CHÍNH XÁC! Hô hoán kéo sự chú ý của đám đông là cách cứu bạn an toàn hiệu quả!" },
          { text: "B. Một mình chạy lao vào đánh người lạ.", correct: false, feedback: "❌ Em còn nhỏ, đối đầu trực tiếp với người lạ có thể nguy hiểm cho cả hai bạn. Hãy gọi người lớn!" }
        ]
      },
      {
        question: "Tình huống 8: Ai đó trên mạng nhắn tin yêu cầu em chụp và gửi hình ảnh/video không mặc quần áo của em để đổi lấy tài khoản game hay tiền bạc. Em làm gì?",
        options: [
          { text: "A. Tuyệt đối không chụp gửi, chặn tài khoản đó và báo ngay cho cha mẹ/Giáo viên tư vấn tâm lí.", correct: true, feedback: "🎉 CHÍNH XÁC! Yêu cầu gửi ảnh nhạy cảm là hành vi dụ dỗ xâm hại trẻ em qua mạng!" },
          { text: "B. Chụp gửi vì nghĩ chỉ có 1 tấm ảnh không sao.", correct: false, feedback: "❌ Kẻ xấu sẽ dùng hình ảnh đó để đe dọa tống tiền và xâm hại em kéo dài!" }
        ]
      },
      {
        question: "Tình huống 9: Số điện thoại Tổng đài quốc gia bảo vệ trẻ em tại Việt Nam trực 24/7 hoàn toàn miễn phí là số mấy?",
        options: [
          { text: "A. Tổng đài 111.", correct: true, feedback: "🎉 CHÍNH XÁC! Hãy ghi nhớ số 111 - Nơi tư vấn và bảo vệ trẻ em mọi lúc mọi nơi!" },
          { text: "B. Tổng đài 113.", correct: false, feedback: "❌ 113 là Cảnh sát phản ứng nhanh. 111 mới là Tổng đài chuyên trách Bảo vệ Trẻ em!" }
        ]
      },
      {
        question: "Tình huống 10: Em nghi ngờ một bạn cùng xóm đang bị hành hạ, đánh đập hoặc có dấu hiệu bị xâm hại gia đình. Em hỗ trợ bạn thế nào?",
        options: [
          { text: "A. Báo ẩn danh cho Giáo viên tư vấn tâm lí, Trưởng ấp hoặc gọi Tổng đài 111 để các cơ quan chuyên trách bảo vệ bạn.", correct: true, feedback: "🎉 CHÍNH XÁC! Sự dũng cảm lên tiếng của em có thể cứu sống một cuộc đời bạn nhỏ!" },
          { text: "B. Bỏ qua vì nghĩ đó là chuyện riêng của gia đình bạn.", correct: false, feedback: "❌ Bảo vệ trẻ em khỏi xâm hại bạo hành là trách nhiệm chung của toàn xã hội!" }
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
      },
      {
        question: "Tình huống 4: Em đi bơi ở sông/kênh thấy biển báo 'Cảnh báo: Khu vực nước sâu, dòng chảy xoáy nguy hiểm'. Em xử lý thế nào?",
        options: [
          { text: "A. Tuyệt đối không xuống tắm hay đứng sát mép nước sạt lở.", correct: true, feedback: "🎉 CHÍNH XÁC! Tuân thủ biển cảnh báo giúp em tránh xa các vũng xoáy nguy hiểm!" },
          { text: "B. Nhảy xuống bơi thử xem chảy xiết thế nào.", correct: false, feedback: "❌ Dòng nước xoáy có sức cuốn rất mạnh, ngay cả người bơi giỏi cũng dễ bị đuối sức!" }
        ]
      },
      {
        question: "Tình huống 5: Khi đang bơi ở hồ bơi/sông, em đột nhiên bị chuột rút (co rút cơ chân) rất đau đớn. Em phải làm gì?",
        options: [
          { text: "A. Giữ bình tĩnh, thả nổi ngửa bụng trên mặt nước, hít sâu và hô to nhờ hỗ trợ.", correct: true, feedback: "🎉 CHÍNH XÁC! Bình tĩnh thả nổi giúp tiết kiệm sức lực trong khi chờ cứu hộ!" },
          { text: "B. Hoảng loạn đập tay chân liên tục để bơi vào bờ.", correct: false, feedback: "❌ Đập tay chân hoảng loạn sẽ khiến cơ thể chìm nhanh hơn và cạn kiệt oxy!" }
        ]
      },
      {
        question: "Tình huống 6: Bạn học vừa được người lớn cứu vớt từ dưới sông lên bờ, bạn đang trong tình trạng bất tỉnh không thở. Bước sơ cứu đúng là gì?",
        options: [
          { text: "A. Hô hoán gọi cấp cứu 115/y tế, kiểm tra đường thở và tiến hành ép tim hà hơi thổi nạt nếu có kỹ năng.", correct: true, feedback: "🎉 CHÍNH XÁC! Sơ cứu ngừng tuần hoàn ngay trên bờ là chìa khóa vàng sống còn của nạn nhân!" },
          { text: "B. Vác bạn lên vai chạy nhảy để xóc nước ra ngoài.", correct: false, feedback: "❌ Phương pháp vác xóc nước đã bị y tế bác bỏ vì làm chậm thời gian cấp cứu oxy cho não!" }
        ]
      },
      {
        question: "Tình huống 7: Vào mùa nước nổi tại An Giang, các bạn rủ em tự ý chèo xuồng đi giăng lưới/bắt cá một mình mà không có người lớn. Em phản ứng sao?",
        options: [
          { text: "A. Từ chối đi và khuyên các bạn không tự ý chèo xuồng ra vùng nước sâu khi thiếu người lớn.", correct: true, feedback: "🎉 CHÍNH XÁC! Mùa nước nổi sông nước dâng cao, tự ý chèo xuồng rất dễ bị lật đò đuối nước!" },
          { text: "B. Đi cùng ngay vì nghĩ mình chèo xuồng giỏi.", correct: false, feedback: "❌ Gió to và sóng nước dâng mùa lũ có thể làm lật xuồng bất cứ lúc nào!" }
        ]
      },
      {
        question: "Tình huống 8: Sau trận mưa lớn, trước cổng trường có cột điện bị hỏng rơi dây điện xuống vũng nước mưa dềnh lên. Em làm gì?",
        options: [
          { text: "A. Tránh xa vũng nước, cảnh báo các bạn khác không lại gần và báo bác bảo vệ/thầy cô.", correct: true, feedback: "🎉 CHÍNH XÁC! Nước dẫn điện cực tốt, tránh xa nguy cơ rò rỉ điện tai nạn thương tích!" },
          { text: "B. Lội qua vũng nước xem có bị giật không.", correct: false, feedback: "❌ Điện rò vào nước có thể gây giật điện tử vong ngay lập tức!" }
        ]
      },
      {
        question: "Tình huống 9: Khi trường tổ chức cắm trại dã ngoại gần khu vực hồ thủy lợi hoặc bờ sông, em cần tuân thủ quy tắc gì?",
        options: [
          { text: "A. Đi theo đoàn, mang áo phao khi gần bờ nước và tuyệt đối không tự ý tách đoàn xuống bơi.", correct: true, feedback: "🎉 CHÍNH XÁC! Kỷ luật tập thể giữ an toàn cho em và các bạn!" },
          { text: "B. Rủ nhóm bạn rẽ vào khu vực cấm bơi để chụp ảnh.", correct: false, feedback: "❌ Tách đoàn rẽ vào vùng vắng nguy cơ trượt chân rơi xuống hố sâu!" }
        ]
      },
      {
        question: "Tình huống 10: Dụng cụ tự chế nào đơn giản ở vùng sông nước An Giang có thể dùng làm phao cứu người đuối nước tạm thời?",
        options: [
          { text: "A. Can nhựa rỗng đậy chặt nắp buộc dây, bẹ chuối, trái dừa khô, thùng xốp.", correct: true, feedback: "🎉 CHÍNH XÁC! Can nhựa nắp kín chứa không khí là phao cứu sinh tuyệt vời ở vùng nông thôn!" },
          { text: "B. Cặp sách nặng chứa nhiều sách vở.", correct: false, feedback: "❌ Sách vở ngấm nước sẽ nặng và chìm nhanh hơn!" }
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
          { text: "C. Bỏ thi luôn vì nghĩ mình chắc chắn làm không được.", correct: false, feedback: "❌ Đừng tự giảm giá trị bản thân! Hãy trò chuyện với AI hoặc Giáo viên tư vấn tâm lí để lấy lại tinh thần nhé!" }
        ]
      },
      {
        question: "Tình huống 2: Khi bị điểm kém một bài kiểm tra toán, cảm xúc tiêu cực ùa về khiến em nghĩ 'Mình thật kém cỏi'. Em hãy thay đổi tư duy thế nào?",
        options: [
          { text: "A. Tự nhủ: 'Điểm kém lần này chỉ là cơ hội để mình nhận ra chỗ hổng kiến thức và sửa lại tốt hơn'.", correct: true, feedback: "🎉 CHÍNH XÁC! Tư duy phát triển (Growth Mindset) giúp em kiên cường trước thất bại!" },
          { text: "B. Nhốt mình trong phòng và dằn vặt bản thân suốt tuần.", correct: false, feedback: "❌ Hãy cởi mở chia sẻ tâm sự với Giáo viên tư vấn tâm lí để tìm cách gỡ rối nhé!" }
        ]
      },
      {
        question: "Tình huống 3: Phương pháp quản lý thời gian Pomodoro giúp giảm áp lực học tập thực hiện thế nào?",
        options: [
          { text: "A. Học tập trung 25 phút -> Thư giãn 5 phút -> Lặp lại.", correct: true, feedback: "🎉 CHÍNH XÁC! Phương pháp 25-5 giúp bộ não duy trì sự minh mẫn và không bị quá tải!" },
          { text: "B. Học liên tục 5 tiếng không nghỉ.", correct: false, feedback: "❌ Khiến bộ não bị kiệt sức và giảm hiệu suất học tập." }
        ]
      },
      {
        question: "Tình huống 4: Cha mẹ đặt kỳ vọng quá cao vào kỳ thi tuyển sinh khiến em luôn sống trong sợ hãi làm cha mẹ thất vọng. Em nên làm gì?",
        options: [
          { text: "A. Trò chuyện chân thành với cha mẹ về khả năng và áp lực của em, hoặc nhờ Giáo viên tư vấn tâm lí hỗ trợ cầu nối.", correct: true, feedback: "🎉 CHÍNH XÁC! Sự chia sẻ gia đình giúp cha mẹ hiểu và giảm áp lực cho em!" },
          { text: "B. Giấu kín cảm xúc tiêu cực và tự dằn vặt bản thân.", correct: false, feedback: "❌ Đồn nén cảm xúc kéo dài có thể dẫn tới trầm cảm học đường nghiêm trọng!" }
        ]
      },
      {
        question: "Tình huống 5: Học liên tục 4 tiếng đồng hồ khiến mắt mỏi, đầu óc căng như dây đàn và không thể nạp thêm kiến thức. Em xử lý sao?",
        options: [
          { text: "A. Dừng lại 15 phút, vươn vai vận động nhẹ, uống nước và nhìn ra mảng xanh cây cối.", correct: true, feedback: "🎉 CHÍNH XÁC! Nghỉ ngơi ngắn tái tạo năng lượng giúp bộ não hoạt động hiệu quả hơn!" },
          { text: "B. Cố gắng nhồi nhét tiếp bằng cách dùng nước bôi vào mắt cho tỉnh.", correct: false, feedback: "❌ Bộ não đã quá tải sẽ không thể ghi nhớ hiệu quả khi bị ép buộc!" }
        ]
      },
      {
        question: "Tình huống 6: Khi thấy các bạn xung quanh đều giỏi giang và học thêm nhiều nơi, em cảm thấy mình thua kém ('con nhà người ta'). Em lấy lại tự tin bằng cách nào?",
        options: [
          { text: "A. Ngừng so sánh bản thân với người khác, tập trung vào điểm mạnh và sự tiến bộ từng ngày của chính mình.", correct: true, feedback: "🎉 CHÍNH XÁC! Mỗi người đều có một lộ trình phát triển riêng biệt!" },
          { text: "B. Tự trách bản thân lười biếng và rơi vào tự ti mặc cảm.", correct: false, feedback: "❌ So sánh tiêu cực chỉ làm triệt hạ sự tự tin của em!" }
        ]
      },
      {
        question: "Tình huống 7: Ban đêm em thường xuyên trằn trọc mất ngủ vì suy nghĩ lo lắng 'Nếu thi trượt thì sao?'. Làm sao để có giấc ngủ ngon?",
        options: [
          { text: "A. Không dùng điện thoại trước khi ngủ 1 tiếng, đọc vài trang sách nhẹ nhàng và hít thở sâu.", correct: true, feedback: "🎉 CHÍNH XÁC! Ánh sáng xanh điện thoại là kẻ thù gây mất ngủ đêm thi!" },
          { text: "B. Lướt TikTok/Facebook đến 2h sáng cho quên lo lắng.", correct: false, feedback: "❌ Thức khuya lướt điện thoại làm bộ não mệt mỏi và lo âu tăng gấp đôi!" }
        ]
      },
      {
        question: "Tình huống 8: Lịch học thêm và làm bài tập quá dày đặc khiến em không còn thời gian nghỉ ngơi hay vui chơi thể thao. Em giải quyết ra sao?",
        options: [
          { text: "A. Lập thời khóa biểu khoa học, thảo luận với gia đình để cắt giảm bớt các lớp học thêm không cần thiết.", correct: true, feedback: "🎉 CHÍNH XÁC! Cân bằng giữa học tập và giải trí thể thao là bí quyết giữ tinh thần minh mẫn!" },
          { text: "B. Bỏ ăn bỏ ngủ để hoàn thành hết bài tập.", correct: false, feedback: "❌ Bỏ ăn bỏ ngủ gây suy nhược cơ thể trước kỳ thi!" }
        ]
      },
      {
        question: "Tình huống 9: Trong phòng thi, em gặp một câu hỏi quá khó và bắt đầu hoảng loạn, mồ hôi tay ra nhiều. Cách trấn an bản thân tốt nhất là gì?",
        options: [
          { text: "A. Đặt bút xuống, nhắm mắt lại hít thở sâu 3 nhịp, tự nhủ 'Bình tĩnh, mình sẽ làm các câu dễ trước'.", correct: true, feedback: "🎉 CHÍNH XÁC! Phương pháp làm câu dễ trước giúp em lấy lại sự tự tin trong phòng thi!" },
          { text: "B. Cố gắng cắn bút vò đầu bứt tóc trong hoảng loạn.", correct: false, feedback: "❌ Hoảng loạn làm bộ não bị đóng băng không nhớ được kiến thức đã học!" }
        ]
      },
      {
        question: "Tình huống 10: Kênh hỗ trợ tâm lý giải tỏa áp lực thi cử ẩn danh an toàn nhất dành cho học sinh Tiểu học và THCS Phước Hưng là gì?",
        options: [
          { text: "A. Sử dụng Trợ lý AI 24/7 hoặc Đặt lịch hẹn ẩn danh với Giáo viên tư vấn tâm lí trên website.", correct: true, feedback: "🎉 CHÍNH XÁC! Giáo viên tư vấn tâm lí và Trợ lý AI luôn sẵn sàng đồng hành chia sẻ mọi lo âu cùng em!" },
          { text: "B. Giấu kín trong lòng không bao giờ tâm sự với ai.", correct: false, feedback: "❌ Chia sẻ lo âu là bước đầu tiên để em giải tỏa 100% áp lực tinh thần!" }
        ]
      }
    ]
  },
  kid_safety_lost: {
    key: "kid_safety_lost",
    title: "🎒 An Toàn Khi Tan Trường & Phòng Tránh Thất Lạc",
    badge: "Bé An Toàn Khi Đến Trường 🎒",
    thumb: "images/game-thumb-1.jpg",
    questions: [
      {
        question: "Tình huống 1: Giờ tan học, bé đứng trước cổng trường chờ nhưng chưa thấy ba mẹ đến đón. Một người lạ chạy xe máy lại nói: 'Ba con bị bận nhờ chú đến đón về, lên xe chú chở'. Bé nên làm gì?",
        options: [
          { text: "A. Tuyệt đối không lên xe, chạy ngay vào phòng bảo vệ hoặc gặp thầy cô báo tin.", correct: true, feedback: "🎉 CHÍNH XÁC! Tuyệt đối không bao giờ đi theo người lạ dù họ nói bất cứ lý do gì!" },
          { text: "B. Lên xe ngay để về nhà cho kịp giờ xem phim hoạt hình.", correct: false, feedback: "❌ Rất nguy hiểm! Đây là thủ đoạn kẻ xấu thường dùng để dụ dỗ và bắt cóc trẻ em!" }
        ]
      },
      {
        question: "Tình huống 2: Khi đi siêu thị hoặc chợ đông người cùng cha mẹ, bé mải xem đồ chơi và bị lạc mất gia đình. Bé cần tìm ai để nhờ trợ giúp?",
        options: [
          { text: "A. Tìm chú bảo vệ, cô thu ngân hoặc nhân viên mặc đồng phục của siêu thị để nhờ gọi loa.", correct: true, feedback: "🎉 CHÍNH XÁC! Nhân viên đồng phục hoặc chú bảo vệ là những người an toàn và đáng tin cậy nhất!" },
          { text: "B. Chạy ra ngoài đường lớn tìm ba mẹ hoặc đi theo bất kỳ ai bảo dẫn đi tìm.", correct: false, feedback: "❌ Sai lầm! Đi ra đường lớn rất dễ bị tai nạn giao thông hoặc gặp kẻ xấu!" }
        ]
      },
      {
        question: "Tình huống 3: Điều quan trọng nhất bé phải luôn học thuộc lòng để tự bảo vệ mình khi bị lạc là gì?",
        options: [
          { text: "A. Học thuộc số điện thoại của ba hoặc mẹ và nhớ địa chỉ nhà mình.", correct: true, feedback: "🎉 CHÍNH XÁC! Nhớ số điện thoại của ba mẹ giúp mọi người có thể gọi điện đón bé ngay lập tức!" },
          { text: "B. Nhớ tên các nhân vật siêu nhân trong phim hoạt hình.", correct: false, feedback: "❌ Chưa đúng! Nhớ số điện thoại của cha mẹ mới là thông tin cứu nguy quan trọng nhất!" }
        ]
      },
      {
        question: "Tình huống 4: Trên đường đi bộ từ trường về nhà, một người lạ đi ô tô dừng lại và đưa cho bé một hộp kẹo sô-cô-la ngon cùng món đồ chơi đẹp. Bé phản ứng thế nào?",
        options: [
          { text: "A. Lễ phép xua tay: 'Dạ con cảm ơn nhưng con không lấy ạ' và nhanh chân đi đến chỗ đông người.", correct: true, feedback: "🎉 CHÍNH XÁC! Kẹo hoặc đồ chơi của người lạ có thể tẩm thuốc mê hoặc bẫy bắt cóc!" },
          { text: "B. Nhận kẹo ăn ngay và đứng lại trò chuyện cùng người đó.", correct: false, feedback: "❌ Rất nguy hiểm! Tuyệt đối không nhận đồ ăn uống hay quà tặng từ người lạ mặt!" }
        ]
      },
      {
        question: "Tình huống 5: Trời mưa to sấm chớp dữ dội lúc tan học, bé đang ở sân trường chờ mẹ. Bé nên đứng chờ ở đâu an toàn nhất?",
        options: [
          { text: "A. Đứng trong hành lang có mái che kiên cố của trường học.", correct: true, feedback: "🎉 CHÍNH XÁC! Tránh mưa dưới mái che kiên cố bảo vệ bé khỏi sấm sét và ướt lạnh!" },
          { text: "B. Chạy ra đứng trú dưới gốc cây bàng to ngoài sân trường.", correct: false, feedback: "❌ Nguy hiểm chết người! Gốc cây to là nơi sét rất dễ đánh trúng khi trời mưa dông!" }
        ]
      }
    ]
  },
  rule_5_fingers: {
    key: "rule_5_fingers",
    title: "🖐️ Quy Tắc 5 Ngón Tay - Bé Tự Bảo Vệ Mình",
    badge: "Dũng Sĩ Tự Vệ 5 Ngón Tay 🖐️",
    thumb: "images/game-thumb-3.jpg",
    questions: [
      {
        question: "Tình huống 1: Theo 'Quy tắc 5 ngón tay', Ngón cái (ngón gần bé nhất) đại diện cho những ai và được phép làm gì?",
        options: [
          { text: "A. Ba, mẹ, ông bà, anh chị em ruột - được ôm hôn, yêu thương và tắm rửa khi bé còn nhỏ.", correct: true, feedback: "🎉 CHÍNH XÁC! Đây là những người ruột thịt thân yêu nhất trong gia đình của bé!" },
          { text: "B. Bất kỳ ai quen biết ngoài đường phố.", correct: false, feedback: "❌ Sai rồi! Người lạ hoặc người quen bình thường không được phép ôm hôn tùy tiện!" }
        ]
      },
      {
        question: "Tình huống 2: 'Vùng đồ bơi' (ngực, mông và giữa hai đùi) của bé có ai được quyền nhìn hoặc chạm vào không?",
        options: [
          { text: "A. Tuyệt đối KHÔNG ai được chạm vào, trừ bác sĩ khám bệnh khi có ba mẹ đứng bên cạnh.", correct: true, feedback: "🎉 CHÍNH XÁC! Đây là vùng thiêng liêng và bất khả xâm phạm trên cơ thể của bé!" },
          { text: "B. Ai thích chạm vào cũng được vì bé còn nhỏ.", correct: false, feedback: "❌ Tuyệt đối không! Bất kỳ ai đòi chạm vào vùng đồ bơi đều là hành vi xâm hại nghiêm trọng!" }
        ]
      },
      {
        question: "Tình huống 3: Nếu có người quen hoặc người lạ cố tình đụng chạm vào cơ thể bé và dọa: 'Cấm mách ba mẹ, nếu nói sẽ bị phạt'. Bé phải làm gì?",
        options: [
          { text: "A. Hét thật to 'CỨU CON VỚI!', chạy đến nơi đông người và kể ngay cho ba mẹ, thầy cô nghe.", correct: true, feedback: "🎉 CHÍNH XÁC! Bé không hề có lỗi, dũng cảm tố cáo sẽ giúp bé được bảo vệ an toàn!" },
          { text: "B. Sợ hãi im lặng và giấu kín trong lòng.", correct: false, feedback: "❌ Không nên! Im lặng sẽ khiến kẻ xấu tiếp tục đe dọa và làm tổn thương bé nhiều hơn!" }
        ]
      },
      {
        question: "Tình huống 4: Ngón út (ngón xa nhất) trong quy tắc 5 ngón tay nhắc nhở bé điều gì đối với người hoàn toàn xa lạ?",
        options: [
          { text: "A. Xua tay từ chối, giữ khoảng cách tối thiểu 2 mét và không cho người lạ chạm vào người.", correct: true, feedback: "🎉 CHÍNH XÁC! Luôn giữ khoảng cách an toàn với người không quen biết!" },
          { text: "B. Chạy lại ôm và cho người lạ bế bồng.", correct: false, feedback: "❌ Rất nguy hiểm! Với người lạ, bé tuyệt đối không cho ôm hay bế!" }
        ]
      },
      {
        question: "Tình huống 5: Một người hàng xóm rủ bé vào phòng đóng kín cửa để xem phim hoạt hình hoặc cho tiền và bảo không được cho ai biết. Bé nên ứng phó thế nào?",
        options: [
          { text: "A. Lập tức từ chối, không vào phòng kín và kể lại ngay sự việc cho ba mẹ.", correct: true, feedback: "🎉 CHÍNH XÁC! Không bao giờ vào phòng đóng kín cửa một mình với người lớn!" },
          { text: "B. Vào ngay phòng kín vì được xem hoạt hình và có tiền tiêu vặt.", correct: false, feedback: "❌ Rất nguy hiểm! Phòng kín là môi trường dễ xảy ra nguy cơ xâm hại trẻ em!" }
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

let previousTab = 'dashboard';

/**
 * BẮT ĐẦU TRÒ CHƠI KỸ NĂNG TƯƠNG TÁC (TÍCH HỢP NATIVE NỔI BẬT NGAY TRONG TRANG)
 */
function startGame(gameKey) {
  console.log("🎮 Đang mở Trò Chơi Kỹ Năng:", gameKey);
  
  if (!gameKey || !GAME_DATA[gameKey]) {
    console.error("❌ Không tìm thấy dữ liệu trò chơi:", gameKey);
    return;
  }

  const game = GAME_DATA[gameKey];

  currentGameState = {
    gameKey: gameKey,
    questionIndex: 0,
    score: 0,
    totalQuestions: game.questions.length
  };

  // 1. Tự động chuyển sang tab Trò Chơi Kỹ Năng nếu đang ở tab khác
  const activeTab = document.querySelector('.tab-view.active');
  if (!activeTab || activeTab.id !== 'tab-games') {
    if (typeof switchTab === 'function') {
      switchTab('games');
    }
  }

  // 2. Ẩn lưới các thẻ game ở tab games
  const gamesGrid = document.getElementById('games-grid');
  if (gamesGrid) {
    gamesGrid.style.display = 'none';
  }

  // 3. Lấy khung game container
  const container = document.getElementById('game-container');
  if (!container) {
    console.error("❌ Không tìm thấy #game-container trong DOM!");
    return;
  }

  // Đảm bảo container nằm đúng trong card-section của tab-games
  const tabGamesSection = document.querySelector('#tab-games .card-section');
  if (tabGamesSection && container.parentElement !== tabGamesSection) {
    tabGamesSection.appendChild(container);
  }

  // Reset cấu trúc nội dung game
  const gameBody = document.getElementById('game-body');
  if (gameBody) {
    gameBody.innerHTML = `
      <p id="game-question" style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 20px; line-height: 1.6; background: #F8F5FE; padding: 16px 20px; border-radius: var(--radius-md); border-left: 5px solid var(--primary-lavender);"></p>
      <div id="game-options" style="display: flex; flex-direction: column; gap: 12px;"></div>
      <div id="game-feedback" style="margin-top: 20px; padding: 18px; border-radius: var(--radius-md); display: none;"></div>
    `;
  }

  container.style.display = 'block';
  renderCurrentQuestion();

  // Cuộn trang mượt trực tiếp tới khung game
  setTimeout(() => {
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 60);
}

/**
 * BỘ LỌC TRÒ CHƠI KỸ NĂNG THEO CẤP HỌC (TIỂU HỌC HOẶC THCS)
 */
function filterGamesByLevel(level, btnEl) {
  // 1. Cập nhật trạng thái active cho các nút bấm
  const bar = btnEl ? btnEl.parentElement : document.querySelector('.filter-pills-bar');
  if (bar) {
    bar.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
  }

  // 2. Đóng khung chơi game nếu đang mở, khôi phục lại lưới cards
  const container = document.getElementById('game-container');
  if (container) {
    container.style.display = 'none';
  }

  const grid = document.getElementById('games-grid');
  if (grid) {
    grid.style.display = 'grid';
  }

  // 3. Lọc hiển thị các thẻ trò chơi theo cấp học (display: flex để giữ trọn vẹn claymorphic layout)
  const cards = document.querySelectorAll('#games-grid .game-card');
  let visibleCount = 0;
  cards.forEach(card => {
    const cardLevel = card.getAttribute('data-level') || 'all';
    if (level === 'all' || cardLevel === 'all' || cardLevel === level) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // 4. Cập nhật banner thông tin trực quan cho học sinh
  updateGameLevelBanner(level, visibleCount);
}

/**
 * CẬP NHẬT BANNER HƯỚNG DẪN TRỰC QUAN THEO CẤP HỌC
 */
function updateGameLevelBanner(level, count) {
  const bannerIcon = document.getElementById('game-banner-icon');
  const bannerTitle = document.getElementById('game-banner-title');
  const bannerDesc = document.getElementById('game-banner-desc');
  const bannerCount = document.getElementById('game-banner-count');

  if (!bannerTitle) return;

  if (level === 'primary') {
    if (bannerIcon) bannerIcon.innerText = '🧸';
    bannerTitle.innerText = 'Cấp Tiểu học (Lớp 1 - 5):';
    if (bannerDesc) bannerDesc.innerText = '4 Trò chơi tình huống sinh tồn, phòng tránh thất lạc & quy tắc 5 ngón tay bảo vệ bản thân.';
    if (bannerCount) bannerCount.innerText = `${count} Trò Chơi`;
  } else if (level === 'secondary') {
    if (bannerIcon) bannerIcon.innerText = '🎓';
    bannerTitle.innerText = 'Cấp THCS (Lớp 6 - 9):';
    if (bannerDesc) bannerDesc.innerText = '5 Trò chơi phòng chống bạo lực, bắt nạt không gian mạng, an toàn sông nước & giải tỏa thi cử.';
    if (bannerCount) bannerCount.innerText = `${count} Trò Chơi`;
  } else {
    if (bannerIcon) bannerIcon.innerText = '🌟';
    bannerTitle.innerText = 'Tất cả cấp học:';
    if (bannerDesc) bannerDesc.innerText = 'Trọn bộ 7 trò chơi kỹ năng sống & tương tác tâm lý dành cho toàn trường.';
    if (bannerCount) bannerCount.innerText = `${count} Trò Chơi`;
  }
}

/**
 * ĐỌC TO CÂU HỎI TRÒ CHƠI KỸ NĂNG CHO HỌC SINH (TEXT-TO-SPEECH)
 */
function speakGameQuestion(text, btn = null) {
  if (typeof playVietnameseSpeech === 'function') {
    playVietnameseSpeech(text, btn);
  } else if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }
}

/**
 * HÀM ĐỌC CÂU HỎI HIỆN TẠI (AN TOÀN TUYỆT ĐỐI KHÔNG BỊ LỖI KÝ TỰ ĐẶC BIỆT)
 */
function speakCurrentGameQuestion(btn) {
  const game = GAME_DATA[currentGameState.gameKey];
  if (!game) return;
  const qData = game.questions[currentGameState.questionIndex];
  if (!qData) return;
  speakGameQuestion(qData.question, btn);
}

/**
 * RENDER CÂU HỎI HIỆN TẠI
 */
function renderCurrentQuestion() {
  const game = GAME_DATA[currentGameState.gameKey];
  const qData = game.questions[currentGameState.questionIndex];

  document.getElementById('game-title').innerText = `${game.title} (Câu ${currentGameState.questionIndex + 1}/${currentGameState.totalQuestions})`;
  
  const questionEl = document.getElementById('game-question');
  if (questionEl) {
    questionEl.innerHTML = `
      <div>${qData.question}</div>
      <div style="margin-top: 10px;">
        <button type="button" class="btn-tts" onclick="speakCurrentGameQuestion(this)" title="Bấm để nghe đọc to câu hỏi này">
          <i class="fa-solid fa-volume-high"></i> Nghe đọc câu hỏi
        </button>
      </div>
    `;
  }

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
    feedbackBox.innerHTML = `${selected.feedback} <br><br><strong style="color:#059669;">+10 Điểm Kỹ Năng! 🎉</strong>`;
    
    // Phát âm thanh chuông leng keng vui nhộn khen ngợi
    if (typeof playCorrectSound === 'function') {
      playCorrectSound();
    }
  } else {
    feedbackBox.style.background = '#FEE2E2';
    feedbackBox.style.color = '#991B1B';
    feedbackBox.style.border = '2px solid #FCA5A5';
    feedbackBox.innerHTML = selected.feedback;

    // Phát âm thanh nhắc nhở ấm áp, nhẹ nhàng động viên học sinh
    if (typeof playEncouragingSound === 'function') {
      playEncouragingSound();
    }
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

  // Phát âm thanh chiến thắng Fanfare vui mừng
  if (typeof playVictorySound === 'function') {
    playVictorySound();
  }

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
  if (container) {
    container.style.display = 'none';
  }

  // Khôi phục hiển thị lại tất cả .games-grid ở các tab
  const grids = document.querySelectorAll('.games-grid');
  grids.forEach(grid => grid.style.display = 'grid');

  // Khôi phục đúng trạng thái hiển thị của các thẻ cards theo bộ lọc hiện tại
  const activePill = document.querySelector('.filter-pills-bar .filter-pill.active');
  const level = activePill ? (activePill.getAttribute('data-level') || 'all') : 'all';
  const cards = document.querySelectorAll('#games-grid .game-card');
  let visibleCount = 0;
  cards.forEach(card => {
    const cardLevel = card.getAttribute('data-level') || 'all';
    if (level === 'all' || cardLevel === 'all' || cardLevel === level) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  updateGameLevelBanner(level, visibleCount);

  // Reset game body cho nhẹ DOM
  const gameBody = document.getElementById('game-body');
  if (gameBody) {
    gameBody.innerHTML = `
      <p id="game-question" style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 20px; line-height: 1.6; background: #F8F5FE; padding: 16px 20px; border-radius: var(--radius-md); border-left: 5px solid var(--primary-lavender);"></p>
      <div id="game-options" style="display: flex; flex-direction: column; gap: 12px;"></div>
      <div id="game-feedback" style="margin-top: 20px; padding: 18px; border-radius: var(--radius-md); display: none;"></div>
    `;
  }
}
