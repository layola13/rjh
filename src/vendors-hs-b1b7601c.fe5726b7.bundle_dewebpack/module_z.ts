export interface Point {
  x: number;
  y: number;
}

export function copyPoint(target: Point, source: Point): string[] {
  target.x = source.x;
  target.y = source.y;
  return ["Z"];
}