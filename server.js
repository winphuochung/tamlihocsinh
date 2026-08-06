const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    school: 'Trường THCS Phước Hưng - Xã Nhơn Hội - An Giang',
    teacher: 'Cô Nguyễn Thị Ngọc Nga - TPT Đội',
    timestamp: new Date()
  });
});

// Chạy server khi ở môi trường Local (không ở Vercel Serverless)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
  });
}

// Xuất app để Vercel Serverless Function gọi trực tiếp
module.exports = app;
