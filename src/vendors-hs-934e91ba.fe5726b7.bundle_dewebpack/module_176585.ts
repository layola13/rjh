function copyArray<T>(target: T[], source: T[]): T[] {
  for (let index = 0, sourceLength = source.length, targetLength = target.length; index < sourceLength; index++) {
    target[targetLength + index] = source[index];
  }
  return target;
}

export default copyArray;