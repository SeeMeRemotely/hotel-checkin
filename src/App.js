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
  "1534": { memberNumber: "19", name: "Nancy Jane Ashby" },
  "1584": { memberNumber: "20", name: "Bill Banker" },
  "1794": { memberNumber: "23", name: "Bill Beckman" },
  "1799": { memberNumber: "24", name: "Lee Beckman" },
  "1864": { memberNumber: "22", name: "Martin Beckman" },
  "1934": { memberNumber: "25", name: "Tom Beckman" },
  "1944": { memberNumber: "26", name: "Will Beckman" },
  "2074": { memberNumber: "27", name: "Charles Bradley" },
  "2094": { memberNumber: "28", name: "Rusty Bradley" },
  "2124": { memberNumber: "29", name: "Steve Bradley" },
  "2194": { memberNumber: "30", name: "Bob Brewer" },
  "2354": { memberNumber: "33", name: "Seth Carr" },
  "2344": { memberNumber: "35", name: "Spencer Cochran" },
  "2494": { memberNumber: "37", name: "Emily Colburn" },
  "2564": { memberNumber: "39", name: "Allie Compton" },
  "2654": { memberNumber: "40", name: "Bart Culver" },
  "2704": { memberNumber: "42", name: "Candy Davis" },
  "2774": { memberNumber: "43", name: "Hayden Davis" },
  "2844": { memberNumber: "45", name: "Joy Dearman" },
  "2914": { memberNumber: "46", name: "John DeWitt" },
  "2984": { memberNumber: "31", name: "Rozlyn Dossman" },
  "3014": { memberNumber: "50", name: "David Eddins" },
  "3124": { memberNumber: "53", name: "Jim Edmondson" },
  "3164": { memberNumber: "88", name: "Diana Gotwals" },
  "3264": { memberNumber: "69", name: "Jim Gotwals" },
  "3334": { memberNumber: "86", name: "Peyton Haralson" },
  "3444": { memberNumber: "83", name: "Frank Henke" },
  "3474": { memberNumber: "81", name: "Ben Hilfiger" },
  "3544": { memberNumber: "87", name: "James Hilfiger" },
  "3614": { memberNumber: "84", name: "Roger Hilfiger" },
  "3644": { memberNumber: "85", name: "Carole Hill" },
  "3754": { memberNumber: "236", name: "Miled Jabor" },
  "3834": { memberNumber: "92", name: "Mike Jansen" },
  "3944": { memberNumber: "93", name: "Linda Jarnagan" },
  "3964": { memberNumber: "91", name: "Preston Jones, Jr." },
  "4034": { memberNumber: "102", name: "Andy Krider" },
  "4134": { memberNumber: "104", name: "John Larson" },
  "4174": { memberNumber: "123", name: "Grant Lloyd" },
  "4244": { memberNumber: "121", name: "Paul Long" },
  "4314": { memberNumber: "50", name: "Richard Martin" },
  "4384": { memberNumber: "41", name: "Sharon Millington" },
  "4454": { memberNumber: "130", name: "Jason Moreau" },
  "4524": { memberNumber: "138", name: "Nancy Peake" },
  "4594": { memberNumber: "180", name: "Bo Rainey" },
  "4654": { memberNumber: "191", name: "Rob Saunders" },
  "4734": { memberNumber: "194", name: "Sally Saunders" },
  "4804": { memberNumber: "193", name: "Nolan Schaffer" },
  "4874": { memberNumber: "192", name: "Cindy Schuering" },
  "4944": { memberNumber: "194", name: "Scott Selman" },
  "5014": { memberNumber: "195", name: "Gary Stidham" },
  "5084": { memberNumber: "196", name: "Greg Stidham" },
  "5154": { memberNumber: "197", name: "Mike Stidham" },
  "5224": { memberNumber: "199", name: "John Summar" },
  "5294": { memberNumber: "202", name: "Ron Sutor" },
  "5364": { memberNumber: "204", name: "Johan Terburgh" },
  "5434": { memberNumber: "210", name: "Greg Vann" },
  "5504": { memberNumber: "212", name: "Clay Waddel" },
  "5574": { memberNumber: "32", name: "Katie Winniford" },
  "8675": { memberNumber: "777", name: "Ben Chef" }
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
