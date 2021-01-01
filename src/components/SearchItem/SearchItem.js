import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchItem.module.css';
import logo from './logo.png';
import { BiSearchAlt2 } from 'react-icons/bi';
import {useGlobalContext} from '../context';
import { Link, useHistory } from 'react-router-dom';



const SearchItem = props => {
    const {searchTerm, setSearchTerm, fetchWeatherData} = useGlobalContext();
    const searchItemRef = useRef(null);
    let history = useHistory();
    
    useEffect(() => {
        searchItemRef.current.focus();
    }, []);

    return (
        <div className={styles.navContainer}>
            <div className={styles.SearchItem }>
                <img className={styles.logo} src={logo} alt='logo'/>
                <div className={styles.searchField}>
                    <form onSubmit={() => {
                        history.push("/");
                        fetchWeatherData();
                        
                    }}>
                        <input className={styles.searchCity}
                        ref={searchItemRef}
                        type='text' 
                        name='searchCity' 
                        id='searchCity' 
                        placeholder='Search City'
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            // setWeather({data: ''});
                            // fetchWeatherData();
                        }}
                        // onKeyPress={fetchWeatherData}
                        >
                        </input>
                        <button className={styles.searchIcon} onClick={(e) => {
                            history.push("/");
                            fetchWeatherData(e);
                        }}><BiSearchAlt2/></button>
                    </form>
                </div>
            </div>
        </div>
    );
};


SearchItem.propTypes = {

};

export default SearchItem;