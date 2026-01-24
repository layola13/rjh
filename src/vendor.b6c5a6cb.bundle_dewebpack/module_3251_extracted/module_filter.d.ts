/**
 * Filter elements in the collection based on a selector or function.
 * 
 * @template TElement - The type of elements in the collection
 * @param selector - CSS selector string, element, array of elements, or filter function
 *                   - If omitted or null/undefined, returns empty collection
 *                   - If string: filters elements matching the CSS selector
 *                   - If function: filters elements where function returns true
 *                   - If element/array: filters elements present in the given set
 * @returns A new filtered collection wrapped in a stack
 * 
 * @example
 *