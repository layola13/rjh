interface TimeInfo {
  tm_yday: number;
  tm_wday: number;
}

function formatWeekNumber(timeInfo: TimeInfo, padFunction: (value: number, width: number) => string): string {
  const daysSinceMonday = timeInfo.tm_yday + 7 - (timeInfo.tm_wday + 6) % 7;
  const weekNumber = Math.floor(daysSinceMonday / 7);
  return padFunction(weekNumber, 2);
}