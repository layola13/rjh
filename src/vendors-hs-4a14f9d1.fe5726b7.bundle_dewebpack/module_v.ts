interface TimeData {
  tm_yday: number;
  tm_wday: number;
  tm_year: number;
}

function calculateWeekNumber(timeData: TimeData): string {
  let weekNumber = Math.floor((timeData.tm_yday + 7 - (timeData.tm_wday + 6) % 7) / 7);
  
  if ((timeData.tm_wday + 371 - timeData.tm_yday - 2) % 7 <= 2) {
    weekNumber++;
  }
  
  if (weekNumber) {
    if (weekNumber === 53) {
      const dayOfWeek = (timeData.tm_wday + 371 - timeData.tm_yday) % 7;
      
      if (dayOfWeek === 4 || (dayOfWeek === 3 && isLeapYear(timeData.tm_year))) {
        // Keep weekNumber as 53
      } else {
        weekNumber = 1;
      }
    }
  } else {
    weekNumber = 52;
    const dayOfWeek = (timeData.tm_wday + 7 - timeData.tm_yday - 1) % 7;
    
    if (dayOfWeek === 4 || (dayOfWeek === 5 && isLeapYear(timeData.tm_year % 400 - 1))) {
      weekNumber++;
    }
  }
  
  return padNumber(weekNumber, 2);
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function padNumber(value: number, width: number): string {
  return value.toString().padStart(width, '0');
}