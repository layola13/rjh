/**
 * Formats a year value into its century representation.
 * @param year - The year offset from 1900 (tm_year format)
 * @returns The century as a zero-padded 2-digit string
 */
const formatCentury = (year: number): string => {
  const fullYear = year + 1900;
  const century = Math.floor(fullYear / 100);
  return century.toString().padStart(2, '0');
};

export default formatCentury;