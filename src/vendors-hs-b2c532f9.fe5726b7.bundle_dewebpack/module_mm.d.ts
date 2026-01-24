/**
 * Returns a localized Hebrew string for month duration.
 * 
 * @param monthCount - The number of months
 * @returns Hebrew string representation of the month count
 * 
 * @example
 * formatMonthsInHebrew(2) // Returns "חודשיים" (dual form)
 * formatMonthsInHebrew(3) // Returns "3 חודשים" (plural form)
 */
declare function formatMonthsInHebrew(monthCount: number): string;

export default formatMonthsInHebrew;