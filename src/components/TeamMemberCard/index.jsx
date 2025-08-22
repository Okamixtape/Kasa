import React from 'react';
import './_team-member-card.scss';

const TeamMemberCard = ({ name, role, imageUrl }) => {
    return (
        <div className="team-member-card">
            <img src={imageUrl} alt={`Portrait de ${name}`} className="team-member-card__image" />
            <h3 className="team-member-card__name">{name}</h3>
            <p className="team-member-card__role">{role}</p>
        </div>
    );
};

export default TeamMemberCard;
