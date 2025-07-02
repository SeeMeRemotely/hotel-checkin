import { useState, useEffect } from 'react';
import HotelCheckin from './HotelCheckin';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');

  const correctPin = '2009228'; // 🔒 Your custom PIN

  useEffect(() => {
    const saved = localStorage.getItem('authenticated');
    if (saved === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (pinInput === correctPin) {
      localStorage.setItem('authenticated', 'true');
      setAuthenticated(true);
    } else {
      alert('Incorrect PIN');
    }
  };

  if (!authenticated) {
    return (
      <div style={{ padding: '40px', fontFamily: 'Arial', textAlign: 'center' }}>
        <h2>Enter PIN to Access</h2>
        <input
          type="password"
          value={pinInput}
          onChange={(e) => setPinInput(e.target.value)}
          style={{ fontSize: '18px', padding: '6px' }}
        />
        <br />
        <button onClick={handleLogin} style={{ marginTop: '10px', padding: '8px 16px' }}>
          Submit
        </button>
      </div>
    );
  }

  return <HotelCheckin />;
}

export default App;
