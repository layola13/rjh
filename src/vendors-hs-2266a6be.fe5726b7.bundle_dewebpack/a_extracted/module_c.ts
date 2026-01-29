interface Point {
  x: number;
  y: number;
}

function calculateBezierCurve(
  start: Point,
  control1: Point,
  control2: Point,
  end: Point,
  segments: number
): Point[] {
  const points: Point[] = [];
  const step = 1 / segments;

  for (let i = 1; i < segments; i += 1) {
    const t = i * step;
    const oneMinusT = 1 - t;
    const oneMinusTSquared = oneMinusT * oneMinusT;
    const oneMinusTCubed = oneMinusTSquared * oneMinusT;
    const tSquared = t * t;
    const tCubed = tSquared * t;

    const x =
      oneMinusTCubed * start.x +
      3 * t * oneMinusTSquared * control1.x +
      3 * tSquared * oneMinusT * control2.x +
      tCubed * end.x;

    const y =
      oneMinusTCubed * start.y +
      3 * t * oneMinusTSquared * control1.y +
      3 * tSquared * oneMinusT * control2.y +
      tCubed * end.y;

    points.push({ x, y });
  }

  points.push(end);
  return points;
}

function processBezierSegment(
  this: { currentPos: Point },
  pointsData: unknown
): Point[] {
  const parsedPoints = parsePoints(pointsData);

  if (parsedPoints.length !== 3) {
    return [];
  }

  const originalPosition = this.currentPos;
  const control1 = parsedPoints[0];
  const control2 = parsedPoints[1];
  const endPoint = parsedPoints[2];

  const curvePoints = calculateBezierCurve(
    originalPosition,
    control1,
    control2,
    endPoint,
    10
  );

  this.currentPos = endPoint;
  return curvePoints;
}

function parsePoints(data: unknown): Point[] {
  // Implementation depends on the actual 'r' function from original code
  // Placeholder return type inference
  return data as Point[];
}