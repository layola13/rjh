interface Point {
  x: number;
  y: number;
}

type CubicBezierCommand = [
  command: "C",
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number,
  y: number
];

function createCubicBezierCommand(
  coordinates: number[],
  target: Point
): CubicBezierCommand {
  target.x = coordinates[4];
  target.y = coordinates[5];
  
  return [
    "C",
    coordinates[0],
    coordinates[1],
    coordinates[2],
    coordinates[3],
    coordinates[4],
    coordinates[5]
  ];
}

export { createCubicBezierCommand, Point, CubicBezierCommand };