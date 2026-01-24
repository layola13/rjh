import type { Vector } from './vector';
import type { Direction } from './direction';
import type { WinPolygon, PolyType } from './polygon';
import type { Edge } from './edge';

/**
 * Represents a hollow-sided polygon shape with configurable dimensions and direction.
 * Extends WinPolygon to provide specialized hollow side geometry.
 */
export declare class HollowSidePoly extends WinPolygon {
  /**
   * The center point of the hollow side polygon.
   */
  cpt: Vector;

  /**
   * The direction the hollow side faces (Down, Left, Up, or Right).
   */
  direction: Direction;

  /**
   * The width of the polygon (typically 2400 by default).
   */
  width: number;

  /**
   * The height of the polygon (typically 1600 by default).
   */
  height: number;

  /**
   * Creates a new HollowSidePoly instance.
   * 
   * @param centerPoint - The center point of the polygon
   * @param direction - The direction the hollow side faces (default: Direction.Right)
   * @param width - The width of the polygon (default: 2400)
   * @param height - The height of the polygon (default: 1600)
   * @param edges - Optional array of edges; if not provided, edges will be auto-generated
   */
  constructor(
    centerPoint: Vector,
    direction?: Direction,
    width?: number,
    height?: number,
    edges?: Edge[]
  );

  /**
   * Factory method to create edges for a hollow side polygon based on direction.
   * 
   * @param centerPoint - The center point where the polygon should be positioned
   * @param direction - The direction the hollow side faces
   * @param width - The width dimension of the polygon
   * @param height - The height dimension of the polygon
   * @returns An array of edges representing the hollow side polygon
   */
  static create(
    centerPoint: Vector,
    direction: Direction,
    width: number,
    height: number
  ): Edge[];

  /**
   * Scales the polygon by a given factor, adjusting width, height, and geometry.
   * 
   * @param factor - The scaling factor to apply
   * @returns The scaled polygon instance
   */
  scale(factor: number): this;

  /**
   * Serializes the polygon to a JSON-compatible object.
   * 
   * @returns A JSON representation including type, center point, and polygon data
   */
  toJSON(): {
    type: PolyType;
    cpt: Record<string, unknown>;
    [key: string]: unknown;
  };

  /**
   * Translates (moves) the polygon by a given vector offset.
   * 
   * @param offset - The vector by which to translate the polygon
   * @returns The translated polygon instance
   */
  translate(offset: Vector): this;

  /**
   * Rotates the polygon around a specified pivot point.
   * 
   * @param angle - The rotation angle (in radians or degrees depending on implementation)
   * @param pivot - The pivot point for rotation
   * @returns The rotated polygon instance
   */
  rotate(angle: number, pivot: Vector): this;

  /**
   * Creates a deep clone of the polygon.
   * 
   * @internal
   * @returns A new HollowSidePoly instance with cloned properties
   */
  protected _clone(): HollowSidePoly;
}