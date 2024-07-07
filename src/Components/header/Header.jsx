import React from "react";
import style from "./Header.module.css";
import geolocation from "./geol.svg";

import search from "./search.svg";
function Header() {
  return (
    <div className={style.header}>
      <div className={style.geolocation}>
        <img
          className={style.geolocation__icon}
          src={geolocation}
          alt="geolocation"
        />
        <p>London</p>
      </div>
      <div className={style.inputContainer}>
        <input
          className={style.inputContainer__input}
          type="search"
          placeholder="Location"
        />
        <button className={style.inputContainer__btn}>
          <img src={search} alt="search" />
        </button>
      </div>
    </div>
  );
}

export default Header;
