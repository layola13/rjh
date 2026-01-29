interface DateComponents {
  tm_yday: number;
  tm_wday: number;
}

function formatWeekNumber(dateComponents: DateComponents, padFunction: (value: number, width: number) => string): string {
  const daysFromMonday = (dateComponents.tm_wday + 6) % 7;
  const adjustedDays = dateComponents.tm_yday + 7 - daysFromMonday;
  const weekNumber = Math.floor(adjustedDays / 7);
  
  return padFunction(weekNumber, 2);
}