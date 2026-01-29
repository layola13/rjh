interface Point {
  x: number;
  y: number;
}

function transformPoint(coordinates: [number, number], target: Point): ["T", number, number] {
  target.x = coordinates[0];
  target.y = coordinates[1];
  return ["T", coordinates[0], coordinates[1]];
}