/**
 * Checks if a date is allowed based on validation constraints.
 * 
 * @param date - The date string to validate (ISO format: YYYY-MM-DD)
 * @param min - Minimum allowed date string (ISO format: YYYY-MM-DD), optional
 * @param max - Maximum allowed date string (ISO format: YYYY-MM-DD), optional
 * @param allowedDates - Custom validation function to determine if a date is allowed, optional
 * @returns True if the date passes all validation constraints, false otherwise
 */
export default function isDateAllowed(
  date: string,
  min: string | null | undefined,
  max: string | null | undefined,
  allowedDates?: ((date: string) => boolean) | null
): boolean;