export const filterGeometry = <T>(geometry: T[]): T[] => {
  return geometry.filter((item: T): item is T => {
    return !!item;
  });
};