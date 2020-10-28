import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from './../../context/userContext';
import { config } from './../../constants/apiRoute';
import './MyTasks.css';
import NoData from '../shared/noData/NoData';
import Loader from '../shared/loader/Loader';
import DueTasks from './components/DueTasks';


function MyTasks() {
    const api_url = config.url.API_URL;
    const [tasks, setTasks] = useState();
    const [loading, setLoading] = useState(true);
    const [refreshTask, setRefreshTask] = useState(0);
    const { userData } = useContext(UserContext);
    let id = userData.user?.id;
    useEffect(() => {
        const getTaskData = async () => {
            const taskData = await axios.get(api_url + 'task/all/' + id);
            setTasks(taskData.data);
            setLoading(false);
        }
        if (typeof userData.user !== 'undefined') {
            getTaskData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData.user,refreshTask]);
    const handleTaskChange = () => {
        console.log('j=aja');
        setRefreshTask(prev => prev + 1);
    };
    return (
        <div className="myTasks">
            <div className="myTasks__header">
                <h1 className="myTasks__heading">My Tasks</h1>
            </div>
            <main className="myTasks__content">
                {!loading
                    ? (
                        tasks.total > 0
                            ? (<DueTasks tasks={tasks.splitedTasks} refresh={handleTaskChange}/>)
                            : (<NoData message='No task scheduled for you' />)
                    )
                    : (<Loader />)}
            </main>
        </div >
    )
}

export default MyTasks;
