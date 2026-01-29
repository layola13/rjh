function copyArray<T>(target: T[], source: T[]): T[] {
  for (let index = -1, sourceLength = source.length, targetLength = target.length; ++index < sourceLength;) {
    target[targetLength + index] = source[index];
  }
  return target;
}

export default copyArray;