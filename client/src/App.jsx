import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import picture from "./assets/Pictures/image.jpg";

const App = () => {
  return (
    <div
      className="w-full min-h-screen"
      
    >
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/room/:roomId"></Route>
        <Route path="/lobby"></Route>
      </Routes>
    </div>
  );
};

export default App;
