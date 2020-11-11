import React from 'react';
import { FiCircle } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import axios from 'axios';
import { config } from './../../../constants/apiRoute';

function Task({ task, status, index, viewTask, refresh }) {
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
    const markCompleted = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        const taskData = axios.patch(api_url + 'task/' + id + '/completed');
        refresh();
    };
    const markOpen = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        const taskData = axios.patch(api_url + 'task/' + id + '/open');
        refresh();
    };
    return (
        <div className='task' onClick={() => viewTask(status, task._id)}>
            <div title={task.title} className='task__item'>
                {
                    (task.status == 'open')
                        ? (<FiCircle className='task__itemIcon fi-circle' onClick={(e) => { markCompleted(e, task._id) }} />)
                        : (<FiCheckCircle className='task__itemIcon fi-check-circle' onClick={(e) => { markOpen(e, task._id) }} />)
                }
                {/* <span className='task__itemValue'>Task {index + 1} :&nbsp;&nbsp;{task.title}</span> */}
                <span className='task__itemValue'>{task.title}</span>
            </div>
            {/* <div title={task.assigned_by.name} className='task__item'>
                <span className='task__itemValue'>{task.assigned_by.name}</span>
            </div> */}
            {/* <div title={task.created_at} className='task__item'>
                <span className='task__itemValue'>{getDate(task.created_at)}</span>
            </div> */}
            <div title={task.due_date} className='task__item'>
                <span className='task__itemValue'>{getDate(task.due_date)}</span>
            </div>
            <div title={task.status} className='task__item'>
                {/* {
                    (task.status == 'open')
                        ? (<FiCircle className='task__itemIcon fi-circle' onClick={() => { markCompleted(task._id) }} />)
                        : (<FiCheckCircle className='task__itemIcon fi-check-circle' />)
                } */}
                <FaCircle className='task__itemIcon fa-circle' style={{ color: (task.status == 'open') ? 'var(--color-primary)' : 'var(--success-green)' }} />
                <span className='task__itemValue'>{task.status}</span>
            </div>
            <div title={task.associated_team.name} className='task__item'>
                <span className='task__itemValue'>{task.associated_team.name}</span>
            </div>
        </div>
    )
}

export default Task;
