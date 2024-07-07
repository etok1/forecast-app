// import MyComponent from "./Components/data/Data.jsx";
import React from "react";
import Header from "./Components/header/Header.jsx";
import style from "./App.module.css";
import "./reset.css";

// ,
function App() {
  return (
    <div className={style.Body}>
      <div className={style.Container}>
        <Header />
      </div>
    </div>
  );
}
export default App;
