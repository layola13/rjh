/**
 * Combines two callback functions with conditional execution logic.
 * 
 * @template TArgs - The tuple type of arguments passed to the callbacks
 * @template TContext - The context type for callback execution
 * 
 * @param first - The first callback function to execute
 * @param second - The second callback function to execute conditionally
 * 
 * @returns A combined function that:
 *          - Executes the first callback if only first is provided
 *          - Executes the second callback if only second is provided
 *          - Executes both callbacks if both are provided (second executes only if first returns non-false)
 *          - Returns null if neither callback is provided
 * 
 * @remarks
 * When both callbacks are provided, the second callback only executes if the first
 * callback does not return exactly `false` (using strict equality `===`).
 * 
 * @example
 *