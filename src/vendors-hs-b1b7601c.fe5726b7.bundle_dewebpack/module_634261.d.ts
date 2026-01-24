/**
 * Utility module for mapping functions over single or multiple arguments.
 * Handles both array and non-array inputs seamlessly.
 */

import { OperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Applies a function to either a single value or spreads an array of values as arguments.
 * 
 * @template TInput - The input type (can be a single value or array)
 * @template TOutput - The output type after applying the function
 * @param fn - The function to apply to the value(s)
 * @param value - Either a single value or an array of values
 * @returns The result of applying the function
 */
function applyOneOrMany<TInput, TOutput>(
  fn: (...args: TInput[]) => TOutput,
  value: TInput | TInput[]
): TOutput {
  return Array.isArray(value) ? fn(...value) : fn(value);
}

/**
 * Creates an RxJS operator that maps over emissions, applying a function
 * to either single values or spreading array values as multiple arguments.
 * 
 * @template TInput - The type of input value(s)
 * @template TOutput - The type of output after transformation
 * @param transformFn - The transformation function to apply
 * @returns An RxJS operator function that applies the transformation
 * 
 * @example
 *