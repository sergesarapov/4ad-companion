import React, { useState, useEffect } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

export const EncounterCard = ({ counter, encounter, setEncounter }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [localEncounter, setLocalEncounter] = useState(encounter);

  useEffect(() => {
    setEncounter(localEncounter);
  }, [localEncounter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalEncounter((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setLocalEncounter((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCount = (index) => {
    setLocalEncounter((prev) => {
      const newCount = [...prev.count];
      newCount[index] = !newCount[index];
      return { ...prev, count: newCount };
    });
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="dark:bg-gray-800 dark:text-white p-4 bg-gray-100 rounded-lg shadow mt-2 mb-2">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold"><span >{counter}.{' '}</span>{localEncounter.name}</h2>
          <p className="text-sm dark:text-slate-400 text-gray-500">{localEncounter.type}</p>
          <p className="text-sm dark:text-slate-400 text-gray-500">
            Status: {localEncounter.status}
          </p>
        </div>
        <button
          onClick={toggleCollapsed}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {isCollapsed ? <MdExpandMore /> : <MdExpandLess />}
        </button>
      </div>
      <div className="mt-2">
        <p>Count / Boss HP:</p>
        <div className="flex flex-wrap w-2/4 mt-1">
          {localEncounter.count.map((checked, index) => (
            <button
              key={index}
              className={`m-1 w-6 h-6 border rounded ${checked ? "bg-blue-500" : "bg-gray-200"
                }`}
              onClick={() => toggleCount(index)}
            />
          ))}
        </div>
      </div>
      {!isCollapsed && (
        <div className="mt-4">
          {isEditMode ? (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm dark:text-slate-400 font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={localEncounter.name}
                  onChange={handleInputChange}
                  className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm dark:text-slate-400 font-medium text-gray-700">
                  Type
                </label>
                <div className="mt-1 space-x-4">
                  {["Minion", "Vermin", "Boss"].map((type) => (
                    <label key={type} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={localEncounter.type === type}
                        onChange={handleRadioChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="level"
                  className="block text-sm dark:text-slate-400 font-medium text-gray-700"
                >
                  Level
                </label>
                <input
                  type="number"
                  id="level"
                  name="level"
                  value={localEncounter.level}
                  onChange={handleInputChange}
                  className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
                  min="1"
                />
              </div>
              <div>
                <label
                  htmlFor="attacksPerRound"
                  className="block text-sm dark:text-slate-400 font-medium text-gray-700"
                >
                  Attacks per Round
                </label>
                <input
                  type="number"
                  id="attacksPerRound"
                  name="attacksPerRound"
                  value={localEncounter.attacksPerRound}
                  onChange={handleInputChange}
                  className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm dark:text-slate-400 font-medium text-gray-700">
                  Status
                </label>
                <div className="mt-1 space-x-4">
                  {["Alive", "Fled", "Bribed", "Defeated"].map((status) => (
                    <label key={status} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={localEncounter.status === status}
                        onChange={handleRadioChange}
                        className="dark:bg-gray-800 form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm dark:text-slate-400 font-medium text-gray-700"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={localEncounter.notes}
                  onChange={handleInputChange}
                  className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
                  rows="3"
                />
              </div>
            </div>
          ) : (
            <>
              <p className="mt-2">Level: {localEncounter.level}</p>
              <p className="mt-2">
                Attacks per Round: {localEncounter.attacksPerRound}
              </p>
              <div className="mt-4">
                <strong>Notes:</strong>
                <p className="whitespace-pre-wrap">{localEncounter.notes}</p>
              </div>
            </>
          )}
          <button
            onClick={toggleEditMode}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition-colors"
          >
            {isEditMode ? "Save" : "Edit"}
          </button>
        </div>
      )}
    </div>
  );
};
