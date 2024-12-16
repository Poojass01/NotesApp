const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

exports.registerUser = (req, res) => {
    const { user_name, user_email, password } = req.body;

    if (!user_name || !user_email || !password) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = uuidv4();

    const sql = `
        INSERT INTO users (user_id, user_name, user_email, password, create_on, last_update)
        VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
    db.query(sql, [userId, user_name, user_email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to register user' });
        res.status(201).json({ message: 'User registered successfully' });
    });
};

exports.loginUser = (req, res) => {
    const { user_email, password } = req.body;

    if (!user_email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = 'SELECT * FROM users WHERE user_email = ?';
    db.query(sql, [user_email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Use the secret key from the environment variable
        const token = jwt.sign(
            { userId: user.user_id },
            process.env.JWT_SECRET, // Ensure this is set
            { expiresIn: '1h' }
        );

        res.json({ token, user: { userId: user.user_id, userName: user.user_name, userEmail: user.user_email } });
    });
};
