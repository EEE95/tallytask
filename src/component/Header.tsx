import React, { useEffect, useState } from 'react';
import '../css/style.css';
import logo from '../assets/logo.png';
import gear from '../assets/gear.png'; 
import TodaysDay from './Date';
import { Link } from 'react-router-dom';

interface HeaderProps {
    nickname: string;
    selectedAvatar: string | null;
    theme: string | null;
  }

const Header: React.FC<HeaderProps> = ({ nickname, selectedAvatar, theme }) => {

    const quotes = [
        "'The secret of getting ahead is getting started' - <em>Mark Twain</em>",
        "'It always seems impossible until it´s done' - <em>Nelson Mandela</em>",
        "'<em>You got this!</em> '",
        "'Believe you can and you´re halfway there' - <em>Theodore Roosevelt</em>",
        "'<em>Trust the process</em> '",
        "'Plans are nothing - planning is everything' - <em>Dwight D. Eisenhower</em>",
        "'If the plan doesn´t work, change the plan, not the goal' - <em>Daniel Hurst</em>",
        "'You can do anything you set your mind to' - <em>Ben Franklin</em>",
    ];

    const getDailyQoute = () => {
        const today = new Date();
        const dayOfYear = today.getDate();
        return quotes[dayOfYear % quotes.length];
    };

    const [quote, setQuote] = useState(getDailyQoute());

    useEffect(() => {
        const interval = setInterval(() => {
            setQuote(getDailyQoute());
        }, 86400000);
        return () => clearInterval(interval);
    }, []);


    return (
        <header 
            className='header' 
            style={{ 
                backgroundImage: theme ? `url(${theme})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat' 
            }}
        >
            <div className={`left ${theme ? 'text-background' : ''}`}>
                <img className='logo' src={logo} alt='TallyTask logo' />
                <TodaysDay />
                <p className='welcome-text'>Hi {nickname}!</p>
                <blockquote>
                    <p dangerouslySetInnerHTML={{ __html: quote }} />
                </blockquote>
            </div>

            <div className={`right ${theme ? 'text-background2' : ''}`}>
                <Link to="/personalize" aria-label="Personalize your task manager">
                    <button className="personalize-button">
                        <img 
                            src={selectedAvatar || gear} 
                            className='img-gear' 
                            alt="Personalize your task manager" 
                        />
                    </button>
                </Link>
            </div>
        </header>
    );
};

export default Header;
