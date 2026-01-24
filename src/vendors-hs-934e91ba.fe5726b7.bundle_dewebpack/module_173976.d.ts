/**
 * Gets all property symbols (both own and inherited) from an object and its prototype chain.
 * 
 * @remarks
 * This function traverses the entire prototype chain of an object and collects all symbol properties.
 * If the environment doesn't support `Object.getOwnPropertySymbols`, it falls back to returning an empty array.
 * 
 * @param target - The object from which to retrieve all symbol properties
 * @returns An array containing all symbol properties found in the target object and its prototype chain
 * 
 * @example
 *