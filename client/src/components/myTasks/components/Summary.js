import React from 'react';
import ButtonLite from '../../shared/buttonLite/ButtonLite';
import { FiCheck } from "react-icons/fi";
import NoData from '../../shared/noData/NoData';
import axios from 'axios';
import { config } from './../../../constants/apiRoute';
import { useSpring, animated } from 'react-spring';
import dp1 from '../../../images/dp/dp1.PNG';
import dp2 from '../../../images/dp/dp2.PNG';

function Summary({ task, refresh }) {
    const api_url = config.url.API_URL;
    const markCompleted = (id) => {
        axios.patch(api_url + 'task/' + id + '/completed').then(response => {
            refresh();
        });
    };
    const markOpen = (id) => {
        axios.patch(api_url + 'task/' + id + '/open').then(response => {
            refresh();
        });
    };
    const getDate = (date) => {
        date = new Date(date);
        date = date.getDate() + ', ' + getMonthName(date) + ' ' + date.getFullYear();
        return date;
    };
    const getMonthName = (date) => {
        let month = date.toLocaleString('default', { month: 'short' });
        return month;
    };

    const getStatusColors = (status) => {
        let open = { color: '#fff', background: "var(--blue)" };
        let inProgress = { color: '#000', background: "var(--yellow)" };
        let completed = { color: '#fff', background: "var(--green)" };
        return status === 'open' ? open : (status === 'inProgress' ? inProgress : completed);
    };
    const getPriorityColors = (priority) => {
        let high = { color: '#fff', background: "var(--red)" };
        let medium = { color: '#000', background: "var(--yellow)" };
        let low = { color: '#fff', background: "var(--green)" };
        return priority === 'high' ? high : (priority === 'medium' ? medium : low);
    };

    const fade = useSpring({
        from: { opacity: 0 },
        opacity: 1
    });

    return (
        <animated.div className="summary" style={fade}>
            {task ? (<><header className="summary__heading">
                <ButtonLite text={task.status === 'completed' ? 'Completed' : 'Mark Complete'} active={task.status === 'completed' ? true : false} icon={<FiCheck />} clicked={() => task.status === 'completed' ? markOpen(task._id) : markCompleted(task._id)} />
            </header>
                <section className="summary__main">
                    <div className="summary__details">
                        <div>
                            <label>Task</label>
                            <p className="summary__taskName">{task?.title}</p>
                        </div>
                        <div>
                            <label>Description</label>
                            <p>{task?.description}</p>
                        </div>
                    </div>
                    <div className="summary__AdditionalDetails">
                        <div>
                            <label>Assigned By</label>
                            <p>{task?.assigned_by.name}</p>
                        </div>
                        <div>
                            <label>Assigned To</label>
                            <p>{task?.assigned_to.name}</p>
                        </div>
                        <div>
                            <label>Created At</label>
                            <p>{getDate(task?.created_at)}</p>
                        </div>
                        <div>
                            <label>Due Date</label>
                            <p>{getDate(task?.due_date)}</p>
                        </div>
                    </div>
                    <div className="summary__subDetails">
                        <div>
                            <label>Status</label>
                            <p style={getStatusColors(task?.status)}>{task?.status}</p>
                        </div>
                        <div>
                            <label>Priority</label>
                            <p style={getPriorityColors(task.priority)}>{task?.priority}</p>
                        </div>
                    </div>
                    <div className="summary__activities">
                        <div className="summary__activity">
                            <img className="summary__activityUserIcon" src={dp1} alt="" />
                            <p className="summary__activityText">Aravind created this task.</p>
                            <span className="summary__activityTime">2 hours ago</span>
                        </div>
                        <div className="summary__activity">
                            <img className="summary__activityUserIcon" src={dp2} alt="" />
                            <p className="summary__activityText">Hasini liked this task.</p>
                            <span className="summary__activityTime">48 minutes ago</span>
                        </div>
                    </div>
                </section></>) : <NoData message="Click a task to view" />}
        </animated.div>
    )
}

export default Summary;
