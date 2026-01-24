/**
 * Factory function that creates a new instance of type T.
 * 
 * @template T - The type of instance to create
 * @param e - First parameter passed to the constructor
 * @param n - Second parameter passed to the constructor
 * @returns A new instance of type T
 */
declare function createInstance<T>(e: unknown, n: unknown): T;

export = createInstance;