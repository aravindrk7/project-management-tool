import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../constants/apiRoute';

import './Team.css';

function Team(props) {
    const api_url = config.url.API_URL;
    const [team, setTeam] = useState({});
    let id = props.match.params.id;
    useEffect(() => {
        const getTeamData = async () => {
            const teamData = await axios.get(api_url + 'team/' + id);
            setTeam(teamData.data);
        }
        getTeamData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    return (
        <div className="team">
            <div className="team__header">
            <p className="team__heading page__heading ">{team.name}</p>
            </div>
            <p className="team__name ">{team.created_at}</p>
            <p className="team__name ">{team.head}</p>
            <p className="team__name ">{team.privacy}</p> 
        </div>
    )
}

export default withRouter(Team);
