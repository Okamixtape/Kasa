import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Error extends Component {
    render() {
        return (
            <div className="error">
                <h2 className="error__404">404</h2>
                <p className="error__text">Oups ! La page que vous demandez n'existe pas.</p>
                <NavLink to="/" className="error__homeLink">
                    Retourner sur la page d’accueil
                </NavLink>
            </div>
        );
    }
}

export default Error;