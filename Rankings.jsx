import React, { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar';

function Rankings() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    fetch('/api/rankings')
      .then((res) => res.json())
      .then((data) => setRankings(data));
  }, []);

  return (
    <div>
      <NavigationBar />
      <div style={styles.container}>
        <h1>Website Rankings</h1>
        <ul style={styles.list}>
          {rankings.map((site, index) => (
            <li key={index} style={styles.listItem}>
              <span style={styles.rank}>{index + 1}.</span>
              <strong>{site.name}</strong> -{' '}
              <a href={site.link} target="_blank" rel="noopener noreferrer">{site.link}</a>
              <span style={styles.submissions}>Submissions: {site.submissions}</span>
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
  rank: {
    fontWeight: 'bold',
    marginRight: '10px',
  },
  submissions: {
    fontStyle: 'italic',
    color: '#555',
  },
};

export default Rankings;
