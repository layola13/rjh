function formatTimezoneOffset(date: Date): string {
  const offsetInSeconds = date.getTimezoneOffset() * -60;
  const isPositive = offsetInSeconds >= 0;
  
  const absoluteOffsetMinutes = Math.abs(offsetInSeconds) / 60;
  const hours = Math.floor(absoluteOffsetMinutes / 60);
  const minutes = absoluteOffsetMinutes % 60;
  const offsetValue = hours * 100 + minutes;
  
  const sign = isPositive ? "+" : "-";
  const paddedOffset = String("0000" + offsetValue).slice(-4);
  
  return sign + paddedOffset;
}

export { formatTimezoneOffset };