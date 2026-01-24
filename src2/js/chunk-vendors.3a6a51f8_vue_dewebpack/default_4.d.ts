/**
 * Checks if a date is allowed based on provided constraints
 * @param date - The date string to validate (format: YYYY-MM-DD)
 * @param min - Optional minimum allowed date string (format: YYYY-MM-DD)
 * @param max - Optional maximum allowed date string (format: YYYY-MM-DD)
 * @param allowedDates - Optional predicate function to determine if a date is allowed
 * @returns true if the date passes all validation constraints, false otherwise
 */
export default function isDateAllowed(
  date: string,
  min?: string,
  max?: string,
  allowedDates?: (date: string) => boolean
): boolean;