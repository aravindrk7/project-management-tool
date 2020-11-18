import React, { useState, useRef } from 'react';
import TaskCard from './../components/TaskCard';
import NoData from '../../shared/noData/NoData';
import axios from 'axios';
import { config } from '../../../constants/apiRoute';
import './DragDrop.css';
import { useSpring, animated } from 'react-spring';

function DragDrop({ tasks, setTasks }) {
    const api_url = config.url.API_URL;

    const dragItem = useRef();
    const dragNode = useRef();
    const [dragging, setDragging] = useState(false);
    const handleDragStart = (e, params) => {
        console.log('Drag Starting...', params);
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd);
        setTimeout(() => {
            setDragging(true);
        }, 0);
    };
    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current;
        if (!checkObjEquality(params, currentItem)) {
            console.log('Drag Entering...', params);
            setTasks(prevTasks => {
                let newTasks = JSON.parse(JSON.stringify(prevTasks));
                newTasks[params.status].splice(params.index, 0, newTasks[currentItem.status].splice(currentItem.index, 1)[0]);
                dragItem.current = params;
                return newTasks;
            });

        }

    };
    const handleDragEnd = () => {
        updateTasks();
        console.log('Drag Ending...');
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;


    };
    const checkObjEquality = (obj1, obj2) => {
        return (obj1.status === obj2.status) && (obj1.index === obj2.index)
    };
    const updateTasks = async () => {
        await axios.patch(api_url + 'task/update');
    }
    const getStyles = (status, index) => {
        const currentItem = dragItem.current;
        if (status === currentItem.status && index === currentItem.index) {
            return "dragDrop__item--current";
        }
        return "dragDrop__item";
    };
    const getBorderStyles = (status) => {
        if (status === "open") return "5px solid var(--blue)"
        else if (status === "inProgress") return "5px solid var(--yellow)"
        else return "5px solid var(--green)"
    };
    const toCamelCase = (str) => {
        return str
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, function (str) { return str.toUpperCase(); })
    }

    const slide = useSpring({
        from: { marginTop: -150, opacity: 0 },
        opacity: 1,
        marginTop: 0
    });

    return (
        <div className="dragDrop">
            {Object.keys(tasks).map((status, index) => (
                <div
                    key={status}
                    className="dragDrop__group"
                    onDragEnter={(dragging && !tasks[status].length > 0) ? ((e) => { handleDragEnter(e, { status, index: 0 }) }) : null}
                >
                    <div style={{ borderLeft: getBorderStyles(status) }} className="dragDrop__groupHeading">{toCamelCase(status)}</div>

                    {tasks[status].length > 0
                        ? (tasks[status].map((task, index) => (
                            <animated.div key={index} className="dragDrop__box" style={slide}>
                                <div
                                    draggable
                                    onDragOver={(e) => { e.preventDefault() }}
                                    onDragStart={(e) => { handleDragStart(e, { status, index }) }}
                                    onDragEnter={dragging ? ((e) => { handleDragEnter(e, { status, index }) }) : null}
                                    className={dragging ? getStyles(status, index) : "dragDrop__item"}
                                >
                                    <TaskCard task={task} index={index} />
                                </div>
                            </animated.div>
                        )))
                        : <NoData message={"No tasks"} />}
                </div>
            ))
            }
        </div >

    )
}

export default DragDrop;
