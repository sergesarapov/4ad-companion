import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CharacterCard } from "./CharacterCard";
import { DungeonGrid } from "./DungeonGrid";
import { EncounterCard } from "./EncounterCard";
import { LogEntry } from "./LogEntry";
import { FloatingDice } from "./FloatingDice";

export const FourAgainstDarknessApp = () => {
  const { slug } = useParams();
  const savedGrid = localStorage.getItem(`dungeon-${slug}`);
  const savedCharacters = localStorage.getItem(`characters-${slug}`);
  const savedEncounters = localStorage.getItem(`encounters-${slug}`);
  const savedLogEntries = localStorage.getItem(`log-entries-${slug}`);
  const [grid, setGrid] = useState(
    savedGrid
      ? JSON.parse(savedGrid)
      : Array(28)
        .fill()
        .map(() => Array(20).fill(false))
  );
  const [characters, setCharacters] = useState(
    savedCharacters
      ? JSON.parse(savedCharacters)
      : Array(4)
        .fill()
        .map(() => ({
          name: "Name",
          class: "Class",
          level: 1,
          gold: 0,
          attack: 0,
          defense: 0,
          fullLife: 0,
          currentLife: 0,
          equipment: ['bandage'],
          spells: [],
          notes: "",
        }))
  );

  const [encounters, setEncounters] = useState(
    savedEncounters ? JSON.parse(savedEncounters) : []
  );

  const [logEntries, setLogEntries] = useState(
    savedLogEntries ? JSON.parse(savedLogEntries) : []
  );

  const [newLogEntry, setNewLogEntry] = useState("");

  useEffect(() => {
    if (savedGrid) setGrid(JSON.parse(savedGrid));
    if (savedCharacters) setCharacters(JSON.parse(savedCharacters));
    if (savedEncounters) setEncounters(JSON.parse(savedEncounters));
    if (savedLogEntries) setLogEntries(JSON.parse(savedLogEntries));
  }, [slug]);

  useEffect(() => {
    localStorage.setItem(`dungeon-${slug}`, JSON.stringify(grid));
  }, [grid, slug]);

  useEffect(() => {
    localStorage.setItem(`characters-${slug}`, JSON.stringify(characters));
  }, [characters, slug]);

  useEffect(() => {
    localStorage.setItem(`encounters-${slug}`, JSON.stringify(encounters));
  }, [encounters, slug]);

  useEffect(() => {
    localStorage.setItem(`log-entries-${slug}`, JSON.stringify(logEntries));
  }, [logEntries, slug]);

  const addNewEncounter = () => {
    const newEncounter = {
      name: "New Encounter",
      type: "Minion",
      level: 1,
      count: Array(21).fill(false),
      attacksPerRound: 1,
      status: "Alive",
      notes: "",
    };
    setEncounters([...encounters, newEncounter]);
    // setEncounters((prevEncounters) => [newEncounter, ...prevEncounters]);
  };

  const addLogEntry = () => {
    if (newLogEntry.trim() !== "") {
      const newEntry = {
        id: Date.now(),
        text: newLogEntry,
        timestamp: new Date().toISOString(),
      };
      setLogEntries(prevEntries => [newEntry, ...prevEntries]);
      setNewLogEntry("");
    }
  };

  const updateLogEntry = (updatedEntry) => {
    setLogEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

  const deleteLogEntry = (id) => {
    setLogEntries(prevEntries =>
      prevEntries.filter(entry => entry.id !== id)
    );
  };

  const navigate = useNavigate();

  return (
    <>
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <DungeonGrid grid={grid} onGridUpdate={setGrid} />
      <h2 className="text-xl font-bold mt-6 mb-2">Characters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {characters.map((character, index) => (
          <CharacterCard
            key={index}
            character={character}
            setCharacter={(newCharacter) => {
              const updatedCharacters = [...characters];
              updatedCharacters[index] = newCharacter;
              setCharacters(updatedCharacters);
            }}
          />
        ))}
      </div>
      <h2 className="text-xl font-bold mt-6 mb-2">Encounters</h2>
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        onClick={addNewEncounter}
      >
        + New Encounter
      </button>
      <div className="flex flex-col-reverse">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"> */}
        {encounters.map((encounter, index) => (
          <EncounterCard
            key={index}
            encounter={encounter}
            setEncounter={(newEncounter) => {
              const updatedEncounters = [...encounters];
              updatedEncounters[index] = newEncounter;
              setEncounters(updatedEncounters);
            }}
          />
        ))}
      </div>
      <h2 className="text-xl font-bold mt-6 mb-2">Adventure Log</h2>
      <div className="mb-4">
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="3"
          placeholder="Enter a new log entry..."
          value={newLogEntry}
          onChange={(e) => setNewLogEntry(e.target.value)}
        />
        <button
          className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={addLogEntry}
        >
          Add Log Entry
        </button>
      </div>
      <div>
        {logEntries.map(entry => (
          <LogEntry
            key={entry.id}
            entry={entry}
            updateEntry={updateLogEntry}
            deleteEntry={deleteLogEntry}
          />
        ))}
      </div>
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
      <FloatingDice />
    </>
  );
};
