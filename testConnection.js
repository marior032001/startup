import { MongoClient } from 'mongodb';

// Use the provided connection string
const url = 'mongodb+srv://admin:2Angeles@websitevoter.rqxuf.mongodb.net/?retryWrites=true&w=majority&appName=websitevoter';

const client = new MongoClient(url);

async function testConnection() {
  try {
    // Attempt to connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB successfully!');
    
    // List databases to verify connection
    const db = client.db('websiteVoter'); // Replace with your actual database name
    console.log('Databases:', await db.admin().listDatabases());
  } catch (err) {
    console.error('Connection error:', err.message);
  } finally {
    // Always close the client
    await client.close();
  }
}

testConnection();
