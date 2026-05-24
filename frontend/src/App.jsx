JavaScript
import React, { useState, useEffect } from 'react';

function App() {
  const [status, setStatus] = useState('Se încarcă conexiunea cu backend-ul...');

  useEffect(() => {
    fetch('http://localhost:5000/api/status')
      .then((res) => res.json())
      .then((data) => setStatus(data.message))
      .catch(() => setStatus('Eroare: Nu s-a putut contacta backend-ul.'));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Todo App - Pasul 1</h1>
      <p>Status aplicație: <strong>{status}</strong></p>
    </div>
  );
}

export default App;