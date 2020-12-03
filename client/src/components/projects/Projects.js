import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import axios from 'axios';
import { config } from '../../constants/apiRoute';
import { FiAperture } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import './Projects.css';
import Loader from '../shared/loader/Loader';
import Button from '../shared/button/Button';
import ProgressBar from '../shared/progressBar/ProgressBar';
import UserContext from './../../context/userContext'
import { useSpring, animated } from 'react-spring';
import dp1 from '../../images/dp/dp1.PNG';
// import dp2 from '../../images/dp/dp2.PNG';
// import dp3 from '../../images/dp/dp3.PNG';
// import dp4 from '../../images/dp/dp4.PNG';
import SubHeader from '../shared/subHeader/SubHeader';
import Popup from '../shared/popup/Popup';
import CreateProjectForm from '../forms/project/CreateProjectForm';

function Projects() {
    const api_url = config.url.API_URL;
    const [popup, setPopup] = useState(false);
    const [projects, setProjects] = useState({});
    const [loading, setLoading] = useState(true);
    const [refreshProjects, setRefreshProjects] = useState(0);
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
    }, [id,refreshProjects]);

    const getDueStyles = (status, days) => {
        let passedDue = { color: 'var(--red)', background: "rgba(241, 44, 30,.1)" };
        let dueToday = { color: 'var(--orange)', background: "rgba(241, 114, 30,.1)" };
        let dueLater = { color: 'var(--blue)', background: "rgba(49, 60, 214,.1)" };
        let completed = { color: 'var(--green)', background: "rgba(0, 177, 0,.1)" };
        if (status === 'completed') return completed;
        return days < 0 ? passedDue : (days === 0 || days === 1 ? dueToday : dueLater);
    };
    const getDueText = (status, days) => {
        if (status === 'completed') return 'Completed';
        return days < 0
            ? Math.abs(days) + " days overdue"
            : (days === 0
                ? "Due today"
                : (days === 1 ? "Due tomorrow" : days + " days left"));
    };


    const addProject = () => {
        setPopup(true);
    };
    const handleProjectsChange = () => {
        setRefreshProjects(prev => prev + 1);
    };
    const closePopup = () => {
        setPopup(false);
    }
    const addMember = () => {
        console.log('Add Member');
    };
    const getCompletedPercentage = (completed, total) => {
        if (total === 0) return 0;
        return (completed / total) * 100;
    };

    // Animations
    const fade = useSpring({
        from: {
            opacity: 0,
        },
        opacity: 1,
        config: { duration: 500 }
    });
    return (
        <div className="projects">
            {popup
                && <Popup closePopup={closePopup} title="Create a new Project" >
                    <CreateProjectForm refresh={handleProjectsChange} />
                </Popup>}
            <SubHeader heading="Projects">
                <Button text={"Add Project"} icon={<FiPlus />} clicked={addProject} />
            </SubHeader>
            {!loading ?
                (<div className="projects__main">
                    {projects?.map(project => (
                        <animated.div key={project._id} className="projects__projectContainer" style={fade}>
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
                                    <p className="projects__projectTask">Task done :&nbsp;&nbsp;<span>{project.task_done}</span> / {project.total_task}</p>
                                    <ProgressBar value={getCompletedPercentage(project.task_done, project.total_task)} />
                                </div>
                                <div className="projects__projectFooter">
                                    {project.members?.map((member, index) => (
                                        <div title={member.name} key={member.id} className="projects__projectFooterCard center">
                                            <img className="projects__projectFooterUserIcon" src={dp1} alt="" />
                                        </div>
                                    ))}
                                    <div className="projects__projectFooterCard--dashed center" onClick={addMember}>
                                        <FiPlus className="projects__projectFooterUserIcon--new" />
                                    </div>
                                    {/* <div className="projects__projectFooterCard center">
                                        <img className="projects__projectFooterUserIcon" src={dp1} alt="" />
                                    </div>
                                    <div className="projects__projectFooterCard center">
                                        <img className="projects__projectFooterUserIcon" src={dp2} alt="" />
                                    </div>
                                    <div className="projects__projectFooterCard center">
                                        <img className="projects__projectFooterUserIcon" src={dp3} alt="" />
                                    </div>
                                    <div className="projects__projectFooterCard--dashed center">
                                        <img className="projects__projectFooterUserIcon" src={dp4} alt="" />
                                    </div>
                                    <div className="projects__projectFooterCard--dashed center">
                                        <FiPlus className="projects__projectFooterUserIcon--new" />
                                    </div> */}
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
