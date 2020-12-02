import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios';

import './App.css';
import { config } from './../../constants/apiRoute';
import UserContext from './../../context/userContext';
import FavoritesContext from './../../context/favoritesContext';

import Header from '../shared/header/Header';
import Home from '../home/Home';
import Login from '../login/Login';
import Register from '../register/Register';
import NoMatch from '../noMatch/NoMatch';
import MyTasks from '../myTasks/MyTasks';
import Goals from '../goals/Goals';
import Projects from '../projects/Projects';
import ProjectDetails from '../projectDetails/ProjectDetails';
import Sidenav from '../sidenav/Sidenav';

function App() {
  const api_url = config.url.API_URL;
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  const [favorites, setFavorites] = useState();

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
        getFavoritesData(userRes.data.id);
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

  const getFavoritesData = (id) => {
    axios.get(api_url + 'project/favorites/' + id).then(response => {
      setFavorites(response.data);
    });
  }

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <FavoritesContext.Provider value={{ favorites, setFavorites }}>
          <div className="app">
            <Header />
            <Sidenav />
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
            </div>

          </div>
        </FavoritesContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
