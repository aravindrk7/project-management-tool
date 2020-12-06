import React, { useState } from 'react';
import { Formik } from "formik";
import Button from '../shared/button/Button';

function FormikStepper({ children, ...props }) {
    const childrenArray = children;
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const isLastStep = () => {
        return step === childrenArray.length - 1;
    };
    return (
        <Formik {...props} onSubmit={async (e, value, helpers) => {
            e.preventDefault();
            await props.onSubmit(value, helpers);
        }}>
            <form autoComplete='off'>
                {currentChild}
                <div className="formikStepper__buttonContainer">
                    {step > 0 && <Button text="Back" clicked={() => setStep(s => s - 1)} />}
                    {isLastStep()
                        ? <Button text="Create" />
                        : <Button text="Next" clicked={() => setStep(s => s + 1)} />
                    }
                </div>
            </form>
        </Formik>
    )
}

export default FormikStepper;
