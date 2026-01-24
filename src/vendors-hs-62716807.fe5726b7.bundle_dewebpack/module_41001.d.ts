/**
 * Copies properties from source object(s) to target object.
 * Iterates through all properties of the source object and copies them to the target
 * if they don't already exist on the target (or optionally from a fallback object).
 * 
 * @param target - The target object to copy properties to
 * @param source - The source object to copy properties from
 * @param fallback - Optional fallback object to check for existing properties
 * 
 * @example
 *