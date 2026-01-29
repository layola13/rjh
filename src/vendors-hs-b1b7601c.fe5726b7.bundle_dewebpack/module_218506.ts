import { from } from './796883';

export function pairs<T>(obj: Record<string, T>, mapFn?: (entry: [string, T]) => any): any[] {
    return from(Object.entries(obj), mapFn);
}