import { createContext } from "react";

export interface Gohar {
  isLoaded: boolean;
  scalePatterns: number[];
  setLocale: (locale: string) => void;
  noteName: (note: number) => string;
  notePitch: (note: number) => number;
  scaleName: (root: number, pattern: number) => string;
  scalePatternName: (pattern: number) => string;
  scalePatternPitches: (pattern: number) => number[];
  scaleNotesFromPitch: (pitch: number, pattern: number) => number[];
  scaleToABC: (root: number, pattern: number) => string;
  simpleKeyboard: (octaves: number) => KeyboardKey[];
  keyboardWithScalePattern: (
    octaves: number,
    root: number,
    pattern: number
  ) => KeyboardKey[];
  newScaleSchema: (root: number, pattern: number) => ScaleSchema;
}

export const defaultGoharCtx = {
  isLoaded: false,
  scalePatterns: [],
  noteName: () => "loading...",
  notePitch: () => 0,
  setLocale: () => {},
  scaleName: () => "loading...",
  scalePatternName: () => "loading...",
  scalePatternPitches: () => [],
  scaleNotesFromPitch: () => [],
  scaleToABC: () => "Loading...",
  simpleKeyboard: () => [],
  keyboardWithScalePattern: () => [],
  newScaleSchema: () => {
    return {
      rootName: "Loading...",
      scaleName: "",
      ABCNotes: [],
      NoteNames: [],
    };
  },
};

export const GoharContext = createContext<Gohar>(defaultGoharCtx);

export interface Scale {
  root: number;
  pattern: number;
}
const whiteKeys = [
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
];

export function isWhiteKey(pitch: number): boolean {
  return whiteKeys[wrap(pitch, 12)];
}
function wrap(a: number, mod: number): number {
  a = a % mod;
  if (a < 0) {
    a += mod;
  }
  return a;
}

export interface KeyboardKey {
  pitch: number;
  name: string;
  isWhiteKey: boolean;
  isHighlighted: boolean;
  isSelected?: boolean;
}

export interface ScaleSchema {
  rootName: string;
  scaleName: string;
  ABCNotes: string[];
  NoteNames: string[];
}
