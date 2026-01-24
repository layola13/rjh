/**
 * Georgian language time unit formatter for relative time expressions.
 * Converts time unit words to their "ago" form in Georgian.
 * 
 * @module module_past
 * @originalId past
 */

/**
 * Formats Georgian time unit strings to express past time (e.g., "X ago").
 * 
 * Handles the following time units in Georgian:
 * - წამი (second) → წამის წინ (seconds ago)
 * - წუთი (minute) → წუთის წინ (minutes ago)
 * - საათი (hour) → საათის წინ (hours ago)
 * - დღე (day) → დღის წინ (days ago)
 * - თვე (month) → თვის წინ (months ago)
 * - წელი (year) → წლის წინ (years ago)
 * 
 * @param timeUnitString - The Georgian time unit string to format
 * @returns The formatted string with "წინ" (ago) suffix, or the original string if no match
 * 
 * @example
 *