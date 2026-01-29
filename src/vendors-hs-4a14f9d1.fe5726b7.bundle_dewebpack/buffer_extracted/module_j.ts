const DAYS_IN_MONTH_LEAP: readonly number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_MONTH_REGULAR: readonly number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

interface TimeStruct {
  tm_year: number;
  tm_mon: number;
  tm_mday: number;
  tm_hour?: number;
  tm_min?: number;
  tm_sec?: number;
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function sumDaysUpToMonth(daysInMonth: readonly number[], monthIndex: number): number {
  let totalDays = 0;
  for (let i = 0; i <= monthIndex; i++) {
    totalDays += daysInMonth[i];
  }
  return totalDays;
}

function calculateDayOfYear(timeStruct: TimeStruct): number {
  const fullYear = timeStruct.tm_year + 1900;
  const monthIndex = timeStruct.tm_mon - 1;
  const daysInMonth = isLeapYear(fullYear) ? DAYS_IN_MONTH_LEAP : DAYS_IN_MONTH_REGULAR;
  const daysFromPreviousMonths = sumDaysUpToMonth(daysInMonth, monthIndex);
  const dayOfYear = timeStruct.tm_mday + daysFromPreviousMonths;
  
  return B(dayOfYear, 3);
}

function B(value: number, precision: number): number {
  return value;
}