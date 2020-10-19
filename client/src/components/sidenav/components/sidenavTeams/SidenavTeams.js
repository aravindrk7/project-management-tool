import React from 'react';
import { useSpring, animated } from 'react-spring';
import { NavLink } from "react-router-dom";

import { FiPlus } from "react-icons/fi";

import axios from 'axios';
import { config } from './../../../../constants/apiRoute';
import DropdownIcon from '../dropdownIcon/DropdownIcon';
import './../SidenavItem.css';

function SidenavTeams({ teams }) {
    const api_url = config.url.API_URL;
    // Animations
    const slide = useSpring({
        from: { marginTop:-150,opacity: 0 },
        opacity: 1,
        marginTop:0
    });
    return (
        <animated.div style={slide}>

            <div className="sidenav__itemContents" >

                {teams?.map((team) => (
                    <NavLink to={`/team/${team._id}`} key={team._id} activeClassName='is-active-sidenavRoute' className="sidenav__itemContent">
                        <p className="sidenav__itemContentName">{team.name}</p>

                        <DropdownIcon>
                            <p onClick={() => console.log('Edit Team Settings ' + team.name)}>Edit Team Settings</p>
                            <p onClick={() => console.log('Remove me from this Team ' + team.name)}>Remove me from this Team</p>
                            <p onClick={() => console.log('Delete Team ' + team.name)}>Delete Team</p>
                        </DropdownIcon>

                    </NavLink>
                ))}
            </div>
            <button className="sidenav__itemButton">
                <FiPlus className="sidenav__itemButtonIcon" />
                <p className="sidenav__itemButtonName">Add Team</p>
            </button>

        </animated.div >
    )
}

export default SidenavTeams;
