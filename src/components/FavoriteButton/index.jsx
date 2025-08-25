import React, { useState, useEffect } from 'react';
import './_favoriteButton.scss';
import { ReactComponent as HeartIcon } from '../../assets/heart-icon.svg';

const FavoriteButton = ({ logementId, initialIsFavorite, onToggle }) => {
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

    useEffect(() => {
        setIsFavorite(initialIsFavorite);
    }, [initialIsFavorite]);
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token');



    const handleToggleFavorite = async (e) => {
        e.preventDefault(); // Prevent navigation when clicking the button on a card
        if (isLoading || !token) return;

        setIsLoading(true);
        const method = isFavorite ? 'DELETE' : 'POST';
        const url = isFavorite
            ? `${process.env.REACT_APP_API_URL}/me/favorites/${logementId}`
            : `${process.env.REACT_APP_API_URL}/me/favorites`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: isFavorite ? null : JSON.stringify({ logementId }),
            });

            if (response.ok) {
                const newIsFavorite = !isFavorite;
                setIsFavorite(newIsFavorite);
                if (onToggle) {
                    onToggle(logementId, newIsFavorite);
                }
            } else {
                console.error('Failed to update favorite status');
            }
        } catch (error) {
            console.error('Error updating favorite status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) return null; // Don't show the button if the user is not logged in

    return (
        <button
            onClick={handleToggleFavorite}
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            disabled={isLoading}
        >
            <HeartIcon />
        </button>
    );
};

export default FavoriteButton;