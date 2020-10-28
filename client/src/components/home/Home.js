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
            <h1 className="home__heading">Home</h1>
            {/* <animated.span>{props.number}</animated.span> */}
        </div>
    )
}

export default Home;
