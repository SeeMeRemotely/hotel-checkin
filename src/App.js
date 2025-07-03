import { useState, useEffect } from 'react';
import HotelCheckin from './HotelCheckin';

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [pinInput, setPinInput] = useState('');

  // 🔷 Roster of valid PINs and users
  const users = {
    "1234": { memberNumber: "14", name: "John Abdo" },
    "1304": { memberNumber: "10", name: "Martha Alford" },
    "1374": { memberNumber: "11", name: "Andy Anderson" },
    "1444": { memberNumber: "15", name: "Eric Anderson" },
    "1514": { memberNumber: "13", name: "Evan Anderson" },
    "2009228": { memberNumber: "2009228", name: "System Test" }
  };

  useEffect(() => {
    const saved = localStorage.getItem('authenticatedUser');
    if (saved) {
      setAuthenticatedUser(JSON.parse(saved));
    }
  }, []);

  const handleLogin = () => {
    if (users[pinInput]) {
      const user = users[pinInput];
      localStorage.setItem('authenticatedUser', JSON.stringify(user));
      setAuthenticatedUser(user);
    } else {
      alert('Incorrect PIN');
    }
  };

  if (!authenticatedUser) {
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

  return <HotelCheckin memberNumber={authenticatedUser.memberNumber} />;
}

export default App;
