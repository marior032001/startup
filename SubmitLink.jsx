import React, { useState } from 'react';
import NavigationBar from './NavigationBar';

function SubmitLink() {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
      alert('You must log in first!');
      return;
    }

    try {
      const response = await fetch('/api/secure/submit', { // Ensure the correct endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, link }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Fetch error message from backend
        throw new Error(errorData.message || 'Submission failed.');
      }

      const data = await response.json();
      setMessage(data.message);
      setName(''); // Clear the input fields after success
      setLink('');
    } catch (err) {
      console.error('Error during submission:', err.message);
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div style={styles.container}>
        <h1>Submit a Website</h1>
        {message && (
          <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>
            {message}
          </p>
        )}
        <input
          type="text"
          placeholder="Website Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Website Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.button}>
          Submit
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    margin: '10px 0',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default SubmitLink;
