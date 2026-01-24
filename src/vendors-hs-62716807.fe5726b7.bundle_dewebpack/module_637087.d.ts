/**
 * React hook for managing a list of items with add/remove functionality.
 * Returns a tuple containing the current list and a function to add items.
 * The add function returns a cleanup function to remove the added item.
 * 
 * @returns A tuple of [items, addItem] where:
 *   - items: The current array of items
 *   - addItem: Function that adds an item and returns a removal function
 * 
 * @example
 *