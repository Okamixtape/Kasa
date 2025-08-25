import React from 'react';
import Map from '../Map';
import './Location.css';

const Location = ({ logement }) => {
  return (
    <div className="location-section">
      <h3>Localisation</h3>
      <p>{logement.location}</p>
      <Map coordinates={logement.coordinates} locationName={logement.title} />
    </div>
  );
};

export default Location;
