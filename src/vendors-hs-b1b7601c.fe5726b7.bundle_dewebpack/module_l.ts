interface Point {
  x: number;
  y: number;
}

type LineCommand = ["L", number, number];

function createLineTo(coordinates: number[], point: Point): LineCommand {
  point.x = coordinates[0];
  point.y = coordinates[1];
  
  return ["L", coordinates[0], coordinates[1]];
}