const express = require('express');
const path = require('path');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5502',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
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

// Use a more secure way to store the logged-in user
const session = require('express-session');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    httpOnly:false
  }
}));

// Define routes
app.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Connect to SQL Server
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('Email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE Email = @Email');

    const user = result.recordset[0]; // Move this line up

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

    if (isPasswordValid) {
      res.status(200).json({ message: 'User signed in successfully', username: user.Username, userID : user.UserID});
    } else {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error signing in user', err.message);
    res.status(500).json({ error: 'Failed to sign in user' });
  }
});


app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Sing Up request received:', req.body);
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

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint')) {
      res.status(400).json({ error: 'Username or Email already exists' });
    } else {
      console.error('Error registering user', err.message);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
  app.post('/checkCompletedCourse', async (req,res)=>{

  })
  app.post('/apply', async (req, res) => {
    try {
      const { course, email, username, password } = req.body;
      console.log('Apply request received:', req.body);
  
      // Validate request body
      if (!course || !email || !username || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const pool = await sql.connect(config);
  
      // Check if user exists in Users
      const userExists = await pool.request()
        .input('Email', sql.NVarChar, email)
        .query('SELECT COUNT(*) AS Count FROM Users WHERE Email = @Email');
  
      if (userExists.recordset[0].Count === 0) {
        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.request()
          .input('Username', sql.NVarChar, username)
          .input('Email', sql.NVarChar, email)
          .input('PasswordHash', sql.NVarChar, hashedPassword)
          .query('INSERT INTO Users (Username, Email, PasswordHash) VALUES (@Username, @Email, @PasswordHash)');
      }
  
      // Check if application already exists in UserCourses
      const existingApplication = await pool.request()
        .input('Email', sql.NVarChar, email)
        .input('CourseID', sql.Int, course)
        .query('SELECT COUNT(*) AS Count FROM UserCourses WHERE Email = @Email AND CourseID = @CourseID');
  
      if (existingApplication.recordset[0].Count > 0) {
        return res.status(400).json({ error: 'You have already applied for this course' });
      }
  
      // Insert new application into UserCourses
      await pool.request()
        .input('Email', sql.NVarChar, email)
        .input('CourseID', sql.Int, course)
        .query('INSERT INTO UserCourses (Email, CourseID) VALUES (@Email, @CourseID)');
  
      res.status(201).json({ message: 'Application submitted successfully' });
    } catch (err) {
      console.error('Error submitting application', err.message);
      res.status(500).json({ error: 'Failed to submit application' });
    }
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});