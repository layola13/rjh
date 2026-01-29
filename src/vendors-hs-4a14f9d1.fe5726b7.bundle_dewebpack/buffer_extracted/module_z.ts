export default (date: Date): string => {
  const timezoneOffsetMinutes: number = date.getTimezoneOffset();
  const isPositive: boolean = timezoneOffsetMinutes <= 0;
  const absoluteOffsetMinutes: number = Math.abs(timezoneOffsetMinutes);
  const hours: number = Math.floor(absoluteOffsetMinutes / 60);
  const minutes: number = absoluteOffsetMinutes % 60;
  const offset: number = hours * 100 + minutes;
  const sign: string = isPositive ? "+" : "-";
  
  return sign + String(10000 + offset).slice(-4);
};