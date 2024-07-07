// import MyComponent from "./Components/data/Data.jsx";
import React from "react";
import Header from "./Components/header/Header.jsx";
import style from "./App.module.css";
import "./reset.css";

// ,
function App() {
  return (
    <div className={style.body}>
      <div className={style.container}>
        <Header />
        <main className={style.main}>
          <div className={style.main__upperContainer}></div>
        </main>
      </div>
    </div>
  );
}
export default App;
