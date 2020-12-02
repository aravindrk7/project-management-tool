import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import { AiOutlineSearch } from "react-icons/ai";
import { FiBell } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import UserContext from '../../../context/userContext';
import dp1 from '../../../images/dp/dp1.PNG';

function Header() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const logout = () => {
        setUserData({
            token: null,
            user: null
        });
        localStorage.setItem('pmt-auth-token', '');
        history.push('/login');
    }

    return (
        <header className="header">
            <section className="header__search">
                <AiOutlineSearch className="header__searchIcon" />
                <input type="text" placeholder="Search here" />
            </section>
            <section className="header__user">

                <div className="header__userDetails">
                    <div className="header__userName">{userData.user?.displayName}</div>
                    <div className="header__userEmail">{userData.user?.email}</div>
                </div>
                <div className="header__userCard center">
                    <img className="header__userIcon" src={dp1} alt="" />
                </div>
                <div className="header__icon center">
                    <FiBell />
                </div>
                <div className="header__icon center" onClick={logout}>
                    <FiLogOut title="Logout" />
                </div>
            </section>
        </header>
    )
}

export default Header;
