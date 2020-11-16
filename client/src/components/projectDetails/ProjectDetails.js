import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import axios from 'axios';
import { config } from '../../constants/apiRoute';
import './ProjectDetails.css';
import Loader from '../shared/loader/Loader';
import AccordionV2 from '../shared/accordionV2/AccordionV2';
import TaskCard from './components/TaskCard';
import NoData from '../shared/noData/NoData';
import Button from '../shared/button/Button';
import ProgressBar from '../shared/progressBar/ProgressBar';
import { FiPlus } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { DragDropContext } from "react-beautiful-dnd";


function ProjectDetails(props) {
    const api_url = config.url.API_URL;
    const [project, setproject] = useState({});
    const [tasks, setTasks] = useState({});
    const [currentTask, setCurrentTask] = useState();
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
    const viewTask = (status, id) => {
        tasks[status].find(task => {
            if (id === task._id) {
                setCurrentTask(task);
            }
        });
    };
    const addTask = () => {
        console.log('Add Task');
    };
    return (
        // <DragDropContext onDragEnd={({ destination, source }) => {
        //     // // dropped outside the list
        //     console.log(destination);
        //     console.log('destination');
        //     if (!destination) {
        //         return;
        //     }

        //     setTasks(reorderColors(colorMap, source, destination));
        // }} >
        <div className="projectDetails">
            <div className="projectDetails__header">
                <div className="projectDetails__heading">
                    <NavLink to="/projectDetailss" className="projectDetails__mainHeading">
                        <h1>projectDetailss</h1>
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
                    <div className="projectDetails__taskStatus">
                        {Object.keys(tasks).map((task, index) => (
                            <div key={index} className="projectDetails__taskStatusContainer">
                                <div className="projectDetails__taskStatusHeading">{task}</div>
                                {tasks[task].length > 0
                                    ? (tasks[task].map(task => (
                                        <TaskCard key={task._id} task={task} index={index} />
                                    )))
                                    : <NoData message={`No tasks`} />}
                            </div>
                        ))
                        }
                    </div>
                </div>) : (<Loader />)
            }
        </div >
        // </DragDropContext>
    )
}

export default withRouter(ProjectDetails);
