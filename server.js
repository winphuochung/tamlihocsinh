const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server Tư vấn Tâm lý THCS Phước Hưng đang chạy tại: http://localhost:${PORT}`);
});
