function Header({ onHelp }) {
    return (
        <header className="header">
            <div className="brand">
                {/* Replace this with your real logo image later */}
                <div className="brandLogo">Talking<br/>Caesar</div>
            </div>

            <div className="headerSpacer" />

            <button className="helpBtn" onClick={onHelp} type="button">
                Help
            </button>
        </header>
    );
}

export default Header;
