/**
 * Batch execution utility module
 * Provides functions to get and set a batch execution handler
 */

/**
 * Type definition for a batch execution function
 * A function that takes another function as parameter and executes it
 */
export type BatchFunction = (callback: () => void) => void;

/**
 * Sets a custom batch execution handler
 * @param batchFn - The new batch function to use for executing callbacks
 * @returns The provided batch function
 */
export function setBatch(batchFn: BatchFunction): BatchFunction;

/**
 * Gets the current batch execution handler
 * @returns The current batch function being used
 */
export function getBatch(): BatchFunction;