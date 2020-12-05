import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';
import SubHeader from '../shared/subHeader/SubHeader';
import './Calendar.css';

function Calendar() {
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
            <div className="calender">
                <SubHeader heading="Calender" />
                <div className="calender__main"></div>
            </div>
    )
}

export default Calendar;
