import React, {useEffect, useRef, useState} from 'react';
import { NavLink } from 'react-router-dom'
import { useGlobalContext } from '../context';
import styles from './NavBar.module.css';

const NavBar = props => {
    const {showLinks} = useGlobalContext();
    const displayTime = () => {
        var d = new Date(),
        minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'PM' : 'AM',
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return [(days[d.getDay()]+', '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()), (hours+':'+minutes+ ' '+ampm)];
    };

    return (
        <>
        {<div className={styles.navContainer}>
            
            <nav className={styles.navbar}>
                <div className={styles.navCenter}>
                    <ul className={styles.navLinks}>
                    <li>
                        <NavLink exact activeClassName={styles.selected} to="/" className={styles.navItem} >Home</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={styles.selected} to="/favorites" className={styles.navItem}>Favourite</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={styles.selected} to="/recent" className={styles.navItem}>Recent Search</NavLink>
                    </li>
                    </ul>
                </div>
            </nav>

            <div className={styles.date}>{displayTime()[0]}<span>{displayTime()[1]}</span></div>
        </div>}
        </>
    );
};


NavBar.propTypes = {

};

export default NavBar;