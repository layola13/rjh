function at<T>(this: T[], index: number): T | undefined {
  const array = toObject(this);
  const length = array.length;
  const relativeIndex = toIntegerOrInfinity(index);
  const actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
  
  return actualIndex < 0 || actualIndex >= length 
    ? undefined 
    : charAt(array, actualIndex);
}