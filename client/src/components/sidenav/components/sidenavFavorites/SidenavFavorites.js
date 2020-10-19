import React from 'react';
import { useSpring, animated } from 'react-spring';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { config } from './../../../../constants/apiRoute';
import './../SidenavItem.css';
import DropdownIcon from '../dropdownIcon/DropdownIcon';


function SidenavFavorites({ projects ,refresh}) {
    const api_url = config.url.API_URL;
    // Animations
    const slide = useSpring({
        from: { marginTop:-150,opacity: 0 },
        opacity: 1,
        marginTop:0
    });

    const removeFromFavorites = (id) => {
        axios.patch(api_url + 'project/remove-favorites/' + id).then(response => {
            refresh();
        });
    };
    return (
        <animated.div style={slide}>
            <div className="sidenav__itemContents">
                {projects?.map((project) => (
                    <NavLink to={`/project/${project._id}`} key={project._id} activeClassName='is-active-sidenavRoute' className="sidenav__itemContent">
                        <p className="sidenav__itemContentName">{project.name}</p>
                        <DropdownIcon>
                            <p onClick={() => removeFromFavorites(project._id)}>Remove from Favorites</p>
                        </DropdownIcon>
                    </NavLink>
                ))}
            </div>

        </animated.div >
    )
}

export default SidenavFavorites;
