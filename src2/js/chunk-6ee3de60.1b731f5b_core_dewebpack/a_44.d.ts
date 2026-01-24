/**
 * Observable creation operator that accepts a factory function.
 * 
 * Creates an Observable by calling a factory function that returns either:
 * - A value that can be converted to an Observable
 * - undefined/null (resulting in an empty Observable)
 * 
 * If the factory throws an error, the Observable will emit that error.
 * 
 * @module Observable Factory Operator
 * @see Observable - Core Observable class (module 12)
 * @see from - Conversion utility (module 29)
 * @see EMPTY - Empty Observable constant (module 22)
 */

import { Observable } from './observable';
import { from } from './from';
import { EMPTY } from './empty';

/**
 * Creates an Observable from a factory function.
 * 
 * The factory function is called when the Observable is subscribed to.
 * If the factory returns a value, it is converted to an Observable using `from()`.
 * If the factory returns null/undefined, an empty Observable is returned.
 * If the factory throws an error, the error is emitted to the subscriber.
 * 
 * @template T - The type of values emitted by the resulting Observable
 * @param factory - A function that returns a value to be converted to an Observable
 * @returns An Observable that emits values from the factory result
 * 
 * @example
 *