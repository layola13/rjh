/**
 * Extracts the 'z' property from an object.
 * 
 * @template T - Type that extends an object containing a 'z' property
 * @param e - The input object containing the 'z' property
 * @returns The value of the 'z' property
 */
export declare function extractZ<T extends { z: unknown }>(e: T): T['z'];