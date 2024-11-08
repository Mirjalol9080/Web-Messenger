// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Foydalanuvchi ulanishi amalga oshdi');

    // Xabarni qabul qilish va uni boshqa foydalanuvchilarga yuborish
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Foydalanuvchi chiqsa
    socket.on('disconnect', () => {
        console.log('Foydalanuvchi chiqdi');
    });
});

server.listen(3000, () => {
    console.log('Server 3000-portda ishga tushdi');
});
