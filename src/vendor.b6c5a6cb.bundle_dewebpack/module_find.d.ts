/**
 * Find descendants of the current set of matched elements, filtered by a selector.
 * 
 * @template T - The type of elements in the collection
 * @param {string | Element | Element[] | JQuery} selector - A string containing a selector expression to match elements against,
 *                                                            or an element/collection to filter
 * @returns {JQuery<T>} A new jQuery object containing the filtered descendants
 * 
 * @remarks
 * - If selector is a string, performs a descendant search using the selector
 * - If selector is an element or collection, filters to elements contained within the current set
 * - Results are automatically de-duplicated when searching multiple elements
 * 
 * @example
 *