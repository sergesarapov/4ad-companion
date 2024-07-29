import React, { useState, useCallback, useRef } from "react";
import { DiceRoller } from "./DiceRoller";

export const DungeonGrid = ({ grid, onGridUpdate }) => {
  const [isDrawing, setIsDrawing] = useState(false);
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
      setIsDrawing(true);
      drawingValue.current = !grid[rowIndex][colIndex];
      toggleCell(rowIndex, colIndex);
    },
    [grid]
  );

  const handleMouseEnter = useCallback(
    (rowIndex, colIndex) => {
      if (isDrawing) {
        toggleCell(rowIndex, colIndex);
      }
    },
    [isDrawing]
  );

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

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
      <div
        className="inline-grid"
        style={{ gridTemplateColumns: "repeat(20, 24px)" }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-6 h-6 border border-gray-300 cursor-pointer ${cell ? "dark:bg-white bg-gray-700" : "dark:bg-gray-800 bg-white"
                }`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              data-coord={`${rowIndex}-${colIndex}`}
            />
          ))
        )}
      </div>
    </div>
  );
};
