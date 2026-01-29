function formatHours(hours: number): string {
  return hours === 2 ? "שעתיים" : `${hours} שעות`;
}

export default formatHours;