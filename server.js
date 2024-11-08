const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Static files (client HTML, CSS, JS)
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Foydalanuvchi ulanishi amalga oshdi');

  // Xabar yuborilsa, uni boshqa foydalanuvchilarga yuborish
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);  // Barcha ulanishlarga yuborish
  });

  // Foydalanuvchi chiqsa
  socket.on('disconnect', () => {
    console.log('Foydalanuvchi chiqdi');
  });
});

server.listen(3000, () => {
  console.log('Server 3000-portda ishga tushdi');
});
