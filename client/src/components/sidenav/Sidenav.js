import React, { useContext } from 'react';
import './Sidenav.css';

import SidenavRoute from './SidenavRoute';
import SidenavItem from './SidenavItem';
import Accordion from './../shared/accordion/Accordion';

import Logo from '../shared/logo/Logo';
import FavoritesContext from '../../context/favoritesContext';

// icons
import { FiHome } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FiTarget } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";


function Sidenav(props) {

    const { favorites, setFavorites } = useContext(FavoritesContext);

    return (
        <div className="sidenav">
            <div className="sidenav__logo">
                <Logo />
            </div>
            <div className="sidenav__routes">
                <SidenavRoute parent="/" path='home' name='Home' icon={<FiHome />} id='1' />
                <SidenavRoute parent="/" path='myTasks' name='My Tasks' icon={<FiCheckCircle />} id='2' />
                <SidenavRoute parent="/" path='projects' name='Projects' icon={<FiEdit />} id='3' />
                <SidenavRoute parent="/" path='goals' name='Goals' icon={<FiTarget />} id='4' />
                <SidenavRoute parent="/" path='calendar' name='Calendar' icon={<FiCalendar />} id='5' />
            </div>
            <div className="sidenav__items">
                <Accordion title="Favorites" ItemsCount={favorites?.length} expand>
                    <SidenavItem
                        data={favorites}
                        setData={setFavorites}
                        noDataMessage="Mark ⭐ to make favorite"
                        showOptions />
                </Accordion>
            </div>
        </div>
    )
}

export default Sidenav;



