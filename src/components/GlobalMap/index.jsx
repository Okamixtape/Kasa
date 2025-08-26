import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import L from 'leaflet';

// CSS for leaflet and markercluster
import 'leaflet/dist/leaflet.css';
import '@changey/react-leaflet-markercluster/dist/styles.min.css';
import './GlobalMap.css';
import HouseCard from '../HouseCard'; // Import custom styles for markers


const FitBounds = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (points && points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [points, map]);

  return null;
};

const GlobalMap = ({ logements }) => {
  const navigate = useNavigate();

  if (!logements || logements.length === 0) {
    return <div>Aucun logement à afficher sur la carte.</div>;
  }

  // Fallback pour les coordonnées manquantes
  const getCoordinates = (logement) => {
    if (logement.coordinates && logement.coordinates.latitude) {
      return [logement.coordinates.latitude, logement.coordinates.longitude];
    }
    // Logique de secours très basique pour la démo
    const location = logement.location.toLowerCase();
    if (location.includes('paris')) return [48.8566, 2.3522];
    if (location.includes('lyon')) return [45.7640, 4.8357];
    if (location.includes('marseille')) return [43.2965, 5.3698];
    if (location.includes('lille')) return [50.6292, 3.0573];
    return null; // Ne pas afficher si aucune coordonnée n'est trouvée
  };

  const logementsWithCoords = logements.map(l => ({
    ...l,
    position: getCoordinates(l)
  })).filter(l => l.position !== null);

  // Centrer la carte sur la France métropolitaine par défaut
    const points = logementsWithCoords.map(l => l.position);

  // Centrer la carte sur la France métropolitaine par défaut
  const defaultCenter = [46.603354, 1.888334];

  return (
    <MapContainer className="global-map" center={defaultCenter} zoom={6} scrollWheelZoom={false}>
            <FitBounds points={points} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
            <MarkerClusterGroup
        zoomToBoundsOnClick={true}
        showCoverageOnHover={true}
        spiderfyOnMaxZoom={true}
      >
        {logementsWithCoords.map(logement => {
                              const priceMarker = L.divIcon({
            className: 'price-marker',
            html: `<span>${logement.price}€</span>`,
            iconSize: null, // Permet au CSS de définir la taille
            popupAnchor: [0, -20], // Positionne la popup au-dessus de l'ancre
            iconAnchor: [0, 0], // Aligne l'ancre avec la transformation CSS
          });

          return (
          <Marker 
            key={logement.id} 
            position={logement.position} 
            icon={priceMarker}
          >
            <Popup className="map-popup">
              <div onClick={() => navigate(`/house/${logement.id}`)} style={{ cursor: 'pointer' }}>
                <HouseCard
                  id={logement.id}
                  title={logement.title}
                  location={logement.address || logement.location}
                  price={logement.price}
                  tags={logement.tags}
                  titleAs="h4"
                />
              </div>
            </Popup>
          </Marker>
        )})}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default GlobalMap;
