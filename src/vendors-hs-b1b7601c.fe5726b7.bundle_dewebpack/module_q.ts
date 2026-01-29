interface Point {
  x: number;
  y: number;
}

type QuadraticBezierCommand = ["Q", number, number, number, number];

function createQuadraticBezierCommand(
  coordinates: [number, number, number, number],
  target: Point
): QuadraticBezierCommand {
  target.x = coordinates[2];
  target.y = coordinates[3];
  
  return [
    "Q",
    coordinates[0],
    coordinates[1],
    coordinates[2],
    coordinates[3]
  ];
}