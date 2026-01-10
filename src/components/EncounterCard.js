import React, { useEffect, useState } from 'react';
import { MdExpandMore, MdExpandLess, MdEdit, MdCheck, MdClose } from 'react-icons/md';

export const EncounterCard = ({ counter, encounter, setEncounter, isExpanded, onExpand }) => {
  const isCollapsed = !isExpanded;
  const [localEncounter, setLocalEncounter] = useState(encounter);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(encounter.name);

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

  const handleEditName = () => {
    setTempName(localEncounter.name);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    setLocalEncounter((prev) => ({ ...prev, name: tempName }));
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setTempName(localEncounter.name);
    setIsEditingName(false);
  };

  const handleNameInputChange = (e) => {
    setTempName(e.target.value);
  };

  const getDisplayName = (name) => (/^Encounter #\d+$/.test(name) ? name : `${counter}. ${name}`);

  return (
    <div className="dark:bg-gray-800 dark:text-white p-4 bg-gray-100 rounded mt-2 mb-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          {isEditingName ? (
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <input
                type="text"
                value={tempName}
                onChange={handleNameInputChange}
                className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-600 w-[180px]"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="text-green-600 hover:text-green-700 transition-colors flex-shrink-0"
                title="Save"
              >
                <MdCheck size={20} />
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-red-600 hover:text-red-700 transition-colors flex-shrink-0"
                title="Cancel"
              >
                <MdClose size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <h2 className="text-2xl font-bold truncate">{getDisplayName(localEncounter.name)}</h2>
              <button
                onClick={handleEditName}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors flex-shrink-0"
                title="Edit name"
              >
                <MdEdit size={20} />
              </button>
            </div>
          )}
        </div>
        <button
          onClick={onExpand}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex-shrink-0 ml-2"
        >
          {isCollapsed ? <MdExpandMore /> : <MdExpandLess />}
        </button>
      </div>
      {!isCollapsed && (
        <div className="mt-2">
          <label
            htmlFor="count"
            className="block text-sm dark:text-slate-400 font-medium text-gray-700"
          >
            Count / Boss HP
          </label>
          <div className="flex space-x-2 items-center">
            <select
              id="count"
              name="count"
              value={localEncounter.count || 1}
              onChange={(e) =>
                setLocalEncounter((prev) => ({
                  ...prev,
                  count: parseInt(e.target.value, 10),
                }))
              }
              className="dark:bg-gray-800 mt-1 block w-[80px] p-2 border border-gray-300 rounded"
            >
              {[...Array(21)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                setLocalEncounter((prev) => ({
                  ...prev,
                  count: Math.min(21, (prev.count || 1) + 1),
                }))
              }
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
            >
              +1
            </button>
            <button
              onClick={() =>
                setLocalEncounter((prev) => ({
                  ...prev,
                  count: Math.max(1, (prev.count || 1) - 1),
                }))
              }
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
            >
              -1
            </button>
          </div>
        </div>
      )}
      {!isCollapsed && (
        <div className="mt-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm dark:text-slate-400 font-medium text-gray-700">
                Type
              </label>
              <div className="mt-1 space-x-4">
                {['Minion', 'Vermin', 'Boss', 'Weird Monster'].map((type) => (
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
              <select
                id="level"
                name="level"
                value={localEncounter.level}
                onChange={handleInputChange}
                className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="attacksPerRound"
                className="block text-sm dark:text-slate-400 font-medium text-gray-700"
              >
                Attacks per Round
              </label>
              <select
                id="attacksPerRound"
                name="attacksPerRound"
                value={localEncounter.attacksPerRound}
                onChange={handleInputChange}
                className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm dark:text-slate-400 font-medium text-gray-700">
                Status
              </label>
              <div className="mt-1 space-x-4">
                {['Alive', 'Fled', 'Bribed', 'Defeated'].map((status) => (
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
        </div>
      )}
      {isCollapsed && (
        <div className="mt-4 space-y-1">
          <p className="text-sm dark:text-slate-400 text-gray-500">
            <strong>Type:</strong> {localEncounter.type}
          </p>
          <p className="text-sm dark:text-slate-400 text-gray-500">
            <strong>Status:</strong> {localEncounter.status}
          </p>
          {localEncounter.notes && (
            <div>
              <p className="text-sm dark:text-slate-400 text-gray-500">
                <strong>Notes:</strong> {localEncounter.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
