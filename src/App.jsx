import React from "react";
import { Routes, Route } from "react-router";
import Favorite from "./pages/Favorite";
import Header from "./components/Header";
import Home from "./pages/Home";
function App() {
  return (
    <div className=" min-h-screen bg-[#0f0f0f] text-[#E0E0E0] overflow-x-hidden ">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </div>
  );
}

export default App;
