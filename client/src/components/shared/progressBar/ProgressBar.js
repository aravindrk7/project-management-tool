import React from 'react';
import './ProgressBar.css'

function ProgressBar(props) {
    return (
        <div className="progress">
            <p className="progress__details">
                <label>Progress</label>
                <label>{props.value}%</label>
            </p>
            <span className="progress__bar">
                <span className="progress__barFill" style={{ width: props.value + "%" }}></span>
            </span>
        </div>
    )
}

export default ProgressBar;
