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

export default (timeInfo: TimeInfo): string => 
  WEEKDAY_NAMES[timeInfo.tm_wday].substring(0, 3);