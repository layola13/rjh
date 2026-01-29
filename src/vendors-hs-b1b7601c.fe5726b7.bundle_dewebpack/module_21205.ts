import { Observable } from 'rxjs';

/**
 * Checks if a value is an Observable
 * @param value - The value to check
 * @returns True if the value is an Observable, false otherwise
 */
export function isObservable(value: unknown): value is Observable<unknown> {
    return !!value && (
        value instanceof Observable || 
        (
            isFunction((value as any).lift) && 
            isFunction((value as any).subscribe)
        )
    );
}

function isFunction(value: unknown): value is Function {
    return typeof value === 'function';
}