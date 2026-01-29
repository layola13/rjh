export enum ButtonType {
  ICON = "icon",
  TEXT = "text",
  NORMAL = "normal",
  PRIMARY = "primary",
}

export enum ButtonLevel {
  FIRST = "first",
  SECOND = "second",
  THRID = "thrid",
  FORTH = "forth",
}

export enum ButtonSize {
  SMALL = "small",
  LARGE = "large",
}

export enum Unit {
  Millimetre = "mm",
  Centimetre = "cm",
  Metre = "m",
  Kilometre = "km",
  Feet = "ft",
  Inch = "in",
}

export enum NoticeType {
  SUCCESS = 0,
  ERROR = 1,
  WARNING = 2,
  LOADING = 3,
}

export enum SelectMode {
  MULTIPLE = "multiple",
  SINGLE = "single",
  COLOR = "color",
  TREE = "tree",
}

export enum SelectSize {
  LARGE = "large",
  MIDDLE = "middle",
  SMALL = "small",
}

export enum Placement {
  LEFT = "left",
  RIGHT = "right",
  TOP = "top",
  BOTTOM = "bottom",
}

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export enum Color {
  RED = "red",
  BLUE = "blue",
  GREEN = "green",
  BLACK = "black",
}

const UNIT_TO_METER_CONVERSION: Record<Unit, number> = {
  [Unit.Feet]: 0.3048,
  [Unit.Inch]: 0.0254,
  [Unit.Centimetre]: 0.01,
  [Unit.Metre]: 1,
  [Unit.Kilometre]: 1000,
  [Unit.Millimetre]: 0.001,
};

const FEET_INCH_PATTERN = /^\s*([+-])?\s*(?:(\d+(?:\.\d+)?)\s*['`'])?\s*(?:(?:(\d+(?:\.\d+)?)|(\d+)\s+(\d+)\/(\d+)|(\d+)\/(\d+))\s*(?:"|''|``))?\s*$/;

interface InchParseResult {
  inchValue: number | undefined;
  isNegative: boolean;
}

function parseFeetInchValue(input: string): InchParseResult {
  const match = FEET_INCH_PATTERN.exec(input);
  if (!match?.[0]) {
    return { inchValue: +input || undefined, isNegative: false };
  }

  const isNegative = match[1] === "-";
  let inchValue = 12 * (match[2] ? +match[2] : 0);

  if (match[3]) {
    inchValue += +match[3];
  } else if (match[4]) {
    if (+match[6] === 0) {
      return { inchValue: undefined, isNegative };
    }
    inchValue += +match[4] + +match[5] / +match[6];
  } else if (match[7]) {
    if (!match[8]) {
      return { inchValue: undefined, isNegative };
    }
    inchValue += +match[7] / +match[8];
  }

  return { inchValue, isNegative };
}

export const UnitConverter = {
  getPrecision(value: number): number {
    if (!isFinite(value)) return 0;
    let exponent = 1;
    let precision = 0;
    while (Math.round(value * exponent) / exponent !== value) {
      exponent *= 10;
      precision++;
    }
    return precision;
  },

  getNumberWithPrecision(value: number, precision?: number): string | number {
    if (precision === undefined) return value;
    if (precision <= 0) return Math.round(value);
    return (Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)).toFixed(precision);
  },

  convertUnit(value: string | number, fromUnit: Unit, toUnit: Unit): number {
    let numericValue: number;

    if (fromUnit === Unit.Inch || fromUnit === Unit.Feet) {
      const { inchValue, isNegative } = parseFeetInchValue(value as string);
      if (inchValue === undefined) return 0;
      numericValue = isNegative ? -inchValue : inchValue;
    } else {
      numericValue = +value;
      if (!numericValue) return 0;
    }

    if (!fromUnit || !toUnit || !UNIT_TO_METER_CONVERSION[fromUnit] || !UNIT_TO_METER_CONVERSION[toUnit]) {
      return numericValue;
    }

    return numericValue * (UNIT_TO_METER_CONVERSION[fromUnit] * (1 / UNIT_TO_METER_CONVERSION[toUnit]));
  },

  convertToRealNum(value: string | number, unit: Unit): number {
    return this.convertUnit(value, unit, unit);
  },

  isNumberValid(value: string | number, unit: Unit): boolean {
    if (this.isFeet(unit)) {
      return parseFeetInchValue(value as string).inchValue !== undefined || !!+value;
    }
    return typeof +value === "number";
  },

  convertNumberToFractional(value: string | number): string {
    if (typeof +value === "number") {
      const rounded = Math.round(+value);
      const feet = (rounded >= 0 ? Math.floor : Math.ceil)(rounded / 12);
      return (Object.is(feet, -0) ? "-" : "") + feet + "' " + Math.abs(rounded) % 12 + "''";
    }
    return value as string;
  },

  isFeet(unit: Unit): boolean {
    return unit === Unit.Feet || unit === Unit.Inch;
  },
};

export { ButtonType as TEXT, ButtonType as ICON, ButtonType as NORMAL, ButtonType as PRIMARY };
export { ButtonLevel as FIRST, ButtonLevel as SECOND, ButtonLevel as THRID, ButtonLevel as FORTH };
export { Unit as Millimetre, Unit as Centimetre, Unit as Metre, Unit as Kilometre, Unit as Feet, Unit as Inch };
export { NoticeType as SUCCESS, NoticeType as ERROR, NoticeType as WARNING, NoticeType as LOADING };
export { SelectMode as MULTIPLE, SelectMode as SINGLE, SelectMode as COLOR, SelectMode as TREE };
export { SelectSize as LARGE, SelectSize as MIDDLE, SelectSize as SMALL };
export { Placement as LEFT, Placement as RIGHT, Placement as TOP, Placement as BOTTOM };
export { Theme as LIGHT, Theme as DARK };
export { Color as RED, Color as BLUE, Color as GREEN, Color as BLACK };