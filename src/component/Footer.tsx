import React from 'react';
import { Link } from 'react-router-dom';
import home from '../assets/home.png';
import plus from '../assets/plus.png';
import badge from '../assets/badges-knap.png'; 

// Define the props for the Footer component
interface FooterProps {
    theme: string | null;
  }

// Define the Footer component
const Footer: React.FC<FooterProps> = ({ theme }) => {
    return (
        <footer 
            className="sticky-footer" 
            style={{ 
                // Set the background image based on the selected theme
                backgroundImage: theme ? `url(${theme})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat' 
            }}
        >
            <nav>
                <ul className="button-container">
                    <li>
                        {/* Link to the Home page */}
                        <Link to="/">
                            <img className="link-button" src={home} alt="Home" />
                        </Link>
                    </li>
                    <li>
                        {/* Link to the New Task page */}
                        <Link to="/newtask">
                            <img className="link-button" src={plus} alt="Add new task" />
                        </Link>
                    </li>
                    <li>
                        {/* Link to the Badges page */}
                        <Link to="/badges">
                            <img className="link-button" src={badge} alt="Badges" />
                        </Link>
                    </li>
                </ul>
            </nav>
            {/* Footer text */}
            <p>© 2024 TallyTask</p>
        </footer>
    );
}

export default Footer;