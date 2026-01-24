/**
 * Wire I/O Module
 * Handles serialization and deserialization of Wire entities
 */

import type { Entity, Entity_IO } from './Entity';
import type { Curve2d } from './Curve2d';
import type { CircleArc2d } from './CircleArc2d';
import type { Circle2d } from './Circle2d';
import type { Line2d } from './Line2d';
import type { Point2d } from './Point2d';
import type { Bound } from './Bound';

/**
 * Serialization options for entity I/O operations
 */
export interface SerializationOptions {
  /** ID generator for creating new unique identifiers */
  idGenerator?: {
    getNewId(oldId: string): string;
  };
  [key: string]: unknown;
}

/**
 * Dumped entity data structure
 */
export interface DumpedEntityData {
  /** Array of curve IDs */
  curves: string[];
  /** Mapping of curve IDs to their reverse flags */
  reverseFlags?: Record<string, boolean>;
  [key: string]: unknown;
}

/**
 * Bounding box coordinates
 */
export interface BoundingBox {
  /** Minimum X coordinate */
  minX: number;
  /** Maximum X coordinate */
  maxX: number;
  /** Minimum Y coordinate */
  minY: number;
  /** Maximum Y coordinate */
  maxY: number;
}

/**
 * I/O handler for Wire entities
 * Manages serialization and deserialization of wire data
 */
export declare class Wire_IO extends Entity_IO {
  private static _Wire_IO_instance?: Wire_IO;

  /**
   * Gets the singleton instance of Wire_IO
   */
  static instance(): Wire_IO;

  /**
   * Serializes a Wire entity to a data structure
   * @param entity - The Wire entity to serialize
   * @param callback - Optional callback to modify dumped data
   * @param includeChildren - Whether to include child entities
   * @param options - Serialization options
   * @returns Array containing the serialized entity data
   */
  dump(
    entity: Wire,
    callback?: (data: unknown[], entity: Wire) => void,
    includeChildren?: boolean,
    options?: SerializationOptions
  ): unknown[];

  /**
   * Deserializes data into a Wire entity
   * @param entity - The Wire entity to populate
   * @param data - The serialized data
   * @param options - Deserialization options
   */
  load(entity: Wire, data: DumpedEntityData, options?: SerializationOptions): void;
}

/**
 * Wire entity representing a closed or open path made of curves
 * A wire is a collection of connected curves with optional reverse flags
 */
export declare class Wire extends Entity {
  private __curves: Curve2d[];
  private __reverseFlags: Record<string, boolean>;

  /**
   * The curves that make up this wire
   */
  curves: Curve2d[];

  /**
   * Mapping of curve IDs to their reverse flags
   */
  reverseFlags: Record<string, boolean>;

  /**
   * Creates a new Wire instance
   * @param id - Optional unique identifier
   * @param tag - Optional tag for debugging
   */
  constructor(id?: string, tag?: string);

  /**
   * Creates a new Wire from a collection of curves
   * @param curves - Array of curves to form the wire
   * @returns A new Wire instance
   */
  static create(curves: Curve2d[]): Wire;

  /**
   * Sets the curves that make up this wire
   * @param curves - Array of curves
   * @param updateChildren - Whether to update child relationships
   */
  setCurves(curves: Curve2d[], updateChildren?: boolean): void;

  /**
   * Gets the key points of the wire path
   */
  get points(): (Point2d | undefined)[];

  /**
   * Gets discrete points along the wire including interpolated points
   */
  get discretePoints(): Point2d[];

  /**
   * Gets the bounding box of the wire
   */
  get bbx(): BoundingBox;

  /**
   * Sets the reverse flag for a specific curve
   * @param curve - The curve to set the reverse flag for
   * @param isReversed - Whether the curve should be reversed
   */
  setReverse(curve: Curve2d, isReversed: boolean): void;

  /**
   * Checks if a curve is reversed in this wire
   * @param curve - The curve to check
   * @returns True if the curve is reversed
   */
  isReversedCurve(curve: Curve2d): boolean;

  /**
   * Checks if a curve at a specific index is reversed
   * @param index - The index of the curve
   * @returns True if the curve is reversed
   */
  isReversed(index: number): boolean;

  /**
   * Gets the I/O handler for this entity
   */
  getIO(): Wire_IO;

  /**
   * Verifies the integrity of the wire
   * @returns True if the wire is valid
   */
  verify(): boolean;

  /**
   * Checks if this wire is the outer loop of its parent
   * @returns True if this is an outer loop
   */
  isOuter(): boolean;

  /**
   * Refreshes the internal bounding volume
   */
  refreshBoundInternal(): void;

  /**
   * Replaces a single curve with multiple curves
   * @param oldCurve - The curve to replace
   * @param newCurves - The curves to replace it with
   * @param updateChildren - Whether to update child relationships
   * @returns True if the replacement was successful
   */
  replaceCurveByCurves(
    oldCurve: Curve2d,
    newCurves: Curve2d[],
    updateChildren?: boolean
  ): boolean;

  /**
   * Gets discrete points along the wire path
   * @returns Array of 2D points
   */
  getDiscretePoints(): Point2d[];

  /**
   * Gets the path as an array of points
   * @returns Array of points defining the path
   */
  getPath(): (Point2d | undefined)[];

  /**
   * Checks if the wire contains any non-linear curves
   * @returns True if the wire includes arcs or circles
   */
  isIncludeNonLinearCurve(): boolean;

  /**
   * Automatically fixes reverse flags based on curve connectivity
   */
  fixReverse(): void;

  /**
   * Adds a child entity
   * @param child - The entity to add as a child
   * @param suppressEvent - Whether to suppress change events
   * @returns True if the child was added successfully
   */
  addChild(child: Entity, suppressEvent?: boolean): boolean;

  /**
   * Called when a field value changes
   * @param fieldName - Name of the changed field
   * @param newValue - New value
   * @param oldValue - Previous value
   */
  protected onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void;

  /**
   * Called when a child entity becomes dirty
   * @param child - The child entity that became dirty
   * @param dirtyFlag - The type of dirty flag
   */
  protected onChildDirty(child: Entity, dirtyFlag: unknown): void;

  /**
   * Called when a child entity is removed
   * @param child - The removed child entity
   */
  protected onChildRemoved(child: Entity): void;

  /**
   * Internal method to check if a curve is reversed by index
   * @param index - The index of the curve
   * @returns True if the curve is reversed
   */
  private _isReversedCurveByIndex(index: number): boolean;

  /**
   * Internal method to get points along the path
   * @returns Array of points
   */
  private _getPoints(): (Point2d | undefined)[];
}