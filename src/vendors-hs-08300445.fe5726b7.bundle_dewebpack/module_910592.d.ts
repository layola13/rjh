/**
 * Utility function that waits for all promises to finish (either resolve or reject)
 * and returns their results. Similar to Promise.allSettled but with different behavior.
 * 
 * @param promises - Array of promises to wait for
 * @returns Promise that resolves with an array of results when all promises finish,
 *          or rejects with the array if any promise rejected
 * 
 * @example
 *