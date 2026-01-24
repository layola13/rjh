/**
 * Checks if a key exists in the hash data structure.
 * 
 * This function determines whether a specific key is present in the internal
 * data storage of a hash-like object. It uses native Map detection when available,
 * falling back to Object.prototype.hasOwnProperty for compatibility.
 * 
 * @param key - The key to check for existence in the hash
 * @returns True if the key exists in the hash, false otherwise
 * 
 * @example
 *