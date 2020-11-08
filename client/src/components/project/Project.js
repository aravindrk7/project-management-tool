import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { config } from './../../constants/apiRoute';
import './Project.css';
import Loader from '../shared/loader/Loader';
import AccordionV2 from '../shared/accordionV2/AccordionV2';
import TaskStatus from './TaskStatus';
import NoData from '../shared/noData/NoData';

function Project(props) {
    const api_url = config.url.API_URL;
    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState({});
    const [currentTask, setCurrentTask] = useState();
    const [loading, setLoading] = useState(true);

    let id = props.match.params.id;
    useEffect(() => {
        const getProjectData = async () => {
            const projectData = await axios.get(api_url + 'project/' + id);
            setProject(projectData.data);
            getTaskData(projectData.data.user_id);
            console.log(projectData);
        }
        const getTaskData = async (id) => {
            const taskData = await axios.get(api_url + 'task/user/' + id);
            setTasks(taskData.data.splitedTasks);
            setLoading(false);
            console.log(taskData);
        }
        getProjectData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    const viewTask = (status, id) => {
        tasks[status].find(task => {
            if (id === task._id) {
                setCurrentTask(task);
            }
        });
    };
    return (
        <div className="project">
            <div className="project__header">
                <h1>{project.name}</h1>
                <span className="project__privacy">{project.privacy}</span>
            </div>
            {!loading ?
                (<div className="project__main">
                    <div className="project__task">
                        <h2>Project's Tasks</h2>
                        <div className="project__taskContainer">
                            {currentTask
                                ? (<div>
                                    <p>{currentTask.title}</p>
                                    <p>{currentTask.status}</p>
                                    <p>{currentTask.assigned_to.name}</p>
                                </div>)
                                : (<NoData message="Select a task to view" />)
                            }
                        </div>
                    </div>
                    <div className="project__taskStatus">
                        <h2>Task Status</h2>
                        <div className="project__taskStatusContainer">
                            {Object.keys(tasks).map((task, index) => (
                                <AccordionV2 key={index} title={task} value={tasks[task].length}>
                                    <TaskStatus status={task} tasks={tasks[task]} viewTask={viewTask} />
                                </AccordionV2>
                            ))
                            }
                        </div>
                    </div>

                </div>) : (<Loader />)
            }
        </div >
    )
}

export default withRouter(Project);
