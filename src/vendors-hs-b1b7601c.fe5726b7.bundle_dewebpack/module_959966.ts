import { exhaustMap } from 'rxjs/operators';
import { identity } from 'rxjs';

export function exhaustAll<T>() {
  return exhaustMap(identity);
}