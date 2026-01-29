interface Point {
  x: number;
}

interface PathCommand {
  type: string;
  value: number;
}

function createHorizontalLineCommand(coordinates: number[], target: Point): [string, number] {
  target.x = coordinates[0];
  return ["H", coordinates[0]];
}