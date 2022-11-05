import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import redLogo from "../../assets/redLogo.png";

class Header extends Component {
    render() {
        return (
            <header className="header">
                <img className="header__logo" src={redLogo} alt="logo de Kasa" />
                <nav className="header__navbar">
                    <ul className="header__navbarList">
                        <li className="header__navbarListItem">
                            <NavLink className="header__navbarListAnchor" to="/">Accueil</NavLink>
                        </li>
                        <li className="header__navbarListItem">
                            <NavLink className="header__navbarListAnchor" to="/about">À propos</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;