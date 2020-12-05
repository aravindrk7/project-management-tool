import React from 'react';
import Home from '../home/Home';
import Login from '../login/Login';
import Register from '../register/Register';
import NoMatch from '../noMatch/NoMatch';
import MyTasks from '../myTasks/MyTasks';
import Goals from '../goals/Goals';
import Calendar from '../calendar/Calendar';
import Projects from '../projects/Projects';
import ProjectDetails from '../projectDetails/ProjectDetails';

import { Switch, Route, Redirect } from "react-router-dom";
// import { animated } from 'react-spring';
import './Main.css'
function Main({ transitions }) {
    return (
        // transitions.map(({ item, props, key }) => (
        //     <animated.div key={key} style={props} className="main">
        <Switch >
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/myTasks">
                <MyTasks />
            </Route>
            <Route path="/goals">
                <Goals />
            </Route>
            <Route path="/calendar">
                <Calendar />
            </Route>
            <Route path="/projects">
                <Projects />
            </Route>
            <Route path="/project/:id">
                <ProjectDetails />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
        //     </animated.div>
        // ))
    )
}

export default Main;
