/**
 * Gets the index of an element relative to its siblings or finds the index of a specified element.
 * 
 * @remarks
 * This is a jQuery-like index method that can work in two modes:
 * - Without arguments: returns the element's position among its siblings
 * - With a selector/element argument: returns the position of the specified element in the collection
 * 
 * @param selector - Optional. A selector string, jQuery object, or DOM element to search for
 * @returns The zero-based index of the element, or -1 if not found or element has no parent
 * 
 * @example
 *