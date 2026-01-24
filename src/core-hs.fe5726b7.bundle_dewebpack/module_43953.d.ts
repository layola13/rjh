/**
 * Utility function that extracts a function reference if the input is of type "Function".
 * This module provides type-safe function validation and extraction.
 * 
 * @module FunctionExtractor
 */

/**
 * Checks if the provided value is a function and returns a normalized reference to it.
 * If the value is not a function, returns undefined.
 * 
 * @template T - The function type to be validated and extracted
 * @param value - The value to check and extract as a function
 * @returns The normalized function reference if valid, otherwise undefined
 * 
 * @example
 *