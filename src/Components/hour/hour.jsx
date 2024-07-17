import React from "react";
import style from "./hour.module.css";
import { Icon } from "@iconify/react";

function Hour({ icon, temp, time }) {
  return (
    <div className={style.hour}>
      <Icon icon={icon} width={"50px"} />
      <h3 className={style.hourTemp}>{temp}°</h3>
      <p>{time}</p>
    </div>
  );
}

export default Hour;
