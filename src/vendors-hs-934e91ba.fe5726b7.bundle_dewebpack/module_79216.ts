const MAX_SAFE_INTEGER = 9007199254740991;
const INDEX_PATTERN = /^(?:0|[1-9]\d*)$/;

function isIndex(value: unknown, length?: number): boolean {
  const maxLength = length ?? MAX_SAFE_INTEGER;
  
  if (!maxLength) {
    return false;
  }
  
  const valueType = typeof value;
  const isValidType = valueType === "number" || (valueType !== "symbol" && INDEX_PATTERN.test(String(value)));
  
  if (!isValidType) {
    return false;
  }
  
  const numericValue = Number(value);
  return numericValue > -1 && numericValue % 1 === 0 && numericValue < maxLength;
}

export default isIndex;