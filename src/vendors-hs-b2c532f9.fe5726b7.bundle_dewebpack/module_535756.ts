export type Vector2 = [number, number];
export type Vector3 = [number, number, number];
export type Vector = Vector2 | Vector3;

/**
 * Calculate the length (magnitude) of a vector
 */
export function length(vector: Vector): number {
  return Math.sqrt(
    vector.slice(0, 3).reduce((accumulator: number, component: number) => {
      return accumulator + component * component;
    }, 0)
  );
}

/**
 * Calculate the cross product of two vectors
 */
export function cross(a: Vector, b: Vector): Vector3 {
  const vectorA: Vector3 = a.length === 2 ? [a[0], a[1], 0] : [a[0], a[1], a[2]];
  const vectorB: Vector3 = b.length === 2 ? [b[0], b[1], 0] : [b[0], b[1], b[2]];

  return [
    vectorA[1] * vectorB[2] - vectorA[2] * vectorB[1],
    vectorA[2] * vectorB[0] - vectorA[0] * vectorB[2],
    vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0]
  ];
}

/**
 * Calculate the dot product of two vectors
 */
export function dot(a: Vector, b: Vector): number {
  return a.reduce((accumulator: number, component: number, index: number) => {
    return accumulator + component * b[index];
  }, 0);
}

/**
 * Normalize a vector to unit length
 */
export function normalize(vector: Vector): Vector3 {
  const magnitude = length(vector);
  return vector.slice(0, 3).map((component: number) => {
    return component / magnitude;
  }) as Vector3;
}

/**
 * Add two vectors
 */
export function add(a: Vector, b: Vector): Vector3 {
  return a.slice(0, 3).map((component: number, index: number) => {
    return component + b[index];
  }) as Vector3;
}

/**
 * Subtract vector b from vector a
 */
export function subtract(a: Vector, b: Vector): Vector3 {
  return a.slice(0, 3).map((component: number, index: number) => {
    return component - b[index];
  }) as Vector3;
}

/**
 * Alias for subtract
 */
export const sub = subtract;