/**
 * Webpack Bundle Index - Type Definitions
 * 
 * This module provides type definitions for common utility functions
 * including property binding, getter/setter operations, and event handling.
 */

/**
 * Binds a function to a specific context (this value).
 * 
 * @template T - The type of the context object
 * @template F - The type of the function to bind
 * @param context - The object to bind as 'this' context
 * @param fn - The function to bind
 * @returns A new function with bound context
 * 
 * @example
 *