import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {useLocalStorageState} from './useLocalStorageState';
import {useSessionStorageState} from './useSessionStorageState';

const api = {
    key: 'eba3ee12c3c0d28e4314be09645d4d8b',
    url: 'https://api.openweathermap.org/data/2.5/weather?'
};

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=london&appid=${api.key}`;

const AppContext = React.createContext();

const AppProvider = ({children}) => {

    let history = useHistory();

    const [searchTerm, setSearchTerm] = useState('');
    const [weather, setWeather] = useSessionStorageState({data: ''}, 'weatherData');
    const [loading, setLoading] = useState(false);
    const [recentItems, setRecentItems] = useLocalStorageState([], 'recentItems');
    const [isCelcius, setIsCelcius] = useLocalStorageState(false, 'isCelcius');
    const [showLinks, setShowLinks] = useState();

    const addToFavorite = (cityName) => {
        const newRecentList = recentItems.map((item) => {
            if(item.city === cityName) {
                const newItem = {...item, isFavorite: true};
                return newItem;
            }
            return item;
        });
        setRecentItems(newRecentList);
    
    }

    const fetchWeatherData = async (e, city) => {
            e.preventDefault();
            // setWeather({data: ''});
            setLoading(true);
            setSearchTerm(city);
            const searchValue = city || searchTerm;
            const data = await fetch(`${api.url}q=${searchValue}&units=imperial&appid=${api.key}`
            ).then((res) => res.json())
            .then(data => data);
            // console.log(data);
            setWeather({data: data});
            setSearchTerm('');
            setLoading(false);
            console.log(data);
        
            const element = recentItems.find((item) => item.city === data.name);
            if(element) {
                // setRecentItems(recentItems.concat({...element, isRecent: true}));
                // return;
                const newRecentItems = recentItems.map((item) => {
                    if(item.city === data.name) {
                        return {...item, isRecent: true};
                    }
                    return item;
                });
                setRecentItems(newRecentItems);
                return;
            }
            if(data.cod !== '404') {
                const newData = {city: data.name,
                                country: data.sys.country, 
                                icon: data.weather[0].icon, 
                                temp: data.main.temp, 
                                info: data.weather[0].description,
                                min: data.main.temp_min,
                                max: data.main.temp_max,
                                precipitation: data.rain ? data.rain['1h'] : (data.snow ? data.snow['1h'] : '0'),
                                humidity: data.main.humidity,
                                wind: data.wind.speed,
                                visibility: data.visibility,
                                isFavorite: false,
                                isRecent: true,
                                celcius: isCelcius
                                };
                setRecentItems(recentItems.concat(newData));
            }

        };
  


    return <AppContext.Provider 
            value={{
                searchTerm,
                fetchWeatherData,
                setSearchTerm,
                loading,
                weather,
                setWeather,
                addToFavorite,
                recentItems,
                setRecentItems,
                isCelcius,
                setIsCelcius,
                showLinks,
                setShowLinks
            }}
          >
            {children}
          </AppContext.Provider>
};


export const useGlobalContext = () => {
    return useContext(AppContext);
}
  
export { AppContext, AppProvider }