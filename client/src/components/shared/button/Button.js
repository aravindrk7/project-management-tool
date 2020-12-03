import React from 'react';
import './Button.css';

function Button(props) {
    return (
        <button disabled={props.disabled} type="button" className="button" onClick={props.clicked}>
            {props.icon &&
                <div className="button__icon">
                    {props.icon}
                </div>
            }
            <p className="button__text">
                {props.text}
            </p>
        </button>
    )
}

export default Button;
