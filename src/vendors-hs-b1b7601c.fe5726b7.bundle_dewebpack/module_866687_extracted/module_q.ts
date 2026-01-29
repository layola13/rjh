interface Point {
  x: number;
  y: number;
}

type QuadraticCurveCommand = ['Q', number, number, number, number];

function createQuadraticCurve(
  e: [number, number, number, number],
  t: Point
): QuadraticCurveCommand {
  t.x = e[2];
  t.y = e[3];
  return ['Q', e[0], e[1], e[2], e[3]];
}