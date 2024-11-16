import React, { useEffect, useState } from 'react';
import '../css/style.css';
import logo from '../assets/logo.png';
import gear from '../assets/gear.png'; 
import TodaysDay from './Date';
import { Link } from 'react-router-dom';

function Header({ nickname }) {

    const quotes = [
        "'The secret of getting ahead is getting started' - <em>Mark Twain</em>",
        "'It always seems impossible until it´s done' - <em>Nelson Mandela</em>",
        "You got this!",
        "'Believe you can and you´re halfway there' - <em>Theodore Roosevelt</em>",
        "Trust the process",
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
        <div className='header'>
            <div className='left'>
                <img className='logo' src={logo} alt='TallyTask logo' />
                <TodaysDay />
                <h1>Hi {nickname}!</h1>
            </div>

            <div className='right'>
                {/* Link to Personalize page */}
                <Link to="/personalize">
                    <button className="personalize-button">
                        <img src={gear} className='img-gear' alt="Personalize your task manager" />
                    </button>
                </Link>
            </div>

            <blockquote>
                <p dangerouslySetInnerHTML={{ __html: quote }} />
            </blockquote>
        </div>
    );
}

export default Header;
