import { reduce } from './603637';
import { isFunction } from './419132';

export function max<T>(comparatorOrUndefined?: ((a: T, b: T) => number) | undefined): (items: T[]) => T | undefined {
  return reduce(
    isFunction(comparatorOrUndefined)
      ? (current: T, next: T): T => {
          return comparatorOrUndefined(current, next) > 0 ? current : next;
        }
      : (current: T, next: T): T => {
          return current > next ? current : next;
        }
  );
}