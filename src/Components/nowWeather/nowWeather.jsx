import React from "react";
import style from "./nowWeather.module.css";
import clouds from "./clouds.png";

function NowWeather() {
  return (
    <div>
      <section className={style.currentWeather}>
        <div className={style.main__upperContainer}>
          <img className={style.main__weatherImage} src={clouds} alt="clouds" />
          <div className={style.main__tempWrapper}>
            <h1 className={style.main__temp}>19°C</h1>
            <p>Overcast clouds</p>
            <p>
              Max.: <span>19°</span>/Min.: <span>16°</span>
            </p>
          </div>
        </div>
        <section className={style.main__forecast}>
          <div className={style.details}>
            <div className={style.detail}>
              <p>Real feel: 19°</p>
            </div>
            <div className={style.detail}>
              <p>Humidity: 77%</p>
            </div>
            <div className={style.detail}>
              <p>Wind: 6km/h</p>
            </div>
          </div>
          <div className={style.main__weather}>
            <div className={style.main__weatherDay}></div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default NowWeather;
