const formatCentury = (date: Date): string => {
  const year = date.getFullYear();
  const century = Math.floor(year / 100);
  return century.toString().padStart(2, '0');
};

export { formatCentury };