import { useState } from 'react';
import './styles/theme.css';
import './styles/app.css';

import Header from './components/Header';
import ChatView from './components/ChatView';
import Composer from './components/Composer';
import { sendMessage } from './api/chatApi';
import HelpPopup from './components/HelpPopup'

function App() {
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            text: "Salve. I am Gaius Julius Caesar. Ask me about Rome, Gaul, the Senate, or the Rubicon.",
        }
    ]);

    const [loading, setLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

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
    setShowHelp((prev) => !prev);
  }

  return (
      <div className="app">
        <Header onHelp={onHelp} />

        <main className="main">
          <ChatView messages={messages} loading={loading} />
        </main>

        <Composer onSend={handleSend} disabled={loading} />

        {showHelp && <HelpPopup onClose={() => setShowHelp(false)} />}

      </div>
  );
}

export default App;
