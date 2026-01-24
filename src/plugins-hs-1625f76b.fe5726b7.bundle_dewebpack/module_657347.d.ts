/**
 * Calculates the navigation offset for scrolling to a specific item in a scrollable container.
 * 
 * @param itemIndex - The zero-based index of the target navigation item
 * @param scrollContainer - The scrollable container element
 * @param itemsWrapper - The wrapper element containing all navigation items
 * @returns The calculated offset value in pixels (negative values indicate scroll position)
 * 
 * @remarks
 * This function centers the target item in the viewport when possible.
 * Returns 0 if required elements are missing.
 * 
 * @example
 *