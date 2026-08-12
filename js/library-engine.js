/* ==========================================================================
   Thư Viện Kỹ Năng Sống & Tâm Lý Học Đường (Mental Health & Life Skills Library)
   Trường THCS Phước Hưng - Xã Nhơn Hội - An Giang
   Giáo viên TPT Đội: Cô Nguyễn Thị Ngọc Nga
   ========================================================================== */

const LIBRARY_ARTICLES = [
  {
    id: "art-drowning-safety",
    category: "water_safety",
    badgeText: "🏊 An toàn sông nước",
    badgeClass: "badge-approved",
    title: "Cẩm nang An toàn Phòng chống Đuối nước Vùng Sông Nước An Giang",
    icon: "🏊‍♂️",
    author: "Cô Nguyễn Thị Ngọc Nga - TPT Đội",
    excerpt: "Các quy tắc sinh tồn đặc biệt khi đi đò, tắm sông Nhơn Hội, cách sử dụng phao cứu sinh tự chế và kỹ năng ứng cứu gián tiếp an toàn.",
    content: `
      <h3>🌊 1. Thực trạng & Nguy cơ vùng sông nước An Giang</h3>
      <p>Huyện An Phú và xã Nhơn Hội có hệ thống sông kênh rạch chằng chịt. Vào mùa nước nổi hay mùa nắng nóng, nhu cầu tắm sông của học sinh tăng cao nhưng ẩn chứa nhiều hố xoáy ngầm bất ngờ.</p>
      
      <h3>🚫 2. Quy tắc 3 KHÔNG bắt buộc</h3>
      <ul>
        <li><strong>KHÔNG tự ý tắm sông, kênh rạch:</strong> Chỉ bơi khi có người lớn giám sát và ở khu vực bơi an toàn.</li>
        <li><strong>KHÔNG nhảy xuống nước cứu bạn:</strong> Khi chưa được huấn luyện cứu hộ chuyên nghiệp, nhảy xuống nước sẽ khiến cả hai cùng gặp nguy hiểm.</li>
        <li><strong>KHÔNG đi dạo gần bờ sông một mình:</strong> Tránh các bờ đất dốc đứng dễ sạt lở.</li>
      </ul>

      <h3>🛟 3. Kỹ năng Ứng cứu Gián tiếp 4 Bước</h3>
      <ol>
        <li><strong>Hô to kêu cứu:</strong> Hét thật to nhờ người lớn ở gần đó trợ giúp.</li>
        <li><strong>Ném phao hoặc can nhựa:</strong> Ném can nhựa nắp kín 5L, phao xốp hoặc lốp xe xuống cho bạn bấu vào.</li>
        <li><strong>Đưa sào/dây thừng:</strong> Nằm gập người xuống đất và đưa sào dài hoặc dây thừng ra cho bạn nắm kéo vào bờ.</li>
        <li><strong>Gọi Cấp cứu 115:</strong> Tiến hành sơ cứu kiểm tra hô hấp khi đưa được bạn lên bờ.</li>
      </ol>
    `,
    externalLinks: [
      { title: "🌐 UNICEF Việt Nam - Hướng dẫn An toàn Sông nước Trẻ em", url: "https://www.unicef.org/vietnam/vi" },
      { title: "🌐 Cục Quản lý Môi trường Y tế - Bộ Y tế (Phòng chống đuối nước)", url: "https://vihema.gov.vn" }
    ]
  },
  {
    id: "art-school-bullying",
    category: "bullying",
    badgeText: "🛡️ Kỹ năng ứng xử",
    badgeClass: "badge-pending",
    title: "5 Bước Xử Lý Thông Minh Khi Bị Bắt Nạt Học Đường",
    icon: "🛡️",
    author: "Liên Đội THCS Phước Hưng",
    excerpt: "Hướng dẫn chi tiết từ góc nhìn tâm lý học đường giúp học sinh bình tĩnh ứng phó, bảo vệ an toàn thân thể và nhờ sự can thiệp chính thức.",
    content: `
      <h3>🛡️ 1. Hiểu đúng về Bắt nạt Học đường</h3>
      <p>Bắt nạt không chỉ là đánh đập mà còn là lăng mạ, cô lập, đe dọa hoặc trấn lột tiền bạc. Hãy nhớ kỹ: <strong>Bị bắt nạt tuyệt đối KHÔNG PHẢI LÀ LỖI CỦA EM!</strong></p>

      <h3>⚡ 2. 5 Bước ứng phó trực tiếp</h3>
      <ul>
        <li><strong>Bước 1 - Giữ thái độ bình tĩnh:</strong> Nhìn thẳng đối phương, không khóc lóc gào thấu trước mặt kẻ bắt nạt.</li>
        <li><strong>Bước 2 - Nói câu phản đối ngắn gọn:</strong> Nói rõ ràng <i>'Tôi không đồng ý'</i> hoặc <i>'Hãy dừng lại ngay'</i> với giọng kiên quyết.</li>
        <li><strong>Bước 3 - Nhanh chóng di chuyển:</strong> Nhanh chân bước về hướng phòng bảo vệ, văn phòng Đội hoặc khu vực đông thầy cô.</li>
        <li><strong>Bước 4 - Thu thập bằng chứng:</strong> Ghi nhớ thời gian, địa điểm, tên những người đe dọa.</li>
        <li><strong>Bước 5 - Mở lòng báo tin:</strong> Nhắn tin ngay cho Cô Ngọc Nga hoặc gửi Yêu cầu Ẩn danh trên trang web này.</li>
      </ul>
    `,
    externalLinks: [
      { title: "🌐 Tổng đài Quốc gia Bảo vệ Trẻ em 111 (Miễn phí 24/7)", url: "https://tongdai111.vn" },
      { title: "🌐 Cổng thông tin Bộ Giáo dục & Đào tạo (Phòng chống bạo lực)", url: "https://moet.gov.vn" }
    ]
  },
  {
    id: "art-cyberbullying",
    category: "cyber",
    badgeText: "🌐 An toàn số",
    badgeClass: "badge-approved",
    title: "Bảo Vệ Bản Thân Trước Nạn Bắt Nạt Trực Tuyến (Cyberbullying)",
    icon: "💻",
    author: "Chuyên gia An ninh Mạng & Tâm lý",
    excerpt: "Cách chụp màn hình làm bằng chứng, chặn tài khoản ác ý, báo cáo vi phạm và xoa dịu hoảng loạn khi bị bóc phốt trên MXH.",
    content: `
      <h3>🌐 1. Kẻ bắt nạt mạng hoạt động thế nào?</h3>
      <p>Kẻ bắt nạt mạng thường lợi dụng tính ẩn danh trên Facebook, TikTok, Zalo để cắt ghép hình ảnh, lập group chửi hoặc tung tin đồn vô căn cứ.</p>

      <h3>🔒 2. Quy tắc 4B Bảo vệ Bản thân trên Mạng</h3>
      <ul>
        <li><strong>Block (Chặn ngay):</strong> Chặn ngay lập tức các tài khoản bình luận ác ý hoặc nhắn tin đe dọa.</li>
        <li><strong>Backup (Chụp bằng chứng):</strong> Chụp màn hình toàn bộ tin nhắn, trang cá nhân đối phương trước khi chặn.</li>
        <li><strong>Breathe (Tạm ngắt kết nối):</strong> Tắt máy tính/điện thoại 24h để xoa dịu tâm trí, đi dạo hoặc tập thể thao.</li>
        <li><strong>Be Heard (Nhờ trợ giúp):</strong> Báo cáo vi phạm lên nền tảng mạng xã hội và thông báo cho cha mẹ, thầy cô.</li>
      </ul>
    `,
    externalLinks: [
      { title: "🌐 Cẩm nang An toàn Mạng Việt Nam - Cục An toàn Thông tin", url: "https://khonggianmang.vn" },
      { title: "🌐 Dự án Chống Lừa Đảo & Bảo vệ Trẻ em Trực tuyến", url: "https://chongluadao.vn" }
    ]
  },
  {
    id: "art-child-protection",
    category: "protection",
    badgeText: "🦺 Bảo vệ trẻ em",
    badgeClass: "badge-pending",
    title: "Quy Tắc 5 Ngón Tay & Ranh Giới An Toàn Cơ Thể Trẻ Em",
    icon: "🦺",
    author: "Cô Nguyễn Thị Ngọc Nga",
    excerpt: "Nhận biết vùng riêng tư, nhận diện các dấu hiệu đụng chạm nguy hiểm và hành động kiên quyết để bảo vệ bản thân.",
    content: `
      <h3>🖐️ 1. Quy tắc 5 Ngón Tay bảo vệ ranh giới cơ thể</h3>
      <ul>
        <li><strong>Ngón cái (Gần nhất):</strong> Ôm hôn người thân ruột thịt trong gia đình (Bố mẹ, ông bà, anh chị em ruột).</li>
        <li><strong>Ngón trỏ:</strong> Nắm tay thầy cô, bạn bè, họ hàng.</li>
        <li><strong>Ngón giữa:</strong> Bắt tay người quen (hàng xóm, bạn của bố mẹ).</li>
        <li><strong>Ngón áp út:</strong> Vẫy tay chào người xa lạ.</li>
        <li><strong>Ngón út (Xa nhất):</strong> Xua tay, hét to và bỏ chạy nếu người lạ hoặc bất kỳ ai cố tình đụng chạm vào vùng riêng tư (vùng đồ lót).</li>
      </ul>

      <h3>🚨 2. Nguyên tắc "Bí mật Độc hại"</h3>
      <p>Nếu ai đó bảo em giữ một "bí mật" khiến em sợ hãi, lo âu hoặc cảm thấy khó chịu, đó chính là <strong>Bí mật Độc hại</strong>. Em hãy dũng cảm kể ngay cho Cô Ngọc Nga hoặc gọi 111!</p>
    `,
    externalLinks: [
      { title: "🌐 Cục Trẻ em - Bộ Lao động Thương binh & Xã hội", url: "https://tongdai111.vn" },
      { title: "🌐 Save the Children Việt Nam (Bảo vệ Trẻ em khỏi xâm hại)", url: "https://vietnam.savethechildren.net" }
    ]
  },
  {
    id: "art-exam-stress",
    category: "mental_health",
    badgeText: "🧘‍♀️ Sức khỏe tinh thần",
    badgeClass: "badge-completed",
    title: "5 Bài Tập Thở & Kỹ Thuật Pomodoro Cân Bằng Căng Thẳng Thi Cử",
    icon: "🧘‍♀️",
    author: "Chuyên gia Tâm lý Học đường",
    excerpt: "Phương pháp hít thở sâu 4-7-8 cân bằng thần kinh chỉ trong 3 phút và cách chia nhỏ thời gian ôn tập khoa học.",
    content: `
      <h3>🧠 1. Tại sao não bộ bị quá tải khi ôn thi?</h3>
      <p>Khi học dồn dập, hormone Cortisol tăng cao gây suy giảm trí nhớ tới 60%. Việc thư giãn xen kẽ giúp não ghi nhớ dài hạn tốt hơn gấp 3 lần.</p>

      <h3>🌬️ 2. Bài tập Thở Cân Bằng 4-7-8</h3>
      <ol>
        <li><strong>Hít vào:</strong> Hít sâu bằng mũi trong vòng 4 giây.</li>
        <li><strong>Giữ hơi:</strong> Giữ luồng khí trong lồng ngực 7 giây.</li>
        <li><strong>Thở ra:</strong> Thở nhẹ nhàng qua miệng trong 8 giây.</li>
        <li>Lặp lại 3-4 lần trước khi vào phòng thi để xoa dịu nhịp tim.</li>
      </ol>

      <h3>⏱️ 3. Phương pháp Học Pomodoro</h3>
      <p>Học tập trung cao độ 25 phút -> Nghỉ ngơi hoàn toàn 5 phút (vận động nhẹ, uống nước). Sau 4 chu kỳ, nghỉ dài 15-30 phút.</p>
    `,
    externalLinks: [
      { title: "🌐 Viện Sức khỏe Tinh thần Quốc gia (Giảm áp lực thi cử)", url: "https://nimh.gov.vn" },
      { title: "🌐 Hội Tâm Lý Học Việt Nam", url: "http://vpa.org.vn" }
    ]
  },
  {
    id: "art-family-conflict",
    category: "mental_health",
    badgeText: "🏡 Gia đình & Bạn bè",
    badgeClass: "badge-approved",
    title: "Giải Mã Mâu Thuẫn Tuổi Dậy Thì Với Cha Mẹ & Giao Tiếp Hiệu Quả",
    icon: "🏡",
    author: "Chuyên gia Tư vấn Gia đình",
    excerpt: "Phương pháp dùng thông điệp 'Em Cảm Thấy' và kỹ năng viết thư tâm sự giúp rút ngắn khoảng cách với bố mẹ.",
    content: `
      <h3>🌱 1. Tâm lý tuổi 11-15 có gì đặc biệt?</h3>
      <p>Đây là giai đoạn em bắt đầu khẳng định cá tính và độc lập. Bố mẹ đôi khi vì quá lo lắng hoặc áp lực công sống nên chọn sai cách truyền đạt khiến em thấy bị so sánh hay áp đặt.</p>

      <h3>💬 2. Kỹ thuật Giao tiếp "Thông điệp Em Cảm Thấy"</h3>
      <p>Thay vì trách móc <i>'Bố mẹ không thương con'</i>, hãy thử chuyển sang công thức:</p>
      <div style="background: #F5F1FA; padding: 12px; border-radius: 8px; font-style: italic;">
        "Con cảm thấy rất buồn và áp lực khi bố mẹ so sánh con với bạn khác, vì con đã rất nỗ lực cố gắng..."
      </div>

      <h3>✉️ 3. Viết thư tay tâm sự</h3>
      <p>Nếu cảm thấy khó nói trực tiếp khi bầu không khí căng thẳng, hãy viết một bức thư tay ngắn chân thành để trên bàn làm việc của bố mẹ.</p>
    `,
    externalLinks: [
      { title: "🌐 Tổ chức Y tế Thế giới (WHO) - Sức khỏe Thanh Thiếu Niên", url: "https://www.who.int/vietnam" },
      { title: "🌐 Cổng thông tin Tư vấn Tâm lý Học đường Việt Nam", url: "https://moet.gov.vn" }
    ]
  },
  {
    id: "art-self-esteem",
    category: "mental_health",
    badgeText: "🌸 Tự tin & Cảm xúc",
    badgeClass: "badge-completed",
    title: "Rèn Luyện Sự Tự Tin & Vượt Qua Cảm Giác Cô Đơn Tuổi Học Sinh",
    icon: "🌸",
    author: "Cô Nguyễn Thị Ngọc Nga",
    excerpt: "Bài tập Nhật ký 3 Điều Tích Cực mỗi ngày và phương pháp dừng so sánh bản thân trên mạng xã hội.",
    content: `
      <h3>✨ 1. Mọi người đều là phiên bản độc bản duy nhất</h3>
      <p>Mạng xã hội chỉ thể hiện những khoảnh khắc đẹp đẽ nhất của người khác. Đừng dùng thước đo của người khác để đánh giá giá trị bản thân mình.</p>

      <h3>📖 2. Bài tập Nhật ký 3 Điều Tích Cực</h3>
      <p>Mỗi tối trước khi đi ngủ, hãy viết ra notebook 3 việc nhỏ bé em đã làm tốt trong ngày:</p>
      <ul>
        <li>Hôm nay tớ đã hoàn thành bài tập Toán đúng giờ.</li>
        <li>Tớ đã mỉm cười và giúp bạn nhặt chiếc bút rơi.</li>
        <li>Tớ đã chủ động học thuộc 5 từ vựng Tiếng Anh mới.</li>
      </ul>
    `,
    externalLinks: [
      { title: "🌐 UNICEF Việt Nam - Sức khỏe Tâm thần Trẻ em", url: "https://www.unicef.org/vietnam/vi" },
      { title: "🌐 Tạp chí Tâm lý Học Đường Việt Nam", url: "http://vpa.org.vn" }
    ]
  },
  {
    id: "art-first-aid-school",
    category: "water_safety",
    badgeText: "🚑 Sơ cấp cứu",
    badgeClass: "badge-pending",
    title: "Kỹ Năng Sơ Cấp Cứu Khi Thấy Bạn Gặp Tai Nạn Thương Tích Trong Trường Học",
    icon: "🚑",
    author: "Y tế Trường THCS Phước Hưng",
    excerpt: "Cách xử lý chảy máu cam, trật khớp, bong gân và quy trình gọi sự trợ giúp y tế nhanh nhất.",
    content: `
      <h3>🚑 1. Quy tắc Vàng: Bình Tĩnh & Gọi Y Tế</h3>
      <p>Khi bạn gặp tai nạn ngã chấn thương, chảy máu hoặc ngất xỉu, ưu tiên hàng đầu là gọi ngay Y tế nhà trường hoặc thầy cô gần nhất.</p>

      <h3>🩹 2. Xử lý Chảy máu cam đúng cách</h3>
      <ul>
        <li>Hơi cúi đầu về phía trước (KHÔNG ngửa đầu ra sau vì dễ làm máu chảy ngược vào đường thở).</li>
        <li>Dùng hai ngón tay bóp nhẹ cánh mũi trong 5-10 phút.</li>
        <li>Đặt khăn lạnh lên sống mũi để hạ nhiệt.</li>
      </ul>
    `,
    externalLinks: [
      { title: "🌐 Hội Chữ Thập Đỏ Việt Nam - Hướng dẫn Sơ cấp cứu", url: "https://redcross.org.vn" },
      { title: "🌐 Bộ Y tế Việt Nam - Trang tin Cổng Thông tin Điện tử", url: "https://moh.gov.vn" }
    ]
  }
];

