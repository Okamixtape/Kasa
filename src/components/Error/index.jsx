import React, { Component } from "react";
import { Link } from "react-router-dom";

class Error extends Component {
    render() {
        return (
            <div className="error">
                <h2 className="error__404">404</h2>
                <p className="error__text">Oups ! La page que vous demandez n'existe pas.</p>
                <Link to="/home" className="error__homeLink">
                    Retourner sur la page d’accueil
                </Link>
            </div>
        );
    }
}

export default Error;