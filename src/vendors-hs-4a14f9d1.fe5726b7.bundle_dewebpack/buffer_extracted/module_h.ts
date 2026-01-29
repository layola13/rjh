const formatHour = (date: Date): string => {
  return padZero(date.getHours(), 2);
};

const padZero = (value: number, width: number): string => {
  return value.toString().padStart(width, '0');
};

export default formatHour;