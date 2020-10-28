import React from 'react';

function TaskHeader(props) {
    return (
        <div className='dueTasks__columnHeadingContainer'>
            {props.children}
        </div>
    )
}

export default TaskHeader;
