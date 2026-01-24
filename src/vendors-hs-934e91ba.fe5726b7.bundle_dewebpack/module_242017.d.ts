/**
 * Checks if any element in the array satisfies the predicate function.
 * Iterates through the array and returns `true` as soon as the predicate returns `true` for any element.
 * 
 * @template T - The type of elements in the array
 * @param array - The array to iterate over. Can be null or undefined.
 * @param predicate - The function invoked per iteration. Receives the current element, its index, and the entire array.
 * @returns `true` if any element passes the predicate check, otherwise `false`.
 * 
 * @example
 *