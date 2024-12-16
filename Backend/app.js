const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

// Test DB Connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    } else {
        console.log('Database connected successfully.');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
