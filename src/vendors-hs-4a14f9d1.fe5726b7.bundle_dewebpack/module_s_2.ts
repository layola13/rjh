interface TimeValue {
  tm_sec: number;
}

function formatSeconds(time: TimeValue): string {
  return padNumber(time.tm_sec, 2);
}

function padNumber(value: number, width: number): string {
  return value.toString().padStart(width, '0');
}