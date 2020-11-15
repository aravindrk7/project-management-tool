import React, { useContext } from 'react';
import './Header.css';
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import UserContext from '../../../context/userContext';

function Header() {
    const { userData } = useContext(UserContext);;
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
                    <AiOutlineUser className="header__userIcon" />
                </div>
            </section>
        </header>
    )
}

export default Header;
