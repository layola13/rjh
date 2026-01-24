/**
 * Apply a series of transformation functions to a value.
 * 
 * @remarks
 * This function iterates through an array of transformer functions and applies each one
 * sequentially to the input value, passing along a context parameter. The result of each
 * transformation becomes the input for the next one.
 * 
 * @template T - The type of the value being transformed
 * @template C - The type of the context parameter
 * 
 * @param value - The initial value to be transformed
 * @param context - A context object passed to each transformer function
 * @param transformers - An array of transformer functions to apply sequentially
 * @returns The final transformed value after all transformers have been applied
 * 
 * @example
 *