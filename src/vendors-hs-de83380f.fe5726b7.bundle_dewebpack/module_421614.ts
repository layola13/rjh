export function arrayWithoutHoles<T>(arr: T[]): T[] | undefined {
  if (Array.isArray(arr)) return arr;
}

export default arrayWithoutHoles;