const formatYearShort = (date: Date): string => {
  const year = date.getFullYear();
  return year.toString().substring(2);
};

export default formatYearShort;