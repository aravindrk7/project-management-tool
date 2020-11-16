import React from 'react';
import './ProgressBar.css'

function ProgressBar() {
    return (
        <div className="progress">
            <p className="progress__details">
                <label>Progress</label>
                <label>67%</label>
            </p>
            <span className="progress__bar">
                <span className="progress__barFill"></span>
            </span>
        </div>
    )
}

export default ProgressBar;
