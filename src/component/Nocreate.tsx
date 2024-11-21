import React from 'react';
import '../css/style.css';

// Define the props for the Nocreate component
interface NocreateProps {
    show: boolean;
    onClose: () => void;
    message: string;
}

// Define the Nocreate component
const Nocreate: React.FC<NocreateProps> = ({ show, onClose, message }) => {
    // If the show prop is false, do not render the component
    if (!show) {
        return null;
    }

    return (
        // Overlay for the modal
        <div className="nocreate-overlay">
            {/* Modal content */}
            <div className="nocreate">
                <div className="nocreate-header">
                    <h2>Great choice, but..</h2>
                    {/* Close button for the modal */}
                    <button 
                    id='close-button'
                    onClick={onClose} 
                    className="close-button"
                    aria-label="Close">
                    &times;
                    </button>
                </div>
                <div className="nocreate-body">
                     {/* Display the message passed as a prop */}
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Nocreate;