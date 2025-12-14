function MessageRow({ role, text }) {
    if (role === 'user') {
        return (
            <div className="row user">
                <div className="bubble user">{text}</div>
            </div>
        );
    }

    // bot style (Caesar)
    return (
        <div className="row bot">
            <div className="avatar" aria-hidden="true">
                {/* Replace this with Caesar head image later */}
                <div className="avatarInner">C</div>
            </div>

            <div className="botBubbleWrap">
                <div className="botAccentPip" />
                <div className="bubble bot">{text || 'Chatbot…'}</div>
            </div>
        </div>
    );
}

export default MessageRow;
