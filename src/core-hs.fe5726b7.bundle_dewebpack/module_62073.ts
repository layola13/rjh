import { isDisjointFrom } from './isDisjointFrom';

if (!Set.prototype.isDisjointFrom) {
  Set.prototype.isDisjointFrom = isDisjointFrom;
}

declare global {
  interface Set<T> {
    isDisjointFrom?(other: Set<T>): boolean;
  }
}