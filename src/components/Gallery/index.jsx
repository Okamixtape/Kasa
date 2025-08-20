import React from 'react';
import GalleryCard from '../GalleryCard';
import './style.scss';

const Gallery = ({ filteredData }) => {

    return (
        <div className="gallery">
            {filteredData.length > 0 ? (
                filteredData.map(house => (
                    <GalleryCard
                        key={house.id}
                        id={house.id}
                        cover={house.cover}
                        title={house.title}
                    />
                ))
            ) : (
                <p className="gallery__no-results">Aucun logement ne correspond à votre recherche.</p>
            )}
        </div>
    );
};

export default Gallery;