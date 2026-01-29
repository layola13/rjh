function formatYearsInHebrew(years: number): string {
  if (years === 2) {
    return "שנתיים";
  }
  
  if (years % 10 === 0 && years !== 10) {
    return `${years} שנה`;
  }
  
  return `${years} שנים`;
}

export default formatYearsInHebrew;