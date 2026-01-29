export function arrayLikeToArray<T>(arr: T[]): T[] | undefined {
  if (Array.isArray(arr)) {
    return arr.slice();
  }
  return undefined;
}

export default arrayLikeToArray;