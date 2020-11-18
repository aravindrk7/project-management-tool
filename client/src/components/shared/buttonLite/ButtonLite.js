import React from 'react';
import './ButtonLite.css';

function ButtonLite(props) {
    return (
        <button style={{ borderColor: props.active ? 'var(--green)' : null }} className="buttonLite" onClick={props.clicked}>
            {props.icon &&
                <div style={{ color: props.active ? 'var(--green)' : null }} className="buttonLite__icon">
                    {props.icon}
                </div>
            }
            <p style={{ color: props.active ? 'var(--green)' : null }} className="buttonLite__text">
                {props.text}
            </p>
        </button>
    )
}

export default ButtonLite;
