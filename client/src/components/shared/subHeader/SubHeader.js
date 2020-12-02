import React from 'react';
import { NavLink } from "react-router-dom";
import './SubHeader.css';

function SubHeader(props) {
    return (
        <div className="subHeader">
            <div className="subHeader__left">
                {props.navLink ?
                    <NavLink to={props.navLink} className="subHeader__link">
                        <h1>Projects</h1>
                    </NavLink>
                    : <h1>{props.heading}</h1>}
                {props.subHeading && <span>{'>'}</span>}
                <h2>{props.subHeading}</h2>
                {(props.children && props.children[1]) && props.children[1]}
            </div>
            <div className="subHeader__right">
                {(props.children && props.children[0]) ? props.children[0] : props.children}
            </div>
        </div >
    )
}

export default SubHeader;
