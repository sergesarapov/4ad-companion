import React from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

export const EncounterCard = ({ counter, encounter, setEncounter, isExpanded, onExpand }) => {
  const isCollapsed = !isExpanded;
  const [localEncounter, setLocalEncounter] = React.useState(encounter);

  React.useEffect(() => {
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
          onClick={onExpand}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
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
                  count: Math.max(1, (prev.count || 1) - 1),
                }))
              }
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
            >
              -1
            </button>
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
                {["Minion", "Vermin", "Boss", "Weird Monster"].map((type) => (
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
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
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
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
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
        </div>
      )}
    </div>
  );
};
