interface Point {
  x: number;
  y: number;
}

function createPointCommand(coordinates: number[], target: Point): [string, number, number] {
  target.x = coordinates[0];
  target.y = coordinates[1];
  
  return ["T", coordinates[0], coordinates[1]];
}