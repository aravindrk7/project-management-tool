import React from 'react';
import { Form, Formik } from "formik";
import axios from 'axios';
import './Form.css';
import Button from '../shared/button/Button';

import { config } from '../../constants/apiRoute';
// import UserContext from '../../context/userContext';

function AddMemberForm(props) {
    console.log(props.users);
    const api_url = config.url.API_URL;
    // const { userData } = useContext(UserContext);
    return (
        <Formik
            initialValues={
                {
                    member: ''
                }
            }
            onSubmit={async (data, { setSubmitting }) => {
                console.log(data);
                try {
                    setSubmitting(true);
                    await axios.patch(api_url + 'project/add-member/' + props.projectId, data)
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
                    <div className="form__field">
                        <label htmlFor="member">Select a User</label>
                        <select name="member" onChange={(e) => setFieldValue('member', e.target.value)} onBlur={handleBlur} required>
                            <option hidden value="">Select</option>
                            {props.users.length === 0 && <option disabled value="">No Users</option>}
                            {props.users.map(user => (
                                <option key={user._id} value={user._id}>
                                    {/* <img src={"http://localhost:5000/uploads/" + user.displayPicture} alt=""/> */}
                                    {/* <span>{user.displayName}</span> */}
                                    {user.displayName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form__buttonContainer">
                        <Button buttonType="submit" text="Add" />
                    </div>
                </Form>
            )
            }

        </Formik >

    );
}

export default AddMemberForm;
