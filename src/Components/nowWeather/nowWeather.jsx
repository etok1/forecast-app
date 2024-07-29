import React, { useEffect, useState } from "react";
import style from "./nowWeather.module.css";
import geolocation from "./geol.svg";
// import axios from "axios";
import Day from "../oneDay/oneDay.jsx";
import Hour from "../hour/hour.jsx";
import Current from "../current/current.jsx";
import axios from "axios";

function Weather() {
  const [info, setInfo] = useState(null);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(null);
  const [option, setOption] = useState("now");
  const [url, setUrl] = useState("");
  const [city, setCity] = useState("");
  const urlBase = "https://api.openweathermap.org/data/2.5";
  let link;

  const handleSearch = (type) => {
    setSearch(type);
  };
  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      setInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData(url);
      console.log(url);
    } else {
      alert("we need any location to provide you a forecast");
    }
  }, [url]);

  const convertingTemp = (temp) => {
    const converted = temp - 273;
    return converted.toFixed(2);
  };

  const getCurrentLocation = () => {
    handleSearch("current");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);

        link = `${urlBase}/weather?lat=${latitude}&lon=${longitude}&appid=715dd38b56bede6d0444c207f4eed942`;
        setUrl(link);
      });
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  const handleGetWeather = () => {
    getCurrentLocation();
  };

  const handleView = (option) => {
    setOption(option);
    if (city) {
      if (option === "now") {
        link = `${urlBase}/weather?q=${city}&appid=715dd38b56bede6d0444c207f4eed942`;
        setUrl(link);
      } else if (option === "5days") {
        link = `${urlBase}/forecast?q=${city}&cnt=2&appid=715dd38b56bede6d0444c207f4eed942`;
        setUrl(link);
      }
    } else if (location[0] && location[1]) {
      if (option === "now") {
        link = `${urlBase}/weather?lat=${location[0]}&lon=${location[1]}&appid=715dd38b56bede6d0444c207f4eed942`;
        setUrl(link);
      } else if (option === "5days") {
        link = `${urlBase}/forecast?lat=${location[0]}&lon=${location[1]}&cnt=2&appid=715dd38b56bede6d0444c207f4eed942`;
        setUrl(link);
      }
    }
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
            onChange={(event) => {
              console.log(event.target.value);
              setCity(event.target.value);
              setLocation(event.target.value);
            }}
            className={style.inputContainer__input}
            type="text"
            placeholder="Location"
          />
          <button
            className={`${style.btn} ${style.searching} `}
            onClick={(e) => {
              handleSearch("search");

              if (option === "now") {
                setUrl(
                  `${urlBase}/weather?q=${city}&appid=715dd38b56bede6d0444c207f4eed942`
                );
              } else if (option === "5days") {
                setUrl(
                  `${urlBase}/forecast?q=${city}&appid=715dd38b56bede6d0444c207f4eed942`
                );
              }
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
          onClick={() => {
            handleView("now");
            console.log("changed to now");
          }}
        >
          <p>Now</p>
        </button>
        <span>|</span>
        <button
          className={`${style.switcherBtn}  ${
            option === "now" ? style.offBtn : ""
          }`}
          onClick={() => {
            handleView("5days");
            console.log("changed to 5 days");
          }}
        >
          <p>5 days</p>
        </button>
      </div>

      <div className={style.weather}>
        {option === "now" && (
          <Current
            icon={
              info
                ? `http://openweathermap.org/img/wn/${info.weather[0].icon}.png`
                : "loading..."
            }
            temp={info ? convertingTemp(info.main.temp) : " "}
            weather={info ? info.weather[0].description : ""}
            max={info ? convertingTemp(info.main.temp_max) : " "}
            min={info ? convertingTemp(info.main.temp_min) : " "}
            up={
              info
                ? new Date(info.sys.sunrise * 1000).toLocaleTimeString()
                : " "
            }
            down={
              info ? new Date(info.sys.sunset * 1000).toLocaleTimeString() : " "
            }
            feel={info ? convertingTemp(info.main.feels_like) : " "}
            humidity={info ? info.main.humidity : " "}
            wind={info ? info.wind.speed : " "}
            pressure={info ? info.main.pressure : " "}
          />
        )}
        {option === "5days" && (
          <section className={style.fiveDaysWeather}>
            {info.list && (
              <div className={style.fiveDays}>
                {info.list.map((forecast, index) => {
                  const date = new Date(
                    forecast.dt * 1000
                  ).toLocaleDateString();
                  const weather = forecast.weather[0].description;
                  const icon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
                  const minTemp = convertingTemp(forecast.main.temp_min);
                  const maxTemp = convertingTemp(forecast.main.temp_max);

                  return (
                    <Day
                      key={index}
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
