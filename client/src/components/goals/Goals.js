import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from './../../context/userContext';
import SubHeader from '../shared/subHeader/SubHeader';
import './Goals.css';

function Goals() {
    const { userData } = useContext(UserContext);
    const history = useHistory();
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
        <div className="goals">
            <SubHeader heading="Goals" />
            <div className="goals__main">
            </div>
        </div>
    )
}

export default Goals;
