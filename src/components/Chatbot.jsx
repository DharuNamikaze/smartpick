import { useState } from 'react';
import '../styles/index.css'
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
    //handle send will change the message array into the user input
  const handleSend = () => {
    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);
    
    // Simple response 
    setTimeout(() => {
      const botResponse = { text: `${input}`, sender: 'bot' };
      setMessages((prev) => [...prev, botResponse]);
    }, [800]);
    
    setInput('');
  };
  const SimpleResponses = () =>{
    const 
  }
  return (
    <div className="chatbot-container p-4 max-w-md mx-auto bg-gray-100 rounded-2xl shadow-lg shadow-black">
      <div className="chat-display mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'user-message text-right' : 'bot-message'}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="user-input flex">
        {/* the input comes takes the value as e and onchanging the input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask SmartPick anything..."
          className="flex-grow border rounded p-2"
        />
        {/* clicking send btn will trigger handlesend */}
        <button onClick={handleSend} className="ml-2 bg-blue-800 text-white p-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
