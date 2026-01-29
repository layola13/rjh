interface Point {
  x: number;
  y: number;
}

type CubicBezierCommand = ["C", number, number, number, number, number, number];

function createCubicBezierCommand(e: number[], t: Point): CubicBezierCommand {
  t.x = e[4];
  t.y = e[5];
  
  return ["C", e[0], e[1], e[2], e[3], e[4], e[5]];
}