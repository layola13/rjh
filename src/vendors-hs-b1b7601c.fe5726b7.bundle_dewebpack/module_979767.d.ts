/**
 * Utility module for merging objects with custom merge strategies
 * @module ObjectMergeUtils
 */

/**
 * Merges multiple objects together using a custom merge strategy.
 * This function delegates to an underlying merge implementation that allows
 * custom handling of property conflicts during the merge process.
 * 
 * @template T - The type of objects being merged
 * @param {...T[]} sources - Variable number of source objects to merge
 * @returns {T} A new object containing the merged properties from all sources
 * 
 * @example
 *