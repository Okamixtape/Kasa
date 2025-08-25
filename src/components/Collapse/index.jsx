import React, { useState, useRef } from 'react';
import './_collapse.scss';

const Collapse = ({ title, text }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <section className="collapse__item">
            <button
                className="collapse__titleWrapper"
                onClick={toggleCollapse}
                aria-expanded={isOpen}
                aria-controls={`collapse-content-${title.replace(/\s/g, '-')}`}
            >
                <h2 className="collapse__title">{title}</h2>
                <span className={`collapse__icon ${isOpen ? 'open' : ''}`} />
            </button>
            <div
                id={`collapse-content-${title.replace(/\s/g, '-')}`}
                ref={contentRef}
                className={`collapse__content-wrapper ${isOpen ? 'open' : ''}`}
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
                        typeof text === 'string' ? <p>{text}</p> : text
                    )}
                </div>
            </div>
        </section>
    );
};

export default Collapse;