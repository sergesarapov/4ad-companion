import React, { useState, useCallback, useRef } from "react";
import { Users, Pencil, DoorClosed, RotateCw, Eraser, Swords } from "lucide-react";

const orientations = ['top', 'right', 'bottom', 'left'];

export const DungeonGrid = ({ grid, position = null, onGridUpdate, onCharacterUpdate, encounterCount = 0 }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState('draw'); // 'draw', 'character', 'door', 'erase', 'encounter'
  const [doorOrientation, setDoorOrientation] = useState('top');
  const [selectedEncounter, setSelectedEncounter] = useState(1);
  const drawingValue = useRef(false);

  const toggleCell = (rowIndex, colIndex) => {
    onGridUpdate((prevGrid) => {
      const newGrid = prevGrid.map((row, rIndex) =>
        row.map((cell, cIndex) =>
          rIndex === rowIndex && cIndex === colIndex
            ? drawingValue.current
            : cell
        )
      );
      return newGrid;
    });
  };

  const toggleDoor = (rowIndex, colIndex) => {
    onGridUpdate((prevGrid) => {
      const newGrid = prevGrid.map((row, rIndex) =>
        row.map((cell, cIndex) => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            // Toggle door state
            if (cell.door) {
              return { ...cell, door: null };
            } else {
              return { ...cell, door: doorOrientation };
            }
          }
          return cell;
        })
      );
      return newGrid;
    });
  };

  const toggleEncounter = (rowIndex, colIndex) => {
    onGridUpdate((prevGrid) => {
      const newGrid = prevGrid.map((row, rIndex) =>
        row.map((cell, cIndex) => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            // Toggle encounter state
            if (cell.encounter === selectedEncounter) {
              return { ...cell, encounter: null };
            } else {
              return { ...cell, encounter: selectedEncounter };
            }
          }
          return cell;
        })
      );
      return newGrid;
    });
  };

  const handleMouseDown = useCallback(
    (rowIndex, colIndex) => {
      if (mode === 'draw') {
        setIsDrawing(true);
        drawingValue.current = !grid[rowIndex][colIndex];
        toggleCell(rowIndex, colIndex);
      } else if (mode === 'door') {
        toggleDoor(rowIndex, colIndex);
      } else if (mode === 'erase') {
        setIsDrawing(true);
        drawingValue.current = false;
        toggleCell(rowIndex, colIndex);
      } else if (mode === 'encounter') {
        toggleEncounter(rowIndex, colIndex);
      }
    },
    [grid, mode, doorOrientation, selectedEncounter]
  );

  const handleMouseEnter = useCallback(
    (rowIndex, colIndex) => {
      if (isDrawing && (mode === 'draw' || mode === 'erase')) {
        toggleCell(rowIndex, colIndex);
      }
    },
    [isDrawing, mode]
  );

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const handleCellClick = useCallback((rowIndex, colIndex) => {
    if (mode === 'character') {
      onCharacterUpdate({ row: rowIndex, col: colIndex });
    }
  }, [mode]);

  const toggleDrawMode = () => setMode('draw');
  const toggleEraseMode = () => setMode('erase');
  const toggleCharacterMode = () => setMode('character');
  const toggleDoorMode = () => setMode('door');
  const toggleEncounterMode = () => setMode('encounter');

  const rotateDoorOrientation = () => {
    setDoorOrientation((prev) => {
      const currentIndex = orientations.indexOf(prev);
      return orientations[(currentIndex + 1) % orientations.length];
    });
  };

  return (
    <div
      className="dark:bg-gray-800 p-4 bg-gray-100 rounded-md mt-4 overflow-x-auto"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <h2 className="text-xl font-bold mb-2">Dungeon Map</h2>
      <div className="mb-2">
        <div className="flex mb-2 space-x-2">
          <button
            className={`font-bold py-2 px-4 rounded ${mode === 'draw'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
              }`}
            onClick={toggleDrawMode}
          >
            <Pencil className="inline-block mr-2 mb-1" size={16} />
            Draw
          </button>
          <button onClick={toggleEraseMode} className={`inline-flex place-center place-self-center font-bold py-3 px-3 rounded ${mode === 'erase'
            ? 'bg-red-500 text-white'
            : 'bg-red-300 text-gray-700'
            }`}>
            <Eraser className="inline-block" size={16} />
          </button>
        </div>
        <div className="flex align-center mb-2 space-x-2">
          <button
            className={`font-bold py-2 px-4 rounded ${mode === 'door'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
              }`}
            onClick={toggleDoorMode}
          >
            <DoorClosed className="inline-block mr-2 mb-1" size={16} />
            Door
          </button>
          <button
            className="inline-flex align-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={rotateDoorOrientation}
          >
            <RotateCw className="mr-2 place-self-center" size={16} />
            Rotate Door
            <div className="ml-2 inline-block dark:bg-white bg-gray-700 relative justify-center w-6 h-6 border border-gray-400">
              <i className="absolute w-full h-1 bg-amber-500 dark:bg-amber-800" style={{
                width: doorOrientation === 'top' || doorOrientation === 'bottom' ? '100%' : '4px',
                height: doorOrientation === 'left' || doorOrientation === 'right' ? '100%' : '4px',
                top: doorOrientation === 'top' ? 0 : doorOrientation === 'bottom' ? 'calc(100% - 4px)' : 0,
                left: doorOrientation === 'left' ? 0 : doorOrientation === 'right' ? 'calc(100% - 4px)' : 0,
              }}></i>
            </div>
          </button>
        </div>
        <div className="inline-flex align-center mb-2 space-x-2">
          <button
            className={`font-bold py-2 px-4 rounded ${mode === 'character'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
              }`}
            onClick={toggleCharacterMode}
          >
            <Users className="inline-block mr-2 mb-1" size={16} />
            Party
          </button>
          <button
            disabled={encounterCount <= 0}
            className={`font-bold px-4 rounded ${mode === 'encounter'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
              }`}
            onClick={toggleEncounterMode}
          >
            <Swords className="inline-block mr-2 mb-1" size={16} />
            Encounter
            <select
              disabled={encounterCount <= 0}
              value={selectedEncounter}
              onChange={(e) => setSelectedEncounter(Number(e.target.value))}
              className="bg-white border border-gray-300 rounded-md text-gray-700 py-1 px-2 ml-2"
            >
              {[...Array(encounterCount)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </button>
        </div>
      </div>
      <div
        className="inline-grid"
        style={{ gridTemplateColumns: "repeat(20, 24px)" }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-6 h-6 border border-gray-300 cursor-pointer ${cell ? "dark:bg-white bg-gray-700" : "dark:bg-gray-800 bg-white"
                } relative`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              data-coord={`${rowIndex}-${colIndex}`}
            >
              {cell.door && (
                <i
                  className='absolute bg-amber-500 dark:bg-amber-800'
                  style={{
                    width: cell.door === 'top' || cell.door === 'bottom' ? '100%' : '4px',
                    height: cell.door === 'left' || cell.door === 'right' ? '100%' : '4px',
                    top: cell.door === 'top' ? 0 : cell.door === 'bottom' ? 'calc(100% - 4px)' : 0,
                    left: cell.door === 'left' ? 0 : cell.door === 'right' ? 'calc(100% - 4px)' : 0,
                  }}
                ></i>
              )}
              {cell.encounter && (
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white dark:text-red-500">
                  {cell.encounter}
                </div>
              )}
              {position &&
                position.row === rowIndex &&
                position.col === colIndex && (
                  <Users
                    size={20}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-500 dark:text-red-500"
                  />
                )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
