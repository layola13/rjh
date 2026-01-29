const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

interface TimeInfo {
  tm_wday: number;
}

const getShortWeekdayName = (timeInfo: TimeInfo): string => {
  return WEEKDAY_NAMES[timeInfo.tm_wday].substring(0, 3);
};

export { getShortWeekdayName, WEEKDAY_NAMES };