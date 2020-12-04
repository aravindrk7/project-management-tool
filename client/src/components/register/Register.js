import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import { Formik } from "formik";
import './Register.css';
import { config } from './../../constants/apiRoute';
import UserContext from './../../context/userContext';
import Alert from '../shared/alert/Alert';
import Button from '../shared/button/Button';

function Register() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (userData.user) history.push('/');
    });

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    // const [displayPicture, setDisplayPicture] = useState();
    // const [formy, setFormy] = useState();
    // const [formData, setFormData] = useState({
    //     email: '',
    //     password: '',
    //     passwordCheck: '',
    //     displayName: '',
    //     displayPicture: ''
    // });
    const api_url = config.url.API_URL;
    // const handleFormData = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;
    //     setFormData(prev => (
    //         { ...prev, [name]: value }
    //     ));
    // };

    const clearMessage = () => {
        setMessage(undefined);
        setMessageType(undefined);
    };
    // const uploadImage = (e) => {
    //     console.log(e.target.files[0]);
    //     // const value = e.target.files[0];
    //     // setFormData(prev => (
    //     //     { ...prev, ['displayPicture']: value }
    //     // ));
    //     setDisplayPicture(e.target.files[0]);
    //     // let formData = new FormData();
    //     // formData.append('displayPicture', e.target.files[0]);
    //     // console.log(formData);
    //     // setFormy(formData);
    // };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         let data = JSON.parse(JSON.stringify(formData));
    //         data.displayPicture = displayPicture;
    //         console.log(data);
    //         await axios.post(api_url + 'user/register', data);
    //         const loginRes = await axios.post(api_url + 'user/login', {
    //             email: formData.email,
    //             password: formData.password
    //         });
    //         setUserData({
    //             token: loginRes.data.token,
    //             user: loginRes.data.user
    //         });
    //         localStorage.setItem('auth-token', loginRes.data.token);
    //         // history.push('/');
    //         // setMessage('Registration Successful. Login to Continue.');
    //         // setMessageType('success');

    //     } catch (error) {
    //         if (error.response.data.msg) {
    //             setMessage(error.response.data.msg);
    //             setMessageType('error');
    //         }
    //     }
    // };


    // Animations
    const fade = useSpring({
        from: { opacity: 0 },
        opacity: 1,
    });

    return (
        // <animated.div className="register" style={fade}>
        //     <h1 className="register__heading">Register</h1>
        //     {message && (
        //         <Alert message={message} clearMessage={clearMessage} type={messageType} />
        //     )}
        //     <form className="register__form" onSubmit={handleSubmit}>
        //         <div className="register__field">
        //             <input className="register__input" type="text" placeholder=" " value={formData.email} name="email" onChange={handleFormData} required autoComplete='off' />
        //             <label htmlFor="email" className="register__label">
        //                 <span className="register__labelName">Email</span>
        //             </label>
        //         </div>
        //         <div className="register__field">
        //             <input className="register__input" type="password" placeholder=" " value={formData.password} name="password" onChange={handleFormData} required autoComplete='off' />

        //             <label htmlFor="password" className="register__label">
        //                 <span className="register__labelName">Password</span>
        //             </label>
        //         </div>
        //         <div className="register__field">
        //             <input className="register__input" type="password" placeholder=" " value={formData.passwordCheck} name="passwordCheck" onChange={handleFormData} required autoComplete='off' />
        //             <label htmlFor="passwordCheck" className="register__label">
        //                 <span className="register__labelName">Confirm Password</span>
        //             </label>
        //         </div>
        //         <div className="register__field">
        //             <input className="register__input" type="text" placeholder=" " value={formData.displayName} name="displayName" onChange={handleFormData} autoComplete='off' />
        //             <label htmlFor="displayName" className="register__label">
        //                 <span className="register__labelName">Display Name</span>
        //             </label>
        //         </div>
        //         <div className="register__field">
        //             <input className="register__input" type="file" name="displayPicture" onChange={(e) => uploadImage(e)} />
        //             <label htmlFor="displayName" className="register__label">
        //                 <span className="register__labelName">Display Picture</span>
        //             </label>
        //         </div>

        //         <div className="register__btnContainer">
        //             <button className="register__button">Register</button>
        //         </div>
        //     </form>
        // </animated.div>
        <animated.div className="register" style={fade}>
            <h1 className="register__heading">Register</h1>
            {message && (
                <Alert message={message} clearMessage={clearMessage} type={messageType} />
            )}
            <Formik
                initialValues={
                    {
                        email: '',
                        password: '',
                        passwordCheck: '',
                        displayName: '',
                        displayPicture: ''
                    }
                }
                onSubmit={async (data, { setSubmitting }) => {
                    try {
                        console.log(data);
                        setSubmitting(true);
                        let formData = new FormData();
                        formData.append('email', data.email)
                        formData.append('password', data.password)
                        formData.append('passwordCheck', data.passwordCheck)
                        formData.append('displayName', data.displayName)
                        formData.append('displayPicture', data.displayPicture)
                        console.log(formData);
                        await axios.post(api_url + 'user/register', formData);
                        const loginRes = await axios.post(api_url + 'user/login', {
                            email: data.email,
                            password: data.password
                        });
                        setUserData({
                            token: loginRes.data.token,
                            user: loginRes.data.user
                        });
                        localStorage.setItem('auth-token', loginRes.data.token);
                        setSubmitting(false);
                    } catch (error) {
                        if (error.response.data.msg) {
                            setMessage(error.response.data.msg);
                            setMessageType('error');
                        }
                    }
                }
                }>
                {({ values, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue }) => (

                    <form className="form">
                        <div className="form__field">
                            <input className="form__input" type="text" placeholder=" " name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
                            <label htmlFor="email" className="form__label">
                                <span className="form__labelName">Email</span>
                            </label>
                        </div>
                        <div className="form__field">
                            <input className="form__input" type="password" placeholder=" " name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
                            <label htmlFor="password" className="form__label">
                                <span className="form__labelName">Password</span>
                            </label>
                        </div>
                        <div className="form__field">
                            <input className="form__input" type="password" placeholder=" " name="passwordCheck" value={values.passwordCheck} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
                            <label htmlFor="passwordCheck" className="form__label">
                                <span className="form__labelName">Confirm Password</span>
                            </label>
                        </div>
                        <div className="form__field">
                            <input className="form__input" type="text" placeholder=" " name="displayName" value={values.displayName} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                            <label htmlFor="displayName" className="form__label">
                                <span className="form__labelName">Display Name</span>
                            </label>
                        </div>

                        <div className="form__field">
                            <input className="form__input" type="file" placeholder=" " name="displayPicture" onChange={(e) => setFieldValue('displayPicture', e.target.files[0])} required />
                            <label htmlFor="displayPicture" className="form__label">
                                <span className="form__labelName">Display Picture</span>
                            </label>
                        </div>

                        <div className="form__btnContainer">
                            <Button disabled={isSubmitting} text="Create" clicked={handleSubmit} />
                        </div>
                    </form>
                )}
            </Formik >
        </animated.div>
    )
}

export default Register;
