import { Observable } from 'rxjs';

/**
 * A constant Observable that never emits any values or completes.
 * This observable will never call next, error, or complete on observers.
 */
export const NEVER: Observable<never> = new Observable<never>(() => {
  // noop - no operation, subscriber never receives any notifications
});

/**
 * Creates an Observable that never emits any values or completes.
 * 
 * @returns An Observable that never emits and never completes
 * 
 * @example
 *