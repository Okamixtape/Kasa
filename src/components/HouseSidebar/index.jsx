import React from 'react';
import AverageRating from '../AverageRating';
import BookingWidget from '../BookingWidget';
import { useAuth } from '../../context/AuthContext';
import './_house-sidebar.scss';

const HouseSidebar = ({ host, reviews, houseId }) => {
    const { user } = useAuth();
    const hostNameParts = host.name ? host.name.split(' ') : ['Hôte', 'Inconnu'];

    return (
        <div className="house-sidebar">
            <div className="house-sidebar__host-info">
                <div className="house-sidebar__host">
                    <p className="house-sidebar__name">
                        {hostNameParts[0]} <br />
                        {hostNameParts.slice(1).join(' ')}
                    </p>
                    <img
                        className="house-sidebar__picture"
                        src={host.picture}
                        alt={`Portrait de ${host.name}`}
                    />
                </div>
                <div className="house-sidebar__rating">
                    <AverageRating reviews={reviews} />
                </div>
            </div>
            {user && <BookingWidget houseId={houseId} />}
        </div>
    );
};

export default HouseSidebar;
