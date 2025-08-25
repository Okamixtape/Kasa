const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');

const logementsFilePath = path.join(__dirname, 'logements.json');
const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';

// Politique d'utilisation de Nominatim : 1 requête/seconde max
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const migrateCoordinates = async () => {
    console.log('Démarrage de la migration des coordonnées avec Nominatim...');

    try {
        const data = await fs.readFile(logementsFilePath, 'utf8');
        const logements = JSON.parse(data);

        let updatedCount = 0;
        const updatedLogements = [];

        for (const [index, logement] of logements.entries()) {
            if (logement.coordinates && logement.coordinates.latitude && logement.coordinates.longitude) {
                console.log(`- (${index + 1}/${logements.length}) Ignoré : '${logement.title}' (coordonnées déjà présentes).`);
                updatedLogements.push(logement);
                continue;
            }

            console.log(`- (${index + 1}/${logements.length}) Traitement de : '${logement.title}'...`);
            
            const address = logement.location;

            try {
                const response = await axios.get(NOMINATIM_API_URL, {
                    params: {
                        q: address,
                        format: 'json',
                        limit: 1
                    },
                    headers: {
                        'User-Agent': 'Kasa-App/1.0 (pour un projet éducatif)' // Important pour la politique de Nominatim
                    }
                });

                if (response.data && response.data.length > 0) {
                    const { lat, lon } = response.data[0];
                    logement.coordinates = {
                        latitude: parseFloat(lat),
                        longitude: parseFloat(lon),
                    };
                    updatedLogements.push(logement);
                    updatedCount++;
                    console.log(`  -> Succès : Coordonnées trouvées (${lat}, ${lon}) pour '${address}'`);
                } else {
                    console.warn(`  -> Avertissement : Impossible de géocoder l'adresse '${address}'.`);
                    updatedLogements.push(logement);
                }
            } catch (apiError) {
                console.error(`  -> Erreur API pour l'adresse '${address}':`, apiError.message);
                updatedLogements.push(logement);
            }

            // Respecter la politique d'utilisation de Nominatim
            await delay(1000);
        }

        if (updatedCount > 0) {
            console.log(`\nMigration terminée. ${updatedCount} logement(s) mis à jour.`);
            await fs.writeFile(logementsFilePath, JSON.stringify(updatedLogements, null, 2));
            console.log('Le fichier logements.json a été sauvegardé avec les nouvelles données.');
        } else {
            console.log('\nAucun logement à mettre à jour.');
        }

    } catch (error) {
        console.error('Une erreur est survenue lors de la migration :', error);
    }
};

migrateCoordinates();
