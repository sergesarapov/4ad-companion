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
      <footer className="bg-gray-200 mt-8 py-4 px-6 text-center">
        <p className="text-sm text-gray-600">
          Four Against Darkness is a game by Andrea Sfiligoi, published by Ganesha Games.
          <br />
          Official website: <a href="https://www.ganeshagames.net/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.ganeshagames.net</a>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Disclaimer: This companion app is not part of the official Four Against Darkness game and is not affiliated with or endorsed by Ganesha Games.
        </p>
      </footer>
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
