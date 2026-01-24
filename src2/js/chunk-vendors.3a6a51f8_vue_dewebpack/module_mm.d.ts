/**
 * Returns a Hebrew string representing a duration in months.
 * 
 * @param months - The number of months
 * @returns A localized Hebrew string for the month duration
 * 
 * @example
 * getHebrewMonthsString(2) // returns "חודשיים"
 * getHebrewMonthsString(5) // returns "5 חודשים"
 */
declare function getHebrewMonthsString(months: number): string;

export { getHebrewMonthsString };