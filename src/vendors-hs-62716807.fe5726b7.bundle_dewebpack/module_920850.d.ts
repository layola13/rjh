/**
 * Creates an error indicating an unreachable case in exhaustive type checking.
 * This function is typically used in switch statements or conditional branches
 * to ensure all possible cases of a discriminated union are handled at compile time.
 * 
 * @param value - The value that should never be reached. TypeScript will enforce
 *                this is of type `never` if all cases are properly handled.
 * @returns A new Error instance with a message describing the unreachable value
 * 
 * @example
 *