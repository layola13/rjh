interface Point {
  x: number;
}

interface CommandResult {
  type: string;
  value: number;
}

function createHorizontalLineCommand(coordinates: number[], point: Point): [string, number] {
  point.x = coordinates[0];
  return ["H", coordinates[0]];
}

export { createHorizontalLineCommand, Point, CommandResult };