const formatYearTwoDigits = (date: Date): string => {
  const fullYear = date.getFullYear();
  return fullYear.toString().substring(2);
};

export default formatYearTwoDigits;