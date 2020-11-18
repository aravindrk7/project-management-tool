import React from 'react';
import { useSpring, animated } from 'react-spring';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { config } from '../../../constants/apiRoute';
import './../../shared/accordion/Accordion.css';
import DropdownIcon from './dropdownIcon/DropdownIcon';


function SidenavFavorites({ favorites, setFavorites }) {
    const api_url = config.url.API_URL;
    // Animations
    const slide = useSpring({
        from: { marginTop: -150, opacity: 0 },
        opacity: 1,
        marginTop: 0
    });

    const removeFromFavorites = (id) => {
        axios.patch(api_url + 'project/remove-favorites/' + id).then(response => {
            let fav = [...favorites];
            var index = fav.findIndex(x => x._id === id)
            if (index !== -1) {
                fav.splice(index, 1);
                setFavorites(fav);
            }
        });
    };
    return (
        <animated.div style={slide}>
            <div className="sidenav__itemContents">
                {favorites?.map((favorite) => (
                    <NavLink to={`/project/${favorite._id}`} key={favorite._id} activeClassName='is-active-sidenavItem' className="sidenav__itemContent">
                        <p className="sidenav__itemContentName">{favorite.name}</p>
                        <DropdownIcon>
                            <p onClick={() => removeFromFavorites(favorite._id)}>Remove from Favorites</p>
                        </DropdownIcon>
                    </NavLink>
                ))}
            </div>

        </animated.div >
    )
}

export default SidenavFavorites;
