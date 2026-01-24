/**
 * Constructs an instance of a constructor function with given arguments and optional prototype.
 * 
 * Uses native Reflect.construct when available, otherwise falls back to Function.prototype.bind
 * to simulate constructor invocation with dynamic arguments.
 * 
 * @template T - The type of the constructor function
 * @template A extends any[] - The type of constructor arguments
 * @param constructor - The constructor function to instantiate
 * @param args - Array of arguments to pass to the constructor
 * @param newTarget - Optional constructor whose prototype should be assigned to the instance
 * @returns A new instance of the constructor with the specified prototype chain
 * 
 * @example
 *