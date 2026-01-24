/**
 * Converts a tm_year value to an actual calendar year.
 * 
 * The tm_year field in C's struct tm represents years since 1900,
 * so this function adds 1900 to convert it to the actual year.
 * 
 * @param A - Object containing a tm_year property (years since 1900)
 * @returns The actual calendar year (e.g., 2024)
 * 
 * @example
 *