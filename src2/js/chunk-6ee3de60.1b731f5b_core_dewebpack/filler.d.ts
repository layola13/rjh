/**
 * Filler shape class for handling filled polygon regions with hit testing and recycling capabilities.
 * @module Filler
 */

import { Shape } from './Shape';
import { Utils } from './Utils';
import { Matrix } from './Matrix';
import { Point } from './Point';
import { Polygon } from './Polygon';
import { Frame } from './Frame';
import { Layer } from './Layer';

/**
 * Represents a fillable shape with polygon-based hit testing and child shape management.
 * Extends the base Shape class with fill-specific functionality.
 */
export declare class Filler extends Shape {
  /**
   * Location or position identifier for the filler
   */
  where: unknown;

  /**
   * Collection of child/visual shapes contained within this filler
   */
  vshape: Shape[];

  /**
   * Reference to the top-level frame for matrix transformations
   */
  topFrame: Frame;

  /**
   * Polygon used for hit testing and bounds calculation
   */
  polygon: Polygon;

  /**
   * Creates a new Filler instance and adds it to a parent container.
   * 
   * @param parent - Parent container to add this filler to
   * @param shapeData - Configuration data for the shape
   * @param frameData - Frame configuration data
   * @param where - Location identifier for positioning
   */
  constructor(parent: unknown, shapeData: unknown, frameData: unknown, where: unknown);

  /**
   * Tests whether a given point intersects with this filler's polygon.
   * Applies parent transformation matrices before testing.
   * 
   * @param point - The point to test for intersection
   * @returns True if the point is contained within the transformed polygon
   */
  hitTest(point: Point): boolean;

  /**
   * Recycles this filler and optionally its child shapes, returning them to object pools.
   * Hides all child shapes, moves them to their respective layers, and clears the vshape array.
   * 
   * @param includeChildren - Whether to recycle child shapes (default: false)
   */
  recycle(includeChildren?: boolean): void;

  /**
   * Returns the current layer this shape belongs to.
   * @returns The layer instance
   */
  getLayer(): Layer;

  /**
   * Recycles shapes from a group back to their object pool.
   * @param shapes - Array of shapes to recycle
   */
  protected recycleFromGroup(shapes: Shape[]): void;
}