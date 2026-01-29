import { isSupersetOf } from './isSupersetOf';

declare global {
  interface Set<T> {
    isSupersetOf<U>(other: Set<U>): boolean;
  }
}

if (!Set.prototype.isSupersetOf) {
  Set.prototype.isSupersetOf = isSupersetOf;
}