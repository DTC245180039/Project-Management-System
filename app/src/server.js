const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>He thong Quan ly Du an</h1><p>Trang thai: Active</p><a href="/api/tasks">Xem danh sach Task</a>');
});

app.get('/api/tasks', (req, res) => {
  res.json([
    { id: 1, task: "Thiet ke he thong", status: "Done", member: "Nguyen Van A" },
    { id: 2, task: "Trien khai Docker Compose", status: "In Progress", member: "Tran Thi B" }
  ]);
});

app.listen(3000, () => console.log('App running on port 3000'));
