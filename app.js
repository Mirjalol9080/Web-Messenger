const socket = io();

// Xabar yuborish
function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const messageText = messageInput.value.trim();

    if (messageText !== "") {
        socket.emit('chat message', messageText);
        messageInput.value = ""; // Inputni tozalash
    }
}

// Xabarlarni qabul qilish va ko‘rsatish
socket.on('chat message', (msg) => {
    const chatBox = document.getElementById("chatBox");
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});
