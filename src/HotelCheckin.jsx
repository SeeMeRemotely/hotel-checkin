import { useState } from 'react';

export default function HotelCheckin() {
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [people, setPeople] = useState([]);
  const [name, setName] = useState('');
  const [isMember, setIsMember] = useState(false);

  const getDateRange = (start, end) => {
    const dates = [];
    let current = new Date(start);
    while (current <= new Date(end)) {
      dates.push(new Date(current).toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
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

    const days = getDateRange(checkin, checkout).map(date => ({
      date,
      breakfast: false,
      lunch: false,
      dinner: false,
    }));
    setPeople([...people, { name, isMember, meals: days }]);
    setName('');
    setIsMember(false);
  };

  const removePerson = (index) => {
    const updated = [...people];
    updated.splice(index, 1);
    setPeople(updated);
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
      <h2>Wauhillau Check-In</h2>

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
          <input type="checkbox" checked={isMember} onChange={e => setIsMember(e.target.checked)} />
          Member
        </label>
      </div>

      <button onClick={addPerson}>Add Person</button>

      <hr />

      {people.map((person, personIdx) => (
        <div key={personIdx} style={{ marginBottom: '20px' }}>
          <strong>{person.name} ({person.isMember ? 'Member' : 'Guest'})</strong>
          <button style={{ marginLeft: '10px' }} onClick={() => removePerson(personIdx)}>Remove</button>
          <div style={{ marginLeft: '20px' }}>
            {person.meals.map((day, dayIdx) => (
              <div key={day.date}>
                <div>{day.date}</div>
                {['breakfast', 'lunch', 'dinner'].map(meal => (
                  <label key={meal} style={{ marginRight: '10px' }}>
                    <input
                      type="checkbox"
                      checked={day[meal]}
                      onChange={() => toggleMeal(personIdx, dayIdx, meal)}
                    />
                    {meal}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Summary Table */}
      {people.length > 0 && (
        <>
          <h3>Summary Preview</h3>
          <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Member</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person, personIdx) =>
                person.meals.map((meal, mealIdx) => (
                  <tr key={`${personIdx}-${meal.date}`}>
                    <td>{meal.date}</td>
                    <td>{person.name}</td>
                    <td>{person.isMember ? 'Yes' : 'No'}</td>
                    <td>{meal.breakfast ? 'Yes' : ''}</td>
                    <td>{meal.lunch ? 'Yes' : ''}</td>
                    <td>{meal.dinner ? 'Yes' : ''}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <button onClick={submitToSheet}>Submit to Google Sheets</button>
        </>
      )}
    </div>
  );
}
