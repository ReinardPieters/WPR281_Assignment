const express = require('express');
const path = require('path');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { send } = require('process');


const app = express();
const port = 3000; // Use a different port for Express server

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const config = {
    user: 'MyAppUser',
    password: 'YourStrongPassword',
    server: 'ReinardPC',
    database: 'WPR281Project',
    options: {
        enableArithAbort: true,
        trustServerCertificate: true,
        encrypt: true
    }
};
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Connect to SQL Server
sql.connect(config).then(pool => {
    if (pool.connected) {
        console.log('Connected to SQL Server');
    }
    app.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const result = await pool.request()
                .input('Email', sql.NVarChar, email)
                .query('SELECT * FROM Users WHERE Email = @Email');

            const user = result.recordset[0];

            if (!user) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }
            loggedInUser = user;
            res.status(200).json({ message: 'User signed in successfully' });
        } catch (err) {
            console.error('Error signing in user', err.message);
            res.status(500).json({ error: 'Failed to sign in user' });
        }
    });
    app.get('/userdata', (req, res) => {
        if (!loggedInUser) {
            return res.status(401).json({ error: 'No user logged in' });
        }
        res.status(200).json(loggedInUser);
    });
    // Define a route to handle POST requests for user registration
    app.post('/register', async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Validate request body
            if (!username || !email || !password) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const pool = await sql.connect(config);
            const existingUser = await pool.request()
                .input('Username', sql.NVarChar, username)
                .input('Email', sql.NVarChar, email)
                .query('SELECT COUNT(*) AS Count FROM Users WHERE Username = @Username OR Email = @Email');

            if (existingUser.recordset[0].Count > 0) {
                return res.status(400).json({ error: 'Username or Email already exists' });
            }
            
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            await pool.request()
                .input('Username', sql.NVarChar, username)
                .input('Email', sql.NVarChar, email)
                .input('PasswordHash', sql.NVarChar, hashedPassword)
                .query('INSERT INTO Users (Username, Email, PasswordHash) VALUES (@Username, @Email, @PasswordHash)');

            res.status(200).json({ message: 'User registered successfully' });
        } catch (err) {
            console.error('Error registering user', err.message);
            res.status(500).json({ error: 'Failed to register user' });
        }
    });

    


    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

}).catch(err => {
    console.error('Database connection failed', err.message);
});