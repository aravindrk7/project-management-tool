import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Sidenav.css';
import { config } from './../../constants/apiRoute';
import SidenavProjects from './components/SidenavProjects';
import SidenavTeams from './components/SidenavTeams';
import SidenavFavorites from './components/SidenavFavorites';
import Accordion from './../shared/accordion/Accordion';
import Logo from '../shared/logo/Logo';

function Sidenav(props) {
    const api_url = config.url.API_URL;
    const [projects, setProjects] = useState();
    const [teams, setTeams] = useState();
    const [favorites, setFavorites] = useState();
    const [refreshFavorites, setRefreshFavorites] = useState(0);

    useEffect(() => {
        const getProjects = async () => {
            const projectData = await axios.get(api_url + 'project');
            setProjects(projectData.data);
        }
        getProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshFavorites])
    useEffect(() => {
        const getTeams = async () => {
            const teamData = await axios.get(api_url + 'team');
            setTeams(teamData.data);
        }
        getTeams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        const getFavorites = async () => {
            const favoriteData = await axios.get(api_url + 'project/favorites');
            setFavorites(favoriteData.data);

        }
        getFavorites();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshFavorites])

    const handleFavoritesChange = () => {
        setRefreshFavorites(prev => prev + 1);
    };

    return (
        <div className="sidenav">
            <Logo />
            <div className="sidenav__routes">
                {props.children}
            </div>
            <div className="sidenav__items">
                <Accordion title="Favorites" value={favorites?.length}>
                    <SidenavFavorites projects={favorites} refresh={handleFavoritesChange} />
                </Accordion>
                <Accordion title="Teams" value={teams?.length}>
                    <SidenavTeams teams={teams} />
                </Accordion>
                {/* <Accordion title="Projects" value={projects?.length}>
                    <SidenavProjects projects={projects} refresh={handleFavoritesChange} />
                </Accordion> */}
            </div>
        </div>
    )


}

export default Sidenav;



