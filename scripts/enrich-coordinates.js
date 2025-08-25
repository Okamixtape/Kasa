const fs = require('fs');
const path = require('path');
const axios = require('axios');

const logementsPath = path.join(__dirname, '../src/data/logements.json');
const logements = require(logementsPath);

// Function to add a small random offset to coordinates
const randomizeCoordinates = (lat, lon) => {
  // Offset in degrees (approx. up to 500 meters)
  const latOffset = (Math.random() - 0.5) * 0.009;
  const lonOffset = (Math.random() - 0.5) * 0.009;
  return { latitude: lat + latOffset, longitude: lon + lonOffset };
};

// Function to geocode an address using Nominatim
const reverseGeocode = async (lat, lon) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat,
        lon,
        format: 'json',
        zoom: 18
      },
      headers: {
        'User-Agent': 'Kasa-App/1.0'
      }
    });
    if (response.data && response.data.display_name) {
      return response.data.display_name;
    }
  } catch (error) {
    console.error(`Could not reverse geocode coordinates (${lat}, ${lon}):`, error.message);
  }
  return null;
};

const geocodeAddress = async (address) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'Kasa-App/1.0'
      }
    });
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    }
  } catch (error) {
    console.error(`Could not geocode address "${address}":`, error.message);
  }
  return null;
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const enrichLogements = async () => {
  const updatedLogements = [];

  for (const logement of logements) {
    let newCoords;
    // Standardize coordinate access
    const currentCoords = logement.coordinates;
    const lat = currentCoords ? (currentCoords.lat || currentCoords.latitude) : null;
    const lng = currentCoords ? (currentCoords.lng || currentCoords.longitude) : null;

    if (lat && lng) {
      // Listing has coordinates, just randomize them
      newCoords = randomizeCoordinates(parseFloat(lat), parseFloat(lng));
      console.log(`Randomized coordinates for: ${logement.title}`);
    } else {
      // Listing is missing coordinates, geocode it
      console.log(`Geocoding missing coordinates for: ${logement.title}`);
      const coords = await geocodeAddress(logement.location);
      if (coords) {
        newCoords = randomizeCoordinates(coords.latitude, coords.longitude);
      }
      await delay(1000); // Wait 1 second between API calls to avoid rate-limiting
    }

    let finalLogement = { ...logement, coordinates: newCoords || logement.coordinates };

    if (newCoords) {
      console.log(`Reverse geocoding for: ${logement.title}`);
      const address = await reverseGeocode(newCoords.latitude, newCoords.longitude);
      if (address) {
        finalLogement.address = address;
      }
      await delay(1000); // Wait after each set of operations for a logement
    }

    updatedLogements.push(finalLogement);
  }

  fs.writeFileSync(logementsPath, JSON.stringify(updatedLogements, null, 2));
  console.log('Finished enriching logements data.');
};

enrichLogements();
