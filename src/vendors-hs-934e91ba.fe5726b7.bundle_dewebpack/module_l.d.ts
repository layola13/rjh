/**
 * Calculates an adjusted size value by applying a transformation function
 * and adding a fixed size offset.
 * 
 * @param value - The initial size value to be adjusted
 * @returns The calculated size after applying the transformation and offset
 * 
 * @remarks
 * This function:
 * 1. Adds the SIZE offset from the global configuration to the input value
 * 2. Applies the Kt transformation function
 * 3. Adds the SIZE offset again to the result
 * 
 * @example
 *