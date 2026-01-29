import { argsOrArgArray } from './utils/args';
import { raceWith } from './operators/raceWith';

/**
 * Creates an Observable that mirrors the first source Observable to emit an item.
 * 
 * @param args - Observable sources to race against each other
 * @returns Observable that emits values from the first source to emit
 */
export function race<T>(...args: unknown[]): unknown {
    return raceWith(...argsOrArgArray(args));
}