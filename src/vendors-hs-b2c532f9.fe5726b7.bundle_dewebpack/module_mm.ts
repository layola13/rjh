function getMonthsText(months: number): string {
  return months === 2 ? "חודשיים" : `${months} חודשים`;
}

export { getMonthsText };