import React, {useState} from 'react';
import styles from './WeatherData.module.css';
import { FaCloudShowersHeavy, FaHeart, FaThermometerThreeQuarters, FaRegHeart, FaWind } from 'react-icons/fa';
import {BsDroplet} from 'react-icons/bs';
import {MdVisibility} from 'react-icons/md';
import {useGlobalContext} from '../context';
import {useLocalStorageState} from '../useLocalStorageState';
import temperature from '../icons/temperature.png';
import precipitation from '../icons/precipitation.png';
import humidity from '../icons/humidity.png';
import visibility from '../icons/visibility.png';
import wind from '../icons/wind.png';

const WeatherData = props => {
    const {weather, loading, addToFavorite, recentItems, setRecentItems, isCelcius, setIsCelcius} = useGlobalContext();
    const iconurl =
    "http://openweathermap.org/img/w/" +
    `${(weather.data.cod != 404) ? weather.data.weather[0].icon : null}` +
    ".png";
    const tempClassCelcius = `${styles.tempBtnCelcius} ${isCelcius ? styles.celcius : undefined}`;
    const tempClassFah = `${styles.tempBtnFah} ${!isCelcius ? styles.celcius : undefined}`;
    // console.log(weather);

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

    const removeFromFavorite = (cityName) => {
        const newRecentList = recentItems.map((item) => {
            if(item.city === cityName) {
                const newItem = {...item, isFavorite: false};
                return newItem;
            }
            return item;
        });
        setRecentItems(newRecentList);
    }

    const changetoCelcius = (cityName) => {
        const newRecentList = recentItems.map((item) => {
            if(item.city === cityName) {
                const newItem = {...item, celcius: true};
                return newItem;
            }
            return item;
        });
        setRecentItems(newRecentList);
    }

    const changetoFah = (cityName) => {
        const newRecentList = recentItems.map((item) => {
            if(item.city === cityName) {
                const newItem = {...item, celcius: false};
                return newItem;
            }
            return item;
        });
        setRecentItems(newRecentList);
    }

    const isFavorite = (cityName) => {
        if(weather.data !== '') {
            const favItem = recentItems.find((item) => item.city === cityName);
            if(favItem) {
                if(favItem.isFavorite) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
        {weather.data.cod !== '404' ? <div className={styles.WeatherData }>
            <div className={styles.cityContainer}>
                <div className={styles.city}>{`${weather.data.name}, ${weather.data.sys.country}`}</div>
                {!isFavorite(weather.data.name) ? <div className={styles.favorite}>
                    <button className={styles.favoriteButton} onClick={() => addToFavorite(weather.data.name)}>
                        <FaRegHeart/>
                    </button>
                    <span>Add to favourite</span>
                </div> :
                <div className={styles.favorite}>
                    <div className={styles.favoriteIcon} >
                        <button className={styles.favoriteButton} onClick={() => removeFromFavorite(weather.data.name)}>
                            <FaHeart/>
                        </button>
                        <span >Added to favourite</span>
                    </div>
                </div>
                }
            </div>
            <div className={styles.temperature}>
                <div className={styles.icon}><img src={iconurl} alt='sunny'/></div>
                <div className={styles.temp}>
                    <div>{!isCelcius ? Math.round(weather.data.main.temp) : Math.round(((weather.data.main.temp) - 32) / 1.8)}</div>
                    <button className={tempClassCelcius} onClick={() => {
                        setIsCelcius(true);
                        changetoCelcius(weather.data.name);
                    }}>&#176;C</button>
                    <button className={tempClassFah} onClick={() => {
                        setIsCelcius(false);
                        changetoFah(weather.data.name);
                    }}>&#176;F</button>
                </div>
                <div className={styles.weather}>{titleCase(weather.data.weather[0].description)}</div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.tempDetails}>
                <div className={styles.minMax}>
                    <div className={styles.minMaxIcon}><img src={temperature} alt='temperature'/></div>
                    <div className={styles.minMaxText}>Min-Max 
                    <span>{!isCelcius ? Math.round(weather.data.main.temp_min) : Math.round(((weather.data.main.temp_min) - 32) / 1.8)}&#176;
                    - {!isCelcius ? Math.round(weather.data.main.temp_max) : Math.round(((weather.data.main.temp_max) - 32) / 1.8)}&#176;
                    </span></div>
                </div>
                <div className={styles.precipitation}>
                <div className={styles.precipitationIcon}><img src={precipitation} alt='precipitation'/></div>
                    <div className={styles.precipitationText}>Precipitation <span>{weather.data.rain ? (weather.data.rain['1h'].toFixed(2) + ' mm') : (weather.data.snow ? (weather.data.snow['1h'].toFixed(2) + ' mm') : '0%')}</span></div>
                </div>
                <div className={styles.humidity}>
                <div className={styles.humidityIcon}><img src={humidity} alt='humidity'/></div>
                    <div className={styles.humidityText}>Humidity <span>{weather.data.main.humidity}%</span></div>
                </div>
                <div className={styles.wind}>
                <div className={styles.windIcon}><img src={wind} alt='wind'/></div>
                    <div className={styles.windText}>Wind <span>{weather.data.wind.speed} mph</span></div>
                </div>
                <div className={styles.visibility}>
                <div className={styles.visibilityIcon}><img src={visibility} alt='visibility'/></div>
                    <div className={styles.visibilityText}>Visibility <span>{Math.round(weather.data.visibility / 1000)} km</span></div>
                </div>
            </div>
        </div> :
        <h2>Failed to fetch the weather details of requested city</h2>
        }
        </>
    );
};


WeatherData.propTypes = {

};

export default WeatherData;