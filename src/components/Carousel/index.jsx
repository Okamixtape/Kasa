import React, { useState, useEffect, useCallback } from 'react';
import './_carousel.scss';

const Carousel = ({ pictures, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextPicture = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
        );
    }, [pictures.length]);

    const previousPicture = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? pictures.length - 1 : prevIndex - 1
        );
    }, [pictures.length]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (pictures.length <= 1) return;
            if (e.key === 'ArrowRight') {
                nextPicture();
            } else if (e.key === 'ArrowLeft') {
                previousPicture();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [nextPicture, previousPicture, pictures.length]);

    if (!pictures || pictures.length === 0) {
        return null; 
    }

    const showControls = pictures.length > 1;

    return (
        <div className="carousel" aria-roledescription="carousel" aria-label={`Image gallery for ${title}`}>
            <div className="carousel__inner">
                {pictures.map((picture, index) => (
                    <div
                        className={`carousel__item ${index === currentIndex ? 'active' : ''}`}
                        key={index}
                        aria-hidden={index !== currentIndex}
                    >
                        <img
                            className="carousel__picture"
                            src={picture}
                            alt={`${title} - view ${index + 1}`}
                        />
                    </div>
                ))}
            </div>

            {showControls && (
                <>
                    <button
                        onClick={previousPicture}
                        className="carousel__button carousel__button--prev"
                        aria-label="Previous image"
                    >

                    </button>
                    <button
                        onClick={nextPicture}
                        className="carousel__button carousel__button--next"
                        aria-label="Next image"
                    >

                    </button>
                    <div className="carousel__pagination" aria-hidden="true">
                        {currentIndex + 1} / {pictures.length}
                    </div>
                </>
            )}
        </div>
    );
};

export default Carousel;
