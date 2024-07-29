import React, { useState, useEffect } from "react";
import { Dice6 } from "lucide-react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

export const CharacterCard = ({ character, setCharacter }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [localCharacter, setLocalCharacter] = useState(character);
  const [attackRoll, setAttackRoll] = useState(null);
  const [defenseRoll, setDefenseRoll] = useState(null);
  const [newSpell, setNewSpell] = useState({ name: "", slots: 0 });
  const [newEquipment, setNewEquipment] = useState("");

  useEffect(() => {
    setCharacter(localCharacter);
  }, [localCharacter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalCharacter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpellChange = (index, e) => {
    const { name, value } = e.target;

    setLocalCharacter((prev) => {
      const spells = [...prev.spells];
      let newSlotsValue = [];

      if (name === "slots") {
        const newValue = value ? parseInt(value, 10) : 0;
        const currentSlots = spells[index].checkedSlots;

        if (currentSlots.length > newValue) {
          // Reduce the number of checked slots if the new value is less
          newSlotsValue = currentSlots.slice(0, newValue);
        } else if (currentSlots.length < newValue) {
          // Increase the number of checked slots if the new value is more
          newSlotsValue = [
            ...currentSlots,
            ...Array(newValue - currentSlots.length).fill(true),
          ];
        } else {
          // If the number of slots remains the same, keep the current slots
          newSlotsValue = [...currentSlots];
        }
      }

      // Update the spell at the specific index
      spells[index] = {
        ...spells[index],
        [name]: name === "slots" ? parseInt(value, 10) : value,
        checkedSlots:
          name === "slots" ? newSlotsValue : spells[index].checkedSlots,
      };

      return { ...prev, spells };
    });
  };

  const addSpell = () => {
    if (newSpell.name.trim()) {
      setLocalCharacter((prev) => ({
        ...prev,
        spells: [
          ...prev.spells,
          {
            ...newSpell,
            slots: parseInt(newSpell.slots, 10),
            checkedSlots: Array(parseInt(newSpell.slots, 10)).fill(true),
          },
        ],
      }));
      setNewSpell({ name: "", slots: 0 });
    }
  };

  const toggleSlotChecked = (spellIndex, slotIndex) => {
    setLocalCharacter((prev) => {
      const spells = prev.spells.map((spell, index) => {
        if (index !== spellIndex) return spell;
        const checkedSlots = spell.checkedSlots.map((slot, i) =>
          i === slotIndex ? !slot : slot
        );
        return { ...spell, checkedSlots };
      });
      return { ...prev, spells };
    });
  };

  const addEquipment = () => {
    if (newEquipment.trim()) {
      setLocalCharacter((prev) => ({
        ...prev,
        equipment: [...prev.equipment, newEquipment.trim()],
      }));
      setNewEquipment("");
    }
  };

  const deleteEquipment = (itemToDelete) => {
    setLocalCharacter((prev) => ({
      ...prev,
      equipment: prev.equipment.filter((item) => item !== itemToDelete),
    }));
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const rollAttack = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setAttackRoll(roll);
  };

  const rollDefense = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDefenseRoll(roll);
  };

  const incrementLife = () => {
    setLocalCharacter((prev) => ({
      ...prev,
      currentLife: Math.min(prev.currentLife + 1, prev.fullLife),
    }));
  };

  const decrementLife = () => {
    setLocalCharacter((prev) => ({
      ...prev,
      currentLife: Math.max(prev.currentLife - 1, 0),
    }));
  };

  return (
    <div className={`dark:bg-gray-800 dark:text-white p-4 bg-gray-100 rounded-lg shadow ${isCollapsed && 'h-20'}`}>
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
              value={localCharacter.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label
              htmlFor="class"
              className="block text-sm dark:text-slate-400 font-medium text-gray-700"
            >
              Class
            </label>
            <input
              type="text"
              id="class"
              name="class"
              value={localCharacter.class}
              onChange={handleInputChange}
              placeholder="Class"
              className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
            />
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
              value={localCharacter.level}
              onChange={handleInputChange}
              placeholder="Level"
              className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
              min="1"
            />
          </div>
          <div>
            <label
              htmlFor="gold"
              className="block text-sm dark:text-slate-400 font-medium text-gray-700"
            >
              Gold
            </label>
            <input
              type="number"
              id="gold"
              name="gold"
              value={localCharacter.gold}
              onChange={handleInputChange}
              placeholder="Gold"
              className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
              min="0"
            />
          </div>
          <div>
            <label
              htmlFor="attack"
              className="block text-sm dark:text-slate-400 font-medium text-gray-700"
            >
              Attack
            </label>
            <input
              type="number"
              id="attack"
              name="attack"
              value={localCharacter.attack}
              onChange={handleInputChange}
              placeholder="Attack"
              className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
              min="0"
            />
          </div>
          <div>
            <label
              htmlFor="defense"
              className="block text-sm dark:text-slate-400 font-medium text-gray-700"
            >
              Defense
            </label>
            <input
              type="number"
              id="defense"
              name="defense"
              value={localCharacter.defense}
              onChange={handleInputChange}
              placeholder="Defense"
              className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
              min="0"
            />
          </div>
          <div>
            <label
              htmlFor="fullLife"
              className="block text-sm dark:text-slate-400 font-medium text-gray-700"
            >
              Full Life
            </label>
            <input
              type="number"
              id="fullLife"
              name="fullLife"
              value={localCharacter.fullLife}
              onChange={handleInputChange}
              placeholder="Full Life"
              className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
              min="0"
            />
          </div>
          <div>
            <label
              htmlFor="currentLife"
              className="block text-sm dark:text-slate-400 font-medium text-gray-700"
            >
              Current Life
            </label>
            <input
              type="number"
              id="currentLife"
              name="currentLife"
              value={localCharacter.currentLife}
              onChange={handleInputChange}
              placeholder="Current Life"
              className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
              min="0"
              max={localCharacter.fullLife}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Equipment</h3>
            <ul>
              {localCharacter.equipment.map((item, index) => (
                <div className='flex m-2'>
                  <li key={index}>{item}</li>
                  <button className='ml-2 pr-2 pl-2 inline border bg-red-500 rounded' onClick={() => deleteEquipment(item)}>del</button>
                </div>
              ))}
            </ul>
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                value={newEquipment}
                onChange={(e) => setNewEquipment(e.target.value)}
                placeholder="New Equipment"
                className="dark:bg-gray-800 w-1/2 p-2 border border-gray-300 rounded"
              />
              <button
                onClick={addEquipment}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                + Add Equipment
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Spells</h3>
            {localCharacter.spells.map((spell, index) => (
              <div key={index} className="flex space-x-2 mt-2">
                <input
                  type="text"
                  name="name"
                  value={spell.name}
                  onChange={(e) => handleSpellChange(index, e)}
                  placeholder="Spell Name"
                  className="dark:bg-gray-800 w-1/2 p-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name="slots"
                  value={spell.slots}
                  onChange={(e) => handleSpellChange(index, e)}
                  placeholder="Slots"
                  className="dark:bg-gray-800 w-1/4 p-2 border border-gray-300 rounded"
                  min="0"
                />
              </div>
            ))}
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                value={newSpell.name}
                onChange={(e) =>
                  setNewSpell({ ...newSpell, name: e.target.value })
                }
                placeholder="New Spell Name"
                className="dark:bg-gray-800 p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                value={newSpell.slots}
                onChange={(e) =>
                  setNewSpell({
                    ...newSpell,
                    slots: parseInt(e.target.value, 10),
                  })
                }
                placeholder="Slots"
                className="dark:bg-gray-800 w-1/4 p-2 border border-gray-300 rounded"
                min="0"
              />
              <button
                onClick={addSpell}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                + Add Spell
              </button>
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
              value={localCharacter.notes}
              onChange={handleInputChange}
              placeholder="Notes"
              className="dark:bg-gray-800 mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={toggleEditMode}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{localCharacter.name}</h2>
              <p className="text-sm dark:text-slate-400 text-gray-500">{localCharacter.class}</p>
            </div>
            <button
              onClick={toggleCollapsed}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              {isCollapsed ? <MdExpandMore /> : <MdExpandLess />}
            </button>
          </div>
          {!isCollapsed && (
            <>
              <p className="text-sm dark:text-slate-400">Level: {localCharacter.level}</p>
              <div className="flex-col">
                <div className="mt-2">
                  <p className="text-l">Gold: {localCharacter.gold}</p>
                </div>
                <div>
                  Attack: {character.attack}
                  <button
                    onClick={rollAttack}
                    className="m-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
                  >
                    Roll Attack <Dice6 className="inline-block ml-2" />
                  </button>
                  {attackRoll && (
                    <p className="inline dark:text-white text-gray-700">
                      {character.name} rolled {attackRoll}
                    </p>
                  )}
                </div>
                <div>
                  Defense: {character.defense}
                  <button
                    onClick={rollDefense}
                    className="m-2 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition-colors"
                  >
                    Roll Defense <Dice6 className="inline-block ml-2" />
                  </button>
                  {defenseRoll && (
                    <p className="inline dark:text-white text-gray-700">
                      {character.name} rolled {defenseRoll}
                    </p>
                  )}
                </div>
              </div>
              <p className="mt-2">
                Life:
                <span>
                  {localCharacter.currentLife}/{localCharacter.fullLife}
                </span>
              </p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={incrementLife}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
                >
                  +1 Life
                </button>
                <button
                  onClick={decrementLife}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  -1 Life
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Equipment</h3>
                <ul>
                  {localCharacter.equipment.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Spells</h3>
                <ul>
                  {localCharacter.spells.map((spell, index) => (
                    <li key={index} className="flex items-center">
                      {spell.name}
                      <div className="ml-1 flex space-x-1">
                        {spell.checkedSlots.map((checked, i) => (
                          <button
                            key={i}
                            className={`w-4 h-4 border rounded ${checked ? "bg-green-500" : "bg-red-500"
                              }`}
                            onClick={() => toggleSlotChecked(index, i)}
                          />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4">
                <strong>Notes:</strong> {localCharacter.notes}
              </p>
              <button
                onClick={toggleEditMode}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
