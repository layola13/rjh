export type Vector2 = [number, number];
export type Vector3 = [number, number, number];
export type Vector = Vector2 | Vector3;

/**
 * Calculate the length (magnitude) of a vector
 * @param vector - Input vector (2D or 3D)
 * @returns The Euclidean length of the vector
 */
export function length(vector: Vector): number {
  return Math.sqrt(
    vector.slice(0, 3).reduce((sum, component) => {
      return sum + component * component;
    }, 0)
  );
}

/**
 * Calculate the cross product of two vectors
 * @param a - First vector (2D or 3D)
 * @param b - Second vector (2D or 3D)
 * @returns The cross product as a 3D vector
 */
export function cross(a: Vector, b: Vector): Vector3 {
  const vec3A: Vector3 = a.length === 2 ? [a[0], a[1], 0] : a;
  const vec3B: Vector3 = b.length === 2 ? [b[0], b[1], 0] : b;

  return [
    vec3A[1] * vec3B[2] - vec3A[2] * vec3B[1],
    vec3A[2] * vec3B[0] - vec3A[0] * vec3B[2],
    vec3A[0] * vec3B[1] - vec3A[1] * vec3B[0]
  ];
}

/**
 * Calculate the dot product of two vectors
 * @param a - First vector
 * @param b - Second vector
 * @returns The dot product scalar value
 */
export function dot(a: Vector, b: Vector): number {
  return a.reduce((sum, component, index) => {
    return sum + component * b[index];
  }, 0);
}

/**
 * Normalize a vector to unit length
 * @param vector - Input vector
 * @returns A new vector with length 1 in the same direction
 */
export function normalize(vector: Vector): Vector3 {
  const magnitude = length(vector);
  return vector.slice(0, 3).map(component => component / magnitude) as Vector3;
}

/**
 * Add two vectors component-wise
 * @param a - First vector
 * @param b - Second vector
 * @returns The sum of the two vectors
 */
export function add(a: Vector, b: Vector): Vector3 {
  return a.slice(0, 3).map((component, index) => component + b[index]) as Vector3;
}

/**
 * Subtract vector b from vector a component-wise
 * @param a - First vector
 * @param b - Second vector to subtract
 * @returns The difference of the two vectors
 */
export function subtract(a: Vector, b: Vector): Vector3 {
  return a.slice(0, 3).map((component, index) => component - b[index]) as Vector3;
}

export const sub = subtract;