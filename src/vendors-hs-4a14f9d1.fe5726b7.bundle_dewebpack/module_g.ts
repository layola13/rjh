const hashToString = (value: unknown): string => {
  return hash(value).toString().substring(2);
};

export default hashToString;