import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Sidenav.css';
import { config } from './../../constants/apiRoute';
import SidenavProjects from './components/sidenavProjects/SidenavProjects';
import SidenavTeams from './components/sidenavTeams/SidenavTeams';
import SidenavFavorites from './components/sidenavFavorites/SidenavFavorites';
import SidenavItem from './components/SidenavItem';

import logo from './../../images/pmt.png';




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
    }, [])
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
            <div className="sidenav__logo">
                <img className="sidenav__logoImage" src={logo} alt="" />
                <p className="sidenav__logoName">Project Management</p>
            </div>
            {/* <div className="sidenav__logo--small">
                <img className="sidenav__logoImage" src={logo} alt="" />
            </div> */}
            <div className="sidenav__routes">
                {props.children}
            </div>
            <div className="sidenav__items">
                <SidenavItem title="Favorites">
                    <SidenavFavorites projects={favorites} refresh={handleFavoritesChange} />
                </SidenavItem>
                <SidenavItem title="Teams">
                    <SidenavTeams teams={teams} />
                </SidenavItem>
                <SidenavItem title="Projects">
                    <SidenavProjects projects={projects} refresh={handleFavoritesChange} />
                </SidenavItem>
            </div>
        </div>
    )


}

export default Sidenav;



