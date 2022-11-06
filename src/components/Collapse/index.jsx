import React, { Component } from "react";
import arrowDown from '../../assets/arrowDown.png';
import arrowUp from '../../assets/arrowUp.png';

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
        // Gestion des flêches à l'ouverture ou à la fermeture des listes
        const arrowDirection = this.state.open ? arrowUp : arrowDown;

        return (
            <section className="collapse__item" onClick={this.toggleCollapse}>
                <div className="collapse__titleWrapper">
                    <h2 className="collapse__title">{this.props.title}</h2>
                    <img className="collapse__icon" src={arrowDirection} alt="" />
                </div>
                <p className="collapse__text" style={{ display: this.state.open ? 'block' : 'none' }}>{this.props.text}</p>
            </section>
        );
    }
}

export default Collapse;