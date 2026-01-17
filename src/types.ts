// Character types
export interface Spell {
  name: string;
  slots: number;
  checkedSlots: boolean[];
}

export interface Character {
  name: string;
  class: string;
  level: number;
  gold: number;
  attack: number;
  defense: number;
  fullLife: number;
  currentLife: number;
  equipment: string[];
  spells: Spell[];
  notes: string;
  id: string;
  key: string;
}

// Encounter types
export type EncounterStatus = 'Alive' | 'Defeated' | 'Fled' | 'Bribed';
export type EncounterType = 'Minion' | 'Vermin' | 'Boss' | 'Weird Monster';

export interface Encounter {
  name: string;
  type: EncounterType;
  level: number;
  count: number;
  attacksPerRound: number;
  status: EncounterStatus;
  notes: string;
}

// Log entry types
export interface LogEntry {
  id: number;
  text: string;
  timestamp: string;
}

// Position types
export interface Position {
  row: number;
  col: number;
}

// Grid types
export type DoorOrientation = 'top' | 'bottom' | 'left' | 'right';
export type TerrainValue = 'forest' | 'mountain' | 'water' | 'bridge';

export interface CellObject {
  door?: DoorOrientation | null;
  encounter?: number | null;
  terrain?: TerrainValue | null;
}

export type CellValue = boolean | CellObject;
export type Grid = CellValue[][];

// Room types
export interface Room {
  width: number;
  height: number;
  cells: [number, number][];
}

export interface PlacedRoom {
  x: number;
  y: number;
  room: Room;
}

// Local storage value types
export interface LocalStorageValue {
  key: string;
  value: string;
}

// Dice types
export type DiceType = 'd6' | 'd66' | '2d6' | '3d6';

// Terrain types
export type TerrainType =
  | 'empty'
  | 'wall'
  | 'door'
  | 'treasure'
  | 'trap'
  | 'stairs'
  | 'altar'
  | 'fountain'
  | 'statue';
