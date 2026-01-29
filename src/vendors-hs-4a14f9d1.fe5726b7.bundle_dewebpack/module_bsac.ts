interface Point {
  x: number;
  y: number;
}

function toStringBase(point: Point): string {
  return `(${point.x};${point.y})`;
}

function toString(point: Point): string {
  const str = point.toString();
  return str === "[object Object]" ? toStringBase(point) : str;
}

function compare(pointA: Point, pointB: Point): number {
  return pointA.y === pointB.y ? pointA.x - pointB.x : pointA.y - pointB.y;
}

function equals(pointA: Point, pointB: Point): boolean {
  return pointA.x === pointB.x && pointA.y === pointB.y;
}

export { toString, toStringBase, compare, equals };