const toIntegerOrInfinity = (value: number): number => {
  return value > 0 ? Math.min(Math.trunc(value), Number.MAX_SAFE_INTEGER) : 0;
};

export default toIntegerOrInfinity;