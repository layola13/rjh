const formatSeconds = (timestamp: number): string => {
  return padZero(timestamp, 2);
};

const padZero = (value: number, length: number): string => {
  return value.toString().padStart(length, '0');
};

export { formatSeconds };