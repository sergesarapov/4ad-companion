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
  spells: {
    name: string;
    slots: number;
    checkedSlots: boolean[];
  }[];
  notes: string;
  id: string;
  key: string;
}

export interface Encounter {
  name: string;
  type: 'Minion' | 'Vermin' | 'Boss' | 'Weird Monster';
  level: number;
  count: number;
  attacksPerRound: number;
  status: 'Alive' | 'Defeated' | 'Fled' | 'Bribed';
  notes: string;
}

export interface LogEntryType {
  id: number;
  text: string;
  timestamp: string;
}

export interface Position {
  row: number;
  col: number;
}

export type DoorOrientation = 'top' | 'bottom' | 'left' | 'right';
export type TerrainValue = 'forest' | 'mountain' | 'water' | 'bridge';

export interface CellObject {
  door?: DoorOrientation | null;
  encounter?: number | null;
  terrain?: TerrainValue | null;
  searched?: boolean | null;
}

export type CellValue = boolean | CellObject;
export type Grid = CellValue[][];

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

export interface LocalStorageValue {
  key: string;
  value: string;
}

export type DiceType = 'd6' | 'd66' | '2d6' | '3d6';
