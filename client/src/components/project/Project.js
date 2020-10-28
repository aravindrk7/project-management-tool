import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { config } from './../../constants/apiRoute';

function Project(props) {
    const api_url = config.url.API_URL;
    const [project, setProject] = useState({});
    let id = props.match.params.id;
    useEffect(() => {
        const getProjectData = async () => {
            const projectData = await axios.get(api_url + 'project/' + id);
            setProject(projectData.data);
        }
        getProjectData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    return (
        <div className="project">
            <h1 className="project__heading">Project</h1>
            <p className="project__name ">{project.name}</p>
            <p className="project__name ">{project.created_at}</p>
            <p className="project__name ">{project.owner}</p>
            <p className="project__name ">{project.privacy}</p>
        </div>
    )
}

export default withRouter(Project);
