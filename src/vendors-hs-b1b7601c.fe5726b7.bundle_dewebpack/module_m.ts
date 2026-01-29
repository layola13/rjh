interface Point {
  x: number;
  y: number;
}

function createMoveCommand(
  coordinates: [number, number],
  target: Point,
  alternate: Point
): ["M", number, number] {
  target.x = alternate.x = coordinates[0];
  target.y = alternate.y = coordinates[1];
  
  return ["M", target.x, target.y];
}