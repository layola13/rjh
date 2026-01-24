/**
 * Merges two objects by combining their properties.
 * Properties from the second object will override properties from the first object if they have the same key.
 * 
 * @template T - The type of the first object
 * @template U - The type of the second object
 * @param source - The source object whose properties will be copied first
 * @param target - The target object whose properties will override source properties
 * @returns A new object containing all properties from both source and target objects
 * 
 * @example
 *