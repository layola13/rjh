/**
 * Module: Cornice
 * Defines cornice (crown molding) entities and their I/O operations.
 */

import { WallMolding, WallMolding_IO } from './WallMolding';
import { MoldingTypeEnum } from './MoldingTypeEnum';
import { Entity } from './Entity';
import { Loader, Matrix4, Vector2, Vector3 } from './Geometry';
import { CorniceTopoPather } from './CorniceTopoPather';
import { CorniceTopoPatherV120 } from './CorniceTopoPatherV120';
import { Logger } from './Logger';
import { SweepPathRelationHandlers } from './SweepPathRelationHandlers';

/**
 * Represents a topological path segment for cornice molding.
 */
export interface TopoPather {
  /** Index of this path segment */
  index: number;
  /** Whether this is an auxiliary path */
  isAux: boolean;
  /** Start parameter */
  from: number;
  /** End parameter */
  to: number;
  /** Gets the sweep path curve */
  getSweepPath(): Curve | null;
  /** Splits the path by given points */
  splitByPoints(points: Vector3[]): TopoPather[];
  /** Serializes the path to JSON */
  dump(): TopoPatherDump;
}

/**
 * Serialized representation of a TopoPather.
 */
export interface TopoPatherDump {
  /** Host face identifier (legacy v1.2) */
  hostFaceId?: string;
  /** Segment index */
  index: number | string;
  /** Whether this is an auxiliary path */
  isAux: boolean;
  /** Start parameter */
  from: number;
  /** End parameter */
  to: number;
  /** Serialized curve data */
  curve?: unknown;
}

/**
 * Serialized representation of a Cornice entity.
 */
export interface CorniceDump {
  /** Array of topological path segments */
  topoPathers: TopoPatherDump[];
  /** Vertical offset distance from base plane */
  offset: number;
  /** Whether to automatically fit to walls */
  autoFit: boolean;
}

/**
 * Load context containing version information.
 */
export interface LoadContext {
  /** Document version string */
  version: string;
}

/**
 * Geometric curve interface.
 */
export interface Curve {
  /** Gets the start point of the curve */
  getStartPt(): Vector3;
  /** Gets the end point of the curve */
  getEndPt(): Vector3;
  /** Gets the parameter value at a given point */
  getParamAt(point: Vector3): number;
  /** Gets the start parameter */
  getStartParam(): number;
  /** Gets the end parameter */
  getEndParam(): number;
  /** Transforms the curve by a matrix */
  transform(matrix: Matrix4): void;
  /** Checks if two points are equal */
  equals(other: Vector3): boolean;
}

/**
 * Relationship manager interface for managing entity relationships.
 */
export interface RelationshipManager {
  /** Gets the sweep path relation handler */
  getSweepPathRelation(): SweepPathRelation;
}

/**
 * Sweep path relation interface.
 */
export interface SweepPathRelation {
  /** Gets cached data for an entity */
  getData(entity: Cornice): Curve[] | null;
}

/**
 * Document interface containing relationship management.
 */
export interface Document {
  /** Manages entity relationships */
  relationshipManager: RelationshipManager;
}

/**
 * Path segment with start/end points and curve.
 */
interface PathSegment {
  /** Start point */
  start: Vector3;
  /** End point */
  end: Vector3;
  /** Associated curve */
  curve: Curve;
}

/**
 * I/O handler for serializing and deserializing Cornice entities.
 */
export declare class Cornice_IO extends WallMolding_IO {
  /**
   * Serializes a Cornice entity to JSON.
   * @param entity - The cornice entity to serialize
   * @param callback - Optional callback for post-processing
   * @param includeGeometry - Whether to include geometry data
   * @param options - Additional serialization options
   * @returns Serialized entity data
   */
  dump(
    entity: Cornice,
    callback?: (result: unknown[], entity: Cornice) => void,
    includeGeometry?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserializes a Cornice entity from JSON.
   * @param entity - The target entity to populate
   * @param data - Serialized cornice data
   * @param context - Load context with version info
   */
  load(entity: Cornice, data: CorniceDump, context: LoadContext): void;

  /**
   * Gets the singleton instance of the I/O handler.
   */
  static instance(): Cornice_IO;
}

/**
 * Cornice (crown molding) entity that follows wall-ceiling intersections.
 * Extends WallMolding with topological path management and offset support.
 */
export declare class Cornice extends WallMolding {
  /** Type identifier for this molding */
  readonly type: MoldingTypeEnum.Cornice;

  /** Array of topological path segments defining the molding path */
  topoPathers: TopoPather[];

  /** Vertical offset distance from the base plane (in world units) */
  offset: number;

  /** Whether to automatically fit the cornice to wall geometry */
  autoFit: boolean;

  /** Reference to the containing document */
  doc: Document;

  /**
   * Creates a new Cornice instance.
   * @param id - Optional entity identifier
   * @param doc - Optional document reference
   */
  constructor(id?: string, doc?: Document);

  /**
   * Creates a deep copy of this cornice.
   * @returns Cloned cornice entity
   */
  clone(): Cornice;

  /**
   * Gets the I/O handler for this entity type.
   * @returns Cornice I/O handler instance
   */
  getIO(): Cornice_IO;

  /**
   * Checks if another entity is the same type of molding.
   * @param other - Entity to compare
   * @returns True if the same molding type
   */
  isSameMolding(other: Entity): boolean;

  /**
   * Gets the topological pather at the start of the sweep path.
   * @returns First matching path segment or undefined
   */
  getStartTopoPather(): TopoPather | undefined;

  /**
   * Gets the topological pather at the end of the sweep path.
   * @returns Last matching path segment or undefined
   */
  getEndTopoPather(): TopoPather | undefined;

  /**
   * Splits the cornice at a given point.
   * @param point - 3D point where to split the cornice
   * @returns Array of resulting cornice segments (empty if split fails)
   */
  split(point: Vector3): Cornice[];

  /**
   * Adds a new topological path segment to this cornice.
   * @param pather - Path segment to add
   * @returns True if successfully added, false if invalid or discontinuous
   */
  addTopoPather(pather: TopoPather): boolean;

  /**
   * Gets the computed sweep path for this cornice.
   * Returns cached data if available, otherwise calculates it.
   */
  get sweepPath(): Curve[];

  /**
   * Calculates the sweep path from topological pathers.
   * Applies offset transformation if needed.
   * @returns Array of connected curve segments
   */
  calcSweepPath(): Curve[];

  /**
   * Sorts and connects path segments into continuous chains.
   * @param curves - Array of curve segments to sort
   * @returns Array of connected path chains
   */
  sortpaths(curves: Curve[]): Curve[][];

  /**
   * Called when a field value changes.
   * @param fieldName - Name of the changed field
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * Marks the geometry as needing recalculation.
   */
  protected dirtyGeometry(): void;

  /**
   * Copies properties from another cornice.
   * @param source - Source cornice to copy from
   */
  protected _copyFrom(source: Cornice): void;
}