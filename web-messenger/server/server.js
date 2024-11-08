const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Statik fayllarni taqdim etish (React uchun)
app.use(express.static('client/build'));

// Foydalanuvchilar ulanadi
io.on('connection', (socket) => {
    console.log('Foydalanuvchi ulanishi amalga oshdi');

    // Xabar yuborish
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message); // Barcha ulanishlarga xabar yuborish
    });

    // Foydalanuvchi uzilganda
    socket.on('disconnect', () => {
        console.log('Foydalanuvchi uzildi');
    });
});

// Serverni ishga tushirish
server.listen(5000, () => {
    console.log('Server 5000-portda ishlayapti');
});
