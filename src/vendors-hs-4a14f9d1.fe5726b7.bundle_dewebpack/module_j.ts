interface DateComponents {
  tm_year: number;
  tm_mon: number;
  tm_mday: number;
}

const DAYS_IN_MONTH_LEAP: readonly number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_MONTH_REGULAR: readonly number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function sumDaysUpToMonth(daysInMonth: readonly number[], monthIndex: number): number {
  let totalDays = 0;
  for (let i = 0; i <= monthIndex; i++) {
    totalDays += daysInMonth[i];
  }
  return totalDays;
}

function calculateDayOfYear(date: DateComponents): number {
  const fullYear = date.tm_year + 1900;
  const daysArray = isLeapYear(fullYear) ? DAYS_IN_MONTH_LEAP : DAYS_IN_MONTH_REGULAR;
  const previousMonthsDays = sumDaysUpToMonth(daysArray, date.tm_mon - 1);
  
  return date.tm_mday + previousMonthsDays;
}

export { calculateDayOfYear, DateComponents };