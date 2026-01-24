/**
 * Type guard utility for checking if an object is a compatible receiver
 * with the expected internal type marker.
 * 
 * This module validates that a given value is an object with a specific
 * internal type tag (_t property), commonly used in polyfills or internal
 * implementations to ensure type safety at runtime.
 * 
 * @module ReceiverTypeValidator
 */

/**
 * Validates that the receiver object has the expected internal type marker.
 * 
 * @template T - The expected receiver type
 * @param receiver - The object to validate as a compatible receiver
 * @param expectedType - The expected internal type identifier string
 * @returns The validated receiver object
 * @throws {TypeError} If the receiver is not an object or lacks the expected type marker
 * 
 * @example
 *