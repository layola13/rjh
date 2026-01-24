/**
 * Type checking utilities for DOM elements and JavaScript primitives.
 * Provides runtime type guards for validating nodes, node lists, strings, and functions.
 * 
 * @module TypeCheckers
 */

/**
 * Checks if a value is a valid HTML element node.
 * 
 * @param value - The value to check
 * @returns True if the value is an HTMLElement with nodeType of 1 (ELEMENT_NODE)
 * 
 * @example
 *