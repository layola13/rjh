/**
 * Module: module_375717
 * Original ID: 375717
 * 
 * This module aggregates log-related configurations or handlers.
 * It re-exports LogTriggerType and provides a default export containing
 * a collection of items gathered from dynamic module imports.
 */

/**
 * Enum representing different types of log triggers.
 * Re-exported from the logging module.
 */
export { LogTriggerType } from './module_985785';

/**
 * Aggregated collection of log handlers, configurations, or related items.
 * Dynamically loaded from all modules matching the require.context pattern.
 * 
 * @remarks
 * This array is populated by iterating through dynamically imported modules
 * and concatenating their default exports.
 */
declare const aggregatedLogItems: unknown[];

export default aggregatedLogItems;