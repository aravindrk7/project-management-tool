import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';
import SubHeader from '../shared/subHeader/SubHeader';
import './Calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


function EventCalendar() {
    const localizer = momentLocalizer(moment);
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const [eventsList] = useState([
        {
            'title': 'Work on Dashboard',
            'allDay': false,
            'start': new Date(2020, 11, 1, 10, 0), // 10.00 AM
            'end': new Date(2020, 11, 4, 14, 0), // 2.00 PM 
        },
        {
            'title': 'Prepare Documentation for App Design',
            'allDay': false,
            'start': new Date(2020, 11, 3, 16, 0), // 10.00 AM
            'end': new Date(2020, 11, 10, 22, 0), // 2.00 PM 
        }
    ]);
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
    useEffect(() => {
        // setEventsList()
    }, []);
    return (
        <div className="calender">
            <SubHeader heading="Calender" />
            <div className="calender__main">
                <Calendar
                    localizer={localizer}
                    events={eventsList}
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>
        </div>
    )
}

export default EventCalendar;
