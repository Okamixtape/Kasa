import React, { Component } from "react";

export class HouseCard extends Component {
    render() {
        const tags = this.props.tags;

    return (
        <div key={this.props.id} className="houseCard">
            <div>
                <h3 className="houseCard__title">{this.props.title}</h3>
                <p className="houseCard__location">{this.props.location}</p>
                <div className="houseCard__tags">
                    {tags.map((tag) => (
                    <p className="houseCard__tag" key={tag}>{tag}</p>
                    ))}
                </div>
            </div>
            <div>
                <div className="houseCard__host">
                    <p className="houseCard__name"> {this.props.host.name} </p>
                    <img
                    className="houseCard__picture"
                    src={this.props.host.picture}
                    alt="utilisateur"
                    />
                </div>
                <div className="houseCard__rating">
                    <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M18.645 12L15 0L11.355 12H0L9.27 18.615L5.745 30L15 22.965L24.27 30L20.745 18.615L30 12H18.645Z"
                        fill="#E3E3E3"
                    />
                    </svg>
                    <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M18.645 12L15 0L11.355 12H0L9.27 18.615L5.745 30L15 22.965L24.27 30L20.745 18.615L30 12H18.645Z"
                        fill="#E3E3E3"
                    />
                    </svg>
                    <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M18.645 12L15 0L11.355 12H0L9.27 18.615L5.745 30L15 22.965L24.27 30L20.745 18.615L30 12H18.645Z"
                        fill="#E3E3E3"
                    />
                    </svg>
                    <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M18.645 12L15 0L11.355 12H0L9.27 18.615L5.745 30L15 22.965L24.27 30L20.745 18.615L30 12H18.645Z"
                        fill="#E3E3E3"
                    />
                    </svg>
                    <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M18.645 12L15 0L11.355 12H0L9.27 18.615L5.745 30L15 22.965L24.27 30L20.745 18.615L30 12H18.645Z"
                        fill="#E3E3E3"
                    />
                    </svg>
                    {this.props.rating}
                </div>
            </div>
        </div>
        );
    }
}

export default HouseCard;