import React from 'react';
import ButtonLite from '../../shared/buttonLite/ButtonLite';
import { FiCheck } from "react-icons/fi";
import NoData from '../../shared/noData/NoData';
import axios from 'axios';
import { config } from './../../../constants/apiRoute';
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
    return (
        <div className="summary">
            {task ? (<><header className="summary__heading">
                <ButtonLite text="Mark Completed" active={task.status === 'completed' ? true : false} icon={<FiCheck />} clicked={() => task.status === 'completed' ? markOpen(task._id) : markCompleted(task._id)} />
            </header>
                <section className="summary__main">
                    <div className="summary__details">
                        <div>
                            <label>Task Name</label>
                            <p>{task?.title}</p>
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
                </section></>) : <NoData message="Click a task to view" />}
        </div>
    )
}

export default Summary;
