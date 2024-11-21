import React from "react";
import { ConfirmProps } from "../types";
import "../css/style.css";

// Component to render a confimation dialog
const Confirm: React.FC<ConfirmProps> = ({ message, onConfirm, onCancel}) => {
    return (
        <div className="confirm-overlay">
            
            {/* Main content of the confirmation dialog */}
            <div className="confirm-content">
                <p>{message}</p>

                 {/* Buttons for confirm/cancel the action */}
                <div className="confirm-actions">
                    <button onClick={onConfirm} className="confirm-btn">OK</button>
                    <button onClick={onCancel} className="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;