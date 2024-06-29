// src/Weather.js 
import React, { useState } from 'react'; 
import axios from 'axios'; 
import './Weather.css'; 

const Weather = () => { 
    const [location, setLocation] = useState(''); 
    const [weatherData, setWeatherData] = useState(null); 
    const [error, setError] = useState(''); 

    const apiKey = '13bd76c72eb560bf85bf54ba7e50c9bd'; // Replace with your actual API key 

    const fetchWeather = async (location) => { 
        try { 
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`); 
            setWeatherData(response.data); 
            setError(''); 
        } catch (err) { 
            setError('Location not found'); 
            setWeatherData(null); 
        } 
    }; 

    const handleInputChange = (e) => { 
        setLocation(e.target.value); 
    }; 

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        if (location) { 
            fetchWeather(location); 
        } 
    }; 

    return ( 
        <div className="weather-app"> 
            <h1>Weather App</h1> 
            <form onSubmit={handleSubmit}> 
                <input 
                    type="text" 
                    placeholder="Enter location" 
                    value={location} 
                    onChange={handleInputChange} 
                /> 
                <button type="submit">Get Weather</button> 
            </form> 
            {error && <p className="error">{error}</p>} 
            {weatherData && ( 
                <div className="weather-info"> 
                    <h2>{weatherData.name}</h2> 
                    <p>{weatherData.weather[0].description}</p> 
                    <p>Temperature: {weatherData.main.temp} °C</p> 
                    <p>Humidity: {weatherData.main.humidity} %</p> 
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p> 
                </div> 
            )} 
        </div> 
    ); 
}; 

export default Weather;
