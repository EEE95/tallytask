import React from 'react';
import { Link } from 'react-router-dom';
import home from '../assets/home.png';
import plus from '../assets/plus.png';
import badge from '../assets/badges-knap.png'; // Ensure this file exists at the specified path

interface FooterProps {
    theme: string | null;
  }

  const Footer: React.FC<FooterProps> = ({ theme }) => {
    return (
        <div className="sticky-footer" style={{ backgroundImage: theme ? `url(${theme})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat' }}>
            <div className="button-container">
                <Link to="/"><img className="link-button" src={home} alt="home button" /></Link>
                <Link to="/newtask"><img className="link-button" src={plus} alt="add new task button" /></Link>
                <Link to="/badges-knap"><img className="link-button" src={badge} alt="how much have I used the app badges" /></Link>
            </div>
            <p>© 2024 TallyTask</p>
        </div>
    );
}

export default Footer;