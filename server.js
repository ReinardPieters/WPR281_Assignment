const express = require('express');
const path = require('path');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors');


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

    // Define a route to handle POST requests for user registration
    app.post('/register', async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Validate request body
            if (!username || !email || !password) {
                return res.status(400).send('Missing required fields');
            }

            

            const pool = await sql.connect(config);
            const existingUser = await pool.request()
                .input('Username', sql.NVarChar, username)
                .input('Email', sql.NVarChar, email)
                .query('SELECT COUNT(*) AS Count FROM Users WHERE Username = @Username OR Email = @Email');

            if (existingUser.recordset[0].Count > 0) {
                return res.status(400).send('Username or Email already exists');
            }
            
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            await pool.request()
                .input('Username', sql.NVarChar, username)
                .input('Email', sql.NVarChar, email)
                .input('PasswordHash', sql.NVarChar, hashedPassword)
                .query('INSERT INTO Users (Username, Email, PasswordHash) VALUES (@Username, @Email, @PasswordHash)');

            res.status(200).send('User registered successfully');
        } catch (err) {
            console.error('Error registering user', err.message);
            res.status(500).send('Failed to register user');
        }
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

}).catch(err => {
    console.error('Database connection failed', err.message);
});