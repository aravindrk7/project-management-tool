import React from 'react';
import { useSpring, animated } from 'react-spring';
import { NavLink } from "react-router-dom";
import OptionIcon from './../shared/optionIcon/OptionIcon';
import NoData from '../shared/noData/NoData';
import axios from 'axios';
import { config } from '../../constants/apiRoute';


function SidenavItem(props) {
    const api_url = config.url.API_URL;

    const removeFromFavorites = (id) => {
        axios.patch(api_url + 'project/remove-favorites/' + id).then(response => {
            let fav = [...props.data];
            var index = fav.findIndex(x => x._id === id)
            if (index !== -1) {
                fav.splice(index, 1);
                props.setData(fav);
            }
        });
    };


    // Animations
    const slide = useSpring({
        from: { marginTop: -150, opacity: 0 },
        opacity: 1,
        marginTop: 0
    });


    return (
        <animated.div style={slide}>
            <div className="sidenav__itemContents">
                {props.data?.length > 0 ? props.data?.map((data) => (
                    <NavLink to={`/project/${data._id}`} key={data._id} activeClassName='is-active-sidenavItem' className="sidenav__itemContent">
                        <p className="sidenav__itemContentName">{data.name}</p>
                        {props.showOptions &&
                            <OptionIcon>
                                <p onClick={() => removeFromFavorites(data._id)}>Remove from Favorites</p>
                            </OptionIcon>
                        }
                    </NavLink>

                ))
                    : <NoData message={props.noDataMessage} size='12px' />}
            </div>

        </animated.div >
    )
}

export default SidenavItem;
