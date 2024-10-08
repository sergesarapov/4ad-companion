import React, { useState, useEffect } from "react";
import { Dice6, X } from "lucide-react";
import { ConfirmModal } from './ConfirmModal';

export const CharacterCard = ({ character, setCharacter, importedCharacters = [], onImport }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [localCharacter, setLocalCharacter] = useState(character);
  const [selectedImportedCharacter, setSelectedImportedCharacter] = useState(importedCharacters?.[0]?.id ?? null);
  const [attackRoll, setAttackRoll] = useState(null);
  const [defenseRoll, setDefenseRoll] = useState(null);
  const [newSpell, setNewSpell] = useState({ name: "", slots: 0 });
  const [newEquipment, setNewEquipment] = useState("");
  const [isAttackRolling, setIsAttackRolling] = useState(false);
  const [isDefenseRolling, setIsDefenseRolling] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rollDuration = 500; // 0.3 seconds of rolling animation

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

  const rollAttack = () => {
    setIsAttackRolling(true);
    setAttackRoll(null);

    setTimeout(() => {
      setAttackRoll(Math.floor(Math.random() * 6) + 1);
      setIsAttackRolling(false);
    }, rollDuration);
  };

  const rollDefense = () => {
    setIsDefenseRolling(true);
    setDefenseRoll(null);

    setTimeout(() => {
      setDefenseRoll(Math.floor(Math.random() * 6) + 1);
      setIsDefenseRolling(false);
    }, rollDuration);
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

  const handleImportCharacter = () => {
    setIsModalOpen(true);
  };

  const confirmImportCharacter = () => {
    setIsModalOpen(false);
    const foundCharacter = importedCharacters.find(c => c.id === selectedImportedCharacter);
    if (foundCharacter) {
      setLocalCharacter((prev) => ({ ...foundCharacter, key: prev.key }));
      onImport(foundCharacter.key, foundCharacter.id);
      toggleEditMode();
    }
  };

  const cancelImportCharacter = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='dark:bg-gray-800 dark:text-white p-4 bg-gray-100 rounded-b rounded-tr shadow'>
      {isEditMode ? (
        <div className="flex flex-col flex-wrap">
          {importedCharacters.length > 0 && <div className='mb-6'>
            <select
              value={selectedImportedCharacter}
              onChange={(e) => setSelectedImportedCharacter(e.target.value)}
              className="dark:bg-gray-800 bg-white border border-gray-300 rounded-md py-1 px-1 text-ellipsis"
            >
              {importedCharacters.map((char, i) => (
                <option className='text-ellipsis' key={i + 1} value={char.id}>
                  {char.name}{' '}
                  {char.class}{' '}
                  Level:{' '}{char.level}
                </option>
              ))}
            </select>
            <button className='ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors' onClick={handleImportCharacter}>Migrate</button>
            {isModalOpen && <ConfirmModal
              title="Confirm Migration"
              text="The character will be removed from the original dungeon and the current slot will be entirely rewritten. Are you sure you want to migrate the character?"
              isOpen={isModalOpen}
              onClose={cancelImportCharacter}
              onConfirm={confirmImportCharacter}
            />}
          </div>}
          <div className='flex space-x-4'>
            <div>
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
                  className="w-[100px] dark:bg-gray-800 mt-1 block p-2 border border-gray-300 rounded"
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
                  className="w-[100px] dark:bg-gray-800 mt-1 block p-2 border border-gray-300 rounded"
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
                  className="w-[100px] dark:bg-gray-800 mt-1 block p-2 border border-gray-300 rounded"
                  min="1"
                />
              </div>
            </div>
            <div>
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
                  className="w-[100px] dark:bg-gray-800 mt-1 block p-2 border border-gray-300 rounded"
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
                  className="w-[100px] dark:bg-gray-800 mt-1 block p-2 border border-gray-300 rounded"
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
                  className="w-[100px] dark:bg-gray-800 mt-1 block p-2 border border-gray-300 rounded"
                  min="0"
                />
              </div>
            </div>
          </div>
          <div className='flex space-x-4'>
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
                className="w-[100px] dark:bg-gray-800 mt-1 block p-2 border border-gray-300 rounded"
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
                className="dark:bg-gray-800 w-[100px] mt-1 block p-2 border border-gray-300 rounded"
                min="0"
                max={localCharacter.fullLife}
              />
            </div>
          </div>
          <div className='mt-4'>
            <h3 className="text-lg font-semibold">Equipment</h3>
            <ul>
              {localCharacter.equipment.map((item, index) => (
                <li key={index} className='flex my-2'>
                  <div>{item}</div>
                  <button className='ml-2 px-1 inline border bg-red-500 rounded' onClick={() => deleteEquipment(item)}>
                    <X className="text-white" size={16} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                value={newEquipment}
                onChange={(e) => setNewEquipment(e.target.value)}
                placeholder="Equipment Name"
                className="max-w-[216px] dark:bg-gray-800 p-2 border border-gray-300 rounded"
              />
              <button
                onClick={addEquipment}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                + Add Equipment
              </button>
            </div>
          </div>
          <div className='mt-4'>
            <h3 className="text-lg font-semibold">Spells</h3>
            {localCharacter.spells.map((spell, index) => (
              <div key={index} className="flex space-x-2 mt-2">
                <input
                  type="text"
                  name="name"
                  value={spell.name}
                  onChange={(e) => handleSpellChange(index, e)}
                  placeholder="Spell Name"
                  className="max-w-[148px] dark:bg-gray-800 p-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name="slots"
                  value={spell.slots}
                  onChange={(e) => handleSpellChange(index, e)}
                  placeholder="Slots"
                  className="dark:bg-gray-800 w-[60px] p-2 border border-gray-300 rounded"
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
                placeholder="Spell Name"
                className="max-w-[148px] dark:bg-gray-800 p-2 border border-gray-300 rounded"
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
                className="dark:bg-gray-800 w-[60px] p-2 border border-gray-300 rounded"
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
          <div className='mt-4'>
            <h3 className="text-lg font-semibold">Notes</h3>
            <textarea
              id="notes"
              name="notes"
              value={localCharacter.notes}
              onChange={handleInputChange}
              placeholder="Notes"
              className="dark:bg-gray-800 mt-1 block w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <button
              onClick={() => {
                setCharacter(localCharacter);
                toggleEditMode();
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{localCharacter.name}</h2>
              <p className="text-sm dark:text-slate-400 text-gray-500">{localCharacter.class}</p>
            </div>
            <button
              onClick={toggleEditMode}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
          </div>
          <div>
            <p className="text-sm dark:text-slate-400">Level: {localCharacter.level}</p>
            <div className="flex-col">
              <div className="mt-2">
                <p className="text-l">Gold: {localCharacter.gold}</p>
              </div>
              <div>
                Attack: {character.attack}
                <button
                  onClick={rollAttack}
                  className="inline-flex m-2 bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Roll <div className={`ml-2 inline-flex transition-all duration-200 ease-in-out
          ${isAttackRolling ? 'animate-spin' : ''}
        `}><Dice6 className="text-white" /></div>
                </button>
                {attackRoll && (
                  <p className="inline dark:text-white text-gray-700">
                    Result: {attackRoll} ({localCharacter.attack >= 0 ? '+' : ''}{localCharacter.attack})
                  </p>
                )}
              </div>
              <div>
                Defense: {character.defense}
                <button
                  onClick={rollDefense}
                  className="inline-flex m-2 bg-yellow-500 text-white px-2 py-2 rounded hover:bg-yellow-600 transition-colors"
                >
                  Roll <div className={`ml-2 inline-flex transition-all duration-200 ease-in-out
          ${isDefenseRolling ? 'animate-spin' : ''}
        `}><Dice6 className="text-white" /></div>
                </button>
                {defenseRoll && (
                  <p className="inline dark:text-white text-gray-700">
                    Result: {defenseRoll} ({localCharacter.defense >= 0 ? '+' : ''}{localCharacter.defense})
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
          </div>
        </div>
      )}
    </div>
  );
};
