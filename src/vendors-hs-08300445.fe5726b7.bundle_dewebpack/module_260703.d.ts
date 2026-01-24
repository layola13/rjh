/**
 * Composes multiple reducer functions into a single reducer function.
 * 
 * This is a utility function commonly used in state management patterns (like Redux).
 * It takes multiple reducer functions as arguments and returns a new reducer that
 * applies them from left to right.
 * 
 * @template TState - The type of the state being reduced
 * @template TAction - The type of the action being processed
 * 
 * @param reducers - Variable number of reducer functions to compose
 * @returns A composed reducer function that applies all reducers sequentially
 * 
 * @example
 *