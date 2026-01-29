const formatHour = (date: Date): string => {
  return padNumber(date.getHours(), 2);
};

const padNumber = (value: number, width: number): string => {
  return value.toString().padStart(width, '0');
};