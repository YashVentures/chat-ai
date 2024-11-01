import React, { useState } from 'react';
import './index.css'; 
import axios from 'axios';

const App = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // Function to fetch the chatbot's response from the backend
    const fetchChatbotResponse = async (userInput) => {
        try {
            const response = await axios.post('http://localhost:5000/api/chat', { message: userInput });
            console.log('Chatbot response:', response.data); // Log the response
            const botMessage = response.data.reply; // Adjust according to the response structure
            setMessages((prevMessages) => [...prevMessages, { text: botMessage, isUser: false }]);
        } catch (error) {
            console.error('Error fetching chatbot response:', error);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages((prevMessages) => [...prevMessages, { text: input, isUser: true }]);
            fetchChatbotResponse(input); // Call the fetch function to get response
            setInput('');
        }
    };

    return (
        <div className="app-container">
            <h1 className="chat-title">Chat with Our Bot</h1>
            <div className="chat-window">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <form className="input-form" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="message-input"
                    />
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
        </div>
    );
};

export default App;
