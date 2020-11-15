import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from './../../context/userContext';
import { config } from './../../constants/apiRoute';
import './MyTasks.css';
import NoData from '../shared/noData/NoData';
import Loader from '../shared/loader/Loader';
import DueTasks from './components/DueTasks';
import Summary from './components/Summary';
function MyTasks() {
    const api_url = config.url.API_URL;
    const [tasks, setTasks] = useState();
    const [filteredTasks, setFilteredTasks] = useState();
    const [myProjects, setMyProjects] = useState();
    const [currentTask, setCurrentTask] = useState();
    const [currentProject, setCurrentProject] = useState();
    const [currentStatus, setCurrentStatus] = useState();
    const [currentId, setCurrentId] = useState();
    const [loading, setLoading] = useState(true);
    const [refreshTask, setRefreshTask] = useState(0);
    const { userData } = useContext(UserContext);
    let id = userData.user?.id;
    useEffect(() => {
        const getTaskData = async () => {
            const taskData = await axios.get(api_url + 'task/all/' + id);
            setTasks(taskData.data);
            setFilteredTasks(taskData.data);
            setCurrentProject("All");
            console.log(taskData.data);
            setLoading(false);
        }
        if (typeof userData.user !== 'undefined') {
            getTaskData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData.user, refreshTask]);

    useEffect(() => {
        const getMyProjects = async () => {
            const myProjects = await axios.get(api_url + 'user/projects/' + id);
            setMyProjects(myProjects.data.projects);
            setLoading(false);
        }
        if (typeof userData.user !== 'undefined') {
            getMyProjects();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData.user]);

    useEffect(() => {
        if (currentStatus && currentId) {
            viewTask(currentStatus, currentId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks]);

    const handleTaskChange = () => {
        setRefreshTask(prev => prev + 1);
    };
    const viewTask = (status, id) => {
        setCurrentStatus(status);
        setCurrentId(id);
        tasks.splitedTasks[status].find(task => {
            if (id === task._id) {
                setCurrentTask(task);
            }
        });
    };
    const filterByProject = (e) => {
        console.log(e.currentTarget.value);
        let id = e.currentTarget.value.split(',')[0];
        let name = e.currentTarget.value.split(',')[1];
        setCurrentProject(name);
        let selectedProjectID = id;
        let total = 0;
        let filteredTask = {
            'Past Due': [],
            'Today': [],
            'Tomorrow': [],
            'Upcoming': []
        };
        if (selectedProjectID == 'All') {
            setFilteredTasks(tasks);
            setCurrentProject("All");
        }
        else {
            Object.keys(tasks.splitedTasks).filter(due => {
                filteredTask[due] = tasks.splitedTasks[due].filter(task => {
                    if (task.associated_project.id == selectedProjectID) {
                        total++;
                        return true;
                    };
                });
            });
            setFilteredTasks({
                'splitedTasks': filteredTask,
                'total': total
            });
            setCurrentTask();
        }
    };

    return (
        <div className="myTasks">
            <div className="myTasks__header">
                <div className="myTasks__heading">
                    <h1>My Tasks</h1>
                    <span className="myTasks__symbol">{'>'}</span>
                    <h1 className="myTasks__subHeading">{currentProject}</h1>
                </div>
                <div className="myTasks__dropdown">
                    <select onChange={(e) => filterByProject(e)}>
                        <option defaultChecked value="All">All</option>
                        {myProjects?.map(project => (
                            <option key={project.id} value={project.id + ',' + project.name} name={project.name}>{project.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <main className="myTasks__main">
                <section className="myTasks__list">
                    {!loading
                        ? (
                            filteredTasks?.total > 0
                                ? (<DueTasks tasks={filteredTasks.splitedTasks} viewTask={viewTask} refresh={handleTaskChange} />)
                                : (<NoData message='No task scheduled for you' />)
                        )
                        : (<Loader />)}
                </section>
                <section className="myTasks__summary">
                    <Summary task={currentTask} refresh={handleTaskChange} />
                </section>
            </main>
        </div >
    )
}

export default MyTasks;
