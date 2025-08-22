const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const logements = require('./logements.json');
const app = express();
const port = 3001; // Corrected port to match frontend calls

// In a real app, use a secure, environment-specific secret
const JWT_SECRET = 'your-super-secret-key-that-is-long-and-secure';
const usersFilePath = path.join(__dirname, 'users.json');
const bookingsFilePath = path.join(__dirname, 'bookings.json');
const logementsFilePath = path.join(__dirname, 'logements.json');

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// --- Helper function to read users ---
const readUsers = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
};

// --- Helper function to read bookings ---
const readBookings = () => {
    try {
        const data = fs.readFileSync(bookingsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading bookings file:', error);
        return [];
    }
};

// --- Helper function to write bookings ---
const writeBookings = (bookings) => {
    try {
        fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2));
    } catch (error) {
        console.error('Error writing to bookings file:', error);
    }
};

// --- Helper function to write logements ---
const writeLogements = (logements) => {
    try {
        fs.writeFileSync(logementsFilePath, JSON.stringify(logements, null, 2));
    } catch (error) {
        console.error('Error writing to logements file:', error);
    }
};

// --- Helper function to write users ---
const writeUsers = (users) => {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error writing to users file:', error);
    }
};

// --- Multer Configuration ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads')); // Use absolute path
    },
    filename: function (req, file, cb) {
        // Sanitize filename to remove special characters
        const sanitized = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
        cb(null, Date.now() + '-' + sanitized);
    }
});
const upload = multer({ storage: storage });

// --- Middleware to verify token ---
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }

    return next();
};

// --- Logements API Endpoints ---
app.get('/api/logements', (req, res) => {
  res.json(logements);
});

app.post('/api/logements', [verifyToken, upload.array('pictures', 10)], (req, res) => {
        const newListingData = req.body;
    const pictures = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    const cover = pictures.length > 0 ? pictures[0] : '';
        const hostId = req.user.id;
    const hostName = req.user.name;

        if (!newListingData.title || !newListingData.price || !newListingData.location) {
        return res.status(400).json({ message: 'Les informations essentielles du logement sont manquantes.' });
    }

    const allLogements = require('./logements.json'); 

    const newLogement = {
        id: `logement-${Date.now()}`,
        ...newListingData,
        pictures,
        cover,
        tags: newListingData.propertyType ? [newListingData.propertyType] : [],
        host: {
            name: hostName,
            picture: '', // Default picture, can be updated later
            id: hostId
        },
        rating: "0", 
        reviews: [], 
    };

    allLogements.push(newLogement);
    writeLogements(allLogements);

    res.status(201).json(newLogement);
});

app.get('/api/logements/:id', (req, res) => {
  const { id } = req.params;
  const logement = logements.find(l => l.id === id);
  if (logement) {
    res.json(logement);
  } else {
    res.status(404).json({ message: 'Logement not found' });
  }
});

// --- Auth API Endpoints ---

// Signup
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const users = readUsers();
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
        id: Date.now().toString(), // Simple unique ID
        name,
        email,
        password: hashedPassword,
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'User created successfully' });
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, {
        expiresIn: '1h',
    });

    res.json({ token, userName: user.name });
});



// --- Booking API Endpoint ---
app.post('/api/bookings', verifyToken, (req, res) => {
    const { houseId, startDate, endDate } = req.body;
    const userId = req.user.id; // Extracted from token

    if (!houseId || !startDate || !endDate) {
        return res.status(400).json({ message: 'Informations de réservation manquantes.' });
    }

    // --- Booking Validation ---
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
        return res.status(400).json({ message: 'La date de départ doit être après la date d\'arrivée.' });
    }

    const bookings = readBookings();
    const houseBookings = bookings.filter(b => b.houseId === houseId);

    const isDateConflict = houseBookings.some(booking => {
        const existingStart = new Date(booking.startDate);
        const existingEnd = new Date(booking.endDate);
        // Check for overlap:
        // (start < existingEnd) and (end > existingStart)
        return (start < existingEnd) && (end > existingStart);
    });

    if (isDateConflict) {
        return res.status(409).json({ message: 'Ces dates ne sont pas disponibles.' }); // 409 Conflict
    }
    // --- End Validation ---

    const newBooking = {
        id: `book-${Date.now()}`,
        userId,
        houseId,
        startDate,
        endDate,
        createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    writeBookings(bookings);

    res.status(201).json(newBooking);
});

// --- My Bookings API Endpoint ---
app.get('/api/my-bookings', verifyToken, (req, res) => {
    const userId = req.user.id;
    const allBookings = readBookings();
    const userBookings = allBookings.filter(b => b.userId === userId);

    // For enrichment, we'll add the house details to each booking
    const enrichedBookings = userBookings.map(booking => {
        const houseDetails = logements.find(l => l.id === booking.houseId);
        return { ...booking, house: houseDetails };
    });

    res.json(enrichedBookings);
});

// --- Cancel Booking Endpoint ---
app.delete('/api/bookings/:id', verifyToken, (req, res) => {
    const { id: bookingId } = req.params;
    const userId = req.user.id;

    const bookings = readBookings();
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);

    if (bookingIndex === -1) {
        return res.status(404).json({ message: 'Réservation non trouvée.' });
    }

    if (bookings[bookingIndex].userId !== userId) {
        return res.status(403).json({ message: 'Action non autorisée.' }); // 403 Forbidden
    }

    bookings.splice(bookingIndex, 1);
    writeBookings(bookings);

    res.status(204).send(); // 204 No Content
});

// --- Get Bookings for a specific House ---
app.get('/api/houses/:houseId/bookings', (req, res) => {
    const { houseId } = req.params;
    const bookings = readBookings();
    const houseBookings = bookings.filter(b => b.houseId === houseId);
    res.json(houseBookings);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
