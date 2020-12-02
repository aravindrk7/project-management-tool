import React, { useState, useRef, useEffect } from 'react';
import TaskCard from './../components/TaskCard';
import NoData from '../../shared/noData/NoData';
import axios from 'axios';
import { config } from '../../../constants/apiRoute';
import './DragDrop.css';
import { useSpring, animated } from 'react-spring';

function DragDrop({ tasks, setTasks, refresh }) {
    const api_url = config.url.API_URL;
    const dragItem = useRef();
    const dragNode = useRef();
    const [dragging, setDragging] = useState(false);

    const [updatedValue, setUpdatedValue] = useState({ id: null, status: null });
    const [oldValue, setOldValue] = useState({ id: null, status: null });
    // const oldValue = useRef({ id: null, status: null });

    const handleDragStart = (e, params) => {
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd);
        setUpdatedValue((prevValue) => {
            prevValue.id = params.id;
            prevValue.status = null;
            return prevValue;
        })
        setTimeout(() => {
            setDragging(true);
        }, 0);
    };
    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current;
        if (!checkObjEquality(params, currentItem)) {
            setTasks(prevTasks => {
                let newTasks = JSON.parse(JSON.stringify(prevTasks));
                newTasks[params.status].splice(params.index, 0, newTasks[currentItem.status].splice(currentItem.index, 1)[0]);
                dragItem.current = params;
                return newTasks;
            });
            setUpdatedValue((prevValue) => {
                let newValue = JSON.parse(JSON.stringify(prevValue));
                newValue.status = params.status;
                return newValue;
            });
        }

    };
    useEffect(() => {
        if (updatedValue.status) {
            updateTasks(updatedValue)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!dragging]);

    const handleDragEnd = () => {
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;


    };
    const checkObjEquality = (obj1, obj2) => {
        return (obj1.status === obj2.status) && (obj1.index === obj2.index)
    };
    const checkItemEquality = (obj1, obj2) => {
        return (obj1.status === obj2.status) && (obj1.id === obj2.id)
    };
    const updateTasks = async (value) => {
        if (checkItemEquality(oldValue, value)) {
            return;
        }
        else {
            setOldValue(prev => {
                let newValue = JSON.parse(JSON.stringify(prev));
                newValue.status = value.status;
                newValue.id = value.id;
                return newValue;
            });
        await axios.patch(api_url + 'task/' + value.id + '/' + value.status).then(response => {
            console.log(response);
            refresh();
        });
        }
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

    const fade = useSpring({
        from: { opacity: 0 },
        opacity: 1,
    });

    return (
        <div className="dragDrop">
            {Object.keys(tasks).map((status, index) => (
                <div
                    key={status}
                    className="dragDrop__group"
                    onDragEnter={(dragging && !tasks[status].length > 0) ? ((e) => { handleDragEnter(e, { status, index: 0 }) }) : null}>
                    <div style={{ borderLeft: getBorderStyles(status) }} className="dragDrop__groupHeading">{toCamelCase(status)}</div>

                    {tasks[status].length > 0
                        ? (tasks[status].map((task, index) => (
                            <animated.div key={index} className="dragDrop__box" style={fade}>
                                <div
                                    draggable
                                    onDragOver={(e) => { e.preventDefault() }}
                                    onDragStart={(e) => { handleDragStart(e, { status, index, id: task._id }) }}
                                    onDragEnter={dragging ? ((e) => { handleDragEnter(e, { status, index }) }) : null}
                                    className={dragging ? getStyles(status, index) : "dragDrop__item"}
                                >
                                    <TaskCard task={task} index={index} refresh={refresh} />
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
