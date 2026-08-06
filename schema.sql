-- ==========================================================================
-- CƠ SỞ DỮ LIỆU TƯ VẤN TÂM LÝ HỌC SINH - THCS PHƯỚC HƯNG (AN GIANG)
-- Giáo viên Tổng phụ trách Đội: Cô Nguyễn Thị Ngọc Nga
-- ==========================================================================

-- 1. Bảng lưu trữ Đăng ký Lịch hẹn Tư vấn Ẩn danh
CREATE TABLE IF NOT EXISTS anonymous_bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    secret_code VARCHAR(30) UNIQUE NOT NULL,      -- Mã tra cứu bí mật (VD: PH-8839-X)
    topic VARCHAR(150) NOT NULL,                  -- Chủ đề tư vấn
    student_grade VARCHAR(30) NOT NULL,            -- Khối lớp (Khối 6, 7, 8, 9)
    preferred_date DATE NOT NULL,                 -- Ngày hẹn gặp Cô Ngọc Nga
    preferred_time VARCHAR(100) NOT NULL,         -- Giờ hẹn gặp
    content TEXT NOT NULL,                        -- Nội dung chia sẻ / tâm sự
    status VARCHAR(30) DEFAULT 'PENDING',         -- PENDING, APPROVED, COMPLETED
    teacher_reply TEXT,                           -- Phản hồi bí mật từ Cô Nga dành cho học sinh
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Nhật ký Lượt chơi & Tình huống Trò chơi Kỹ năng
CREATE TABLE IF NOT EXISTS game_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_category VARCHAR(100) NOT NULL,          -- school_violence, cyberbullying, child_abuse, drowning_prevention, mental_health
    score INTEGER DEFAULT 10,
    badge_earned VARCHAR(100) DEFAULT 'Kỹ năng vàng',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng Thư viện Bài viết & Tài liệu Kỹ năng sống
CREATE TABLE IF NOT EXISTS mental_resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) DEFAULT 'Cô Nguyễn Thị Ngọc Nga - TPT Đội',
    views INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Bảng Nhật ký Trợ lý AI Tư vấn 24/7 (Bảo mật ẩn danh)
CREATE TABLE IF NOT EXISTS ai_counseling_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id VARCHAR(100) NOT NULL,
    emotion_detected VARCHAR(50),
    topic_category VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- SEED DATA MẪU BAN ĐẦU
INSERT INTO anonymous_bookings (secret_code, topic, student_grade, preferred_date, preferred_time, content, status, teacher_reply)
VALUES 
('PH-8839-X', 'Phòng chống Bạo lực học đường', 'Khối 8', '2026-08-07', 'Giờ ra chơi sáng (9:15 - 9:30)', 'Em cảm thấy bị một bạn học khác lớp liên tục chặn đường hù dọa mỗi khi tan học.', 'APPROVED', 'Chào em! Cô Ngọc Nga đã nhận được thông tin. Em yên tâm nhé, thứ Sáu tuần này giờ ra chơi 9:15 em hãy lên văn phòng Đội gặp cô. Cô sẽ bảo vệ em an toàn!'),
('PH-9821-K', 'Phòng chống Bắt nạt không gian mạng', 'Khối 7', '2026-08-08', 'Sau giờ học buổi chiều', 'Có một tài khoản Facebook ẩn danh liên tục nhắn tin chửi bới và đe dọa em.', 'PENDING', '');
