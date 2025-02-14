import React, { useEffect, useState } from "react";
import "./Weather.css";
import { FaCloud, FaSearch, FaSun, FaCloudRain, FaSnowflake, FaWind } from "react-icons/fa";

const Weather = () => {
    const [city, setCity] = useState("London");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) {
                setError("City not found");
                setWeatherData(null);
                return;
            }

            setWeatherData(data);
            setError(null);
        } catch (error) {
            setError("Error fetching data");
            console.error(error);
        }
    };

    useEffect(() => {
        search(city);
    }, []);

    const handleSearch = () => {
        search(city);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search(city)
        }
    }

    const getWeatherIcon = () => {
        if (!weatherData) return null;
        const condition = weatherData.weather[0].main;

        switch (condition) {
            case "Clear":
                return <FaSun className="weather-icon" size={70} color="yellow" />;
            case "Clouds":
                return <FaCloud className="weather-icon" size={70} color="gray" />;
            case "Rain":
                return <FaCloudRain className="weather-icon" size={70} color="blue" />;
            case "Snow":
                return <FaSnowflake className="weather-icon" size={70} color="lightblue" />;
            default:
                return <FaWind className="weather-icon" size={70} color="white" />;
        }
    };

    return (
        <div className="app">
            <div className="search">
                <input
                    type="text"
                    className="input"
                    placeholder="Search city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="search-btn" onClick={handleSearch}>
                    <FaSearch className="search-icon" />
                </button>
            </div>

            {error && <p className="error">{error}</p>}

            {weatherData && (
                <div className="details">
                    {getWeatherIcon()}
                    <p className="degree">Temperature: <span>{weatherData.main.temp}° C</span></p>
                    <p className="location">Location: <span>{weatherData.name}</span></p>
                </div>
            )}

            {weatherData && (
                <div className="weather-data">
                    <div className="col">
                        <div>
                            <p>{weatherData.main.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <p>{weatherData.wind.speed} km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
