interface TimeData {
  tm_wday: number;
}

export function getWeekdayName(timeData: TimeData, weekdayNames: readonly string[]): string {
  return weekdayNames[timeData.tm_wday];
}