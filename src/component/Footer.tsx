import React from 'react';
import { Link } from 'react-router-dom';
import home from '../assets/home.png';
import plus from '../assets/plus.png';
import badge from '../assets/badges-knap.png'; 

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
                <Link to="/"><img className="link-button" src={home} alt="go to home" /></Link>
                <Link to="/newtask"><img className="link-button" src={plus} alt="add new task" /></Link>
                <Link to="/badges"><img className="link-button" src={badge} alt="go to badgepage" /></Link>
            </div>
            <p>© 2024 TallyTask</p>
        </div>
    );
}

export default Footer;