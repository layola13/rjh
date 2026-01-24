/**
 * Module: GuideLine2d_IO
 * Provides I/O serialization and entity class for 2D guideline geometry
 */

import { Entity, Entity_IO } from './Entity';
import { EntityField } from './decorators';
import { Point2d } from './Point2d';
import { Line2d } from './Line2d';
import { Vec2 } from './Vec2';

/**
 * Serialization handler for GuideLine2d entities
 * Handles dumping and loading of guideline data including start/end point references
 */
export class GuideLine2d_IO extends Entity_IO {
  /**
   * Serialize a GuideLine2d entity to a dump format
   * @param entity - The GuideLine2d entity to serialize
   * @param callback - Optional callback to process the dump data
   * @param includeGeometry - Whether to include geometry data (default: true)
   * @param options - Additional serialization options
   * @returns Serialized dump data array
   */
  dump(
    entity: GuideLine2d,
    callback?: (dump: unknown[], entity: GuideLine2d) => void,
    includeGeometry?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserialize dump data into a GuideLine2d entity
   * @param entity - The target entity to populate
   * @param data - Serialized data containing line point IDs
   * @param options - Deserialization options
   */
  load(
    entity: GuideLine2d,
    data: { ln?: [number, number] },
    options?: Record<string, unknown>
  ): void;

  /**
   * Get singleton instance of GuideLine2d_IO
   */
  static instance(): GuideLine2d_IO;
}

/**
 * Represents a 2D guideline defined by two endpoints
 * Extends Entity with geometric properties for infinite or semi-infinite lines
 */
export class GuideLine2d extends Entity {
  /** Internal start point reference */
  private __start: Point2d;

  /** Internal end point reference */
  private __end: Point2d;

  /**
   * Start point of the guideline
   * Setting this updates child relationships
   */
  @EntityField({
    partialSet(value: Point2d): void;
  })
  start: Point2d;

  /**
   * End point of the guideline
   * Setting this updates child relationships
   */
  @EntityField({
    partialSet(value: Point2d): void;
  })
  end: Point2d;

  /**
   * Get array of defining points [start, end]
   */
  readonly points: [Point2d, Point2d];

  /**
   * Get directional vector from start to end
   */
  readonly direction: Vec2;

  /**
   * Alias for start point
   */
  from: Point2d;

  /**
   * Alias for end point
   */
  to: Point2d;

  /**
   * Create a new GuideLine2d from two coordinates
   * @param startCoord - Starting coordinate
   * @param endCoord - Ending coordinate
   * @returns New GuideLine2d instance with Point2d children
   */
  static create(startCoord: Vec2, endCoord: Vec2): GuideLine2d;

  /**
   * Internal method to set start point and update parent-child relationships
   * @param point - New start point
   */
  protected _setStart(point: Point2d): void;

  /**
   * Internal method to set end point and update parent-child relationships
   * @param point - New end point
   */
  protected _setEnd(point: Point2d): void;

  /**
   * Verify entity integrity
   * Checks that start and end are valid Point2d instances and proper children
   * @returns true if valid, false otherwise (logs errors)
   */
  verify(): boolean;

  /**
   * Get the I/O handler for this entity type
   * @returns GuideLine2d_IO singleton instance
   */
  getIO(): GuideLine2d_IO;

  /**
   * Handle field change notifications
   * Marks geometry as dirty when start/end points change
   * @param fieldName - Name of changed field
   * @param newValue - New field value
   * @param oldValue - Previous field value
   */
  onFieldChanged(
    fieldName: string,
    newValue: unknown,
    oldValue: unknown
  ): void;
}

/**
 * Register GuideLine2d class with the entity system
 * Associates HSConstants.ModelClass.GuideLine2d with GuideLine2d class
 */
declare module './Entity' {
  namespace Entity {
    function registerClass(
      modelClass: typeof HSConstants.ModelClass.GuideLine2d,
      entityClass: typeof GuideLine2d
    ): void;
  }
}