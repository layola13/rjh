function formatMonth(date: Date): string {
  return padZero(date.getMonth() + 1, 2);
}

function padZero(value: number, width: number): string {
  return value.toString().padStart(width, '0');
}