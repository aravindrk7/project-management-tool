import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import axios from 'axios';
import { config } from '../../constants/apiRoute';
import { FiAperture } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { FiClock } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import './Projects.css';
import Loader from '../shared/loader/Loader';
import Button from '../shared/button/Button';
import ProgressBar from '../shared/progressBar/ProgressBar';
import UserContext from './../../context/userContext'
import { useSpring, animated } from 'react-spring';

function Projects() {
    const api_url = config.url.API_URL;
    const [projects, setProjects] = useState({});
    const [loading, setLoading] = useState(true);
    const { userData } = useContext(UserContext);
    let id = userData.user?.id;
    useEffect(() => {
        const getprojectsData = async () => {
            try {
                const projects = await axios.get(api_url + 'project/user/' + id);
                setProjects(projects.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getprojectsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const addProject = () => {
        console.log('Add Project');
    };
    const getDueStyles = (status, days) => {
        let passedDue = { color: 'var(--red)', background: "rgba(241, 44, 30,.1)" };
        let dueToday = { color: 'var(--orange)', background: "rgba(241, 114, 30,.1)" };
        let dueLater = { color: 'var(--green)', background: "rgba(0, 177, 0,.1)" };
        if (status === 'completed') return dueLater;
        return days < 0 ? passedDue : (days === 0 || days === 1 ? dueToday : dueLater);
    };
    const getDueText = (status, days) => {
        if (status === 'completed') return 'Completed';
        return days < 0
            ? Math.abs(days) + " d overdue"
            : (days === 0
                ? "Due today"
                : (days === 1 ? "Due tomorrow" : days + " days left"));
    };


    // Animations
    const slide = useSpring({
        from: {
            opacity: 0,
        },
        opacity: 1,
        config: { duration: 500 }
    });
    return (
        <div className="projects">
            <div className="projects__header">
                <div className="projects__heading">
                    <h1>Projects</h1>
                </div>
                <Button text={"Add Project"} icon={<FiPlus />} clicked={addProject} />
            </div>
            {!loading ?
                (<div className="projects__main">
                    {projects?.map(project => (
                        <animated.div key={project._id} style={slide}>
                            <NavLink to={`/project/${project._id}`} className="projects__project">
                                <div className="projects__projectHeader">
                                    <div className="projects__projectCard center">
                                        <FiAperture className="projects__projectIcon" />
                                    </div>
                                    <p style={getDueStyles(project.status, project.days_left)} className="project__dueTime">
                                        <FiClock />
                                        <span>{getDueText(project.status, project.days_left)}</span>
                                    </p>
                                </div>
                                <div className="projects__projectDetails">
                                    <p className="projects__projectName">{project.name}</p>
                                    <p className="projects__projectDesc">{project.description}</p>
                                    <p className="projects__projectTask">Task done :&nbsp;&nbsp;<span>16</span> / 25</p>
                                    <ProgressBar />
                                </div>
                                <div className="projects__projectFooter">
                                    <div className="projects__projectFooterCard center">
                                        <AiOutlineUser className="projects__projectFooterUserIcon" />
                                    </div>
                                    <div className="projects__projectFooterCard center">
                                        <AiOutlineUser className="projects__projectFooterUserIcon" />
                                    </div>
                                    <div className="projects__projectFooterCard center">
                                        <AiOutlineUser className="projects__projectFooterUserIcon" />
                                    </div>
                                    <div className="projects__projectFooterCard--dashed center">
                                        <FiPlus className="projects__projectFooterUserIcon" />
                                    </div>
                                </div>
                            </NavLink>
                        </animated.div>
                    ))
                    }
                </div>) : (<Loader />)
            }
        </div>
    )
}

export default withRouter(Projects);
