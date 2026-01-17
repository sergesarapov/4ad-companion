import { Grid, Room, PlacedRoom, CellValue } from '../types';

const isWithinBounds = (x: number, y: number, gridWidth: number, gridHeight: number): boolean => {
  return x >= 0 && x < gridWidth && y >= 0 && y < gridHeight;
};

const generateRandomRoom = (): Room => {
  const width = Math.floor(Math.random() * 6) + 2;
  const height = Math.floor(Math.random() * 6) + 2;

  const cells: [number, number][] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      cells.push([x, y]);
    }
  }

  return { width, height, cells };
};

const canPlaceRoom = (
  room: Room,
  startX: number,
  startY: number,
  grid: Grid,
  gridWidth: number,
  gridHeight: number,
): boolean => {
  // Check room cells and buffer zone (1 cell padding around room)
  for (let y = -1; y <= room.height; y++) {
    for (let x = -1; x <= room.width; x++) {
      const worldX = startX + x;
      const worldY = startY + y;

      if (!isWithinBounds(worldX, worldY, gridWidth, gridHeight)) continue;
      if (grid[worldY][worldX]) return false;
    }
  }
  return true;
};

const placeRoom = (room: Room, startX: number, startY: number, grid: Grid): Grid => {
  const newGrid = grid.map((row) => [...row]);

  for (const [cellX, cellY] of room.cells) {
    const worldX = startX + cellX;
    const worldY = startY + cellY;
    newGrid[worldY][worldX] = true;
  }

  return newGrid;
};

interface CorridorCell {
  x: number;
  y: number;
  isOccupied: CellValue;
}

const createCorridor = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  grid: Grid,
  gridWidth: number,
  gridHeight: number,
): Grid => {
  const newGrid = grid.map((row) => [...row]);
  const corridorCells: CorridorCell[] = [];
  let currentX = startX;
  let currentY = startY;

  while (currentX !== endX) {
    if (isWithinBounds(currentX, currentY, gridWidth, gridHeight)) {
      corridorCells.push({
        x: currentX,
        y: currentY,
        isOccupied: grid[currentY][currentX],
      });
    }
    currentX += currentX < endX ? 1 : -1;
  }
  while (currentY !== endY) {
    if (isWithinBounds(currentX, currentY, gridWidth, gridHeight)) {
      corridorCells.push({
        x: currentX,
        y: currentY,
        isOccupied: grid[currentY][currentX],
      });
    }
    currentY += currentY < endY ? 1 : -1;
  }

  const emptyCells = corridorCells.filter((cell) => !cell.isOccupied);

  for (const cell of emptyCells) {
    if (!canPlaceCorridorCell(cell.x, cell.y, gridWidth, gridHeight)) {
      return grid;
    }
  }

  for (let i = 0; i < corridorCells.length; i++) {
    const cell = corridorCells[i];

    if (cell.isOccupied) continue;

    const emptyIndex = emptyCells.findIndex((c) => c.x === cell.x && c.y === cell.y);
    const isFirstEmpty = emptyIndex === 0;
    const isLastEmpty = emptyIndex === emptyCells.length - 1;

    if (isFirstEmpty || isLastEmpty) {
      let doorDirection: 'top' | 'bottom' | 'left' | 'right' = 'top';

      if (isFirstEmpty && emptyCells.length > 1) {
        const nextCell = emptyCells[1];
        if (nextCell.x > cell.x) doorDirection = 'left';
        else if (nextCell.x < cell.x) doorDirection = 'right';
        else if (nextCell.y > cell.y) doorDirection = 'top';
        else doorDirection = 'bottom';
      } else if (isLastEmpty && emptyCells.length > 1) {
        const prevCell = emptyCells[emptyCells.length - 2];
        if (cell.x > prevCell.x) doorDirection = 'right';
        else if (cell.x < prevCell.x) doorDirection = 'left';
        else if (cell.y > prevCell.y) doorDirection = 'bottom';
        else doorDirection = 'top';
      }

      newGrid[cell.y][cell.x] = { door: doorDirection };
    } else {
      newGrid[cell.y][cell.x] = true;
    }
  }

  return newGrid;
};

const canPlaceCorridorCell = (x: number, y: number, gridWidth: number, gridHeight: number): boolean => {
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;

      const checkX = x + dx;
      const checkY = y + dy;

      if (!isWithinBounds(checkX, checkY, gridWidth, gridHeight)) continue;
    }
  }

  return true;
};

export const generateDungeon = (): Grid => {
  const gridWidth = 20;
  const gridHeight = 28;
  let grid: Grid = Array(gridHeight)
    .fill(null)
    .map(() => Array(gridWidth).fill(false));

  const entranceRoom: Room = {
    width: 6,
    height: 3,
    cells: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
    ],
  };

  const entranceStartX = Math.floor((gridWidth - entranceRoom.width) / 2);
  const entranceStartY = gridHeight - entranceRoom.height;
  grid = placeRoom(entranceRoom, entranceStartX, entranceStartY, grid);

  const minRooms = 10;
  const targetRooms = minRooms + Math.floor(Math.random() * 10);
  const placedRooms: PlacedRoom[] = [{ x: entranceStartX, y: entranceStartY, room: entranceRoom }];
  let attempts = 0;
  const maxAttempts = 400;

  while (placedRooms.length < targetRooms && attempts < maxAttempts) {
    attempts++;

    const room = generateRandomRoom();
    const startX = Math.floor(Math.random() * (gridWidth - room.width));
    const startY = Math.floor(Math.random() * (gridHeight - room.height));

    if (canPlaceRoom(room, startX, startY, grid, gridWidth, gridHeight)) {
      grid = placeRoom(room, startX, startY, grid);

      const existing = placedRooms[Math.floor(Math.random() * placedRooms.length)];
      const ex = existing.x + Math.floor(existing.room.width / 2);
      const ey = existing.y + Math.floor(existing.room.height / 2);
      const nx = startX + Math.floor(room.width / 2);
      const ny = startY + Math.floor(room.height / 2);
      grid = createCorridor(ex, ey, nx, ny, grid, gridWidth, gridHeight);

      placedRooms.push({ x: startX, y: startY, room });
    }
  }

  return grid;
};
