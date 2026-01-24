/**
 * Module for joining bars after a split operation in a geometric/CAD system.
 * Handles the reconnection of split geometric shapes by adjusting their endpoints
 * and maintaining proper docking relationships.
 */

/**
 * Represents a geometric shape with start and end points, capable of transformations
 */
interface MulShape {
  /** Starting point of the shape */
  start: Point;
  /** Ending point of the shape */
  end: Point;
  /** Middle point of the shape */
  middle(): Point;
  /** Get the tangent vector at the start of the shape */
  tangentInStart(): Vector;
}

/**
 * Represents edge and point docking information
 */
interface EPDock {
  /** Start point docking configuration */
  stDock: Dock;
  /** End point docking configuration */
  etDock: Dock;
}

/**
 * Represents a geometric entity with a bounding box and edges
 */
interface GeometricEntity {
  /** Bounding box of the entity */
  box: {
    center: Point;
  };
  /** Collection of edges forming the entity */
  edges: Edge[];
  /** The multiplied/transformed shape representation */
  mulShape: MulShape;
  /** Docking configuration for endpoints */
  epDock: EPDock;
  /**
   * Edit a point at the specified index
   * @param index - Index of the point to edit
   * @param offset - Vector offset to apply
   */
  editPoint(index: number, offset: Vector): void;
  /**
   * Update the multiplied shape with new position and reference point
   * @param newPosition - New position point
   * @param referencePoint - Reference point for the update
   */
  updateMulShape(newPosition: Point, referencePoint: Point): void;
}

/**
 * Represents a geometric edge with start and end points
 */
interface Edge {
  /** Starting point of the edge */
  start: Point;
  /** Ending point of the edge */
  end: Point;
}

/**
 * Represents a 2D point
 */
interface Point {
  x: number;
  y: number;
  /**
   * Check if this point is equal to another point
   * @param other - Point to compare with
   */
  equalTo(other: Point): boolean;
  /**
   * Check if this point is to the left of a line
   * @param line - Line to check against
   */
  leftTo(line: Line): boolean;
  /**
   * Translate this point by a vector
   * @param vector - Vector to translate by
   */
  translate(vector: Vector): Point;
}

/**
 * Represents a 2D vector
 */
interface Vector {
  /**
   * Rotate vector 90 degrees clockwise
   */
  rotate90CW(): Vector;
  /**
   * Rotate vector 90 degrees counter-clockwise
   */
  rotate90CCW(): Vector;
  /**
   * Invert the vector direction
   */
  invert(): Vector;
  /**
   * Multiply vector by a scalar
   * @param scalar - Multiplier value
   */
  multiply(scalar: number): Vector;
  /**
   * Calculate dot product with another vector
   * @param other - Vector to calculate dot product with
   */
  dot(other: Vector): number;
}

/**
 * Represents a geometric line
 */
interface Line {
  // Line properties and methods
}

/**
 * Represents docking configuration for geometric connections
 */
interface Dock {
  // Dock properties
}

/**
 * Utility class for working with joins after splitting operations.
 * Handles geometric calculations and adjustments when reconnecting split bars.
 */
export declare class JoinBarAfterSplit {
  /**
   * Creates a new instance of JoinBarAfterSplit
   */
  constructor();

  /**
   * Joins two geometric entities after a split operation by adjusting their endpoints
   * and maintaining proper geometric relationships.
   * 
   * @param entities - Array of geometric entities to consider for joining
   * @param targetEntity - The target entity to be joined
   * @param invertDirection - Whether to invert the join direction (default: true)
   * @param offsetDistance1 - First offset distance for point adjustment
   * @param offsetDistance2 - Second offset distance for point adjustment
   * 
   * @remarks
   * This method:
   * - Determines the perpendicular direction based on segment orientation
   * - Finds matching connection points between entities
   * - Adjusts endpoint positions based on calculated offsets
   * - Updates docking configurations to reflect the new connection state
   */
  join(
    entities: GeometricEntity[],
    targetEntity: GeometricEntity,
    invertDirection?: boolean,
    offsetDistance1?: number,
    offsetDistance2?: number
  ): void;
}