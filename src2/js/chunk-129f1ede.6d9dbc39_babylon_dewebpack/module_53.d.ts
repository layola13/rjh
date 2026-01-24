/**
 * Function composition utilities
 * Provides utilities for composing multiple functions into a single function
 */

/**
 * Identity function type - returns input unchanged
 */
type IdentityFunction = <T>(value: T) => T;

/**
 * Generic function type that transforms a value
 */
type TransformFunction<T = any, R = any> = (value: T) => R;

/**
 * Composes multiple functions from left to right (pipe)
 * Takes a variable number of functions and returns their composition
 * 
 * @param functions - Functions to compose, applied left to right
 * @returns Composed function or identity if no functions provided
 * 
 * @example
 * const addOne = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * const composed = pipe(addOne, double);
 * composed(5); // Returns 12
 */
export function pipe<T>(...functions: TransformFunction[]): (value: T) => T;
export function pipe<T, R>(fn1: (value: T) => R): (value: T) => R;
export function pipe<T, U, R>(fn1: (value: T) => U, fn2: (value: U) => R): (value: T) => R;
export function pipe<T, U, V, R>(fn1: (value: T) => U, fn2: (value: U) => V, fn3: (value: V) => R): (value: T) => R;
export function pipe(...functions: TransformFunction[]): TransformFunction;

/**
 * Composes an array of functions into a single function
 * Functions are applied left to right (first to last)
 * 
 * @param functions - Array of functions to compose
 * @returns Composed function that applies all functions in sequence, or identity if empty/no functions
 * 
 * @example
 * const fns = [(x: number) => x + 1, (x: number) => x * 2];
 * const composed = pipeFromArray(fns);
 * composed(5); // Returns 12
 */
export function pipeFromArray<T>(functions: TransformFunction[]): (value: T) => T;
export function pipeFromArray<T, R>(functions: [(value: T) => R]): (value: T) => R;
export function pipeFromArray<T, U, R>(functions: [(value: T) => U, (value: U) => R]): (value: T) => R;
export function pipeFromArray(functions: TransformFunction[]): TransformFunction | IdentityFunction;