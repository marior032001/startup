import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import mongoose from 'mongoose';
import {
  addUser,
  getUserByUsername,
  getUserByToken,
  addWebsite,
  getWebsites,
  getUserWebsites,
  updateUserAuthToken,
} from './database.js';

const app = express();
const port = 3000;
const authCookieName = 'authToken';

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

connectToDatabase();

// Serve static files from the 'dist' directory (React frontend)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

// Generate a random token
function generateAuthToken() {
  return Math.random().toString(36).substring(2);
}

// Set Authentication Cookie
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Register a User
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    await addUser({ username, password });
    res.json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login a User
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const user = await getUserByUsername(username);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const authToken = generateAuthToken();
    await updateUserAuthToken(username, authToken);
    setAuthCookie(res, authToken);

    res.json({ message: 'Login successful', username });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Logout a User
app.post('/api/logout', (req, res) => {
  res.clearCookie(authCookieName);
  res.json({ message: 'Logout successful.' });
});

// Secure API Router
const secureApiRouter = express.Router();
app.use('/api/secure', secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await getUserByToken(authToken);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Submit a Website
secureApiRouter.post('/submit', async (req, res) => {
  const { name, link } = req.body;

  if (!name || !link) {
    return res.status(400).json({ message: 'Name and link are required.' });
  }

  try {
    await addWebsite({ username: req.user.username, name, link });
    res.json({ message: 'Website submitted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get User-Specific Submissions
secureApiRouter.get('/submissions', async (req, res) => {
  try {
    const submissions = await getUserWebsites(req.user.username);
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get Rankings
app.get('/api/rankings', async (req, res) => {
  try {
    const websites = await getWebsites();
    res.json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

secureApiRouter.get('/user', async (req, res) => {
  try {
    const user = req.user; // Assume middleware adds user to req
    res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
});

// Catch-All Route for React Frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
