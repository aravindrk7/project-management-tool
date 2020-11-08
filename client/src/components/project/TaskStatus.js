import React from 'react';
import { useSpring, animated } from 'react-spring';
import NoData from '../shared/noData/NoData';
import './Project.css';
function TaskStatus({ status, tasks, viewTask }) {


    // Animations
    const slide = useSpring({
        from: { marginTop: -150, opacity: 0 },
        opacity: 1,
        marginTop: 0
    });
    return (
        <animated.div className="taskStatus" style={slide}>
            {tasks.length > 0 ? (tasks.map((task, index) => (
                <div key={task._id} className="taskStatus__content" onClick={() => viewTask(status, task._id)}>
                    <p className="taskStatus__title">{"Task" + (index + 1) + " - " + task.title}</p>
                    <p className="taskStatus__user">{task.assigned_to.name}</p>
                </div>
            ))) : <NoData message={`No tasks`} />
            }
        </animated.div >
    )
}

export default TaskStatus;
