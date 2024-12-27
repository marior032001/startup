import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.brand}>Website Voter</h1>
      <div>
        <Link to="/submit" style={styles.link}>Submit Website</Link>
        <Link to="/submissions" style={styles.link}>My Submissions</Link>
        <Link to="/rankings" style={styles.link}>Rankings</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
  },
  brand: {
    fontSize: '1.5rem',
    margin: 0,
  },
  link: {
    margin: '0 10px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  },
};

export default NavigationBar;
