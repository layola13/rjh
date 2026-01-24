import type { Curve2d, Curve2d_IO } from './Curve2d';
import type { CircleArc2d } from './CircleArc2d';
import type { Entity } from './Entity';
import type { Wire2d } from './Wire2d';
import type { Face2d } from './Face2d';

/**
 * 2D point coordinate interface
 */
export interface Point2D {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Circle2d geometry type: [center point, radius]
 */
export type Circle2dGeometry = [Point2D, number] | [];

/**
 * Serialization/deserialization handler for Circle2d entities
 * Manages persistence and network transmission of circle data
 */
export declare class Circle2d_IO extends Curve2d_IO {
  private static _Circle2d_IO_instance?: Circle2d_IO;

  /**
   * Get singleton instance of Circle2d_IO
   * @returns The shared Circle2d_IO instance
   */
  static instance(): Circle2d_IO;

  /**
   * Serialize Circle2d to plain object
   * @param entity - The circle entity to serialize
   * @param callback - Optional post-processing callback
   * @param includeMetadata - Whether to include metadata
   * @param options - Additional serialization options
   * @returns Serialized data array
   */
  dump(
    entity: Circle2d,
    callback?: (data: any[], entity: Circle2d) => void,
    includeMetadata?: boolean,
    options?: Record<string, any>
  ): any[];

  /**
   * Deserialize plain object to Circle2d
   * @param entity - The target circle entity
   * @param data - Serialized circle data
   * @param options - Additional deserialization options
   */
  load(
    entity: Circle2d,
    data: any,
    options?: Record<string, any>
  ): void;
}

/**
 * 2D circle curve entity
 * Represents a complete circular curve in 2D space
 */
export declare class Circle2d extends Curve2d {
  /**
   * Center point of the circle (uses THREE.Vector3 with z=0)
   * @decorator EntityField with point equality comparison
   */
  center: THREE.Vector3;

  /**
   * Radius of the circle
   * @decorator EntityField
   */
  radius: number;

  /** @internal */
  private __center: THREE.Vector3;
  
  /** @internal */
  private __radius: number;

  /**
   * Construct a new Circle2d
   * @param id - Optional entity identifier
   * @param parent - Optional parent entity
   */
  constructor(id?: string, parent?: Entity);

  /**
   * Factory method to create a Circle2d with specified geometry
   * @param center - Center point of the circle
   * @param radius - Radius of the circle
   * @returns New Circle2d instance
   */
  static create(center: THREE.Vector3, radius: number): Circle2d;

  /**
   * Get the topmost point on the circle (center.x, center.y + radius)
   */
  get topPoint(): Point2D;

  /**
   * Get the bottommost point on the circle (center.x, center.y - radius)
   */
  get bottomPoint(): Point2D;

  /**
   * Get the leftmost point on the circle (center.x - radius, center.y)
   */
  get leftPoint(): Point2D;

  /**
   * Get the rightmost point on the circle (center.x + radius, center.y)
   */
  get rightPoint(): Point2D;

  /**
   * Get discretized points along the circle perimeter
   */
  get discretePoints(): Point2D[];

  /**
   * Get geometry data: [center, radius] or empty array if invalid
   */
  get geometry(): Circle2dGeometry;

  /**
   * Get unique identifier key based on center and radius
   * Format: "Circle2d-{x}-{y}-{radius}" with 2 decimal precision
   */
  get key(): string;

  /**
   * Create a circular arc sub-curve between two parameters
   * @param startParam - Start parameter (0 to 1)
   * @param endParam - End parameter (0 to 1)
   * @param counterClockwise - Whether arc goes counter-clockwise
   * @returns CircleArc2d instance
   */
  createSubCurve(
    startParam: number,
    endParam: number,
    counterClockwise?: boolean
  ): CircleArc2d;

  /**
   * Generate discrete sample points along the circle
   * @returns Array of 2D points
   */
  getDiscretePoints(): Point2D[];

  /**
   * Recalculate bounding box based on circle extrema
   * @internal
   */
  protected refreshBoundInternal(): void;

  /**
   * Translate the circle by offset amounts
   * @param offsetX - X-axis offset
   * @param offsetY - Y-axis offset
   */
  offset(offsetX: number, offsetY: number): void;

  /**
   * Convert to THREE.js ArcCurve (full circle: 0 to 2π)
   * @returns THREE.ArcCurve instance
   */
  toTHREECurve(): THREE.ArcCurve;

  /**
   * Get tangent vector at parameter t
   * @param t - Parameter value between 0 and 1
   * @returns Tangent vector, or undefined if t is out of range
   */
  getTangent(t: number): HSCore.Util.Math.Vec2 | undefined;

  /**
   * Get the outer face that contains this circle
   * Logs warning if multiple outer wires found
   * @returns The parent Face2d, if unique
   */
  getOuterFace2D(): Face2d | undefined;

  /**
   * Get outer wire elements containing this circle
   * @returns Array of Wire2d instances
   */
  getOuterWires(): Wire2d[];

  /**
   * Handle field change notifications
   * @param fieldName - Name of changed field
   * @param newValue - New field value
   * @param oldValue - Previous field value
   * @internal
   */
  protected onFieldChanged(
    fieldName: string,
    newValue: any,
    oldValue: any
  ): void;

  /**
   * Validate circle data integrity
   * @returns Validation result
   */
  verify(): boolean;

  /**
   * Get the IO handler for this entity type
   * @returns Circle2d_IO singleton instance
   */
  getIO(): Circle2d_IO;
}