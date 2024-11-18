import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/maja.css';
import gear from '../assets/gear.png';

interface PersonalizeProps {
  setSelectedAvatar: (avatar: string) => void;
  setNickname: (nickname: string) => void;
}

const Personalize: React.FC<PersonalizeProps> = ({ setSelectedAvatar, setNickname }) => {
  const [nickname, setNicknameInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Gem det indtastede kaldenavn i App-tilstanden (hvis du bruger state) eller localStorage
    setNickname(nickname);
    setNicknameInput(''); // Fjerner teksten fra inputfeltet
  };

    const avatars = [
      'src/assets/kat.png',
      'src/assets/raev.png',
      'src/assets/mus.png',
      'src/assets/pingvin.png',
      'src/assets/faar.png',
      'src/assets/hund.png'
    ];

    const handleResetAvatar = () => {
      setSelectedAvatar(gear); // Set the avatar to the default gear image
    };

    const handleDone = () => {
      navigate('/'); // Navigerer tilbage til Home-siden
    };

  return (
    <div className="p-styling">
      <h1>Personalize Your Taskmanager</h1>
      <h3>Choose profile avatar</h3>
      <div className="avatar-grid">
        {avatars.map((avatar, index) => (
          <img 
            key={index} 
            src={avatar} 
            alt={`Avatar ${index}`} 
            onClick={() => setSelectedAvatar(avatar)} //kalder på min avatar
          />
        ))}
      </div>
      <button className="reset-button" onClick={handleResetAvatar}>Reset Avatar</button>
      <form className="nickname-form" onSubmit={handleSubmit}>
        <label htmlFor="nickname"><h3>Enter your nickname:</h3></label>
        <div>
        <input 
          type="text" 
          id="nickname" 
          value={nickname} 
          onChange={(e) => setNicknameInput(e.target.value)} 
          placeholder="Write nickname here"
        />
        <button className="reset-button" type="submit">Save</button>
        </div>
      </form>
      <button className="done-button" onClick={handleDone}>Done</button>
    </div>
  );
};

export default Personalize;
