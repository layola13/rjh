/**
 * Creates a function that converts a string to a specific case format.
 * 
 * @remarks
 * This module provides a higher-order function that returns a case converter.
 * It processes input strings by:
 * 1. Converting to lower case
 * 2. Deburring (removing diacritical marks)
 * 3. Removing apostrophes and quotes
 * 4. Applying the specified case transformation
 * 
 * @param caseTransform - The case transformation function to apply
 * @returns A function that converts strings to the specified case format
 * 
 * @example
 *