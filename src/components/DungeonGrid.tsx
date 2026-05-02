import React, { useState, useCallback, useRef } from 'react';
import {
  Users,
  Pencil,
  DoorClosed,
  RotateCw,
  Eraser,
  Swords,
  TreePine,
  Mountain,
  Waves,
  Shuffle,
} from 'lucide-react';
import { FaBridge } from 'react-icons/fa6';
import { generateDungeon } from '../utils/dungeonGenerator';
import { Grid, Position, DoorOrientation, CellValue, CellObject } from '../types';

const orientations: DoorOrientation[] = ['top', 'right', 'bottom', 'left'];

type DrawMode =
  | 'draw'
  | 'character'
  | 'door'
  | 'erase'
  | 'encounter'
  | 'searched'
  | 'forest'
  | 'mountain'
  | 'water'
  | 'bridge';

interface DungeonGridProps {
  grid: Grid;
  position?: Position | null;
  onGridUpdate: (gridOrUpdater: Grid | ((prevGrid: Grid) => Grid)) => void;
  onCharacterUpdate: (position: Position) => void;
  encounterCount?: number;
}

export const DungeonGrid: React.FC<DungeonGridProps> = ({
  grid,
  position = null,
  onGridUpdate,
  onCharacterUpdate,
  encounterCount = 0,
}) => {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [mode, setMode] = useState<DrawMode>('draw');
  const [doorOrientation, setDoorOrientation] = useState<DoorOrientation>('top');
  const [selectedEncounter, setSelectedEncounter] = useState<number>(1);
  const drawingValue = useRef<boolean>(false);

  const toggleCell = (rowIndex: number, colIndex: number): void => {
    onGridUpdate((prevGrid: Grid) => {
      const newGrid = prevGrid.map((row, rIndex) =>
        row.map((cell, cIndex) =>
          rIndex === rowIndex && cIndex === colIndex ? drawingValue.current : cell,
        ),
      );
      return newGrid;
    });
  };

  const toggleDoor = (rowIndex: number, colIndex: number): void => {
    onGridUpdate((prevGrid: Grid) => {
      const newGrid: Grid = prevGrid.map((row, rIndex) =>
        row.map((cell, cIndex): CellValue => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            const cellObj: CellObject = typeof cell === 'object' ? cell : {};
            // Toggle door state
            if (cellObj.door) {
              return { ...cellObj, door: null } as CellObject;
            } else {
              return { ...cellObj, door: doorOrientation } as CellObject;
            }
          }
          return cell;
        }),
      );
      return newGrid;
    });
  };

  const toggleEncounter = (rowIndex: number, colIndex: number): void => {
    onGridUpdate((prevGrid: Grid) => {
      const newGrid: Grid = prevGrid.map((row, rIndex) =>
        row.map((cell, cIndex): CellValue => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            const cellObj: CellObject = typeof cell === 'object' ? cell : {};
            // Toggle encounter state
            if (cellObj.encounter === selectedEncounter) {
              return { ...cellObj, encounter: null } as CellObject;
            } else {
              return { ...cellObj, encounter: selectedEncounter } as CellObject;
            }
          }
          return cell;
        }),
      );
      return newGrid;
    });
  };

  const toggleForest = (rowIndex: number, colIndex: number): void => {
    onGridUpdate((prevGrid: Grid) => {
      const newGrid: Grid = prevGrid.map((row, rIndex) =>
        row.map((cell, cIndex): CellValue => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            const cellObj: CellObject = typeof cell === 'object' ? cell : {};
            // Toggle forest state
            if (cellObj.terrain === 'forest') {
              return { ...cellObj, terrain: null } as CellObject;
            } else {
              return { ...cellObj, terrain: 'forest' } as CellObject;
            }
          }
          return cell;
        }),
      );
      return newGrid;
    });
  };

  const toggleMountain = (rowIndex: number, colIndex: number): void => {
    onGridUpdate((prevGrid: Grid) => {
      const newGrid: Grid = prevGrid.map((row, rIndex) =>
        row.map((cell, cIndex): CellValue => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            const cellObj: CellObject = typeof cell === 'object' ? cell : {};
            // Toggle mountain state
            if (cellObj.terrain === 'mountain') {
              return { ...cellObj, terrain: null } as CellObject;
            } else {
              return { ...cellObj, terrain: 'mountain' } as CellObject;
            }
          }
          return cell;
        }),
      );
      return newGrid;
    });
  };

  const toggleWater = (rowIndex: number, colIndex: number): void => {
    onGridUpdate((prevGrid: Grid) => {
      const newGrid: Grid = prevGrid.map((row, rIndex) =>
        row.map((cell, cIndex): CellValue => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            const cellObj: CellObject = typeof cell === 'object' ? cell : {};
            // Toggle water state
            if (cellObj.terrain === 'water') {
              return { ...cellObj, terrain: null } as CellObject;
            } else {
              return { ...cellObj, terrain: 'water' } as CellObject;
            }
          }
          return cell;
        }),
      );
      return newGrid;
    });
  };

  const toggleBridge = (rowIndex: number, colIndex: number): void => {
    onGridUpdate((prevGrid: Grid) => {
      const newGrid: Grid = prevGrid.map((row, rIndex) =>
        row.map((cell, cIndex): CellValue => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            const cellObj: CellObject = typeof cell === 'object' ? cell : {};
            // Toggle bridge state
            if (cellObj.terrain === 'bridge') {
              return { ...cellObj, terrain: null } as CellObject;
            } else {
              return { ...cellObj, terrain: 'bridge' } as CellObject;
            }
          }
          return cell;
        }),
      );
      return newGrid;
    });
  };

  const toggleSearched = (rowIndex: number, colIndex: number): void => {
    onGridUpdate((prevGrid: Grid) => {
      const newGrid: Grid = prevGrid.map((row, rIndex) =>
        row.map((cell, cIndex): CellValue => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            const cellObj: CellObject = typeof cell === 'object' ? cell : {};
            return { ...cellObj, searched: cellObj.searched ? null : true } as CellObject;
          }
          return cell;
        }),
      );
      return newGrid;
    });
  };

  const handleMouseDown = useCallback(
    (rowIndex: number, colIndex: number): void => {
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
      } else if (mode === 'forest') {
        toggleForest(rowIndex, colIndex);
      } else if (mode === 'mountain') {
        toggleMountain(rowIndex, colIndex);
      } else if (mode === 'water') {
        toggleWater(rowIndex, colIndex);
      } else if (mode === 'bridge') {
        toggleBridge(rowIndex, colIndex);
      } else if (mode === 'searched') {
        toggleSearched(rowIndex, colIndex);
      }
    },
    [grid, mode, doorOrientation, selectedEncounter],
  );

  const handleMouseEnter = useCallback(
    (rowIndex: number, colIndex: number): void => {
      if (isDrawing && (mode === 'draw' || mode === 'erase')) {
        toggleCell(rowIndex, colIndex);
      }
    },
    [isDrawing, mode],
  );

  const handleMouseUp = useCallback((): void => {
    setIsDrawing(false);
  }, []);

  const handleCellClick = useCallback(
    (rowIndex: number, colIndex: number): void => {
      if (mode === 'character') {
        onCharacterUpdate({ row: rowIndex, col: colIndex });
      }
    },
    [mode],
  );

  const toggleDrawMode = (): void => setMode('draw');
  const toggleEraseMode = (): void => setMode('erase');
  const toggleCharacterMode = (): void => setMode('character');
  const toggleDoorMode = (): void => setMode('door');
  const toggleEncounterMode = (): void => setMode('encounter');
  const toggleForestMode = (): void => setMode('forest');
  const toggleMountainMode = (): void => setMode('mountain');
  const toggleWaterMode = (): void => setMode('water');
  const toggleBridgeMode = (): void => setMode('bridge');
  const toggleSearchedMode = (): void => setMode('searched');

  const rotateDoorOrientation = (): void => {
    setDoorOrientation((prev) => {
      const currentIndex = orientations.indexOf(prev);
      return orientations[(currentIndex + 1) % orientations.length];
    });
  };

  const handleGenerateDungeon = (): void => {
    const newGrid = generateDungeon();
    onGridUpdate(newGrid);
  };

  const COL_COUNT = 20;
  const ROW_COUNT = grid.length;

  const columnLabels = Array.from(
    { length: COL_COUNT },
    (_, i) => String.fromCharCode(65 + i), // A–T
  );

  const isCellObject = (cell: CellValue): cell is CellObject => {
    return typeof cell === 'object' && cell !== null;
  };

  return (
    <>
      <div
        className="dark:bg-gray-800 p-4 pb-0 bg-gray-100 rounded-t mt-4 overflow-x-auto"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-2">Dungeon Map</h2>
          <button
            className="font-bold py-2 px-4 rounded bg-purple-500 hover:bg-purple-700 text-white"
            onClick={handleGenerateDungeon}
          >
            <Shuffle className="inline-block mr-2 mb-1" size={16} />
            Generate
          </button>
        </div>
        <div className="mb-4 mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              className={`inline-flex items-center justify-center font-bold py-3 px-3 rounded ${
                mode === 'draw' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
              onClick={toggleDrawMode}
              title="Draw"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={toggleEraseMode}
              className={`inline-flex items-center justify-center font-bold py-3 px-3 rounded ${
                mode === 'erase' ? 'bg-red-500 text-white' : 'bg-red-300 text-gray-700'
              }`}
              title="Erase"
            >
              <Eraser size={16} />
            </button>
            <div className="h-8 w-[1px] bg-gray-400 dark:bg-gray-500"></div>
            <button
              className={`inline-flex items-center justify-center font-bold py-3 px-3 rounded ${
                mode === 'door' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
              onClick={toggleDoorMode}
              title="Door"
            >
              <DoorClosed size={16} />
            </button>
            <button
              className="inline-flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-3 rounded space-x-1"
              onClick={rotateDoorOrientation}
              title="Rotate Door"
            >
              <RotateCw size={16} />
              <div className="inline-block dark:bg-white bg-gray-700 relative justify-center w-4 h-4 border border-gray-400">
                <i
                  className="absolute w-full h-1 bg-amber-500 dark:bg-amber-800"
                  style={{
                    width:
                      doorOrientation === 'top' || doorOrientation === 'bottom' ? '100%' : '4px',
                    height:
                      doorOrientation === 'left' || doorOrientation === 'right' ? '100%' : '4px',
                    top:
                      doorOrientation === 'top'
                        ? 0
                        : doorOrientation === 'bottom'
                          ? 'calc(100% - 4px)'
                          : 0,
                    left:
                      doorOrientation === 'left'
                        ? 0
                        : doorOrientation === 'right'
                          ? 'calc(100% - 4px)'
                          : 0,
                  }}
                ></i>
              </div>
            </button>
            <div className="h-8 w-[1px] bg-gray-400 dark:bg-gray-500"></div>
            <button
              className={`inline-flex items-center justify-center font-bold py-3 px-3 rounded ${
                mode === 'character' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
              onClick={toggleCharacterMode}
              title="Party"
            >
              <Users size={16} />
            </button>
            <div className="h-8 w-[1px] bg-gray-400 dark:bg-gray-500"></div>
            <div className="inline-flex items-stretch">
              <button
                disabled={encounterCount <= 0}
                className={`inline-flex items-center justify-center font-bold rounded ${
                  mode === 'encounter' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
                onClick={toggleEncounterMode}
                title="Encounter"
              >
                <div className="py-3 px-3 ">
                  <Swords size={16} />
                </div>
                <select
                  disabled={encounterCount <= 0}
                  value={selectedEncounter}
                  onChange={(e) => setSelectedEncounter(Number(e.target.value))}
                  className="h-[100%] bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-r text-gray-700 dark:text-white px-2"
                  title="Select encounter number"
                >
                  {[...Array(encounterCount)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </button>
            </div>
            <div className="h-8 w-[1px] bg-gray-400 dark:bg-gray-500"></div>
            <button
              className={`inline-flex items-center justify-center font-bold py-3 px-3 rounded ${
                mode === 'searched' ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
              onClick={toggleSearchedMode}
              title="Searched"
            >
              <span className="text-sm leading-none">S</span>
            </button>
            <div className="h-8 w-[1px] bg-gray-400 dark:bg-gray-500"></div>
            <div className="flex flex-nowrap gap-2">
              <button
                className={`inline-flex items-center justify-center font-bold py-3 px-3 rounded ${
                  mode === 'forest' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
                onClick={toggleForestMode}
                title="Forest"
              >
                <TreePine size={16} fill="currentColor" />
              </button>
              <button
                className={`inline-flex items-center justify-center font-bold py-3 px-3 rounded ${
                  mode === 'mountain' ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700'
                }`}
                onClick={toggleMountainMode}
                title="Mountain"
              >
                <Mountain size={16} fill="currentColor" />
              </button>
              <button
                className={`inline-flex items-center justify-center font-bold py-3 px-3 rounded ${
                  mode === 'water' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
                onClick={toggleWaterMode}
                title="Water"
              >
                <Waves size={16} fill="currentColor" />
              </button>
              <button
                className={`inline-flex items-center justify-center font-bold py-3 px-3 rounded ${
                  mode === 'bridge' ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-700'
                }`}
                onClick={toggleBridgeMode}
                title="Bridge"
              >
                <FaBridge size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Grid */}
      <div
        className="dark:bg-gray-800 p-4 pt-0 bg-gray-100 rounded-b overflow-x-auto"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="inline-grid select-none"
          style={{
            gridTemplateColumns: `24px repeat(${COL_COUNT}, 24px)`,
            gridTemplateRows: `repeat(${ROW_COUNT}, 24px) 24px`,
          }}
        >
          {grid.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {/* Row number */}
              <div className="flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400">
                {ROW_COUNT - rowIndex}
              </div>
              {row.map((cell, colIndex) => {
                const cellObj = isCellObject(cell) ? cell : {};
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-6 h-6 border border-gray-300 cursor-pointer ${
                      cell ? 'dark:bg-white bg-gray-700' : 'dark:bg-gray-800 bg-white'
                    } relative`}
                    onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {cellObj.door && (
                      <i
                        className="absolute bg-amber-500 dark:bg-amber-800"
                        style={{
                          width:
                            cellObj.door === 'top' || cellObj.door === 'bottom' ? '100%' : '4px',
                          height:
                            cellObj.door === 'left' || cellObj.door === 'right' ? '100%' : '4px',
                          top:
                            cellObj.door === 'top'
                              ? 0
                              : cellObj.door === 'bottom'
                                ? 'calc(100% - 4px)'
                                : 0,
                          left:
                            cellObj.door === 'left'
                              ? 0
                              : cellObj.door === 'right'
                                ? 'calc(100% - 4px)'
                                : 0,
                        }}
                      ></i>
                    )}
                    {cellObj.searched && (
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-yellow-400 dark:text-yellow-700">
                        S
                      </div>
                    )}
                    {cellObj.encounter && (
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white dark:text-red-500">
                        {cellObj.encounter}
                      </div>
                    )}
                    {cellObj.terrain === 'forest' && (
                      <TreePine
                        size={16}
                        fill="currentColor"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-600 dark:text-green-400"
                      />
                    )}
                    {cellObj.terrain === 'mountain' && (
                      <Mountain
                        size={16}
                        fill="currentColor"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white dark:text-gray-400"
                      />
                    )}
                    {cellObj.terrain === 'water' && (
                      <>
                        <div className="absolute inset-0 bg-blue-500 dark:bg-blue-400"></div>
                        <Waves
                          size={16}
                          fill="white"
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                        />
                      </>
                    )}
                    {cellObj.terrain === 'bridge' && (
                      <>
                        <div className="absolute inset-0 bg-blue-500 dark:bg-blue-400"></div>
                        <FaBridge
                          size={20}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black"
                        />
                      </>
                    )}
                    {position && position.row === rowIndex && position.col === colIndex && (
                      <Users
                        size={20}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-500 dark:text-red-500"
                      />
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
          {/* Empty corner cell */}
          <div className="flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400"></div>
          {columnLabels.map((label) => (
            <div
              key={label}
              className="flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
