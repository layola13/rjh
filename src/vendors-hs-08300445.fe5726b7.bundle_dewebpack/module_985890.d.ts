/**
 * Custom React hook that detects changes in a list and identifies the specific item that changed.
 * 
 * @template T - The type of items in the list
 * @param list - The current list to monitor for changes
 * @param keyExtractor - Function to extract a unique key from each item for comparison
 * @param onItemChange - Optional callback invoked when a changed item is detected
 * @returns A tuple containing the changed item (or null if no change detected)
 * 
 * @example
 *