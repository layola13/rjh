/**
 * Extracts the x coordinate from a point object.
 * 
 * @param point - An object containing x coordinate
 * @returns The x coordinate value
 */
declare function getX<T extends { x: number }>(point: T): number;

export { getX };