/**
 * PExtruding model and its I/O handler for geometric extrusion operations.
 * Manages 2D paths extruded along a height to create 3D geometry.
 */

import { PModel, PModel_IO, PModelValueProperties } from './PModel';
import { Entity } from './Entity';
import { Material } from './Material';
import { ArrayState } from './ArrayState';
import { PointState } from './PointState';
import { StateUtil } from './StateUtil';
import { defineFields } from './defineFields';

/**
 * Represents a 3D point with x, y, z coordinates.
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Represents a 2D path as an array of points.
 */
export type Path2D = Point3D[];

/**
 * Parameters for creating a PExtruding instance.
 */
export interface PExtrudingParameters {
  x?: number | null;
  y?: number | null;
  z?: number | null;
  paths?: Path2D[] | ArrayState[];
  height?: number;
}

/**
 * Options for loading state data.
 */
export interface LoadOptions {
  states?: Record<string, ArrayState>;
  statesData?: Record<string, unknown>;
}

/**
 * Serialized representation of PExtruding model.
 */
export interface PExtrudingData {
  height: string;
  paths?: string[];
  [key: string]: unknown;
}

/**
 * Bounding box information for 3D polygons.
 */
export interface BoundingBox3D {
  square: {
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    minZ: number;
    maxZ: number;
  };
  center: Point3D;
  XSize: number;
  YSize: number;
  ZSize: number;
}

/**
 * Update parameters for modifying PExtruding properties.
 */
export interface PExtrudingUpdate {
  height?: number;
  paths?: Path2D[] | ArrayState[];
}

/**
 * I/O handler for serializing and deserializing PExtruding models.
 */
export declare class PExtruding_IO extends PModel_IO {
  /**
   * Serializes a PExtruding model to a transferable format.
   * @param model - The PExtruding model to serialize
   * @param callback - Optional callback after serialization
   * @param includeMetadata - Whether to include metadata (default: true)
   * @param options - Additional serialization options
   * @returns Serialized model data tuple
   */
  dump(
    model: PExtruding,
    callback?: (data: [PExtrudingData, ...unknown[]], model: PExtruding) => void,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): [PExtrudingData, ...unknown[]];

  /**
   * Deserializes data into a PExtruding model.
   * @param model - Target model to load data into
   * @param data - Serialized model data
   * @param options - Load options including state references
   */
  load(model: PExtruding, data: PExtrudingData, options?: LoadOptions): void;
}

/**
 * PExtruding model representing a 3D extrusion from 2D paths.
 * Supports multiple closed paths extruded along a specified height.
 */
export declare class PExtruding extends PModel {
  /** Internal state for extrusion height */
  private __height: { id: string; __value: number; verify: () => boolean; bindObjectFieldChanged: (obj: unknown, field: string) => void };
  
  /** Internal state for extrusion paths */
  private __paths: ArrayState[];
  
  /** Internal direction vector for extrusion */
  private _direction?: Point3D;

  /**
   * Creates a new PExtruding instance.
   * @param id - Optional unique identifier
   * @param parent - Optional parent model
   */
  constructor(id?: string, parent?: unknown);

  /**
   * Gets the extrusion height value.
   */
  get height(): number;

  /**
   * Sets the extrusion height value.
   */
  set height(value: number);

  /**
   * Gets the extrusion paths.
   */
  get paths(): ArrayState[];

  /**
   * Sets the extrusion paths from various input formats.
   */
  set paths(value: ArrayState[] | Path2D[] | Point3D[][]);

  /**
   * Creates a PExtruding instance from configuration data.
   * @param config - Configuration object with localId, material, and parameters
   * @returns New PExtruding instance
   */
  static create(config: {
    localId: string;
    material: unknown;
    parameters?: PExtrudingParameters;
  }): PExtruding;

  /**
   * Defines computed value properties for the model.
   * Provides access to inherited PModel properties with state binding.
   */
  defineValueProperties(): void;

  /**
   * Verifies the integrity of the model data.
   * Checks height and paths validity.
   * @returns True if model is valid, false otherwise
   */
  verify(): boolean;

  /**
   * Gets the I/O handler for this model type.
   * @returns Singleton PExtruding_IO instance
   */
  getIO(): PExtruding_IO;

  /**
   * Updates model properties.
   * @param updates - Object containing properties to update
   */
  update(updates: PExtrudingUpdate): void;

  /**
   * Checks if content is within a specified room.
   * @param room - Room to check against
   * @param strict - Whether to use strict containment check
   * @returns True if content is in room
   */
  isContentInRoom(room: unknown, strict?: boolean): boolean;

  /**
   * Checks if content is within a specified loop.
   * @param loop - Loop to check against
   * @param strict - Whether to use strict containment check
   * @returns True if content is in loop
   */
  isContentInLoop(loop: unknown, strict?: boolean): boolean;

  /**
   * Refreshes internal bounding box calculations.
   * Updates outline and boundInternal based on top paths.
   */
  refreshBoundInternal(): void;

  /**
   * Handles field change notifications.
   * Marks geometry dirty when paths or height change.
   * @param fieldName - Name of changed field
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * Gets all paths as arrays of 3D points.
   * @returns Array of paths
   */
  getPaths(): Path2D[];

  /**
   * Gets the top-facing paths, accounting for extrusion direction.
   * @returns Array of top paths adjusted for direction
   */
  getTopPaths(): Path2D[];

  /**
   * Iterates over all state objects in paths.
   * @param callback - Function to call for each state
   */
  forEachState(callback: (state: PointState | ArrayState) => void): void;

  /**
   * Iterates over all path children in the parent model.
   * @param callback - Function to call for each path child
   */
  forEachPath(callback: (child: unknown) => void): void;

  /**
   * Sets the extrusion direction vector.
   * Invalidates subgraph after direction change.
   * @param direction - New direction vector
   */
  setDirection(direction: Point3D): void;

  /**
   * Calculates 3D bounding box for a polygon path.
   * @param path - Array of 3D points forming the polygon
   * @returns Bounding box information or undefined if invalid
   */
  private _getPolygonBoundingBox3d(path: Path3D): BoundingBox3D | undefined;
}

/**
 * Registers the PExtruding class with the entity system.
 */
declare module 'HSConstants' {
  export enum ModelClass {
    NgPExtruding = 'NgPExtruding'
  }
}