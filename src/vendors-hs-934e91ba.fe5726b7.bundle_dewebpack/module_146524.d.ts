/**
 * Checks if a key exists in the collection.
 * 
 * This function verifies whether a given key is present in the current collection
 * by using a lookup mechanism and checking for the key's existence.
 * 
 * @template K - The type of the key
 * @param key - The key to check for existence in the collection
 * @returns True if the key exists in the collection, false otherwise
 * 
 * @example
 * const exists = hasKey(myKey);
 */
declare function hasKey<K>(key: K): boolean;

export default hasKey;