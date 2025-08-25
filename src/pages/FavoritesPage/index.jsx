import React, { useState, useEffect } from 'react';
import Meta from '../../components/Meta';
import Gallery from '../../components/Gallery';
import BackLink from '../../components/BackLink';
import './_favoritesPage.scss';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            return;
        }

                fetch(`${process.env.REACT_APP_API_URL}/me/favorites`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                setFavorites(data);
            }
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Error fetching favorites:', error);
            setIsLoading(false);
        });
    }, [token]);

        const handleToggleFavorite = (logementId, isFavorite) => {
        if (!isFavorite) {
            setFavorites(currentFavorites => 
                currentFavorites.filter(fav => fav.id !== logementId)
            );
        }
    };

    const favoriteIds = new Set(favorites.map(fav => fav.id));

    return (
        <>
            <Meta 
                title="Mes Favoris"
                description="Consultez la liste de vos logements favoris sur Kasa."
            />
            <main className="kasa__wrapper fade-in favorites-page">
                <BackLink />
                <h1 className="favorites-page__title">Mes Favoris</h1>
                {isLoading ? (
                    <p>Chargement de vos favoris...</p>
                ) : favorites.length > 0 ? (
                    <Gallery filteredData={favorites} favorites={favoriteIds} onToggleFavorite={handleToggleFavorite} />
                ) : (
                    <p className="favorites-page__no-results">Vous n'avez pas encore de favoris. Parcourez nos logements et cliquez sur le cœur pour en ajouter !</p>
                )}
            </main>
        </>
    );
};

export default FavoritesPage;