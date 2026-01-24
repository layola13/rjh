/**
 * Custom React hook that creates a stable callback reference.
 * Returns a memoized callback that always calls the latest version of the provided function.
 * Useful for avoiding unnecessary re-renders when passing callbacks to child components.
 * 
 * @template Args - Tuple type representing the callback's parameter types
 * @template Return - The return type of the callback function
 * @param callback - The function to be wrapped in a stable reference
 * @returns A memoized callback that invokes the latest version of the input function
 * 
 * @example
 *