/**
 * Represents a 3D plane defined by a normal vector and a distance from the origin.
 * Used for spatial partitioning and polygon splitting operations in CSG (Constructive Solid Geometry).
 */
declare class Plane {
  /**
   * The normal vector of the plane (unit vector perpendicular to the plane surface).
   */
  normal: Vector3;

  /**
   * The signed distance from the origin to the plane along the normal direction.
   * Satisfies the plane equation: normal · point = w
   */
  w: number;

  /**
   * Epsilon value for floating-point comparison tolerance.
   * Used to classify points as coplanar within numerical precision limits.
   */
  static readonly EPSILON: number;

  /**
   * Creates a new Plane instance.
   * @param normal - The normal vector of the plane (should be unit length)
   * @param w - The signed distance from origin to the plane
   */
  constructor(normal: Vector3, w: number);

  /**
   * Constructs a plane from three non-collinear points.
   * The normal is computed using the cross product of two edge vectors.
   * @param pointA - First point on the plane
   * @param pointB - Second point on the plane
   * @param pointC - Third point on the plane
   * @returns A new Plane instance passing through the three points
   */
  static fromPoints(pointA: Vector3, pointB: Vector3, pointC: Vector3): Plane;

  /**
   * Creates a deep copy of this plane.
   * @returns A new Plane instance with cloned normal and same w value
   */
  clone(): Plane;

  /**
   * Reverses the orientation of the plane by negating the normal and distance.
   * This effectively flips which side is considered "front" vs "back".
   */
  flip(): void;

  /**
   * Splits a polygon into multiple categories based on its position relative to this plane.
   * Uses epsilon-based classification to handle coplanar vertices.
   * 
   * @param polygon - The polygon to split
   * @param coplanarFront - Output array for polygons coplanar and facing the same direction as this plane
   * @param coplanarBack - Output array for polygons coplanar and facing opposite to this plane
   * @param front - Output array for polygon parts in front of (above) the plane
   * @param back - Output array for polygon parts behind (below) the plane
   */
  splitPolygon(
    polygon: Polygon,
    coplanarFront: Polygon[],
    coplanarBack: Polygon[],
    front: Polygon[],
    back: Polygon[]
  ): void;
}

/**
 * Represents a planar polygon in 3D space with associated metadata.
 * Used in CSG operations for mesh boolean operations.
 */
declare class Polygon {
  /**
   * The ordered vertices defining the polygon boundary (counter-clockwise winding).
   */
  vertices: Vertex[];

  /**
   * Shared data or metadata associated with this polygon (e.g., original face reference).
   */
  shared: unknown;

  /**
   * The plane equation derived from the first three vertices.
   */
  plane: Plane;

  /**
   * Unique identifier for this polygon instance (generated UUID).
   */
  tag: string;

  /**
   * Material index or material reference for rendering.
   */
  material: unknown;

  /**
   * Creates a new Polygon instance.
   * The plane is automatically computed from the first three vertices.
   * 
   * @param vertices - Array of at least 3 vertices defining the polygon
   * @param shared - Optional shared data or metadata
   * @param material - Optional material reference
   */
  constructor(vertices: Vertex[], shared: unknown, material: unknown);

  /**
   * Creates a deep copy of this polygon with cloned vertices.
   * @returns A new Polygon instance with independent vertex copies
   */
  clone(): Polygon;

  /**
   * Reverses the polygon orientation by reversing vertex order and flipping each vertex normal.
   * Also flips the associated plane equation.
   */
  flip(): void;
}

/**
 * Represents a vertex in 3D space with position and normal information.
 * Used as building blocks for polygons in CSG operations.
 */
declare interface Vertex {
  /**
   * The 3D position of the vertex.
   */
  pos: Vector3;

  /**
   * Creates a deep copy of this vertex.
   */
  clone(): Vertex;

  /**
   * Flips/negates the vertex normal (used when reversing polygon orientation).
   */
  flip(): void;

  /**
   * Linearly interpolates between this vertex and another vertex.
   * @param other - The target vertex to interpolate towards
   * @param t - Interpolation factor (0 = this vertex, 1 = other vertex)
   * @returns A new interpolated Vertex instance
   */
  interpolate(other: Vertex, t: number): Vertex;
}

/**
 * Represents a 3D vector with basic geometric operations.
 */
declare interface Vector3 {
  /**
   * Subtracts another vector from this vector.
   */
  minus(other: Vector3): Vector3;

  /**
   * Computes the cross product with another vector.
   */
  cross(other: Vector3): Vector3;

  /**
   * Returns a unit vector (normalized to length 1) in the same direction.
   */
  unit(): Vector3;

  /**
   * Computes the dot product with another vector.
   */
  dot(other: Vector3): number;

  /**
   * Returns the negated vector (all components inverted).
   */
  negated(): Vector3;

  /**
   * Creates a deep copy of this vector.
   */
  clone(): Vector3;
}

export = Polygon;