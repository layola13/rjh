function formatDayOfMonth(date: Date): string {
  return String(date.getDate()).padStart(2, "0");
}

export default formatDayOfMonth;