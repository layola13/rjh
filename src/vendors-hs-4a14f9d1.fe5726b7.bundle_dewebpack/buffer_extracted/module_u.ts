interface DateComponents {
  tm_yday: number;
  tm_wday: number;
}

const formatWeekNumber = (dateComponents: DateComponents): string => {
  const adjustedDay = dateComponents.tm_yday + 7 - dateComponents.tm_wday;
  const weekNumber = Math.floor(adjustedDay / 7);
  return padNumber(weekNumber, 2);
};

const padNumber = (value: number, width: number): string => {
  return value.toString().padStart(width, '0');
};

export { formatWeekNumber, padNumber };