import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import axios from 'axios';
import { config } from '../../constants/apiRoute';
import './ProjectDetails.css';
import Loader from '../shared/loader/Loader';
import Button from '../shared/button/Button';
import { FiPlus } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import DragDrop from './components/DragDrop';


function ProjectDetails(props) {
    const api_url = config.url.API_URL;
    const [project, setproject] = useState({});
    const [tasks, setTasks] = useState({});
    const [loading, setLoading] = useState(true);

    let id = props.match.params.id;
    useEffect(() => {
        const getprojectData = async () => {
            const projectData = await axios.get(api_url + 'project/' + id);
            setproject(projectData.data);
            getTaskData(projectData.data.user_id);
        }
        const getTaskData = async (id) => {
            const taskData = await axios.get(api_url + 'task/user/' + id);
            setTasks(taskData.data.splitedTasks);
            setLoading(false);
        }
        getprojectData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const addTask = () => {
        console.log('Add Task');
    };



    return (
        <div className="projectDetails">
            <div className="projectDetails__header">
                <div className="projectDetails__heading">
                    <NavLink to="/projects" className="projectDetails__mainHeading">
                        <h1>Projects</h1>
                    </NavLink>
                    <span className="projectDetails__symbol">{'>'}</span>
                    <h1 className="projectDetails__subHeading">{project.name}</h1>
                </div>
                <div className="projectDetails__rightSection">
                    <div className="projectDetails__members">
                        <div className="projectDetails__memberCard center">
                            <AiOutlineUser className="projectDetails__memberIcon" />
                        </div>
                        <div className="projectDetails__memberCard center">
                            <AiOutlineUser className="projectDetails__memberIcon" />
                        </div>
                        <div className="projectDetails__memberCard center">
                            <AiOutlineUser className="projectDetails__memberIcon" />
                        </div>
                        <div className="projectDetails__memberCard--dashed center">
                            <FiPlus className="projectDetails__memberIcon" />
                        </div>
                    </div>
                    <Button text={"Add Task"} icon={<FiPlus />} clicked={addTask} />
                </div>

            </div>
            {!loading ?
                (<div className="projectDetails__main">
                    <DragDrop tasks={tasks} setTasks={setTasks} />
                </div>) : (<Loader />)
            }
        </div >
    )
}

export default withRouter(ProjectDetails);
