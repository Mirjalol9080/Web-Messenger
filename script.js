// Socket.io serverga ulanish
const socket = io();

// DOM elementlariga ulanish
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const chatBox = document.getElementById('chat-box');

// Xabar yuborish
sendBtn.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== "") {
    socket.emit('chat message', message); // Xabarni serverga yuborish
    messageInput.value = ""; // Inputni tozalash
  }
});

// Xabarlarni qabul qilish
socket.on('chat message', (msg) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = msg;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Yangi xabarlar pastga tushishi uchun
});
