/**
 * Represents a vertex in 3D space with position, normal, and UV coordinates.
 * Used in geometric operations such as CSG (Constructive Solid Geometry).
 */
declare class Vertex {
  /**
   * The position of the vertex in 3D space.
   */
  pos: Vector3;

  /**
   * The normal vector at this vertex, used for lighting calculations.
   */
  normal: Vector3;

  /**
   * The UV texture coordinates for this vertex.
   */
  uv: Vector2 | Vector3;

  /**
   * Creates a new Vertex instance.
   * @param pos - The position vector (x, y, z coordinates)
   * @param normal - The normal vector (surface direction)
   * @param uv - The UV texture coordinates
   */
  constructor(pos: Vector3, normal: Vector3, uv: Vector2 | Vector3);

  /**
   * Creates a deep copy of this vertex.
   * @returns A new Vertex instance with cloned position, normal, and UV values
   */
  clone(): Vertex;

  /**
   * Flips the normal vector direction (negates it).
   * Useful for reversing face orientation.
   */
  flip(): void;

  /**
   * Linearly interpolates between this vertex and another vertex.
   * @param other - The target vertex to interpolate towards
   * @param t - Interpolation factor (0.0 = this vertex, 1.0 = other vertex)
   * @returns A new Vertex with interpolated position, normal, and UV coordinates
   */
  interpolate(other: Vertex, t: number): Vertex;
}

/**
 * Represents a 3D vector with x, y, z components.
 * Provides vector operations like clone, lerp, and negated.
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
  clone(): Vector3;
  lerp(other: Vector3, t: number): Vector3;
  negated(): Vector3;
}

/**
 * Represents a 2D vector with x, y components.
 * Used for UV texture coordinates.
 */
interface Vector2 {
  x: number;
  y: number;
  clone(): Vector2;
  lerp(other: Vector2, t: number): Vector2;
}

export = Vertex;