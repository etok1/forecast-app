// import MyComponent from "./Components/data/Data.jsx";
import React from "react";
import Header from "./Components/header/Header.jsx";
import style from "./App.module.css";
import "./reset.css";
import NowWeather from "./Components/nowWeather/nowWeather.jsx";

function App() {
  return (
    <div className={style.body}>
      <div className={style.container}>
        <Header />
        <main className={style.main}>
          <select name="name" id="name">
            <option value="name">Now</option>
            <option value="name">5 days</option>
          </select>
          <NowWeather />
        </main>
      </div>
    </div>
  );
}
export default App;
