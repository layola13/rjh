function formatDayOfMonth(date: Date): string {
  return padZero(date.getDate(), 2);
}

function padZero(value: number, width: number): string {
  return value.toString().padStart(width, '0');
}