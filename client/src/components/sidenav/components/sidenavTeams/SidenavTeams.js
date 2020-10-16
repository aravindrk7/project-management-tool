import React from 'react';
import { useSpring, animated } from 'react-spring';

import { FiPlus } from "react-icons/fi";

import DropdownIcon from '../dropdownIcon/DropdownIcon';
import './../SidenavItem.css';

function SidenavTeams({ teams }) {

    // Animations
    const slide = useSpring({
        from: { opacity: 0 },
        opacity: 1,
    });

    return (
        <animated.div style={slide}>

            <div className="sidenav__itemContents" >

                {teams?.map((team) => (
                    <div key={team._id} className="sidenav__itemContent">
                        <p className="sidenav__itemContentName">{team.name}</p>

                        <DropdownIcon>
                            <p onClick={() => console.log('Edit Team Settings ' + team.name)}>Edit Team Settings</p>
                            <p onClick={() => console.log('Remove me from this Team ' + team.name)}>Remove me from this Team</p>
                            <p onClick={() => console.log('Delete Team ' + team.name)}>Delete Team</p>
                        </DropdownIcon>

                    </div>
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
