import React, { useState } from 'react';
import RatingInput from '../RatingInput'; // We will create this component next
import './_review-form.scss';

const ReviewForm = ({ logementId, onReviewSubmit, token }) => {
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');
    const [ratings, setRatings] = useState({
        cleanliness: 0,
        communication: 0,
        checkin: 0,
        accuracy: 0,
        location: 0,
        value: 0,
    });

    const handleRatingChange = (name, value) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const overallRating = Object.values(ratings).reduce((acc, rating) => acc + rating, 0) / Object.values(ratings).length;
        
        const newReview = {
            logementId,
            review: {
                author,
                comment,
                rating: Math.round(overallRating * 10) / 10, // Rounded to one decimal place
                date: new Date().toISOString(),
                detailedRating: ratings,
            },
        };

        fetch(`${process.env.REACT_APP_API_URL}/logements/${logementId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newReview.review)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit review');
            }
            return response.json();
        })
        .then(data => {
            onReviewSubmit(data); // Pass the new review back to the parent
            // Reset form
            setAuthor('');
            setComment('');
            setRatings({ cleanliness: 0, communication: 0, checkin: 0, accuracy: 0, location: 0, value: 0 });
        })
        .catch(error => {
            console.error('Error submitting review:', error);
            alert('Erreur lors de l\'envoi de l\'avis. Veuillez vous connecter et réessayer.');
        });
    };

    return (
        <form className="reviewForm" onSubmit={handleSubmit}>
            <h3>Laissez un avis</h3>
            <input
                type="text"
                placeholder="Votre nom"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <textarea
                placeholder="Votre commentaire"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
            />
            <div className="reviewForm__detailed-ratings">
                <RatingInput label="Propreté" name="cleanliness" value={ratings.cleanliness} onChange={handleRatingChange} />
                <RatingInput label="Communication" name="communication" value={ratings.communication} onChange={handleRatingChange} />
                <RatingInput label="Arrivée" name="checkin" value={ratings.checkin} onChange={handleRatingChange} />
                <RatingInput label="Précision" name="accuracy" value={ratings.accuracy} onChange={handleRatingChange} />
                <RatingInput label="Emplacement" name="location" value={ratings.location} onChange={handleRatingChange} />
                <RatingInput label="Rapport qualité-prix" name="value" value={ratings.value} onChange={handleRatingChange} />
            </div>
            <button type="submit">Envoyer</button>
        </form>
    );
};

export default ReviewForm;
