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

// Route dự phòng tự động chuyển về index.html nếu không tìm thấy file tĩnh
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api/')) {
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
