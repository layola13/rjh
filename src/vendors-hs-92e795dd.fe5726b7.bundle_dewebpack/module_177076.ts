export enum ClipMode {
  Inter = 0,
  Union = 1,
  Diff = 2,
  Xor = 3
}

export const SET_DIVISIONS_LOWER = 65535;
export const DIVISIONS_NUMBER = 65536;

function normalizeDivision(value: number): number {
  let normalized = 0;
  
  if (value < 0) {
    normalized = DIVISIONS_NUMBER - (-value & SET_DIVISIONS_LOWER);
  } else {
    normalized = value & SET_DIVISIONS_LOWER;
  }
  
  return normalized > 32767 ? normalized - DIVISIONS_NUMBER : normalized;
}

function extractHighBits(value: number): number {
  const adjusted = value - normalizeDivision(value);
  return adjusted < 0 ? -(-adjusted >> 16) : adjusted >> 16;
}

export const StOperator: Array<(value: number) => boolean> = [
  function (value: number): boolean {
    return normalizeDivision(value) > 0 && extractHighBits(value) > 0;
  },
  function (value: number): boolean {
    return normalizeDivision(value) > 0 || extractHighBits(value) > 0;
  },
  function (value: number): boolean {
    return normalizeDivision(value) > 0 && extractHighBits(value) <= 0;
  },
  function (value: number): boolean {
    return (normalizeDivision(value) > 0) !== (extractHighBits(value) > 0);
  }
];