import React, { useContext, useState } from 'react';
import { Form, Formik } from "formik";
import axios from 'axios';
import './Form.css';
import Button from '../shared/button/Button';

import { config } from '../../constants/apiRoute';
import UserContext from '../../context/userContext';

import FormikStepper from './FormikStepper';
import CreateProjectForm from './CreateProjectForm';
import AddTaskForm from './AddTaskForm';
import AddMemberForm from './AddMemberForm';

const pages = [<CreateProjectForm />, <AddTaskForm />, <AddMemberForm />]

function MultiStepForm(props) {
    const api_url = config.url.API_URL;
    const [step, setStep] = useState(0);
    const { userData } = useContext(UserContext);
    const getForm = (values, handleChange, handleBlur, setFieldValue) => {
        let props = { values, handleChange, handleBlur, setFieldValue };
        switch (step) {
            case 0:
                return <CreateProjectForm  {...props} />
            case 1:
                return <AddTaskForm {...props} />
            case 2:
                return <AddMemberForm  {...props} />
            default:
                return null
        }
    }
    const isLastStep = () => {
        return step === (pages.length) - 1;
    };
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
                    head: userData.user.id,
                    tasks: [],
                    members: []
                }
            }
            // onSubmit={(values) => { console.log(values); }}
            onSubmit={async (data, { setSubmitting }) => {
                try {
                    setSubmitting(true);
                    let formData = new FormData();
                    formData.append('name', data.name)
                    formData.append('description', data.description)
                    formData.append('start_date', data.start_date)
                    formData.append('due_date', data.due_date)
                    formData.append('created_by', data.created_by)
                    formData.append('head', data.head)
                    formData.append('displayPicture', data.displayPicture)
                    formData.append('tasks', [data.tasks])
                    formData.append('members', [data.tasks])
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

            }}
        >
            {/* <CreateProjectForm />
            <AddTaskForm />
            <AddMemberForm /> */}
            {({ values, handleChange, handleBlur, setFieldValue }) => (
                <Form>
                    {getForm(values, handleChange, handleBlur, setFieldValue)}
                    <div className="formikStepper__buttonContainer">
                        {step > 0 && <Button buttonType="button" text="Back" clicked={() => setStep(s => s - 1)} />}
                        {!isLastStep() && <Button buttonType="button" text="Next" clicked={() => setStep(s => s + 1)} />}
                        {isLastStep() && <Button buttonType="submit" text="Create" />}
                    </div>
                </Form>
            )}

        </Formik >
    );
}

export default MultiStepForm;
