interface TimeInfo {
  tm_hour: number;
}

const getAmPm = (timeInfo: TimeInfo): string => {
  return timeInfo.tm_hour >= 0 && timeInfo.tm_hour < 12 ? "AM" : "PM";
};

export { getAmPm };