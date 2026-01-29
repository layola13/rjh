import { global } from './397938';

interface NumericComparison {
  nearlyEqual(a: number, b: number, tolerance?: number): boolean;
  isZero(value: number, tolerance?: number): boolean;
  larger(a: number, b: number, tolerance?: number): boolean;
  largerOrEqual(a: number, b: number, tolerance?: number): boolean;
  smaller(a: number, b: number, tolerance?: number): boolean;
  smallerOrEqual(a: number, b: number, tolerance?: number): boolean;
  isInRange(
    value: number,
    min: number,
    max: number,
    isMinExclusive: boolean,
    isMaxExclusive: boolean,
    tolerance?: number
  ): boolean;
}

const numericComparison: NumericComparison = {
  nearlyEqual(a: number, b: number, tolerance?: number): boolean {
    const effectiveTolerance = tolerance ?? global.EQUAL_TOLERANCE;
    const difference = a - b;
    return Math.abs(difference) <= effectiveTolerance;
  },

  isZero(value: number, tolerance?: number): boolean {
    return numericComparison.nearlyEqual(value, 0, tolerance);
  },

  larger(a: number, b: number, tolerance?: number): boolean {
    return a - b > (tolerance ?? global.EQUAL_TOLERANCE);
  },

  largerOrEqual(a: number, b: number, tolerance?: number): boolean {
    const effectiveTolerance = tolerance ?? global.EQUAL_TOLERANCE;
    const difference = a - b;
    return difference > effectiveTolerance || Math.abs(difference) <= effectiveTolerance;
  },

  smaller(a: number, b: number, tolerance?: number): boolean {
    return a - b < -(tolerance ?? global.EQUAL_TOLERANCE);
  },

  smallerOrEqual(a: number, b: number, tolerance?: number): boolean {
    const effectiveTolerance = tolerance ?? global.EQUAL_TOLERANCE;
    const difference = a - b;
    return difference < -effectiveTolerance || Math.abs(difference) <= effectiveTolerance;
  },

  isInRange(
    value: number,
    min: number,
    max: number,
    isMinExclusive: boolean,
    isMaxExclusive: boolean,
    tolerance?: number
  ): boolean {
    const meetsMinCondition = isMinExclusive
      ? numericComparison.larger(value, min, tolerance)
      : numericComparison.largerOrEqual(value, min, tolerance);
    const meetsMaxCondition = isMaxExclusive
      ? numericComparison.smaller(value, max, tolerance)
      : numericComparison.smallerOrEqual(value, max, tolerance);
    return meetsMinCondition && meetsMaxCondition;
  }
};

export default numericComparison;