import { useEffect, useRef } from 'react';
import MessageRow from './MessageRow';
import TypingIndicator from './TypingIndicator';

function ChatView({ messages, loading }) {
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    return (
        <div className="chatShell">
            <div className="ruleLine" />

            {messages.map((m, idx) => (
                <MessageRow key={idx} role={m.role} text={m.text} />
            ))}

            {loading && <MessageRow role="bot" text={<TypingIndicator />}  />}

            <div className="ruleLine" />
            <div ref={endRef} />
        </div>
    );
}

export default ChatView;
