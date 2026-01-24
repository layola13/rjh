/**
 * Curve2d Input/Output handler and base Curve2d entity class
 * Handles serialization/deserialization of 2D curve geometry entities
 * 
 * @module Curve2d_IO
 * @packageDocumentation
 */

import { Entity, Entity_IO } from './Entity';
import { Wire } from './Wire';
import { Polygon } from './Polygon';
import { Curve as THREECurve } from 'three';

/**
 * Serialization handler for Curve2d entities
 * Manages dumping and loading of 2D curve data to/from storage format
 * 
 * @remarks
 * Implements singleton pattern for efficient resource usage
 */
export class Curve2d_IO extends Entity_IO {
  private static _Curve2d_IO_instance?: Curve2d_IO;

  /**
   * Gets the singleton instance of Curve2d_IO
   * 
   * @returns The shared Curve2d_IO instance
   */
  static instance(): Curve2d_IO;

  /**
   * Serializes a Curve2d entity to a storage format
   * 
   * @param entity - The Curve2d entity to serialize
   * @param callback - Optional callback to process dumped data
   * @param includeMetadata - Whether to include metadata in output
   * @param options - Additional serialization options
   * @returns Serialized representation of the curve
   */
  dump(
    entity: Curve2d,
    callback?: (data: unknown[], entity: Curve2d) => void,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserializes storage data into a Curve2d entity
   * 
   * @param entity - The target Curve2d entity to populate
   * @param data - Serialized curve data
   * @param options - Deserialization options
   */
  load(
    entity: Curve2d,
    data: {
      isbk?: boolean;
      isbackground?: boolean;
      [key: string]: unknown;
    },
    options?: Record<string, unknown>
  ): void;
}

/**
 * Base class for all 2D curve entities
 * Represents geometric curves in 2D space that can be part of wires and polygons
 * 
 * @remarks
 * This is an abstract base class. Concrete curve types (Line, Arc, etc.) 
 * should extend this class and implement required abstract methods.
 */
export class Curve2d extends Entity {
  /**
   * Internal flag indicating if this curve is a background element
   * Background curves are typically non-interactive or decorative
   * 
   * @internal
   */
  private __isbackground: boolean;

  /**
   * Decorated field for background state persistence
   * Automatically serialized/deserialized by EntityField decorator
   */
  isbackground: boolean;

  /**
   * Creates a new Curve2d instance
   * 
   * @param id - Unique identifier for the curve entity
   * @param type - Type descriptor for the curve subclass
   */
  constructor(id?: string, type?: unknown);

  /**
   * Gets the start point of the curve
   * 
   * @returns The curve's starting point
   */
  get from(): unknown;

  /**
   * Gets the end point of the curve
   * 
   * @returns The curve's ending point
   */
  get to(): unknown;

  /**
   * Gets the tangent direction of the curve
   * 
   * @returns The curve's direction vector
   */
  get direction(): unknown;

  /**
   * Gets the unique key identifying this curve's geometry
   * Used for caching and comparison operations
   * 
   * @returns A string key representing the curve's geometric properties
   */
  get key(): string;

  /**
   * Converts this curve to a THREE.js Curve object for rendering
   * 
   * @remarks
   * This method should be overridden by concrete curve implementations.
   * Base implementation logs an error if called directly.
   * 
   * @returns A THREE.js Curve representation
   */
  toTHREECurve(): THREECurve<unknown>;

  /**
   * Creates a sub-curve from this curve between two parameters
   * 
   * @param startParam - Starting parameter (typically 0-1)
   * @param endParam - Ending parameter (typically 0-1)
   * @returns A new Curve2d representing the sub-curve, or null if not possible
   */
  createSubCurve(startParam: number, endParam: number): Curve2d | null;

  /**
   * Checks if this curve is marked as a background element
   * 
   * @returns True if curve is a background element
   */
  isBackground(): boolean;

  /**
   * Gets the IO handler for this curve type
   * 
   * @returns The Curve2d_IO singleton instance
   */
  getIO(): Curve2d_IO;

  /**
   * Gets all outer wires that contain this curve
   * Outer wires represent the external boundaries of polygons
   * 
   * @returns Array of Wire entities marked as outer boundaries
   */
  getOuterWires(): Wire[];

  /**
   * Legacy property for accessing THREE.js curve representation
   * 
   * @deprecated Use toTHREECurve() instead
   * @returns A THREE.js Curve representation
   */
  get threeCurve(): THREECurve<unknown>;

  /**
   * Gets all polygons that reference this curve
   * Traverses parent wires to find containing polygons
   * 
   * @returns Set of unique Polygon entities containing this curve
   */
  getPolygons(): Set<Polygon>;

  /**
   * Handles notification when a child entity becomes dirty
   * Propagates geometry invalidation up the hierarchy
   * 
   * @param child - The child entity that became dirty
   * @param changeType - Type of change that occurred
   */
  onChildDirty(child: Entity, changeType: unknown): void;

  /**
   * Verifies the integrity of this curve entity
   * Checks that the curve has valid parent Wire relationships
   * 
   * @returns True if curve passes validation checks
   */
  verify(): boolean;

  /**
   * Generates discretized points along an arc
   * Helper method for arc tessellation
   * 
   * @param arcParams - Parameters defining the arc geometry
   * @param segmentCount - Number of line segments to generate
   * @returns Array of points along the arc
   */
  getArcPoints(arcParams: unknown, segmentCount: number): unknown[];
}