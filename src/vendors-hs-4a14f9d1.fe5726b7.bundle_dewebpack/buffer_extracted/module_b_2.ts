const monthAbbreviation = (date: Date): string => {
  const monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  
  return monthNames[date.getMonth()].substring(0, 3);
};

export { monthAbbreviation };