import caesarAvatar from '../assets/caesar.png';

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
                <img
                    src={caesarAvatar}
                    alt=""
                    className="avatarImg"
                />
            </div>

            <div className="botBubbleWrap">
                <div className="botAccentPip" />
                <div className="bubble bot">{text || 'Chatbot…'}</div>
            </div>
        </div>
    );
}

export default MessageRow;
