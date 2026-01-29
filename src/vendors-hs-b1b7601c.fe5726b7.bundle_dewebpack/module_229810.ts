import { distinctUntilChanged } from './802063';

export function distinctUntilKeyChanged<T, K extends keyof T>(
  key: K,
  compare?: (x: T[K], y: T[K]) => boolean
): ReturnType<typeof distinctUntilChanged> {
  return distinctUntilChanged((previous: T, current: T) => {
    return compare ? compare(previous[key], current[key]) : previous[key] === current[key];
  });
}