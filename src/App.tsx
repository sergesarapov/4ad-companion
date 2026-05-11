import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FourAgainstDarknessApp } from './FourAgainstDarknessApp';
import { Home } from './Home';
import { DarkModeToggle } from './components/DarkModeToggle';
import { HelpModal } from './components/HelpModal';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

const App: React.FC = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between relative dark:bg-black dark:text-white max-w-screen-lg mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold place-self-start">4AD Companion</h1>
        <div className="flex flex-col items-end gap-2">
          <DarkModeToggle />
          <button
            onClick={() => setIsHelpModalOpen(true)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 dark:text-blue-300 px-3 py-1 rounded text-sm transition-colors"
          >
            Help 🔮
          </button>
        </div>
      </div>
      <Routes>
        <Route path="/dungeon/:slug" element={<FourAgainstDarknessApp />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <footer className="dark:bg-gray-800 bg-gray-200 mt-8 py-4 px-6 text-center">
        <p className="text-sm dark:text-slate-400 text-gray-600">
          Four Against Darkness is a game by Andrea Sfiligoi, published by Ganesha Games.
          <br />
          Official website:{' '}
          <a
            href="https://www.ganeshagames.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            www.ganeshagames.net
          </a>
        </p>
        <p className="text-sm dark:text-slate-400 text-gray-600 mt-2">
          Disclaimer: This companion app is not part of the official Four Against Darkness game and
          is not affiliated with or endorsed by Ganesha Games.
        </p>
        <p className="text-sm dark:text-slate-400 text-gray-600 mt-2">
          <a
            href="https://buymeacoffee.com/sergesarapov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline dark:text-green-400"
          >
            Support the developer
          </a>
        </p>
      </footer>
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
    <SpeedInsights />
    <Analytics />
  </Router>
);

export default AppWrapper;
