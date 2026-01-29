export function getArrDiff<T>(sourceArray: T[], compareArray: T[]): T[] {
  const sourceSet = new Set(sourceArray);
  const compareSet = new Set(compareArray);
  const differenceSet = new Set<T>();
  
  sourceSet.forEach((element) => {
    if (!compareSet.has(element)) {
      differenceSet.add(element);
    }
  });
  
  return Array.from(differenceSet);
}

export function getArrUnion<T>(firstArray: T[], secondArray: T[]): T[] {
  const firstSet = new Set(firstArray);
  const secondSet = new Set(secondArray);
  const intersectionSet = new Set<T>();
  
  firstSet.forEach((element) => {
    if (secondSet.has(element)) {
      intersectionSet.add(element);
    }
  });
  
  return Array.from(intersectionSet);
}