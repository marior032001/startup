import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_URL || 'mongodb+srv://admin:2Angeles@websitevoter.rqxuf.mongodb.net/?retryWrites=true&w=majority&appName=websitevoter';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, maxPoolSize: 10 });
const DB_NAME = process.env.DB_NAME || 'websiteVoter';

async function connect() {
  if (!client.topology || !client.topology.isConnected()) {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      throw error;
    }
  }
  return client.db(DB_NAME);
}

// User Operations

/**
 * Add a new user to the database.
 * @param {Object} user - The user object with username and password.
 */
export async function addUser(user) {
  try {
    const db = await connect();
    const collection = db.collection('users');
    await collection.insertOne(user);
    console.log('User added successfully:', user.username);
  } catch (error) {
    console.error('Error adding user:', error.message);
    throw error;
  }
}

/**
 * Get a user by their username.
 * @param {string} username - The username to search for.
 * @returns {Object|null} - The user object or null if not found.
 */
export async function getUserByUsername(username) {
  try {
    const db = await connect();
    const collection = db.collection('users');
    return await collection.findOne({ username });
  } catch (error) {
    console.error('Error fetching user by username:', error.message);
    throw error;
  }
}

/**
 * Update a user's authentication token.
 * @param {string} username - The username of the user.
 * @param {string} authToken - The new authentication token.
 */
export async function updateUserAuthToken(username, authToken) {
  try {
    const db = await connect();
    const collection = db.collection('users');
    await collection.updateOne({ username }, { $set: { authToken } });
    console.log('Updated authToken for user:', username);
  } catch (error) {
    console.error('Error updating user auth token:', error.message);
    throw error;
  }
}

/**
 * Get a user by their authentication token.
 * @param {string} authToken - The authentication token to search for.
 * @returns {Object|null} - The user object or null if not found.
 */
export async function getUserByToken(authToken) {
  try {
    const db = await connect();
    const collection = db.collection('users');
    return await collection.findOne({ authToken });
  } catch (error) {
    console.error('Error fetching user by token:', error.message);
    throw error;
  }
}

// Website Operations

/**
 * Add a website to the database or increment submissions if it already exists.
 * @param {Object} website - The website object with name and link.
 */
export async function addWebsite(website) {
  try {
    const db = await connect();
    const collection = db.collection('websites');

    const existingWebsite = await collection.findOne({ link: website.link });
    if (existingWebsite) {
      await collection.updateOne({ link: website.link }, { $inc: { submissions: 1 } });
      console.log('Website submissions incremented:', website.link);
    } else {
      website.submissions = 1;
      await collection.insertOne(website);
      console.log('New website added:', website.name);
    }
  } catch (error) {
    console.error('Error adding website:', error.message);
    throw error;
  }
}

/**
 * Get all websites sorted by submissions in descending order.
 * @returns {Array} - An array of website objects.
 */
export async function getWebsites() {
  try {
    const db = await connect();
    const collection = db.collection('websites');
    return await collection.find().sort({ submissions: -1 }).toArray();
  } catch (error) {
    console.error('Error fetching websites:', error.message);
    throw error;
  }
}

/**
 * Get websites submitted by a specific user.
 * @param {string} username - The username to filter by.
 * @returns {Array} - An array of website objects.
 */
export async function getUserWebsites(username) {
  try {
    const db = await connect();
    const collection = db.collection('websites');
    return await collection.find({ username }).sort({ submissions: -1 }).toArray();
  } catch (error) {
    console.error('Error fetching user websites:', error.message);
    throw error;
  }
}

// Graceful Shutdown Handler
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
