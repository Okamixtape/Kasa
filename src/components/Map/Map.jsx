import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './Map.css';
import '../GlobalMap/GlobalMap.css';


const Map = ({ coordinates, locationName, price }) => {
  if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
    return <div>Les coordonnées de géolocalisation ne sont pas disponibles pour ce logement.</div>;
  }

    const position = [coordinates.latitude, coordinates.longitude];

    const priceMarker = L.divIcon({
    className: 'price-marker',
    html: `<span>${price}€</span>`,
    iconSize: null, // Permet au CSS de définir la taille
    popupAnchor: [0, -20], // Positionne la popup au-dessus de l'ancre
    iconAnchor: [0, 0], // Aligne l'ancre avec la transformation CSS
  });

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="map-container">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={priceMarker}>
        <Popup className="map-popup">
          {locationName}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
