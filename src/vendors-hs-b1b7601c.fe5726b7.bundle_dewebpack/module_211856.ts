import { switchMap } from 'rxjs/operators';
import { identity } from 'rxjs';

export function switchAll<T>() {
  return switchMap(identity);
}