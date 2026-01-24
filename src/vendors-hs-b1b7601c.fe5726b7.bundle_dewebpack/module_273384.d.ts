/**
 * Counts elements in a collection that satisfy an optional predicate function.
 * 
 * @template T - The type of elements in the collection
 * @param predicate - Optional function to test each element. 
 *                    Receives the element and its index.
 *                    If omitted, counts all elements.
 * @returns The number of elements that satisfy the predicate, or total count if no predicate provided
 * 
 * @example
 *