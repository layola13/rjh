/**
 * Baseboard module - Handles baseboard molding entities and their I/O operations
 * @module Baseboard
 */

import { WallMolding, WallMolding_IO } from './WallMolding';
import { MoldingTypeEnum } from './MoldingTypeEnum';
import { Entity } from './Entity';
import { Curve3d, Line3d, Arc3d, Vector3, MathAlg, Loader } from './Geometry';
import { EntityField } from './Decorators';
import { BaseboardTopoPather, BaseboardTopoPatherV120 } from './TopoPather';
import { Face } from './Face';
import { SweepPathRelationHandlers } from './Relations';
import { Logger } from './Logger';

/**
 * Represents a topological path segment for baseboard sweeping
 */
interface ITopoPatherDump {
  /** Index of the path segment */
  index: number | string;
  /** Whether this is an auxiliary path */
  isAux: boolean;
  /** Start parameter on the curve */
  from: number;
  /** End parameter on the curve */
  to: number;
  /** Serialized curve data */
  curve?: unknown;
  /** Legacy: Host face ID (pre-v1.3) */
  hostFaceId?: string;
  /** Legacy: Opening ID (pre-v1.3) */
  openingId?: string;
}

/**
 * Serialized baseboard data structure
 */
interface IBaseboardDump {
  /** Offset distance from wall surface */
  offset: number;
  /** Array of topological path segments */
  topoPathers: ITopoPatherDump[];
}

/**
 * Version information for backward compatibility
 */
interface ILoadContext {
  /** Document version string */
  version: string;
}

/**
 * Internal path sorting structure
 */
interface IPathSegment {
  /** Start point of the curve */
  start: Vector3;
  /** End point of the curve */
  end: Vector3;
  /** The 3D curve */
  curve: Curve3d;
}

/**
 * Input/Output handler for Baseboard entities
 * Manages serialization and deserialization of baseboard data
 */
export declare class Baseboard_IO extends WallMolding_IO {
  /**
   * Serializes a Baseboard entity to a plain object
   * @param entity - The baseboard entity to serialize
   * @param callback - Optional post-processing callback
   * @param includeMetadata - Whether to include metadata
   * @param options - Additional serialization options
   * @returns Array containing the serialized data
   */
  dump(
    entity: Baseboard,
    callback?: (result: unknown[], entity: Baseboard) => void,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserializes data into a Baseboard entity
   * @param entity - The target baseboard entity
   * @param data - The serialized baseboard data
   * @param context - Loading context with version information
   */
  load(entity: Baseboard, data: IBaseboardDump, context: ILoadContext): void;

  /**
   * Gets the singleton instance of the I/O handler
   */
  static instance(): Baseboard_IO;
}

/**
 * Baseboard molding entity
 * Represents a baseboard attached to walls with sweep paths along wall edges
 */
export declare class Baseboard extends WallMolding {
  /**
   * Molding type identifier (always Baseboard)
   */
  readonly type: MoldingTypeEnum.Baseboard;

  /**
   * Offset distance from the wall surface (positive = outward)
   */
  offset: number;

  /**
   * Array of topological path generators that define the baseboard sweep path
   */
  topoPathers: Array<BaseboardTopoPather | BaseboardTopoPatherV120>;

  /**
   * Creates a new Baseboard instance
   * @param id - Optional entity identifier
   * @param document - Optional parent document reference
   */
  constructor(id?: string, document?: unknown);

  /**
   * Gets the topological pather at the start of the baseboard
   * @returns The starting path segment, or undefined if not found
   */
  getStartTopoPather(): BaseboardTopoPather | BaseboardTopoPatherV120 | undefined;

  /**
   * Gets the topological pather at the end of the baseboard
   * @returns The ending path segment, or undefined if not found
   */
  getEndTopoPather(): BaseboardTopoPather | BaseboardTopoPatherV120 | undefined;

  /**
   * Splits the baseboard at a given point parameter
   * @param pointParam - The 3D point at which to split
   * @returns Array of resulting baseboard segments (empty if split fails)
   */
  split(pointParam: Vector3): Baseboard[];

  /**
   * Adds a new topological pather to the baseboard
   * @param pather - The path segment to add
   * @returns True if successfully added, false if path is invalid or discontinuous
   */
  addTopoPather(pather: BaseboardTopoPather | BaseboardTopoPatherV120): boolean;

  /**
   * Gets the I/O handler for this entity type
   * @returns The Baseboard_IO singleton instance
   */
  getIO(): Baseboard_IO;

  /**
   * Gets the computed sweep path (cached via relationship manager)
   * @returns Array of 3D curves representing the sweep path
   */
  get sweepPath(): Curve3d[];

  /**
   * Checks if the baseboard is inset into the wall (offset > tolerance)
   */
  get isInWall(): boolean;

  /**
   * Calculates the sweep path from topological pathers
   * @param applyOffset - Whether to apply the offset distance
   * @returns Array of 3D curves representing the sweep path
   */
  calcSweepPath(applyOffset?: boolean): Curve3d[];

  /**
   * Connects adjacent face paths at baseboard endpoints
   * @param paths - Input array of curve segments
   * @returns Extended array with connected neighboring paths
   */
  getConnectedPath(paths: Curve3d[]): Curve3d[];

  /**
   * Sorts and groups curve segments into continuous chains
   * @param curves - Array of curves to sort
   * @returns 2D array of grouped continuous curve chains
   */
  sortpaths(curves: Curve3d[]): Curve3d[][];

  /**
   * Validates that the baseboard has valid sweep paths
   * @returns False if baseboard should be removed (no valid paths on a Face parent)
   */
  existCheck(): boolean;

  /**
   * Creates a deep copy of this baseboard
   * @returns New Baseboard instance with copied properties
   */
  clone(): Baseboard;
}