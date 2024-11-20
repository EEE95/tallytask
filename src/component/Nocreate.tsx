import React from 'react';
import '../css/style.css';


interface NocreateProps {
    show: boolean;
    onClose: () => void;
    message: string;
}

const Nocreate: React.FC<NocreateProps> = ({ show, onClose, message }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="nocreate-overlay">
            <div className="nocreate">
                <div className="nocreate-header">
                    <h2>Great choice, but..</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <div className="nocreate-body">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Nocreate;