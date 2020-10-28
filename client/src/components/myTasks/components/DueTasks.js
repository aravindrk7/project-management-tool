import React from 'react';
import './../MyTasks.css';
import Task from './Task';
import TaskHeader from './TaskHeader';

function DueTasks({ tasks, refresh }) {
    return (
        <div className="dueTasks">
            {Object.keys(tasks).map((dueWhen, index) => (
                (tasks[dueWhen].length > 0) &&
                (<div key={index} className='dueTasks__dueWhen'>

                    <TaskHeader >
                        <h2 className="dueTasks__columnHeading dueWhen">{dueWhen}</h2>
                        <h2 className="dueTasks__columnHeading">Assigned By</h2>
                        <h2 className="dueTasks__columnHeading">Created At</h2>
                        <h2 className="dueTasks__columnHeading">Due Date</h2>
                        <h2 className="dueTasks__columnHeading">Status</h2>
                        <h2 className="dueTasks__columnHeading">Team</h2>
                    </TaskHeader>

                    <div className='dueTasks__Row'>
                        {tasks[dueWhen].map((task, index) => (
                            <Task task={task} index={index} key={task._id} refresh={refresh}/>
                        ))}
                    </div>
                </div>)
            ))}
        </div>
    )
}

export default DueTasks;
