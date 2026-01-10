import React from 'react';
import { X } from 'lucide-react';

export const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl max-h-[90vh] overflow-y-auto mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold dark:text-white">🛡️ Four Against Darkness Companion</h2>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4 dark:text-white">
          <p className="text-lg">
            Welcome, brave adventurer! This companion app will help you navigate the dark dungeons
            of Four Against Darkness. Here's everything you need to know to get started on your epic
            journey:
          </p>

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">🎯 Core Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">🎲</span>
                <span>
                  <strong>Dungeon Rolling:</strong> Use the dice roll buttons at the top of the page
                  to define room shape, contents, encounters, and treasure
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🗺️</span>
                <span>
                  <strong>Dungeon Grid:</strong> A digital representation of your dungeon layout to
                  track your exploration
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✨</span>
                <span>
                  <strong>Dungeon Generation:</strong> Use the "Generate" button in the Dungeon Map
                  section to automatically create a random dungeon layout with rooms and corridors
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🏹</span>
                <span>
                  <strong>Character Management:</strong> Keep track of four heroes, including their
                  stats, equipment, and spells
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">👹</span>
                <span>
                  <strong>Encounter Tracking:</strong> Manage and track various encounters
                  throughout your adventure
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📜</span>
                <span>
                  <strong>Adventure Logging:</strong> Keep track of your adventures with short log
                  entries
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📚</span>
                <span>
                  <strong>Persistent Storage:</strong> Your dungeon, characters, and encounters are
                  automatically saved
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🏰</span>
                <span>
                  <strong>Save/Load Functionality:</strong> Export your dungeon to a JSON file and
                  load it on different devices
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">🕯️ Pro Tips</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">🌙</span>
                <span>
                  Toggle between light and dark mode using the theme button in the top right corner
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🧙</span>
                <span>
                  Characters can be migrated from previous dungeons to new adventures - look for the
                  migration button in edit mode when creating a new character
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🔄</span>
                <span>
                  You can drag and drop character tabs to change their order. On mobile devices, tap
                  and hold a character tab, then drag it to the desired position.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
