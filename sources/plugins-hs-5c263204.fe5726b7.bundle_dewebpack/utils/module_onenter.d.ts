/**
 * Module: module_onEnter
 * Handles number entry events by delegating to the onNumberEnter handler
 * 
 * @module onEnter
 */

/**
 * Processes number entry events
 * 
 * @param value - The numeric value or identifier being entered
 * @param context - Additional context or metadata for the entry event
 */
export declare function onEnter(value: unknown, context: unknown): void;

/**
 * Internal handler for number entry operations
 * Note: This is typically provided by a parent module or service
 */
declare const e: {
  /**
   * Core number entry handler
   * @param value - The value to process
   * @param context - Context information
   */
  onNumberEnter(value: unknown, context: unknown): void;
};