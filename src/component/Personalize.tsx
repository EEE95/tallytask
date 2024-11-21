import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';
import gear from '../assets/gear.png';
import winterTheme from '../assets/vintertema.png';
import springTheme from '../assets/springtema.png';
import summerTheme from '../assets/summertema.png';
import fallTheme from '../assets/falltema.png';
import christmasTheme from '../assets/christmastema.png';

// Define the props for the Personalize component
interface PersonalizeProps {
  setSelectedAvatar: (avatar: string) => void;
  setNickname: (nickname: string) => void;
  setTheme: (theme: string | null) => void;
}

// Define the Personalize component
const Personalize: React.FC<PersonalizeProps> = ({ setSelectedAvatar, setNickname, setTheme }) => {
  // State for the nickname input
  const [nickname, setNicknameInput] = useState('');
  // State for the selected theme
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  // State for the selected avatar
  const [selectedAvatar, setSelectedAvatarState] = useState<string | null>(null);
  // Hook for navigation
  const navigate = useNavigate();

  // Handle form submission for nickname
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // // Save the entered nickname
    setNickname(nickname);
    // Clear the input field
    setNicknameInput(''); 
  };

  // List of available avatars
  const avatars = [
    { src: 'src/assets/kat.png', alt: 'Cat avatar' },
    { src: 'src/assets/raev.png', alt: 'Fox avatar' },
    { src: 'src/assets/mus.png', alt: 'Mouse avatar' },
    { src: 'src/assets/pingvin.png', alt: 'Penguin avatar' },
    { src: 'src/assets/faar.png', alt: 'Sheep avatar' },
    { src: 'src/assets/hund.png', alt: 'Dog avatar' }
  ];

  // List of available themes
  const themes = [
    { src: 'src/assets/winterikon.png', alt: 'Winter theme', theme: winterTheme },
    { src: 'src/assets/springikon.png', alt: 'Spring theme', theme: springTheme },
    { src: 'src/assets/summerikon.png', alt: 'Summer theme', theme: summerTheme },
    { src: 'src/assets/fallikon.png', alt: 'Fall theme', theme: fallTheme },
    { src: 'src/assets/christmasikon.png', alt: 'Christmas theme', theme: christmasTheme }
  ];

  // Handle resetting the avatar to the default gear icon
  const handleResetAvatar = () => {
    setSelectedAvatar(gear);
    localStorage.removeItem('selectedAvatar'); 
  };

  // Handle resetting the theme to null
  const handleResetTheme = () => {
    setTheme(null);
    localStorage.removeItem('theme');
  };

  // Handle navigation back to the home page
  const handleDone = () => {
    navigate('/');  // Navigate back to the Home page
  };

  // Handle selecting a theme
  const handleThemeClick = (theme: string) => {
    setTheme(theme);
    setSelectedTheme(theme);
  };

  // Handle selecting an avatar
  const handleAvatarClick = (avatar: string) => {
    setSelectedAvatar(avatar);
    setSelectedAvatarState(avatar);
  };

  // Render the Personalize component
  return (
    <div className="p-styling">
      <h1>Personalize Your Taskmanager</h1>
      <h2>Choose your theme</h2>
      <div className="theme-container">
        {themes.map((theme, index) => ( // Map over the themes array
          <img 
            id='theme-image'
            key={index} 
            src={theme.src} 
            alt={theme.alt} 
            onClick={() => handleThemeClick(theme.theme)}
            className={selectedTheme === theme.theme ? 'selected-theme' : ''} // Add the selected-theme class if the theme is selected
          />
        ))}
      </div>

      <button  // Reset theme button
        id='reset-theme-button'
        className="reset-button" 
        onClick={handleResetTheme}
        >Reset Theme
      </button>

      <hr />
      
      {/* Avatar selection */}
      <h2>Choose profile avatar</h2>
      <div className="avatar-grid">
        {avatars.map((avatar, index) => (
          <img 
            id='avatar-image'
            key={index} 
            src={avatar.src} 
            alt={avatar.alt} 
            onClick={() => handleAvatarClick(avatar.src)} // Handle selecting an avatar
            className={selectedAvatar === avatar.src ? 'selected-avatar' : ''} // Add the selected-avatar class if the avatar is selected
          />
        ))}
      </div>

      {/* Reset avatar button */}
      <button 
        id='reset-avatar-button'
        className="reset-button" 
        onClick={handleResetAvatar}
        >Reset Avatar
      </button>

      <hr />

     {/* Form for entering the nickname */}
      <form className="nickname-form" onSubmit={handleSubmit}>  
        <label htmlFor="nickname"><h2>Enter your nickname:</h2></label>
        <div>
          <input 
            type="text" 
            id="nickname" 
            value={nickname} 
            onChange={(e) => setNicknameInput(e.target.value)} 
            placeholder="Write nickname here"
            onKeyDown={(e) => {
              if (e.key === "Enter") { // Handle pressing Enter to submit the form
                e.preventDefault(); 
                setNickname(nickname); 
                setNicknameInput(''); 
              }
            }}
          />
          {/* Save nickname button */}
          <button 
            id='save-nickname-button'
            className="reset-button" 
            type="submit"
            >Save
          </button>
        </div>
      </form>
              
      {/* Done button */}
      <button 
        id='done-button'
        className="done-button" 
        onClick={handleDone}
        >Done
      </button>
    </div>
  );
};

export default Personalize;
