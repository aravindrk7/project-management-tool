import React, { useEffect, useState, useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './Home.css';
import UserContext from './../../context/userContext';
import { config } from './../../constants/apiRoute';

function Home() {
    const api_url = config.url.API_URL;
    const { userData } = useContext(UserContext);
    console.log(userData);

    const history = useHistory();

    // const props = useSpring({ number: num, from: { number: 0 } })

    useEffect(() => {
        if (typeof userData.user !== 'undefined') {
            if (!userData.user) {
                history.push('/login')
            }
            else {
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData.user]);


    return (
        <div className="home">
            <div className="home__header">
                <div className="home__heading">
                    <h1>Home</h1>
                </div>
            </div>
            <main className="home__main">
                <span className="home__greeting">Hello,</span>
                <h1 className="home__name">{userData.user?.displayName}</h1>
            </main>
        </div>
    )
}

export default Home;
