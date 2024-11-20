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
      { src: 'src/assets/kat.png', alt: 'Cat avatar' },
      { src: 'src/assets/raev.png', alt: 'Fox avatar' },
      { src: 'src/assets/mus.png', alt: 'Mouse avatar' },
      { src: 'src/assets/pingvin.png', alt: 'Penguin avatar' },
      { src: 'src/assets/faar.png', alt: 'Sheep avatar' },
      { src: 'src/assets/hund.png', alt: 'Dog avatar' }
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
      <h2>Choose your theme</h2>
      <div className="theme-container">
        {themes.map((theme, index) => (
          <img 
            id='theme-image'
            key={index} 
            src={theme.src} 
            alt={theme.alt} 
            onClick={() => handleThemeClick(theme.theme)} 
            className={selectedTheme === theme.theme ? 'selected-theme' : ''}
            aria-label='Select theme'
          />
        ))}
      </div>

      <button 
        id='reset-theme-button'
        className="reset-button" 
        onClick={handleResetTheme}
        aria-label='Reset Theme'
        >Reset Theme
      </button>

      <hr />

      <h2>Choose profile avatar</h2>
      <div className="avatar-grid">
        {avatars.map((avatar, index) => (
          <img 
            id='avatar-image'
            key={index} 
            src={avatar.src} 
            alt={avatar.alt} 
            onClick={() => handleAvatarClick(avatar.src)}
            className={selectedAvatar === avatar.src ? 'selected-avatar' : ''}
            aria-label={`Select ${avatar.alt}`}
          />
        ))}
      </div>

      <button 
        id='reset-avatar-button'
        className="reset-button" 
        onClick={handleResetAvatar}
        aria-label='Reset Avatar'
        >Reset Avatar
      </button>

      <hr />
      
      <form className="nickname-form" onSubmit={handleSubmit}>
        <label htmlFor="nickname"><h2>Enter your nickname:</h2></label>
        <div>
        <input 
          type="text" 
          id="nickname" 
          value={nickname} 
          onChange={(e) => setNicknameInput(e.target.value)} 
          placeholder="Write nickname here"
          aria-label='Enter nickname'
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); 
              setNickname(nickname); 
              setNicknameInput(''); 
            }
          }}
        />
        <button 
          id='save-nickname-button'
          className="reset-button" 
          type="submit"
          aria-label='Save Nickname'
          >Save
        </button>
        </div>
      </form>

      <button 
        id='done-button'
        className="done-button" 
        onClick={handleDone}
        aria-label='Done'
        >Done
      </button>
    </div>
  );
};

export default Personalize;
