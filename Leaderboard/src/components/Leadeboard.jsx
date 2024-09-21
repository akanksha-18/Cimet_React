import React, { useState, useEffect } from 'react';
import './Leaderboard.css'
const Leaderboard = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [score, setScore] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Load leaderboard data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('leaderboardData');
    if (savedData) {
      setLeaderboardData(JSON.parse(savedData));
    }
  }, []);

  // Save leaderboard data to localStorage when the leaderboardData state changes
  useEffect(() => {
    localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));
  }, [leaderboardData]);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new entry
    const newEntry = { firstName, lastName, country, score: parseInt(score) };

    // Add the new entry to the leaderboard data
    setLeaderboardData([...leaderboardData, newEntry]);

    // Reset form fields
    setFirstName('');
    setLastName('');
    setCountry('');
    setScore('');
  };

  // Increment score
  const incrementScore = (index) => {
    const updatedData = [...leaderboardData];
    updatedData[index].score += 5;
    setLeaderboardData(updatedData);
  };

  // Decrement score
  const decrementScore = (index) => {
    const updatedData = [...leaderboardData];
    updatedData[index].score -= 5;
    setLeaderboardData(updatedData);
  };

  // Delete an entry from the leaderboard
  const deleteEntry = (index) => {
    const updatedData = leaderboardData.filter((_, i) => i !== index);
    setLeaderboardData(updatedData);
  };

  // Update leaderboard UI
  const renderLeaderboard = () => {
    // Sort leaderboard data by score in descending order
    const sortedData = [...leaderboardData].sort((a, b) => b.score - a.score);

    return sortedData.map((entry, index) => (
      <div key={index} className="entry">
        <div>
          {entry.firstName} {entry.lastName} ({entry.country})
        </div>
        <div>Score: {entry.score}</div>
        <div>
          <button onClick={() => incrementScore(index)}>+5</button>
          <button onClick={() => decrementScore(index)}>-5</button>
          <button onClick={() => deleteEntry(index)}>Delete</button>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <h1>Leaderboard</h1>
      
      {/* Form for adding new entries */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>

      {/* Render leaderboard */}
      <div className="leaderboard">
        {leaderboardData.length > 0 ? renderLeaderboard() : <p>No entries yet!</p>}
      </div>
    </div>
  );
};

export default Leaderboard;
