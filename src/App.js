import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FourAgainstDarknessApp } from "./FourAgainstDarknessApp";
import { Home } from "./Home";
import { SpeedInsights } from "@vercel/speed-insights/react"

const App = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">4AD Companion</h1>
      <Routes>
        <Route path="/dungeon/:slug" element={<FourAgainstDarknessApp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
    <SpeedInsights />
  </Router>
);

export default AppWrapper;
