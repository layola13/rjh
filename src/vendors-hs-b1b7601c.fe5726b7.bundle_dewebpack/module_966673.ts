import { isFunction } from './isFunction';
import { isScheduler } from './isScheduler';

function getLastElement<T>(array: T[]): T {
  return array[array.length - 1];
}

export function popResultSelector<T>(args: T[]): ((...values: unknown[]) => unknown) | undefined {
  return isFunction(getLastElement(args)) ? (args.pop() as (...values: unknown[]) => unknown) : undefined;
}

export function popScheduler<T>(args: T[]): unknown | undefined {
  return isScheduler(getLastElement(args)) ? args.pop() : undefined;
}

export function popNumber<T>(args: T[], defaultValue: number): number {
  return typeof getLastElement(args) === 'number' ? (args.pop() as number) : defaultValue;
}