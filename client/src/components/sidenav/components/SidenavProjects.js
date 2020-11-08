import React from 'react';
import { useSpring, animated } from 'react-spring';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { config } from '../../../constants/apiRoute';
import { FiPlus } from "react-icons/fi";
import DropdownIcon from './dropdownIcon/DropdownIcon';
import './../../shared/accordion/Accordion.css';

function SidenavProjects({ projects, refresh }) {
    const api_url = config.url.API_URL;
    // Animations
    const slide = useSpring({
        from: { marginTop:-150,opacity: 0 },
        opacity: 1,
        marginTop:0
    });
    const addToFavorites = (project) => {
        if (!project.favorite) {
            axios.patch(api_url + 'project/add-favorites/' + project._id).then(response => {
                refresh();
                console.log(response);
            });
        }

    };
    return (
        <animated.div style={slide}>
            < div className="sidenav__itemContents">
                {projects?.map((project) => (
                    <NavLink to={`/project/${project._id}`} key={project._id} activeClassName='is-active-sidenavItem' className="sidenav__itemContent">
                        <p className="sidenav__itemContentName">{project.name}</p>
                        <DropdownIcon>
                            <p onClick={() => addToFavorites(project)}>Add to Favorites</p>
                            <p onClick={() => console.log('Delete Project ' + project.name)}>Delete Project</p>
                        </DropdownIcon>
                    </NavLink>
                ))}
            </div>


            <button className="sidenav__itemButton">
                <FiPlus className="sidenav__itemButtonIcon" />
                <p className="sidenav__itemButtonName">Add Project</p>
            </button>

        </animated.div >
    )
}

export default SidenavProjects;
