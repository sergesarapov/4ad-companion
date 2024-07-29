import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CharacterCard } from "./CharacterCard";
import { DungeonGrid } from "./DungeonGrid";
import { EncounterCard } from "./EncounterCard";

export const FourAgainstDarknessApp = () => {
  const { slug } = useParams();
  const savedGrid = localStorage.getItem(`dungeon-${slug}`);
  const savedCharacters = localStorage.getItem(`characters-${slug}`);
  const savedEncounters = localStorage.getItem(`encounters-${slug}`);
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
          defence: 0,
          fullLife: 0,
          currentLife: 0,
          equipment: [],
          spells: [],
          notes: "",
        }))
  );

  const [encounters, setEncounters] = useState(
    savedEncounters ? JSON.parse(savedEncounters) : []
  );

  useEffect(() => {
    if (savedGrid) setGrid(JSON.parse(savedGrid));
    if (savedCharacters) setCharacters(JSON.parse(savedCharacters));
    if (savedEncounters) setEncounters(JSON.parse(savedEncounters));
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
    </>
  );
};
