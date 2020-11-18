import React from 'react';
import { useSpring, animated } from 'react-spring';
import './TaskCard.css';
import { FiPlus } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { FiClock } from "react-icons/fi";

function TaskStatus({ task, index }) {

    const getDate = (date) => {
        date = new Date(date);
        date = date.getDate() + ', ' + getMonthName(date) + ' ' + date.getFullYear();
        return date;
    };

    const getMonthName = (date) => {
        let month = date.toLocaleString('default', { month: 'short' });
        return month;
    };

    // Animations
    const slide = useSpring({
        from: { marginTop: -150, opacity: 0 },
        opacity: 1,
        marginTop: 0
    });

    return (
       
            <animated.div className="taskCard" style={slide}>
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
                    <p className="taskCard__dueTime">
                        <FiClock />
                        <span>12 days left</span>
                    </p>
                </div >
                <div className="taskCard__details">
                    <p title={task.title} className="taskCard__name">{task.title}</p>
                    <p title={task.description} className="taskCard__desc">{task.description}</p>
                </div>
                <div className="taskCard__footer">
                    <div className="taskCard__memberCard center">
                        <AiOutlineUser className="taskCard__memberIcon" />
                    </div>
                    <div className="taskCard__memberCard center">
                        <AiOutlineUser className="taskCard__memberIcon" />
                    </div>
                    <div className="taskCard__memberCard center">
                        <AiOutlineUser className="taskCard__memberIcon" />
                    </div>
                    <div className="taskCard__memberCard--dashed center">
                        <FiPlus className="taskCard__memberIcon" />
                    </div>
                </div>
            </animated.div >
        
    )
}

export default TaskStatus;
