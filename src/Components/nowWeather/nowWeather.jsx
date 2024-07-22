import React, { useState, useEffect } from "react";
import style from "./nowWeather.module.css";
import geolocation from "./geol.svg";
// import axios from "axios";
import Day from "../oneDay/oneDay.jsx";
import Hour from "../hour/hour.jsx";
import Current from "../current/current.jsx";

// function oneDay(props){
//   return
// }

function Weather() {
  const [info, setInfo] = useState(null);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState([null, null]);
  const [option, setOption] = useState("now");

  const handleSearch = (type) => {
    setSearch(type);
  };

  const handleView = (option) => {
    setOption(option);
  };

  const fetchData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const getCurrentLocation = () => {
    handleSearch("current");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);
      });
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  // let url;
  // const urlBase = "https://api.openweathermap.org/data/2.5";

  // if (option === "now") {
  //   url = new URL(
  //     `/weather?lat=${latitude}&lon=${longitude}&appid=715dd38b56bede6d0444c207f4eed942`,
  //     urlBase
  //   );
  //   fetchData(url);
  // } else if (option === "5days") {
  //   url = new URL(
  //     `/forecast?lat=${latitude}&lon=${longitude}&appid=715dd38b56bede6d0444c207f4eed942`,
  //     urlBase
  //   );
  //   fetchData(url);
  // }

  const currentWeather = (e) => {
    if (search === "search") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=715dd38b56bede6d0444c207f4eed942`;
      fetchData(url);
    } else if (search === "current") {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=715dd38b56bede6d0444c207f4eed942`;
      fetchData(url);
    }
  };

  const daysWeather = (e) => {
    if (search === "search") {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${e.target.value}&appid=715dd38b56bede6d0444c207f4eed942`;
      fetchData(url);
    } else if (search === "current") {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location[0]}&lon=${location[1]}&appid=715dd38b56bede6d0444c207f4eed942`;
      fetchData(url);
    }
  };

  const handleGetWeather = () => {
    getCurrentLocation();
  };

  const convertingTemp = (temp) => {
    const converted = temp - 273;
    return converted.toFixed(2);
  };

  return (
    <div>
      <div className={style.header}>
        {" "}
        <div className={style.geolocation}>
          <h3>{info ? info.name : " "}</h3>
          <button
            className={`${style.btn} ${style.getLocation} `}
            onClick={() => {
              handleGetWeather();
              currentWeather();
              daysWeather();
            }}
          >
            <img
              className={style.geolocation__icon}
              src={geolocation}
              alt="geolocation"
            />
            By your current location
          </button>
          <p className={style.infoSearch}>
            {search === "search"
              ? `based on your search`
              : search === "current"
              ? `based on your location`
              : ""}
          </p>
        </div>
        <div className={style.inputContainer}>
          <input
            onChange={(event) => setLocation(event.target.value)}
            className={style.inputContainer__input}
            type="text"
            placeholder="Location"
          />
          <button
            className={`${style.btn} ${style.searching} `}
            onClick={() => {
              handleSearch("search");
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className={style.switcher}>
        <button
          className={`${style.switcherBtn} ${
            option === "5days" ? style.offBtn : ""
          }`}
          onClick={() => handleView("now")}
        >
          <p>Now</p>
        </button>
        <span>|</span>
        <button
          className={`${style.switcherBtn}  ${
            option === "now" ? style.offBtn : ""
          }`}
          onClick={() => handleView("5days")}
        >
          <p>5 days</p>
        </button>
      </div>

      <div className={style.weather}>
        {option === "now" && (
          <Current
            icon={
              info
                ? `http://openweathermap.org/img/wn/${info.list[0].weather[0].icon}.png`
                : "loading..."
            }
            temp={info ? convertingTemp(info.list[0].main.temp) : " "}
            weather={info ? info.list[0].weather[0].description : ""}
            max={info ? convertingTemp(info.list[0].main.temp_max) : " "}
            min={info ? convertingTemp(info.list[0].main.temp_min) : " "}
            up={
              info
                ? new Date(info.list[0].sys.sunrise * 1000).toLocaleTimeString()
                : " "
            }
            down={
              info
                ? new Date(info.list[0].sys.sunset * 1000).toLocaleTimeString()
                : " "
            }
            feel={info ? convertingTemp(info.list[0].main.feels_like) : " "}
            humidity={info ? info.list[0].main.humidity : " "}
            wind={info ? info.list[0].wind.speed : " "}
            pressure={info ? info.list[0].main.pressure : " "}
          />
        )}
        {option === "5days" && (
          <section className={style.fiveDaysWeather}>
            {info && (
              <div className={style.fiveDays}>
                {info.list.map((data, index) => {
                  const key = data.weather[0].id;
                  const date = new Date(data.dt * 1000).toLocaleDateString();
                  const weather = data.weather.description;
                  const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.svg`;
                  const minTemp = convertingTemp(data.main.temp_min);
                  const maxTemp = convertingTemp(data.main.temp_max);
                  return (
                    <Day
                      key={key}
                      icon={icon}
                      date={date}
                      weather={weather}
                      minTemp={minTemp}
                      maxTemp={maxTemp}
                    />
                  );
                })}
              </div>
            )}

            <div className={style.hourly}>
              <Hour
                icon="fluent:weather-fog-24-filled"
                temp="22"
                time="15:00"
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Weather;
