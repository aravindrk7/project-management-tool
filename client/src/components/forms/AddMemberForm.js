import React, { useContext } from 'react';
import { Formik } from "formik";
import axios from 'axios';
import './Form.css';
import Button from '../shared/button/Button';

import { config } from '../../constants/apiRoute';
import UserContext from '../../context/userContext';

function AddMemberForm({ values, handleChange, handleBlur, setFieldValue }) {
    const api_url = config.url.API_URL;
    const { userData } = useContext(UserContext);
    return (
        <div>
            <div className="form__field">
                <label htmlFor="members" className="form__label">Members</label>
                <input className="form__input" type="text" placeholder=" " name="members" value={values.members} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
            </div>
        </div>
    );
}

export default AddMemberForm;
