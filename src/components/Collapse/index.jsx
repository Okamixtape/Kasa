import React, { useState, useRef } from 'react';
import './_collapse.scss';
import arrow from '../../assets/arrowDown.png';

const Collapse = ({ title, text }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <section className="collapse__item">
            <div className="collapse__titleWrapper" onClick={toggleCollapse}>
                <h2 className="collapse__title">{title}</h2>
                <img
                    className={`collapse__icon ${isOpen ? 'open' : ''}`}
                    src={arrow}
                    alt="Afficher le contenu"
                />
            </div>
            <div
                ref={contentRef}
                className="collapse__content-wrapper"
                style={{ maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : '0px' }}
            >
                <div className="collapse__text">
                    {Array.isArray(text) ? (
                        <ul className="collapse__list">
                            {text.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>{text}</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Collapse;