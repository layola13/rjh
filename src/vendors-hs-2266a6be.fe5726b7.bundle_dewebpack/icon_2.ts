export enum ButtonType {
  ICON = "icon",
  TEXT = "text",
  NORMAL = "normal",
  PRIMARY = "primary"
}

export enum ButtonLevel {
  FIRST = "first",
  SECOND = "second",
  THIRD = "third",
  FOURTH = "fourth"
}

export enum ButtonSize {
  SMALL = "small",
  LARGE = "large"
}

export enum Unit {
  Millimetre = "mm",
  Centimetre = "cm",
  Metre = "m",
  Kilometre = "km",
  Feet = "ft",
  Inch = "in"
}

export enum MessageType {
  SUCCESS = 0,
  ERROR = 1,
  WARNING = 2,
  LOADING = 3
}

export enum SelectMode {
  MULTIPLE = "multiple",
  SINGLE = "single",
  COLOR = "color",
  TREE = "tree"
}

export enum SelectSize {
  LARGE = "large",
  MIDDLE = "middle",
  SMALL = "small"
}

export enum Position {
  LEFT = "left",
  RIGHT = "right",
  TOP = "top",
  BOTTOM = "bottom"
}

export enum Theme {
  LIGHT = "light",
  DARK = "dark"
}

export enum Color {
  RED = "red",
  BLUE = "blue",
  GREEN = "green",
  BLACK = "black"
}

const UNIT_CONVERSION_RATES: Record<Unit, number> = {
  [Unit.Feet]: 0.3048,
  [Unit.Inch]: 0.0254,
  [Unit.Centimetre]: 0.01,
  [Unit.Metre]: 1,
  [Unit.Kilometre]: 1000,
  [Unit.Millimetre]: 0.001
};

const FEET_INCH_PATTERN = /^\s*([+-])?\s*(?:(\d+(?:\.\d+)?)\s*['`'])?\s*(?:(?:(\d+(?:\.\d+)?)|(\d+)\s+(\d+)\/(\d+)|(\d+)\/(\d+))\s*(?:"|''|``))?\s*$/;

interface ParsedFeetInchValue {
  inchValue: number | undefined;
  isNegative: boolean;
}

function parseFeetInchString(input: string): ParsedFeetInchValue {
  const match = FEET_INCH_PATTERN.exec(input);
  
  if (match?.[0]) {
    const isNegative = match[1] === "-";
    let totalInches = 12 * (match[2] ? parseFloat(match[2]) : 0);
    
    if (match[3]) {
      totalInches += parseFloat(match[3]);
    } else if (match[4]) {
      if (match[6] === "0") {
        return { inchValue: undefined, isNegative };
      }
      totalInches += parseFloat(match[4]) + parseFloat(match[5]) / parseFloat(match[6]);
    } else if (match[7]) {
      if (match[8] === "0") {
        return { inchValue: undefined, isNegative };
      }
      totalInches += parseFloat(match[7]) / parseFloat(match[8]);
    }
    
    return { inchValue: totalInches, isNegative };
  }
  
  return { inchValue: parseFloat(input) || undefined, isNegative: false };
}

export const UnitConverter = {
  getPrecision(value: number): number {
    if (!isFinite(value)) return 0;
    
    let multiplier = 1;
    let precision = 0;
    
    while (Math.round(value * multiplier) / multiplier !== value) {
      multiplier *= 10;
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
      const { inchValue, isNegative } = parseFeetInchString(String(value));
      if (inchValue === undefined) return 0;
      numericValue = isNegative ? -inchValue : inchValue;
    } else {
      numericValue = Number(value);
      if (!numericValue) return 0;
    }
    
    if (fromUnit && toUnit && UNIT_CONVERSION_RATES[fromUnit] && UNIT_CONVERSION_RATES[toUnit]) {
      return numericValue * (UNIT_CONVERSION_RATES[fromUnit] / UNIT_CONVERSION_RATES[toUnit]);
    }
    
    return numericValue;
  },

  convertToRealNum(value: string | number, unit: Unit): number {
    return this.convertUnit(value, unit, unit);
  },

  isNumberValid(value: string | number, unit: Unit): boolean {
    if (this.isFeet(unit)) {
      return parseFeetInchString(String(value)).inchValue !== undefined || !!Number(value);
    }
    return typeof Number(value) === "number";
  },

  convertNumberToFractional(value: string | number): string {
    const num = Number(value);
    if (typeof num === "number") {
      const rounded = Math.round(num);
      const feet = (rounded >= 0 ? Math.floor : Math.ceil)(rounded / 12);
      return `${Object.is(feet, -0) ? "-" : ""}${feet}' ${Math.abs(rounded) % 12}''`;
    }
    return String(value);
  },

  isFeet(unit: Unit): boolean {
    return unit === Unit.Feet || unit === Unit.Inch;
  }
};