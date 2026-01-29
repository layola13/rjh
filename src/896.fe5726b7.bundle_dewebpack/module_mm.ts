function formatMonth(date: Date): string {
  return String(date.getMonth() + 1).padStart(2, "0");
}

export default formatMonth;