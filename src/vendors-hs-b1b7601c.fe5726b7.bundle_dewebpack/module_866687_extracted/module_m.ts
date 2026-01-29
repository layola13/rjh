interface Point {
  x: number;
  y: number;
}

function createMoveCommand(
  coordinates: number[],
  target: Point,
  normal: Point
): [string, number, number] {
  target.x = normal.x = coordinates[0];
  target.y = normal.y = coordinates[1];
  
  return ["M", target.x, target.y];
}