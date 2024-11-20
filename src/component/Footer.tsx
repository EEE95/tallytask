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
        <footer 
            className="sticky-footer" 
            style={{ 
                backgroundImage: theme ? `url(${theme})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat' 
            }}
        >
            <nav>
                <ul className="button-container">
                    <li>
                        <Link to="/">
                            <img className="link-button" src={home} alt="Home" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/newtask">
                            <img className="link-button" src={plus} alt="Add new task" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/badges">
                            <img className="link-button" src={badge} alt="Badges" />
                        </Link>
                    </li>
                </ul>
            </nav>
            <p>© 2024 TallyTask</p>
        </footer>
    );
}

export default Footer;