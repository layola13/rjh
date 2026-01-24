/**
 * EdgeOnLineAssociation module
 * 
 * This module defines an association that synchronizes edge endpoints with line geometry.
 * When computed, it updates the target's from/to points to match the entity's edge coordinates.
 * 
 * @module EdgeOnLineAssociation
 */

import { AssociationBase, Association } from './AssociationBase';

/**
 * Represents a 2D or 3D point with x, y coordinates.
 */
export interface Point {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Optional Z coordinate */
  z?: number;
  
  /**
   * Sets the point coordinates
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param z - Optional Z coordinate (undefined for 2D points)
   * @param notify - Whether to trigger change notifications
   */
  set(x: number, y: number, z: number | undefined, notify: boolean): void;
}

/**
 * Represents a line or edge entity with start and end points.
 */
export interface LineEntity {
  /** Starting point of the edge/line */
  from: Point;
  /** Ending point of the edge/line */
  to: Point;
}

/**
 * Association that maintains synchronization between an edge entity and a line target.
 * 
 * This association ensures that when computed, the target line's endpoints (from/to)
 * are updated to match the source edge entity's coordinates. The Z coordinate is
 * intentionally set to undefined, effectively projecting the edge onto a 2D plane.
 * 
 * @extends AssociationBase
 * 
 * @example
 *