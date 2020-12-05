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
                    displayPicture: '',
                    start_date: '',
                    due_date: '',
                    description: '',
                    created_by: userData.user.id,
                    head: { name: userData.user.displayName, id: userData.user.id, email: userData.user.email }
                }
            }
            onSubmit={async (data, { setSubmitting }) => {
                try {
                    setSubmitting(true);
                    let formData = new FormData();
                    formData.append('name', data.name)
                    formData.append('description', data.description)
                    formData.append('start_date', data.start_date)
                    formData.append('due_date', data.due_date)
                    formData.append('created_by', data.created_by)
                    formData.append('head', JSON.stringify(data.head))
                    formData.append('displayPicture', data.displayPicture)
                    console.log(formData);

                    await axios.post(api_url + 'project/add', formData)
                        .then(response => {
                            console.log(response);
                            props.refresh();
                            setSubmitting(false);
                        })
                } catch (error) {
                    console.log(error);
                }

            }}>
            {({ values, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue }) => (

                <form className="form">
                    <div className="form__field">
                        <label htmlFor="name" className="form__label">Name</label>
                        <input className="form__input" type="text" placeholder=" " name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
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
                        <label htmlFor="description" >Description</label>
                        <textarea placeholder=" " name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
                    </div>

                    <div className="form__field">
                        <label htmlFor="displayPicture">Display Picture</label>
                        <input className="form__input" type="file" placeholder=" " name="displayPicture" onChange={(e) => setFieldValue('displayPicture', e.target.files[0])} required />
                    </div>

                    <div className="form__btnContainer center">
                        <Button disabled={isSubmitting} text="Create" clicked={handleSubmit} />
                    </div>
                </form>
            )}
        </Formik >
    );
}

export default CreateProjectForm;
