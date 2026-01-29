interface TimeInfo {
  tm_wday: number;
}

const getWeekday = (timeInfo: TimeInfo): number => timeInfo.tm_wday || 7;

export { getWeekday };