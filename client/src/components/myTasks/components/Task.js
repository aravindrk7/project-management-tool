import React from 'react';
import { FiCircle } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
// import { FaRegThumbsDown } from "react-icons/fa";
import axios from 'axios';
import { config } from './../../../constants/apiRoute';
import { useSpring, animated } from 'react-spring';

function Task({ task, status, index, viewTask, refresh }) {
    const api_url = config.url.API_URL;

    const slide = useSpring({
        from: {
            opacity: 0,
        },
        opacity: 1,
        config: { duration: 500 }
    });

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
        axios.patch(api_url + 'task/' + id + '/completed').then(response => {
            console.log(response);
            refresh();
        });
    };
    const markOpen = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        axios.patch(api_url + 'task/' + id + '/open').then(response => {
            console.log(response);
            refresh();
        });
    };
    const updateLikeValue = (e, id, value) => {
        e.preventDefault();
        e.stopPropagation();
        axios.patch(api_url + 'task/' + id + '/like/' + value).then(response => {
            console.log(response);
            refresh();
        });
    };
    return (
        <animated.div className='task' onClick={() => viewTask(status, task._id)} style={slide}>
            <div title={task.title} className='task__item'>
                {
                    (task.status === 'open')
                        ? (<FiCircle className='task__itemIcon fi-circle' onClick={(e) => { markCompleted(e, task._id) }} />)
                        : (<FiCheckCircle className='task__itemIcon fi-check-circle' onClick={(e) => { markOpen(e, task._id) }} />)
                }
                <span className='task__itemValue'>{task.title}</span>
            </div>
            <div title={task.due_date} className='task__item'>
                <span className='task__itemValue'>{getDate(task.due_date)}</span>
            </div>
            <div title={task.status} className='task__item'>
                <FaCircle className='task__itemIcon fa-circle' style={{ color: (task.status === 'open') ? 'var(--color-primary)' : 'var(--green)' }} />
                <span className='task__itemValue'>{task.status}</span>
            </div>
            <div title={task.associated_project.name} className='task__item'>
                <span className='task__itemValue'>{task.associated_project.name}</span>
            </div>
            <div title="Like this" className='task__item'>
                <FaRegThumbsUp style={{ color: task.like ? 'var(--green)' : 'var(--text-secondary)' }} className="task__itemValue task__likeIcon" onClick={(e) => updateLikeValue(e, task._id, !task.like)} />

            </div>
        </animated.div>
    )
}

export default Task;
