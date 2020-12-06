import React from 'react';
import './Form.css';

function AddTaskForm({ values, handleChange, handleBlur, setFieldValue }) {
    return (
        <div>
            <div className="form__field">
                <label htmlFor="tasks" className="form__label">Tasks</label>
                <input className="form__input" type="text" placeholder=" " name="tasks" value={values.tasks} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
            </div>

        </div>
    );
}

export default AddTaskForm;
