import React, { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar';

function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch('/api/secure/submissions')
      .then((res) => res.json())
      .then((data) => setSubmissions(data));
  }, []);

  return (
    <div>
      <NavigationBar />
      <div style={styles.container}>
        <h1>My Submissions</h1>
        <ul style={styles.list}>
          {submissions.map((site, index) => (
            <li key={index} style={styles.listItem}>
              <strong>{site.name}</strong> -{' '}
              <a href={site.link} target="_blank" rel="noopener noreferrer">
                {site.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontStyle: 'italic',
    color: '#555',
  },
};

export default Submissions;
