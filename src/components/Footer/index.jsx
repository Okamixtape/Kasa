import React, { Component } from "react";
import whiteLogo from "../../assets/whiteLogo.png";

export class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <img className="footer__logo" src={whiteLogo} alt="logo de Kasa" />
                <p className="footer__copyright">© 2020 Kasa. All rights reserved</p>
            </footer>
        );
    }
}

export default Footer;