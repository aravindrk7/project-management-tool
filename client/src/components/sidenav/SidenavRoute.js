import React from 'react';
import { NavLink } from "react-router-dom";

import './SidenavRoute.css';

function SidenavRoute(props) {
    return (
        <NavLink to={props.parent + props.path} key={props.id} title={props.name} activeClassName='is-active-sidenavRoute' className="sidenavRoute" >
            <div className="sidenavRoute__icon">
                {props.icon}
            </div>
            <p className="sidenavRoute__name">{props.name}</p>
        </NavLink>
    )
}

export default SidenavRoute;
