import React from 'react';
import './TaskCard.css';
import { config } from './../../../constants/apiRoute';
import axios from 'axios';
import { FaRegThumbsUp } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

function TaskStatus({ task, index, refresh }) {
    const api_url = config.url.API_URL;

    const getDate = (date) => {
        date = new Date(date);
        date = date.getDate() + ', ' + getMonthName(date) + ' ' + date.getFullYear();
        return date;
    };

    const getMonthName = (date) => {
        let month = date.toLocaleString('default', { month: 'short' });
        return month;
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
            ? Math.abs(days) + " days overdue"
            : (days === 0
                ? "Due today"
                : (days === 1 ? "Due tomorrow" : days + " days left"));
    };

    const updateLikeValue = (e, id, value) => {
        e.preventDefault();
        e.stopPropagation();
        axios.patch(api_url + 'task/' + id + '/like/' + value).then(response => {
            console.log(response.data);
            refresh();
        });
    };

    return (

        <div className="taskCard" >
            <div className="taskCard__header">
                <div className="taskCard_headerDetails">
                    <div>
                        <label>Assigned By</label>
                        <p className="taskCard_createdBy" >{task.assigned_by.name}</p>
                    </div>
                    <div>
                        <label>Due</label>
                        <p className="taskCard_Due" >{getDate(task.due_date)}</p>
                    </div>
                </div>
                <p style={getDueStyles(task.status, task.days_left)} className="taskCard__dueTime">
                    <FiClock />
                    <span >{getDueText(task.status, task.days_left)}</span>
                </p>
            </div >
            <div className="taskCard__details">
                <p title={task.title} className="taskCard__name">{task.title}</p>
                <p title={task.description} className="taskCard__desc">{task.description}</p>
            </div>
            <div className="taskCard__footer">
                <FaRegThumbsUp className="task__likeIcon" title="Like this" style={{ color: task.like ? 'var(--green)' : 'var(--text-secondary)' }} onClick={(e) => updateLikeValue(e, task._id, !task.like)} />
            </div>
        </div >

    )
}

export default TaskStatus;
