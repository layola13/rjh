const formatMonth = (date: Date): string => {
  return padZero(date.getMonth() + 1, 2);
};

const padZero = (value: number, width: number): string => {
  return value.toString().padStart(width, '0');
};