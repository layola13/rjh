interface Point {
  x: number;
  y: number;
}

type SCommand = ["S", number, number, number, number];

function createSCommand(coordinates: number[], target: Point): SCommand {
  target.x = coordinates[2];
  target.y = coordinates[3];
  
  return ["S", coordinates[0], coordinates[1], coordinates[2], coordinates[3]];
}