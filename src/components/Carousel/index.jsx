import React, { Component } from "react";

export class Carousel extends Component {
    constructor() {
        super();

        // Initialisation de l'index à 0
        this.state = { index: 0 };
    }

    // Gestion boucle d'array du dernier élément au premier élément
    nextPicture() {
        // Si on atteint dernier élément d'array index = 0 sinon index +1
        this.state.index === this.props.pictures.length - 1
        ? this.setState({ index: 0 })
        : this.setState({ index: this.state.index + 1 });
    }

    // Gestion boucle d'array du premier élément au dernier élément
    previousPicture() {
        this.state.index === 0 // Si on atteint premier élément d'array index = dernier élément d'array, sinon index -1
        ? this.setState({ index: this.props.pictures.length - 1 })
        : this.setState({ index: this.state.index - 1 });
    }

    // Gestion d'affichage si une image disponible
    renderPictureWithoutIcon() {
        return (
            <div className="carousel">
                <img
                className="carousel__picture"
                src={this.props.pictures}
                alt=""
                key={this.props.pictures}
                />
            </div>
        );
    }

    // Gestion d'affichage si plusieurs images disponibles
    renderPictureWithIcon() {
        return (
            <div className="carousel">
                <img
                className="carousel__picture"
                src={this.props.pictures[this.state.index]}
                alt=""
                />

                <svg
                onClick={() => this.previousPicture()}
                className="carousel__leftIcon"
                width="48"
                height="80"
                viewBox="0 0 48 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M47.04 7.78312L39.92 0.703125L0.359985 40.3031L39.96 79.9031L47.04 72.8231L14.52 40.3031L47.04 7.78312Z"
                    fill="white"
                />
                </svg>
                <svg
                onClick={() => this.nextPicture()}
                className="carousel__rightIcon"
                width="48"
                height="80"
                viewBox="0 0 48 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M47.04 7.78312L39.92 0.703125L0.359985 40.3031L39.96 79.9031L47.04 72.8231L14.52 40.3031L47.04 7.78312Z"
                    fill="white"
                />
                </svg>
            </div>
        );
    }

    render() {
        // Si plusieurs images disponible on affiche les flêches de navigation sinon on affiche juste l'image disponible
        return this.props.pictures.length > 1
            ? this.renderPictureWithIcon()
            : this.renderPictureWithoutIcon();
    }
}

export default Carousel;
