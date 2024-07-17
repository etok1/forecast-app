import React, { useState } from "react";
import style from "./nowWeather.module.css";
import geolocation from "./geol.svg";
import axios from "axios";
import Day from "../oneDay/oneDay.jsx";
import Hour from "../hour/hour.jsx";
import Current from "../current/current.jsx";

// function oneDay(props){
//   return
// }

function Weather() {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [option, setOption] = useState("now");

  const handleSearch = (type) => {
    setSearch(type);
  };

  const handleView = (option) => {
    setOption(option);
  };

  const getCurrentLocation = async () => {
    handleSearch("current");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        try {
          const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=715dd38b56bede6d0444c207f4eed942`
          );

          console.log(response.data);
          setData(response.data);
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  return (
    <div>
      <div className={style.header}>
        {" "}
        <div className={style.geolocation}>
          <h3>{location ? location : " "}</h3>
          <button
            className={`${style.btn} ${style.getLocation} `}
            onClick={() => {
              getCurrentLocation();
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
        {data && option === "now" && (
          <Current
            icon="fluent:weather-fog-24-filled"
            temp="19"
            weather="Overcast clouds"
            max="19"
            min="16"
            up={
              data.city.sunrise
                ? new Date(data.city.sunrise * 1000).toLocaleTimeString()
                : " "
            }
            down="19:21"
            feel="19"
            humidity="66"
            wind="5"
            pressure="1004"
          />
        )}
        {option === "5days" && (
          <section className={style.fiveDaysWeather}>
            <div className={style.fiveDays}>
              <Day
                icon="fluent:weather-fog-24-filled"
                date="14.05.25"
                weather="overcast clouds"
                minTemp="18"
                maxTemp="20"
              />
            </div>
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
