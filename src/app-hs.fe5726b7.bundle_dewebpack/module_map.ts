function mapToVector2(e: { x: number; y: number }): Vector2 {
  return new Vector2(e.x, e.y);
}

class Vector2 {
  constructor(public x: number, public y: number) {}
}