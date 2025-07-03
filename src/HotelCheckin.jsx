import { useState } from 'react';

export default function HotelCheckin({ memberNumber }) {
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [people, setPeople] = useState([]);
  const [name, setName] = useState('');
  const [isMember, setIsMember] = useState(false);
  const [isChild, setIsChild] = useState(false);

  const getDateRange = (start, end) => {
    const dates = [];
    let current = new Date(start);
    while (current <= new Date(end)) {
      dates.push(new Date(current).toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const isToday = (dateStr) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  };

  const getMealLockout = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (hours > 15 || (hours === 15 && minutes >= 30)) return ['breakfast', 'lunch', 'dinner'];
    if (hours >= 9) return ['breakfast', 'lunch'];
    return ['breakfast'];
  };

  const addPerson = () => {
    if (!name || !checkin || !checkout) {
      alert("Please fill in all required fields.");
      return;
    }

    if (checkout < checkin) {
      alert("Checkout date cannot be before check-in date.");
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (checkin < today || checkout < today) {
      alert("Dates cannot be in the past.");
      return;
    }

    const days = getDateRange(checkin, checkout).map(date => ({
      date,
      breakfast: false,
      lunch: false,
      dinner: false,
    }));

    const displayName = isChild ? `${name} (c)` : name;

    setPeople([...people, { name: displayName, isMember, meals: days }]);
    setName('');
    setIsMember(false);
    setIsChild(false);
  };

  const toggleMeal = (personIdx, dayIdx, mealType) => {
    const updated = [...people];
    updated[personIdx].meals[dayIdx][mealType] = !updated[personIdx].meals[dayIdx][mealType];
    setPeople(updated);
  };

  const submitToSheet = async () => {
    const data = [];

    people.forEach(person => {
      person.meals.forEach(meal => {
        data.push({
          date: meal.date,
          name: person.name,
          member: person.isMember ? 'Yes' : 'No',
          breakfast: meal.breakfast ? 'Yes' : '',
          lunch: meal.lunch ? 'Yes' : '',
          dinner: meal.dinner ? 'Yes' : '',
          memberNumber: memberNumber
        });
      });
    });

    const response = await fetch('https://sheetdb.io/api/v1/flzw5cts0b4na', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      alert('Submitted to Google Sheets!');
      setPeople([]);
    } else {
      alert('Something went wrong.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Hotel Check-In</h2>

      <div>
        <label>Check-in Date: </label>
        <input
          type="date"
          value={checkin}
          onChange={e => setCheckin(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div>
        <label>Check-out Date: </label>
        <input
          type="date"
          value={checkout}
          onChange={e => setCheckout(e.target.value)}
          min={checkin || new Date().toISOString().split('T')[0]}
        />
      </div>

      <div>
        <label>Guest Name: </label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isMember}
            onChange={e => setIsMember(e.target.checked)}
          />
          Member
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isChild}
            onChange={e => setIsChild(e.target.checked)}
          />
          Child (8 and under)
        </label>
      </div>

      <button onClick={addPerson}>Add Person</button>

      <hr />

      {people.map((person, personIdx) => (
        <div key={personIdx} style={{ marginBottom: '20px' }}>
          <strong>{person.name} ({person.isMember ? 'Member' : 'Guest'})</strong>
          <div style={{ marginLeft: '20px' }}>
            {person.meals.map((day, dayIdx) => (
              <div key={day.date}>
                <div>{day.date}</div>
                {['breakfast', 'lunch', 'dinner'].map(meal => {
                  const disabled = isToday(day.date) && getMealLockout().includes(meal);
                  return (
                    <label key={meal} style={{ marginRight: '10px', opacity: disabled ? 0.5 : 1 }}>
                      <input
                        type="checkbox"
                        checked={day[meal]}
                        onChange={() => toggleMeal(personIdx, dayIdx, meal)}
                        disabled={disabled}
                      />
                      {meal}
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}

      {people.length > 0 && (
        <div>
          <button onClick={submitToSheet}>Submit to Google Sheets</button>
        </div>
      )}
    </div>
  );
}
