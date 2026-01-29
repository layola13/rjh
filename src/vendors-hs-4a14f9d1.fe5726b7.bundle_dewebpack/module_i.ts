interface TimeData {
  tm_hour: number;
}

function formatHourTo12HourFormat(timeData: TimeData): string {
  let hour = timeData.tm_hour;
  
  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
  }
  
  return padNumber(hour, 2);
}

function padNumber(value: number, width: number): string {
  return value.toString().padStart(width, '0');
}