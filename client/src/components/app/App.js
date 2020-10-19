import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios';

import './App.css';
import { config } from './../../constants/apiRoute';
import UserContext from './../../context/userContext';

// import Header from '../header/Header';
import Home from '../home/Home';
import Login from '../login/Login';
import Register from '../register/Register';
import NoMatch from '../noMatch/NoMatch';
import MyTasks from '../myTasks/MyTasks';
import Goals from '../goals/Goals';
import Project from '../project/Project';
import Team from '../team/Team';
import Sidenav from '../sidenav/Sidenav';
import SidenavRoute from '../sidenav/components/sidenavRoute/SidenavRoute';

// icons
import { FiHome } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FiTarget } from "react-icons/fi";

function App() {
  const api_url = config.url.API_URL;
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("pmt-auth-token");
      if (token === null) {
        localStorage.setItem("pmt-auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        api_url + 'user/isValidToken',
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get(
          api_url + 'user/currentUser',
          { headers: { "x-auth-token": token } }
        );
        setUserData({
          token,
          user: userRes.data
        });
      }
      else {
        setUserData({
          token: null,
          user: null
        });
      }
    }
    checkLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className="app">
          {/* <Header /> */}
          <Sidenav >
            <SidenavRoute parent="/" path='home' name='Home' icon={<FiHome />} id='1' />
            <SidenavRoute parent="/" path='myTasks' name='My Tasks' icon={<FiCheckCircle />} id='2' />
            <SidenavRoute parent="/" path='goals' name='Goals' icon={<FiTarget />} id='3' />
          </Sidenav>
          <div className="app__main">

            <Switch>
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
              <Route path="/project/:id">
                <Project />
              </Route>
              <Route path="/team/:id">
                <Team />
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
          </div>

        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;