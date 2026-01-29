interface TimeInfo {
  tm_hour: number;
}

const getAMPM = (timeInfo: TimeInfo): string => 
  timeInfo.tm_hour >= 0 && timeInfo.tm_hour < 12 ? "AM" : "PM";

export default getAMPM;