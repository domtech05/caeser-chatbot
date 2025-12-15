import logo from '../assets/logo.png';

function Header({ onHelp }) {
    return (
        <header className="header">
            <div className="brand">
                <img
                    src={logo}
                    alt="Talking Caesar logo"
                    className="headerLogo"
                />
            </div>

            <div className="headerSpacer" />

            <button className="helpBtn" onClick={onHelp} type="button">
                Help
            </button>
        </header>
    );
}

export default Header;
