import React from "react";
import style from "./error.module.css";

export default function Error() {
  return (
    <div className={style.errorContainer}>
      <h2>
        Please allow your gelocation or enter a city name to search for weather
        information.
      </h2>
    </div>
  );
}
