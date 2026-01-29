export function copyCoordinates<T extends { x: number; y: number }>(
  source: unknown,
  target: T,
  coordinates: { x: number; y: number }
): T {
  target.x = coordinates.x;
  target.y = coordinates.y;
  return target;
}