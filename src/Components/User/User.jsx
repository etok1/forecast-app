import React from "react";
import style from "./style.module.css";

const User = ({ name, secondName, age, gender, rank }) => {
  return (
    <div className={style.userCard}>
      <div className={style.title}>{`User: ${name} ${secondName}`}</div>
      <div>
        <div className={style.title}>Information:</div>
        <div>{`Возраст: ${age}`}</div>
        <div>{`Пол: ${gender}`}</div>
      </div>
      <div>Rating {rank}</div>
    </div>
  );
};

export default User;
