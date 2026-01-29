export function getLastDay(dateUtil: DateUtil, date: Date): string {
  const year = dateUtil.getYear(date);
  const month = dateUtil.getMonth(date) + 1;
  const fixedDate = dateUtil.getFixedDate(`${year}-${month}-01`);
  const endDate = dateUtil.getEndDate(fixedDate);
  const day = dateUtil.getDate(endDate);
  const monthFormatted = month < 10 ? `0${month}` : `${month}`;
  
  return `${year}-${monthFormatted}-${day}`;
}

export function getLowerBoundTime(
  hour: number,
  minute: number,
  second: number,
  hourStep: number,
  minuteStep: number,
  secondStep: number
): [number, number, number] {
  const lowerHour = Math.floor(hour / hourStep) * hourStep;
  
  if (lowerHour < hour) {
    return [lowerHour, 60 - minuteStep, 60 - secondStep];
  }
  
  const lowerMinute = Math.floor(minute / minuteStep) * minuteStep;
  
  if (lowerMinute < minute) {
    return [lowerHour, lowerMinute, 60 - secondStep];
  }
  
  const lowerSecond = Math.floor(second / secondStep) * secondStep;
  
  return [lowerHour, lowerMinute, lowerSecond];
}

export function setDateTime(
  dateUtil: DateUtil,
  targetDate: Date,
  sourceDate?: Date
): Date {
  if (!sourceDate) {
    return targetDate;
  }
  
  let result = targetDate;
  result = dateUtil.setHour(result, dateUtil.getHour(sourceDate));
  result = dateUtil.setMinute(result, dateUtil.getMinute(sourceDate));
  result = dateUtil.setSecond(result, dateUtil.getSecond(sourceDate));
  
  return result;
}

export function setTime(
  dateUtil: DateUtil,
  date: Date,
  hour: number,
  minute: number,
  second: number
): Date {
  let result = dateUtil.setHour(date, hour);
  result = dateUtil.setMinute(result, minute);
  result = dateUtil.setSecond(result, second);
  
  return result;
}

interface DateUtil {
  getYear(date: Date): number;
  getMonth(date: Date): number;
  getDate(date: Date): number;
  getHour(date: Date): number;
  getMinute(date: Date): number;
  getSecond(date: Date): number;
  getFixedDate(dateString: string): Date;
  getEndDate(date: Date): Date;
  setHour(date: Date, hour: number): Date;
  setMinute(date: Date, minute: number): Date;
  setSecond(date: Date, second: number): Date;
}