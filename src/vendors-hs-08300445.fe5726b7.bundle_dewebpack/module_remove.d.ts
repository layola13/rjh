/**
 * Removes specified items from a collection by their indices or keys.
 * Filters out elements at positions matching the provided index/key set.
 * 
 * @param itemsToRemove - Single index/key or array of indices/keys to remove
 */
declare function remove(itemsToRemove: number | string | Array<number | string>): void;

export = remove;