import React, { useState, useCallback, useRef } from "react";
import { DiceRoller } from "./DiceRoller";
import { Users, Pencil } from "lucide-react";

export const DungeonGrid = ({ grid, position = null, onGridUpdate, onCharacterUpdate }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState('draw'); // 'draw' or 'character'
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

  const handleMouseDown = useCallback(
    (rowIndex, colIndex) => {
      if (mode === 'draw') {
        setIsDrawing(true);
        drawingValue.current = !grid[rowIndex][colIndex];
        toggleCell(rowIndex, colIndex);
      }
    },
    [grid, mode]
  );

  const handleMouseEnter = useCallback(
    (rowIndex, colIndex) => {
      if (isDrawing && mode === 'draw') {
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

  const toggleDrawMode = () => {
    setMode('draw');
  };
  const toggleCharacterMode = () => {
    setMode('character');
  };

  return (
    <div
      className="dark:bg-gray-800 p-4 bg-gray-100 rounded-md mt-4 overflow-x-auto"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <h2 className="text-xl font-bold mb-2">Dungeon Map</h2>
      <DiceRoller title="Roll for room" d="d66" />
      <DiceRoller title="Roll for contents" d="2d6" />
      <DiceRoller title="Define the outcome" d="d6" />
      <div className="mb-2 space-x-2">
        <button
          className={`font-bold py-2 px-4 rounded ${mode === 'draw'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 text-gray-700'
            }`}
          onClick={toggleDrawMode}
        >
          <Pencil className="inline-block mr-2" size={16} />
          Draw
        </button>
        <button
          className={`font-bold py-2 px-4 rounded ${mode === 'character'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 text-gray-700'
            }`}
          onClick={toggleCharacterMode}
        >
          <Users className="inline-block mr-2" size={16} />
          Place Characters
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onCharacterUpdate(null)}
        >
          Remove Characters
        </button>
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
              {position &&
                position.row === rowIndex &&
                position.col === colIndex && (
                  <Users
                    size={20}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500"
                  />
                )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};