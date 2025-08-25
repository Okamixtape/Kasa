import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './_back-link.scss';

const BackLink = () => {
    return (
        <Link to="/" className="back-link">
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>Retour à l'accueil</span>
        </Link>
    );
};

export default BackLink;
