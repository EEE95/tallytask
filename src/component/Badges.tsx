
import '../css/style.css';
import streak_visited from '../assets/streak_visited.png';
import streak_used from '../assets/streak_used.png';

import React from 'react';

const Badges = () => {
    return (
        <div className='badge-display'>
            <h2>BADGES</h2>
            <div>
                <h3>Streak</h3>
                <div>
                <img src={streak_visited} alt='streak badge visited' />
                <img src={streak_used} alt='streak badge used' />
                </div>
            </div>
            <div>
                <h3>Tasks</h3>
                <div>
                <img src={streak_visited} alt='streak badge visited' />
                <img src={streak_used} alt='streak badge used' />
                </div>
            </div>
            <div>
                <h3>Bucketlist</h3>
                <div>
                <img src={streak_visited} alt='streak badge visited' />
                <img src={streak_used} alt='streak badge used' />
                </div>
            </div>
            <div>
                <h3>Use of app</h3>
                <div>
                <img src={streak_visited} alt='streak badge visited' />
                <img src={streak_used} alt='streak badge used' />
                </div>
            </div>
            
        </div>
    );
};

export default Badges;