import { useState, useRef } from 'react';
import '../styles/index.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [askedForBudget, setAskedForBudget] = useState(false);
  const inputRef = useRef(null);

  const responses = {
    greetings: [
      "Hi there! How can I assist you today?",
      "Hello! Looking for some tech recommendations?",
      "Hey! Ask me anything about gadgets, laptops, or smartphones.",
      "Hi! Ready to find the perfect tech for you?",
      "Hello! Let me know how I can help you today.",
    ],
    smartphones: {
      under500: [
        "Google Pixel 6a - Great performance and excellent camera quality.",
        "Samsung Galaxy A54 - Vibrant display and solid mid-range specs.",
        "OnePlus Nord CE 3 Lite - Budget-friendly with decent gaming performance.",
        "Xiaomi Poco X5 Pro - Excellent display and long battery life.",
        "Motorola Edge 40 Neo - Stylish design with good everyday performance.",
      ],
      under1000: [
        "OnePlus 11 - Powerful performance with a sleek design.",
        "Google Pixel 7 - Best-in-class camera and clean Android experience.",
        "Samsung Galaxy S21 FE - Great value for flagship-like features.",
        "iPhone 13 - Reliable performance and exceptional camera system.",
        "Xiaomi 13 Pro - Outstanding build and top-tier specs.",
      ],
      above1000: [
        "iPhone 15 Pro Max - Unmatched performance and ecosystem integration.",
        "Samsung Galaxy S23 Ultra - Premium device with incredible camera and S Pen.",
        "Sony Xperia 1 V - Stunning 4K display and pro-grade cameras.",
        "Asus ROG Phone 7 Ultimate - Best for mobile gaming enthusiasts.",
        "Google Pixel Fold - Innovative foldable with great multitasking capabilities.",
      ],
    },
    laptops: {
      under800: [
        "Acer Swift 3 - Great performance for everyday use.",
        "Lenovo IdeaPad Flex 5 - 2-in-1 convertible with good specs.",
        "HP Pavilion 15 - Solid productivity laptop for students and professionals.",
        "Dell Inspiron 14 - Reliable and affordable for basic tasks.",
        "ASUS VivoBook 15 - Decent performance for a budget laptop.",
      ],
      under1500: [
        "MacBook Air M2 - Excellent portability and performance.",
        "Dell XPS 13 - Premium ultrabook with stunning build quality.",
        "ASUS ROG Zephyrus G14 - Compact powerhouse for gaming and productivity.",
        "HP Envy x360 - Great 2-in-1 laptop with versatile features.",
        "Microsoft Surface Laptop 5 - Sleek and highly responsive touch screen.",
      ],
      above1500: [
        "Dell XPS 15 - Powerful for content creators and professionals.",
        "Razer Blade 16 - High-end gaming laptop with premium build.",
        "MacBook Pro 16-inch (M2 Pro) - Top-tier performance for heavy workloads.",
        "Alienware x17 R2 - Premium gaming laptop with incredible specs.",
        "Lenovo ThinkPad X1 Carbon Gen 10 - Built for business with durability and power.",
      ],
    },
    gadgets: {
      smartwatches: [
        "Apple Watch Ultra - Ultimate fitness tracker and smartwatch.",
        "Samsung Galaxy Watch 6 - Stylish design with advanced features.",
        "Garmin Fenix 7 - Built for adventurers with exceptional battery life.",
        "Fitbit Sense 2 - Great for health tracking and everyday use.",
        "Amazfit GTR 4 - Affordable yet feature-packed smartwatch.",
      ],
      earbuds: [
        "AirPods Pro 2nd Gen - Great sound quality and noise cancellation.",
        "Sony WF-1000XM5 - Premium earbuds with excellent noise cancellation.",
        "Jabra Elite 7 Pro - High-quality sound and comfort.",
        "Bose QuietComfort Earbuds 2 - Excellent sound and noise cancellation.",
        "Samsung Galaxy Buds 2 Pro - Great value with good sound and fit.",
      ],
      portableSpeakers: [
        "Bose SoundLink Revolve+ - Rich 360-degree sound.",
        "JBL Charge 5 - Waterproof and loud with strong bass.",
        "Sonos Roam - Compact, portable, and great sound.",
        "UE Boom 3 - Loud and durable with long battery life.",
        "Sony SRS-XB43 - Powerful bass and excellent outdoor performance.",
      ],
    },
    default: [
      "Can you please specify a budget for the smartphone, laptop, or gadget you're looking for?",
      "I can help you find the best options. Please tell me your budget range.",
      "Could you clarify your budget? I can suggest devices based on the budget you provide.",
      "Tell me your budget, and I will recommend the best tech for you!",
      "I can help you choose the best option based on your budget. What’s your price range?",
    ],
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    setTimeout(() => {
      let response;

      const lowerInput = input.toLowerCase();

      // Check for greetings
      if (
        lowerInput.includes('hi') ||
        lowerInput.includes('hello') ||
        lowerInput.includes('hey') ||
        lowerInput.includes('good morning') ||
        lowerInput.includes('good evening')
      ) {
        response = responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
      }
      // Check for keywords (smartphone, laptop, gadget)
      else if (lowerInput.includes('smartphone') || lowerInput.includes('phone')) {
        if (!lowerInput.includes('under') && !lowerInput.includes('over')) {
          response = "Can you please specify your budget for smartphones? (e.g., under $500, $1000, or over $1000)";
        } else {
          response = getDeviceResponse('smartphones');
        }
      } else if (lowerInput.includes('laptop') || lowerInput.includes('notebook')) {
        if (!lowerInput.includes('under') && !lowerInput.includes('over')) {
          response = "Can you please specify your budget for laptops? (e.g., under $800, $1500, or over $1500)";
        } else {
          response = getDeviceResponse('laptops');
        }
      } else if (lowerInput.includes('gadget') || lowerInput.includes('tech')) {
        response = getDeviceResponse('gadgets');
      } else {
        response = responses.default[Math.floor(Math.random() * responses.default.length)];
      }

      const botResponse = { text: response, sender: 'bot' };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);

    setInput('');
  };

  const getDeviceResponse = (category) => {
    if (input.toLowerCase().includes('500')) {
      return responses[category].under500[Math.floor(Math.random() * responses[category].under500.length)];
    } else if (input.toLowerCase().includes('1000')) {
      return responses[category].under1000[Math.floor(Math.random() * responses[category].under1000.length)];
    } else if (input.toLowerCase().includes('800')) {
      return responses[category].under800[Math.floor(Math.random() * responses[category].under800.length)];
    }
    if (input.toLowerCase().includes('under')) {
      if (input.toLowerCase().includes('500')) {
        return responses[category].under500[Math.floor(Math.random() * responses[category].under500.length)];
      } else if (input.toLowerCase().includes('1000')) {
        return responses[category].under1000[Math.floor(Math.random() * responses[category].under1000.length)];
      } else if (input.toLowerCase().includes('800')) {
        return responses[category].under800[Math.floor(Math.random() * responses[category].under800.length)];
      }
    } else if (input.toLowerCase().includes('over')) {
      if (category === 'smartphones') {
        return responses.smartphones.above1000[Math.floor(Math.random() * responses.smartphones.above1000.length)];
      } else if (category === 'laptops') {
        return responses.laptops.above1500[Math.floor(Math.random() * responses.laptops.above1500.length)];
      }
    }
    return "Can you clarify your budget? For example, under $500, $1000, or over $1000 for smartphones.";
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask SmartPick anything..."
          className="flex-grow border rounded p-2"
        />
        <button onClick={handleSend} className="ml-2 bg-blue-800 text-white p-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
