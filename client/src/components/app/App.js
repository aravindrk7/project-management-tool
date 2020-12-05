import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from "react-router-dom";
import { __RouterContext } from 'react-router';
import axios from 'axios';
// import { useTransition, animated } from 'react-spring';

import './App.css';
import { config } from './../../constants/apiRoute';
import UserContext from './../../context/userContext';
import FavoritesContext from './../../context/favoritesContext';

import Header from '../shared/header/Header';

import Sidenav from '../sidenav/Sidenav';
import Main from '../main/Main';

function App() {
  const api_url = config.url.API_URL;
  const { location } = useContext(__RouterContext);
  // const transitions = useTransition(location, location => location.pathname, {
  //   from: { opacity: 0, transform: 'scale(0)' },
  //   enter: { opacity: 1, transform: 'scale(1)' },
  //   leave: { opacity: 0, transform: 'scale(0)' },
  // });
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
    // <Router>
    <UserContext.Provider value={{ userData, setUserData }}>
      <FavoritesContext.Provider value={{ favorites, setFavorites }}>
        <div className="app">
          {location.pathname !== '/login' && location.pathname !== '/register' &&
            <>
              <Header />
              <Sidenav />
            </>
          }
          <div className="app__main">
            {/* {transitions.map(({ item, props, key }) => (
              <animated.div key={key} style={props}> */}
            <Main/>
            {/* <Main transitions={transitions} /> */}
            {/* </animated.div>
            ))} */}
          </div>
        </div>
      </FavoritesContext.Provider>
    </UserContext.Provider>
    // </Router>

  );
}

export default withRouter(App);
