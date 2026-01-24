/**
 * Converts a value into a normalized numeric category/level.
 * 
 * Maps input values to discrete numeric categories:
 * - 1 → 0 (lowest category)
 * - 2 → 1 (second category)
 * - 3-6 → 2 (low-mid range)
 * - 7-10 → 3 (high-mid range)
 * - 11+ → 4 (highest category)
 * 
 * @param value - The input value to categorize
 * @returns A number from 0 to 4 representing the category level
 * 
 * @example
 *