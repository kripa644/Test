import React from 'react';
import styles from './FavouriteItem.module.css';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import {useGlobalContext} from '../context';
import { Link } from 'react-router-dom';

const FavouriteItem = ({city, country, icon, temp, info, isFavorite, celcius}) => {
    const {fetchWeatherData, searchTerm, setSearchTerm, isCelcius, recentItems, setRecentItems} = useGlobalContext();
    const iconurl =
    "http://openweathermap.org/img/w/" +
    `${icon}` +
    ".png";

    const redirectToHome = async (e) => {
        await setSearchTerm(city);
        console.log(searchTerm);
        fetchWeatherData(e, city);
    }


    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        // Directly return the joined string
        return splitStr.join(' '); 
     }

    return (
        <Link to='/' className={styles.link} onClick={(e) => {
            redirectToHome(e);
        }}>
            <span className={styles.FavouriteItem }>
                <div className={styles.cityName}>{`${city}, ${country}`}</div>
                <div className={styles.tempData}>
                    <div className={styles.image}><img src={iconurl} alt='sunny'/></div>
                    <div className={styles.tempValue}>{!celcius ? Math.round(temp) : Math.round((temp - 32) / 1.8)}<span>&#176;{celcius ? 'C' : 'F'}</span></div>
                    <div className={styles.tempInfo}>{titleCase(info)}</div>
                </div>
                <div className={styles.favIcon}>
                    {isFavorite ?
                        <div className={styles.fav}><FaHeart/></div> :
                        <div className={styles.notFav}><FaRegHeart/></div>
                    }
                </div>
            </span>
        </Link>
    );
};


export default FavouriteItem;
