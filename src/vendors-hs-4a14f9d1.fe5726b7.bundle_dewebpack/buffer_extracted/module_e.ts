function formatDayOfMonth(dayOfMonth: number): string {
  return padString(dayOfMonth, 2, " ");
}

function padString(value: number, width: number, paddingChar: string): string {
  const str = String(value);
  if (str.length >= width) {
    return str;
  }
  return paddingChar.repeat(width - str.length) + str;
}

export { formatDayOfMonth };