/**
 * HIỂN THỊ DANH SÁCH BÀI VIẾT THƯ VIỆN
 */
function renderLibraryArticles(category = 'all') {
  const container = document.getElementById('library-articles-grid');
  if (!container) return;

  const filtered = category === 'all' 
    ? LIBRARY_ARTICLES 
    : LIBRARY_ARTICLES.filter(a => a.category === category);

  container.innerHTML = filtered.map(art => `
    <div class="game-card" style="text-align: left; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="font-size: 36px; margin-bottom: 10px;">${art.icon}</div>
        <span class="badge-status ${art.badgeClass}">${art.badgeText}</span>
        <h3 style="margin-top: 10px; font-size: 16px; line-height: 1.4; color: var(--text-main);">${art.title}</h3>
        <p style="font-size: 12.5px; color: var(--text-muted); margin-top: 8px; line-height: 1.5;">${art.excerpt}</p>
      </div>

      <div style="margin-top: 14px; border-top: 1px dashed #EAE3F7; padding-top: 10px;">
        <p style="font-size: 11px; color: var(--primary-lavender); font-weight: 700; margin-bottom: 10px;">✍️ ${art.author}</p>
        
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn-clay" style="font-size: 12px; padding: 6px 12px;" onclick="openArticleModal('${art.id}')">
            📖 Đọc Chi Tiết
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * LỌC BÀI VIẾT THEO DANH MỤC
 */
function filterLibrary(category, btnEl) {
  // Reset active buttons
  const buttons = document.querySelectorAll('.lib-filter-btn');
  buttons.forEach(b => {
    b.classList.remove('btn-clay');
    b.classList.add('btn-clay-secondary');
  });

  if (btnEl) {
    btnEl.classList.remove('btn-clay-secondary');
    btnEl.classList.add('btn-clay');
  }

  renderLibraryArticles(category);
}

/**
 * MỞ MODAL ĐỌC BÀI VIẾT CHI TIẾT
 */
function openArticleModal(articleId) {
  const art = LIBRARY_ARTICLES.find(a => a.id === articleId);
  if (!art) return;

  const modal = document.getElementById('article-modal');
  const modalBody = document.getElementById('article-modal-body');

  modalBody.innerHTML = `
    <div style="text-align: center; margin-bottom: 16px;">
      <div style="font-size: 48px;">${art.icon}</div>
      <span class="badge-status ${art.badgeClass}" style="margin-top: 6px; display: inline-block;">${art.badgeText}</span>
      <h2 style="font-size: 20px; color: var(--text-main); margin-top: 10px; line-height: 1.4;">${art.title}</h2>
      <p style="font-size: 12px; color: var(--primary-lavender); font-weight: 700; margin-top: 6px;">Tác giả: ${art.author}</p>
    </div>

    <div style="font-size: 13.5px; line-height: 1.7; color: var(--text-main); background: #FAF8FF; padding: 18px; border-radius: 16px; border: 1px solid #EAE3F7; margin-bottom: 20px;">
      ${art.content}
    </div>

    <div style="background: #F0FAF7; border: 1px solid #C6F6D5; padding: 14px 18px; border-radius: 14px; margin-bottom: 16px;">
      <h4 style="font-size: 13.5px; color: #22543D; margin: 0 0 8px 0; font-weight: 800;">🔗 Danh Mục Liên Kết Ngoại Uy Tín & Trích Nguồn Chính Thức:</h4>
      <ul style="margin: 0; padding-left: 18px; font-size: 12.5px; line-height: 1.7;">
        ${art.externalLinks.map(link => `
          <li>
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" style="color: #2B6CB0; font-weight: 700; text-decoration: underline;">
              ${link.title} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 10px;"></i>
            </a>
          </li>
        `).join('')}
      </ul>
    </div>

    <div style="text-align: center; margin-top: 16px;">
      <button class="btn-clay" style="padding: 10px 24px;" onclick="closeArticleModal()">Đóng Bài Viết</button>
    </div>
  `;

  modal.style.display = 'flex';
}

/**
 * ĐÓNG MODAL ĐỌC BÀI VIẾT
 */
function closeArticleModal(event) {
  if (event && event.target && !event.target.classList.contains('modal-overlay') && !event.target.classList.contains('modal-close')) {
    return;
  }
  const modal = document.getElementById('article-modal');
  if (modal) modal.style.display = 'none';
}

// Tự động khởi tạo khi tải trang
document.addEventListener('DOMContentLoaded', () => {
  renderLibraryArticles('all');
});