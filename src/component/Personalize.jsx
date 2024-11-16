import React, { useState } from 'react';

function Personalize({ setNickname }) {
  const [nickname, setNicknameInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gem det indtastede kaldenavn i App-tilstanden (hvis du bruger state) eller localStorage
    setNickname(nickname);
  };

  return (
    <div>
      <h2>Personalize Your Taskmanager</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nickname">Enter your nickname:</label>
        <input 
          type="text" 
          id="nickname" 
          value={nickname} 
          onChange={(e) => setNicknameInput(e.target.value)} 
          placeholder="TallyBuddy"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Personalize;
