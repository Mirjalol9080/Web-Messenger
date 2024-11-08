import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Socket.io serverga ulanish
const socket = io('http://localhost:5000'); // Backend manzilingiz

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // Xabar yuborish
    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('sendMessage', message);
            setMessage(''); // Inputni tozalash
        }
    };

    // Yangi xabarlar kelganda xabarlar ro'yxatini yangilash
    useEffect(() => {
        socket.on('receiveMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Xabar yuborish..."
            />
            <button onClick={sendMessage}>Yuborish</button>
        </div>
    );
}

export default App;
