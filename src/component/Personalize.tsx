import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';
import gear from '../assets/gear.png';
import winterTheme from '../assets/vintertema.png';
import springTheme from '../assets/springtema.png';
import summerTheme from '../assets/summertema.png';
import fallTheme from '../assets/falltema.png';
import christmasTheme from '../assets/christmastema.png';

interface PersonalizeProps {
  setSelectedAvatar: (avatar: string) => void;
  setNickname: (nickname: string) => void;
  setTheme: (theme: string | null) => void;
}

const Personalize: React.FC<PersonalizeProps> = ({ setSelectedAvatar, setNickname, setTheme }) => {
  const [nickname, setNicknameInput] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatarState] = useState<string | null>(null);
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

    const themes = [
      { src: 'src/assets/winterikon.png', alt: 'Winter theme', theme: winterTheme },
      { src: 'src/assets/springikon.png', alt: 'Spring theme', theme: springTheme },
      { src: 'src/assets/summerikon.png', alt: 'Summer theme', theme: summerTheme },
      { src: 'src/assets/fallikon.png', alt: 'Fall theme', theme: fallTheme },
      { src: 'src/assets/christmasikon.png', alt: 'Christmas theme', theme: christmasTheme }
    ];

    const handleResetAvatar = () => {
      setSelectedAvatar(gear);
      localStorage.removeItem('selectedAvatar'); 
    };

    const handleResetTheme = () => {
      setTheme(null);
      localStorage.removeItem('theme');
    };

    const handleDone = () => {
      navigate('/'); // Navigerer tilbage til Home-siden
    };

    const handleThemeClick = (theme: string) => {
      setTheme(theme);
      setSelectedTheme(theme);
    };

    const handleAvatarClick = (avatar: string) => {
      setSelectedAvatar(avatar);
      setSelectedAvatarState(avatar);
    };

  return (
    <div className="p-styling">
      <h1>Personalize Your Taskmanager</h1>
      <h3>Choose your theme</h3>
      <div className="theme-container">
        {themes.map((theme, index) => (
          <img 
            key={index} 
            src={theme.src} 
            alt={theme.alt} 
            onClick={() => handleThemeClick(theme.theme)} 
            className={selectedTheme === theme.theme ? 'selected-theme' : ''}
          />
        ))}
      </div>
      <button className="reset-button" onClick={handleResetTheme}>Reset Theme</button>
      <hr />

      <h3>Choose profile avatar</h3>
      <div className="avatar-grid">
        {avatars.map((avatar, index) => (
          <img 
            key={index} 
            src={avatar} 
            alt={`Avatar ${index}`} 
            onClick={() => handleAvatarClick(avatar)}
            className={selectedAvatar === avatar ? 'selected-avatar' : ''}
          />
        ))}
      </div>
      <button className="reset-button" onClick={handleResetAvatar}>Reset Avatar</button>
      <hr />
      
      <form className="nickname-form" onSubmit={handleSubmit}>
        <label htmlFor="nickname"><h3>Enter your nickname:</h3></label>
        <div>
        <input 
          type="text" 
          id="nickname" 
          value={nickname} 
          onChange={(e) => setNicknameInput(e.target.value)} 
          placeholder="Write nickname here"
          onKeyDown={(e) => {
            if (e.key ==="Enter") {
                handleCreateList();
            }
        }}
        />
        <button className="reset-button" type="submit">Save</button>
        </div>
      </form>
      <button className="done-button" onClick={handleDone}>Done</button>
    </div>
  );
};

export default Personalize;
