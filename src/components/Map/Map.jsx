import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import customMarkerIcon from '../../assets/redLogo.png';
import './Map.css';

// Création de l'icône personnalisée
const customIcon = new L.Icon({
  iconUrl: customMarkerIcon,
  iconSize: [25, 41], // Taille de l'icône
  iconAnchor: [12, 41], // Point de l'icône qui correspondra à la position du marqueur
  popupAnchor: [1, -34], // Point à partir duquel la popup doit s'ouvrir par rapport à l'iconAnchor
});

const Map = ({ coordinates, locationName }) => {
  if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
    return <div>Les coordonnées de géolocalisation ne sont pas disponibles pour ce logement.</div>;
  }

  const position = [coordinates.latitude, coordinates.longitude];

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="map-container">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          {locationName}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
