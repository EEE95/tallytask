import React from "react";
import { ConfirmProps } from "../types";
import "../css/style.css";

const Confirm: React.FC<ConfirmProps> = ({ message, onConfirm, onCancel}) => {
    return (
        <div className="confirm-overlay">
            <div className="confirm-content">
                <p>{message}</p>
                <div className="confirm-actions">
                    <button onClick={onConfirm} className="confirm-btn">OK</button>
                    <button onClick={onCancel} className="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;