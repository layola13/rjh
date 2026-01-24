/**
 * Converts a property path string into an array of path segments.
 * 
 * Parses dot notation and bracket notation property access patterns,
 * handling both numeric indices and quoted string keys.
 * 
 * @example
 * stringToPath('a.b.c') // ['a', 'b', 'c']
 * stringToPath('a[0].b') // ['a', '0', 'b']
 * stringToPath('a["b.c"]') // ['a', 'b.c']
 * stringToPath('.a.b') // ['', 'a', 'b']
 * 
 * @param path - The property path string to parse
 * @returns An array of property keys/indices representing the path
 */
declare function stringToPath(path: string): string[];

export = stringToPath;