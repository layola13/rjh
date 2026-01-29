import { difference } from './difference';

if (typeof Set.prototype.difference === 'undefined') {
  Set.prototype.difference = difference;
}

declare global {
  interface Set<T> {
    difference<U>(other: Set<U>): Set<T>;
  }
}