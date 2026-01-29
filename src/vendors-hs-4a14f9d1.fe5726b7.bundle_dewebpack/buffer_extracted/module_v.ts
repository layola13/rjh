interface TimeInfo {
  tm_yday: number;
  tm_wday: number;
  tm_year: number;
}

function calculateWeekNumber(timeInfo: TimeInfo): string {
  let weekNumber = Math.floor((timeInfo.tm_yday + 7 - (timeInfo.tm_wday + 6) % 7) / 7);
  
  if ((timeInfo.tm_wday + 371 - timeInfo.tm_yday - 2) % 7 <= 2) {
    weekNumber++;
  }
  
  if (weekNumber) {
    if (weekNumber === 53) {
      const dayOfWeek = (timeInfo.tm_wday + 371 - timeInfo.tm_yday) % 7;
      
      if (dayOfWeek === 4 || (dayOfWeek === 3 && isLeapYear(timeInfo.tm_year))) {
        // Keep weekNumber as 53
      } else {
        weekNumber = 1;
      }
    }
  } else {
    weekNumber = 52;
    const previousYearDayOfWeek = (timeInfo.tm_wday + 7 - timeInfo.tm_yday - 1) % 7;
    
    if (previousYearDayOfWeek === 4 || (previousYearDayOfWeek === 5 && isLeapYear(timeInfo.tm_year % 400 - 1))) {
      weekNumber++;
    }
  }
  
  return padWithZeros(weekNumber, 2);
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function padWithZeros(value: number, width: number): string {
  return value.toString().padStart(width, '0');
}