function SideButton({ onClick }) {
    return (
        <button className="sideBtn" onClick={onClick} type="button" aria-label="Pause">
            <div className="bars" aria-hidden="true">
                <span />
                <span />
            </div>
        </button>
    );
}

export default SideButton;
