import React, { Component } from "react";
import arrow from '../../assets/arrowDown.png';

export class Collapse extends Component {
    constructor(props) {
        super(props);

        // Élément de liste Collapse fermé par défaut
        this.state = { open: false };
    }

    // Gestion de l'ouverture et de la fermeture des listes
    toggleCollapse = () => {
        this.setState((prevState) => ({
            open: !prevState.open
        }));
    };

    render() {
        

        return (
            <section className="collapse__item" onClick={this.toggleCollapse}>
                <div className="collapse__titleWrapper">
                    <h2 className="collapse__title">{this.props.title}</h2>
                    <img
                        className={`collapse__icon ${this.state.open ? 'open' : ''}`}
                        src={arrow}
                        alt="Afficher le contenu"
                    />
                </div>
                <div className="collapse__text" style={{ display: this.state.open ? 'block' : 'none' }}>
                    {Array.isArray(this.props.text) ? (
                        <ul className="collapse__list">
                            {this.props.text.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>{this.props.text}</p>
                    )}
                </div>
            </section>
        );
    }
}

export default Collapse;