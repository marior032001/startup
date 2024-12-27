import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SubmitLink from './SubmitLink';
import Rankings from './Rankings';
import Submissions from './Submissions';
import Register from './Register'; // Import the Register component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/submit" element={<SubmitLink />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/register" element={<Register />} /> {/* Add the Register route */}
      </Routes>
    </Router>
  );
}

export default App;
