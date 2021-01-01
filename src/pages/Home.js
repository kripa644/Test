import './pages.css';
import WeatherData from '../components/WeatherData/WeatherData';
import React from 'react';
import { useGlobalContext } from '../components/context';

const Home = () => {
    const {weather, loading} = useGlobalContext();
    // console.log(WeatherData);

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            {/* {weather.data === '' || weather.data.cod !== '404' ?  <WeatherData/> : <h1>Failed to fetch the weather details of requested city</h1>} */}
            {weather.data !== '' ? <WeatherData/>: <h2>Please search for city...</h2>}
        </div>
    );
};

export default Home;