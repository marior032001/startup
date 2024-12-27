import { addUser, addWebsite, getWebsites } from './database.js';

async function testDatabase() {
  try {
    console.log('Adding a test user...');
    await addUser({ username: 'testuser', password: 'testpassword' });
    console.log('User added successfully.');

    console.log('Adding a test website...');
    await addWebsite({ name: 'Test Site', link: 'https://example.com', username: 'testuser' });
    console.log('Website added successfully.');

    console.log('Fetching websites...');
    const websites = await getWebsites();
    console.log('Websites:', websites);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testDatabase();
