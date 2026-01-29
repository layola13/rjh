interface TimeData {
  tm_min: number;
}

function formatMinutes(timeData: TimeData): string {
  return padNumber(timeData.tm_min, 2);
}

function padNumber(value: number, width: number): string {
  return value.toString().padStart(width, '0');
}