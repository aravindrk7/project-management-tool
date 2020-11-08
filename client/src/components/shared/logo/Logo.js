import React from 'react';
import './Logo.css';
import logo from './../../../images/pmt.png';

function Logo() {
    return (
        <div className="logo">
            <img className="logo__image" src={logo} alt="" />
            <h1 className="logo__name">Teamify</h1>
        </div>
    )
}

export default Logo;
