import { map } from './map';

function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

function applyFunctionToValue<T, R>(
  fn: (...args: T[]) => R,
  value: T | T[]
): R {
  return isArray<T>(value) ? fn(...value) : fn(value);
}

export function mapOneOrManyArgs<T, R>(
  fn: (...args: T[]) => R
): (value: T | T[]) => R {
  return map((value: T | T[]) => applyFunctionToValue(fn, value));
}