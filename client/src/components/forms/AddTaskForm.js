import React, { useContext } from 'react';
import { Form, Formik } from "formik";
import axios from 'axios';
import './Form.css';
import Button from '../shared/button/Button';

import { config } from '../../constants/apiRoute';
import UserContext from '../../context/userContext';

function AddTaskForm(props) {
    console.log(props.members);
    const api_url = config.url.API_URL;
    const { userData } = useContext(UserContext);
    return (
        <Formik
            initialValues={
                {
                    title: '',
                    description: '',
                    start_date: '',
                    due_date: '',
                    assigned_by: userData.user.id,
                    assigned_to: '',
                    associated_project: props.projectId
                }
            }
            onSubmit={async (data, { setSubmitting }) => {
                console.log(data);
                try {
                    setSubmitting(true);
                    await axios.post(api_url + 'task/add', data)
                        .then(response => {
                            console.log(response);
                            props.refresh();
                            setSubmitting(false);
                        })
                } catch (error) {
                    console.log(error);
                }

            }}
        >
            {({ values, handleChange, handleBlur, setFieldValue }) => (
                <Form>
                    <div>
                        <div className="form__field">
                            <label htmlFor="title" className="form__label">Title</label>
                            <input className="form__input" type="text" placeholder=" " name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
                        </div>

                        <div className="form__field">
                            <label htmlFor="description" >Description</label>
                            <textarea placeholder=" " name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
                        </div>

                        <div className="form__row">
                            <div className="form__field">
                                <label htmlFor="start_date">Start Date</label>
                                <input type="date" placeholder=" " name="start_date" value={values.start_date} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
                            </div>
                            <div className="form__field">
                                <label htmlFor="due_date">Due Date</label>
                                <input type="date" placeholder=" " name="due_date" value={values.due_date} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
                            </div>
                        </div>

                        <div className="form__field">
                            <label htmlFor="assigned_to">Assign To</label>
                            {/* <input type="text" placeholder=" " name="assigned_to" value={values.assigned_to} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' /> */}
                            <select name="assigned_to" onChange={(e) => setFieldValue('assigned_to', e.target.value)} onBlur={handleBlur} required>
                                <option hidden value="">Select</option>
                                {props.members.map(member => (
                                    <option key={member._id} value={member._id}>
                                        {/* <img src={"http://localhost:5000/uploads/" + member.displayPicture} alt=""/> */}
                                        {/* <span>{member.displayName}</span> */}
                                        {member.displayName}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className="form__buttonContainer">
                        <Button buttonType="submit" text="Create" />
                    </div>
                </Form>
            )}

        </Formik >

    );
}

export default AddTaskForm;
