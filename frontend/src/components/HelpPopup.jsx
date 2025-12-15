function HelpPopup({ onClose }) {
    return (
        <div className="helpOverlay" onClick={onClose}>
            <div
                className="helpPopup"
                onClick={(e) => e.stopPropagation()} // stop closing when clicking inside
            >
                <h2>Help</h2>
                <p>
                    You can ask Julius Caesar about his life, Roman history,
                    famous battles, or key events such as the crossing of the Rubicon.
                </p>

                <ul>
                    <li>“Why did you cross the Rubicon?”</li>
                    <li>“What was life like in Rome?”</li>
                    <li>“Tell me about the Senate.”</li>
                </ul>

                <button className="helpCloseBtn" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default HelpPopup;
