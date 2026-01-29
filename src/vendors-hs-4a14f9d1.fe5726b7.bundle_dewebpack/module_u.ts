interface TimeInfo {
  tm_yday: number;
  tm_wday: number;
}

function formatWeekNumber(timeInfo: TimeInfo): string {
  const adjustedDay = timeInfo.tm_yday + 7 - timeInfo.tm_wday;
  const weekNumber = Math.floor(adjustedDay / 7);
  return padNumber(weekNumber, 2);
}

function padNumber(value: number, width: number): string {
  return value.toString().padStart(width, '0');
}