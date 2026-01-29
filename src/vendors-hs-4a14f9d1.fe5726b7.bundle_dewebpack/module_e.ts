interface DateStructure {
  tm_mday: number;
}

function formatDayOfMonth(date: DateStructure): string {
  return padString(date.tm_mday, 2, " ");
}

function padString(value: number, width: number, padChar: string): string {
  const str = value.toString();
  if (str.length >= width) {
    return str;
  }
  return padChar.repeat(width - str.length) + str;
}

export default formatDayOfMonth;