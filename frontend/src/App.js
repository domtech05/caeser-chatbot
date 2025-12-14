import { useState } from 'react';
import './styles/theme.css';
import './styles/app.css';

import Header from './components/Header';
import SideButton from './components/SideButton';
import ChatView from './components/ChatView';
import Composer from './components/Composer';
import { sendMessage } from './api/chatApi';

function App() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Chatbot…' },
    { role: 'bot', text: 'Chatbot…' }
  ]);
  const [loading, setLoading] = useState(false);

  async function handleSend(text) {
    setLoading(true);
    setMessages((prev) => [...prev, { role: 'user', text }]);

    try {
      const data = await sendMessage(text);
      setMessages((prev) => [...prev, { role: 'bot', text: data.reply || 'Chatbot…' }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry — something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  }

  function onHelp() {
    alert("Help: Ask Caesar about Rome, the Senate, Gaul, or the Rubicon.");
  }

  function onPause() {
    alert("Pause clicked (you can wire this to a real feature later).");
  }

  return (
      <div className="app">
        <Header onHelp={onHelp} />

        <main className="main">
          <SideButton onClick={onPause} />
          <ChatView messages={messages} loading={loading} />
        </main>

        <Composer onSend={handleSend} disabled={loading} />
      </div>
  );
}

export default App;
