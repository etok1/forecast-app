import React from "react";
import User from "./Components/User/User.jsx";

function App() {
  const user = {
    name: "Ivan",
    secondName: "Petrov",
    age: "25",
    gender: "M",
    rank: 3,
  };
  return (
    <div>
      <User {...user} />
    </div>
  );
}
export default App;
