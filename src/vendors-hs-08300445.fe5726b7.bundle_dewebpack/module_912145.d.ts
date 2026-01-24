/**
 * Combines multiple validator functions into a single validation function.
 * Iterates through all properties of an object and applies validation rules.
 * 
 * @param schema - The validation schema object containing property names and their validation rules
 * @param context - Optional context or configuration passed to individual validators
 * @returns A composed validation function that validates input against all schema rules
 */
export default function combineValidators<T extends Record<string, unknown>, C = unknown>(
  schema: T,
  context?: C
): (value: unknown, additionalContext?: C) => boolean | ValidationResult;

/**
 * Result type for validation operations
 */
export interface ValidationResult {
  valid: boolean;
  errors?: string[];
}