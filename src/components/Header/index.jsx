import React, { Component } from "react";
import redLogo from "../../assets/redLogo.png";

class Header extends Component {
    render() {
        return (
            <header className="header">
                <img className="header__logo" src={redLogo} alt="logo de Kasa" />
                <nav className="header__navbar">
                    <ul className="header__navbarList">
                        <li className="header__navbarListItem">
                            <a className="header__navbarListAnchor" href="/">Accueil</a>
                        </li>
                        <li className="header__navbarListItem">
                            <a className="header__navbarListAnchor" href="/">À propos</a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;