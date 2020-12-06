import React from 'react';
import './Form.css';

function CreateProjectForm({ values, handleChange, handleBlur, setFieldValue }) {
    return (
        <div>
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

        </div>
    );
}

export default CreateProjectForm;
