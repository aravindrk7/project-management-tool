import React, { useContext } from 'react';
import { Formik } from "formik";
import axios from 'axios';
import './Form.css';
import Button from '../../shared/button/Button';

import { config } from './../../../constants/apiRoute';
import UserContext from './../../../context/userContext';

function CreateProjectForm(props) {
    const api_url = config.url.API_URL;
    // const handleSubmit = (data) => {
    //     console.log(data);
    // };
    const { userData } = useContext(UserContext);
    return (
        <Formik
            initialValues={
                {
                    name: '',
                    start_date: '',
                    due_date: '',
                    description: '',
                    created_by: userData.user.id,
                    head: { name: userData.user.displayName, id: userData.user.id, email: userData.user.email }
                }
            }
            onSubmit={async (data, { setSubmitting }) => {
                setSubmitting(true);
                const createRes = await axios.post(api_url + 'project/add', data);
                console.log(createRes);
                props.refresh();
                setSubmitting(false);

            }}>
            {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                // <form>
                //     <input type="text" name='projectName' value={values.projectName} onChange={handleChange} onBlur={handleBlur} />
                //     <Button disabled={isSubmitting} text="Create" clicked={handleSubmit} />
                // </form>
                <form className="form">
                    <div className="form__field">
                        <input className="form__input" type="text" placeholder=" " name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
                        <label htmlFor="name" className="form__label">
                            <span className="form__labelName">Name</span>
                        </label>
                    </div>

                    <div className="form__field">
                        <label htmlFor="description" >
                            Start Date
                        </label>
                        <input type="date" placeholder=" " name="start_date" value={values.start_date} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
                    </div>
                    <div className="form__field">
                        <label htmlFor="description" >
                            Due Date
                        </label>
                        <input type="date" placeholder=" " name="due_date" value={values.due_date} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
                    </div>

                    <div className="form__field">
                        <label htmlFor="description" >
                            Description
                        </label>
                        <textarea placeholder=" " name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
                    </div>

                    <div className="form__btnContainer">
                        <Button disabled={isSubmitting} text="Create" clicked={handleSubmit} />
                    </div>
                </form>
            )}
        </Formik >
    );
}

export default CreateProjectForm;
