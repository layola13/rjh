interface TimeObject {
  tm_hour: number;
}

function formatHour12(timeObj: TimeObject): string {
  let hour = timeObj.tm_hour;
  
  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
  }
  
  return padZero(hour, 2);
}

function padZero(value: number, width: number): string {
  return value.toString().padStart(width, '0');
}