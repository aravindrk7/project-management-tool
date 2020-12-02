import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import UserContext from './../../context/userContext';
import SubHeader from '../shared/subHeader/SubHeader';

function Home() {
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
            <SubHeader heading="Home" />
            <main className="home__main">
                <span className="home__greeting">
                    <p className="home__greetingText">Hello,&nbsp;</p>
                    <h1 className="home__greetingUser">{userData.user?.displayName}</h1>
                </span>
            </main>
        </div>
    )
}

export default Home;
