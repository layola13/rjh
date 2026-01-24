/**
 * Type definitions for Webpack Bundle
 * This bundle contains various operator and utility modules
 */

/**
 * Arithmetic operator module
 */
export interface ArithmeticOperators {
  /** Addition operator implementation */
  '+': <T extends number>(a: T, b: T) => number;
  /** Subtraction operator implementation */
  '-': <T extends number>(a: T, b: T) => number;
  /** Multiplication operator implementation */
  '*': <T extends number>(a: T, b: T) => number;
  /** Division operator implementation */
  '/': <T extends number>(a: T, b: T) => number;
  /** Modulo operator implementation */
  '%': <T extends number>(a: T, b: T) => number;
}

/**
 * Comparison operator module
 */
export interface ComparisonOperators {
  /** Less than operator */
  '<': <T>(a: T, b: T) => boolean;
  /** Less than or equal operator */
  '<=': <T>(a: T, b: T) => boolean;
  /** Greater than operator */
  '>': <T>(a: T, b: T) => boolean;
  /** Greater than or equal operator */
  '>=': <T>(a: T, b: T) => boolean;
  /** Equality operator (loose) */
  '==': <T>(a: T, b: T) => boolean;
  /** Inequality operator (loose) */
  '!=': <T>(a: T, b: T) => boolean;
  /** Strict equality operator */
  '===': <T>(a: T, b: T) => boolean;
  /** Strict inequality operator */
  '!==': <T>(a: T, b: T) => boolean;
}

/**
 * Bitwise operator module
 */
export interface BitwiseOperators {
  /** Bitwise AND */
  '&': (a: number, b: number) => number;
  /** Bitwise OR */
  '|': (a: number, b: number) => number;
  /** Bitwise XOR */
  '^': (a: number, b: number) => number;
  /** Bitwise NOT */
  '~': (a: number) => number;
  /** Left shift */
  '<<': (a: number, b: number) => number;
  /** Right shift (sign-propagating) */
  '>>': (a: number, b: number) => number;
  /** Right shift (zero-fill) */
  '>>>': (a: number, b: number) => number;
}

/**
 * Logical operator module
 */
export interface LogicalOperators {
  /** Logical AND */
  '&&': <T, U>(a: T, b: U) => T | U;
  /** Logical OR */
  '||': <T, U>(a: T, b: U) => T | U;
  /** Logical NOT */
  '!': <T>(a: T) => boolean;
}

/**
 * Property accessor module
 */
export interface PropertyAccessors {
  /** Get property value */
  get: <T, K extends keyof T>(obj: T, key: K) => T[K];
  /** Set property value */
  set: <T, K extends keyof T>(obj: T, key: K, value: T[K]) => void;
}

/**
 * Numeric module exports (0-24)
 */
export const module_0: unknown;
export const module_1: unknown;
export const module_2: unknown;
export const module_3: unknown;
export const module_4: unknown;
export const module_5: unknown;
export const module_6: unknown;
export const module_7: unknown;
export const module_8: unknown;
export const module_9: unknown;
export const module_10: unknown;
export const module_11: unknown;
export const module_12: unknown;
export const module_13: unknown;
export const module_14: unknown;
export const module_15: unknown;
export const module_16: unknown;
export const module_17: unknown;
export const module_18: unknown;
export const module_19: unknown;
export const module_20: unknown;
export const module_21: unknown;
export const module_22: unknown;
export const module_23: unknown;
export const module_24: unknown;

/**
 * Hash-identified module exports
 */
export const module_c26b: unknown;
export const module_f400: unknown;
export const module_b39a: unknown;
export const module_e0b8: unknown;
export const module_67ab: unknown;
export const module_5df3: unknown;

/**
 * Combined operator module
 */
export interface OperatorModule extends ArithmeticOperators, ComparisonOperators, BitwiseOperators, LogicalOperators, PropertyAccessors {}

/**
 * Bundle re-exports
 */
declare const bundle: OperatorModule;
export default bundle;