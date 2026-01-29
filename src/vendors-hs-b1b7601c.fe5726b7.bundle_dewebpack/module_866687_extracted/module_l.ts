interface Point {
  x: number;
  y: number;
}

type LineToCommand = ["L", number, number];

function createLineToCommand(coordinates: number[], target: Point): LineToCommand {
  target.x = coordinates[0];
  target.y = coordinates[1];
  
  return ["L", coordinates[0], coordinates[1]];
}