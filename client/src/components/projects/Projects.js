import React, { useState, useContext, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import axios from 'axios';
import { config } from '../../constants/apiRoute';
import { FiClock } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import './Projects.css';
import Loader from '../shared/loader/Loader';
import Button from '../shared/button/Button';
import ButtonLite from '../shared/buttonLite/ButtonLite';
import ProgressBar from '../shared/progressBar/ProgressBar';
import { useSpring, animated } from 'react-spring';
import SubHeader from '../shared/subHeader/SubHeader';
import Popup from '../shared/popup/Popup';
import UserContext from './../../context/userContext';
import CreateProjectForm from '../forms/CreateProjectForm';
import AddMemberForm from '../forms/AddMemberForm';
import List from '../shared/list/List';

function Projects() {
    const api_url = config.url.API_URL;
    const [currectProject, setCurrectProject] = useState();
    const [currectProjectNonMembers, setCurrectProjectNonMembers] = useState();
    const [currectProjectMembers, setCurrectProjectMembers] = useState();
    const [popup, setPopup] = useState(false);
    const [popupContent, setPopupContent] = useState(false);
    const [projects, setProjects] = useState({});
    const [loading, setLoading] = useState(true);
    const [refreshProjects, setRefreshProjects] = useState(0);
    const { userData } = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        if (typeof userData.user !== 'undefined') {
            if (!userData.user) {
                history.push('/login')
            }
            else {
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData.user]);
    let id = userData.user?.id;
    useEffect(() => {
        const getprojectsData = async () => {
            try {
                if (id) {
                    const projects = await axios.get(api_url + 'project/user/' + id);
                    setProjects(projects.data);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        const getCurrentNonMembers = async () => {
            if (currectProject)
                setCurrectProjectNonMembers(await getNonMembers(currectProject));
        }
        getprojectsData();
        getCurrentNonMembers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, refreshProjects]);

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

    const getNonMembers = async (id) => {
        const nonMembers = await axios.get(api_url + 'user/' + id + '/nonMember')
        return nonMembers.data;
    }

    const addProject = () => {
        setPopup(true);
        setPopupContent('project');
    };
    const handleProjectsChange = () => {
        setRefreshProjects(prev => prev + 1);
    };
    const closePopup = () => {
        setPopup(false);
    }
    const addMember = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrectProject(id);
        setCurrectProjectNonMembers(await getNonMembers(id));
        console.log('Add Member');
        setPopup(true);
        setPopupContent('member');
    };
    const seeAllMembers = (e, id) => {
        const project = projects.find(project => {
            return project._id === id
        })
        setCurrectProjectMembers(project.members);
        e.preventDefault();
        e.stopPropagation();
        console.log('See All Members');
        setPopup(true);
        setPopupContent('allMembers');

    };
    const viewMember = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Member : ' + id);
    };
    const getCompletedPercentage = (completed, total) => {
        if (total === 0) return 0;
        return (completed / total) * 100;
    };
    const handleProjectChange = () => {
        setRefreshProjects(prev => prev + 1);
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
                && <Popup closePopup={closePopup}
                    title={
                        popupContent === 'project'
                            ? "Create a new Project"
                            : popupContent === 'member'
                                ? "Add a Member"
                                : "Members"} >
                    {popupContent === 'project'
                        ? < CreateProjectForm refresh={handleProjectsChange} />
                        : popupContent === 'member'
                            ? <AddMemberForm refresh={handleProjectChange} projectId={currectProject} users={currectProjectNonMembers} />
                            : <List items={currectProjectMembers} />}
                </Popup>}
            <SubHeader heading="Projects">
                <Button text={"Add Project"} icon={<FiPlus />} clicked={addProject} />
            </SubHeader>
            {
                !loading ?
                    (<div className="projects__main">
                        {projects?.map(project => (
                            <animated.div key={project._id} className="projects__projectContainer" style={fade}>
                                <NavLink to={`/project/${project._id}`} className="projects__project">
                                    <div className="projects__projectHeader">
                                        <div className="projects__projectCard center">
                                            <img className="projects__projectAvatar" src={"http://localhost:5000/uploads/projectAvatars/" + project.displayPicture} alt="" />
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
                                            index < 4 && <div title={member.displayName} key={member._id} className="projects__projectFooterCard center" onClick={(e) => viewMember(e, member._id)}>
                                                <img className="projects__projectFooterUserIcon" src={"http://localhost:5000/uploads/" + member.displayPicture} alt="" />
                                            </div>
                                        ))}
                                        {project.members.length > 0
                                            ? <>
                                                {project.members.length > 4 && < div className="projects__projectFooterText center" onClick={(e) => seeAllMembers(e, project._id)}>
                                                    <p>See all</p>
                                                </div>}
                                                < div className="projects__projectFooterCard--dashed center" onClick={(e) => addMember(e, project._id)}>
                                                    <FiPlus className="projects__projectFooterUserIcon--new" />
                                                </div>
                                            </>
                                            : <ButtonLite text={"Add Member"} icon={<FiPlus />} clicked={(e) => addMember(e, project._id)} />}
                                    </div>
                                </NavLink>
                            </animated.div>
                        ))
                        }
                    </div>) : (<Loader />)
            }
        </div >
    )
}

export default withRouter(Projects);
