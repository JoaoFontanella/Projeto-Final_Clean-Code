import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatBodyRef = useRef(null); // 🔁 Referência para o scroll

  // Carrega histórico da sessionStorage
  useEffect(() => {
    const savedHistory = sessionStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Salva no sessionStorage
  useEffect(() => {
    sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Scroll automático para o final
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    const newHistory = [...chatHistory, { sender: 'user', text: message }];
    setChatHistory(newHistory);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (data.response) {
        setChatHistory([...newHistory, { sender: 'bot', text: data.response }]);
      } else {
        setChatHistory([...newHistory, { sender: 'bot', text: 'Resposta inválida.' }]);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setIsLoading(false);
      setChatHistory([...newHistory, { sender: 'bot', text: 'Erro ao conectar com a IA.' }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-icon" onClick={toggleChat}>🤖</div>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            ChatBot
            <button onClick={toggleChat} className="close-btn">×</button>
          </div>
          <div className="chatbot-body" ref={chatBodyRef}>
            {chatHistory.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                {msg.sender === 'bot' ? (
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot-message">
                Respondendo...
              </div>
            )}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Digite sua mensagem..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;