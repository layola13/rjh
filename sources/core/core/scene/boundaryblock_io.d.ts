/**
 * BoundaryBlock module - Defines boundary blocks with pattern grids
 * @module BoundaryBlock_IO
 */

import type { MixBlock, MixBlock_IO } from './MixBlock';
import type { Entity } from './Entity';
import type { PatternGrid } from './PatternGrid';
import type { Pattern } from './Pattern';
import type { MixGrid } from './MixGrid';
import type { Point2D } from './Geometry';
import type { EntityEvent, EntityEventType } from './EntityEvent';

/**
 * Context for cloning operations
 */
export interface CloneContext {
  /** Dumped entity data by ID */
  data: Record<string, unknown>;
  /** Material data map */
  materialsData: Map<unknown, unknown>;
  /** Entity states */
  states: Record<string, unknown>;
  /** Constraints data */
  constraints: Record<string, unknown>;
  /** Entity instances */
  entities: Record<string, unknown>;
  /** Materials map */
  materials: Map<unknown, unknown>;
  /** Products map */
  productsMap: Map<unknown, unknown>;
  /** ID generator for cloning */
  idGenerator: unknown;
  /** Clone options */
  options: {
    /** Whether to ignore pattern during clone */
    ignorePattern: boolean;
  };
}

/**
 * Result of cloning dump data
 */
export interface ClonedDumpData {
  /** Array of dumped entity data */
  dumps: unknown[];
  /** Clone context */
  context: CloneContext;
}

/**
 * Options for dump operations
 */
export interface DumpOptions {
  /** Material data map */
  materialsData?: Map<unknown, unknown>;
  /** Products map */
  productsMap?: Map<unknown, unknown>;
  [key: string]: unknown;
}

/**
 * Options for load operations
 */
export interface LoadOptions {
  /** Whether to ignore patterns */
  ignorePattern?: boolean;
  [key: string]: unknown;
}

/**
 * Dumped entity data structure
 */
export interface DumpData {
  /** Entity ID */
  id: string;
  /** Associated grid ID */
  grid?: string;
  [key: string]: unknown;
}

/**
 * Callback for post-dump processing
 */
export type DumpCallback = (dumpData: DumpData[], entity: BoundaryBlock) => void;

/**
 * I/O handler for BoundaryBlock serialization and deserialization
 * Handles saving/loading of boundary blocks with pattern grids
 */
export declare class BoundaryBlock_IO extends MixBlock_IO {
  /** Singleton instance */
  private static _BoundaryBlock_IO_Instance?: BoundaryBlock_IO;

  /**
   * Gets the singleton instance of BoundaryBlock_IO
   * @returns The singleton instance
   */
  static instance(): BoundaryBlock_IO;

  /**
   * Serializes a BoundaryBlock to dump data
   * @param entity - The boundary block to serialize
   * @param callback - Optional callback for post-processing
   * @param includeChildren - Whether to include child entities
   * @param options - Additional dump options
   * @returns Array of serialized entity data
   */
  dump(
    entity: BoundaryBlock,
    callback?: DumpCallback,
    includeChildren?: boolean,
    options?: DumpOptions
  ): DumpData[];

  /**
   * Deserializes dump data into a BoundaryBlock
   * @param entity - The boundary block to populate
   * @param data - The serialized data
   * @param options - Load options
   */
  load(entity: BoundaryBlock, data: DumpData, options?: LoadOptions): void;
}

/**
 * Represents a boundary block with optional pattern grid
 * A boundary block defines a closed region with optional holes and pattern-based subdivision
 */
export declare class BoundaryBlock extends MixBlock {
  /**
   * The pattern grid associated with this boundary block
   * Manages pattern-based subdivision of the boundary region
   */
  grid?: PatternGrid;

  /**
   * The boundary points defining the outer perimeter
   * @internal
   */
  points: Point2D[];

  /**
   * Holes within the boundary (arrays of points)
   * @internal
   */
  holes: Point2D[][];

  /**
   * Original unmodified boundary points
   * @internal
   */
  originPoints: Point2D[];

  /**
   * The pattern template for this boundary
   * @internal
   */
  pattern?: Pattern;

  /** @internal */
  private __grid?: PatternGrid;

  /**
   * Creates a new BoundaryBlock
   * @param id - Optional entity ID
   * @param tag - Optional entity tag
   */
  constructor(id?: string, tag?: unknown);

  /**
   * Gets the I/O handler for this entity type
   * @returns The BoundaryBlock_IO instance
   */
  getIO(): BoundaryBlock_IO;

  /**
   * Verifies the integrity of the boundary block
   * Ensures the grid is properly registered as a child
   * @returns True if valid, false otherwise
   */
  verify(): boolean;

  /**
   * Prepares cloned dump data for this boundary block
   * Clones all patterns and generates new IDs
   * @returns Cloned dump data and context
   */
  getClonedDumpData(): ClonedDumpData;

  /**
   * Creates a deep clone of this boundary block
   * @returns A new BoundaryBlock instance with cloned data
   */
  clone(): BoundaryBlock;

  /**
   * Checks if this boundary block is part of a MixGrid
   * @returns True if parent is a MixGrid
   */
  partOfGrid(): boolean;

  /**
   * Factory method to create a boundary block from points
   * @param outerPoints - The outer boundary points
   * @param holes - Array of hole point arrays
   * @returns A new BoundaryBlock instance
   */
  static create(outerPoints: Point2D[], holes: Point2D[][]): BoundaryBlock;

  /**
   * Internal method to set the pattern grid
   * Manages parent-child relationships
   * @param grid - The pattern grid to set
   * @internal
   */
  _setGrid(grid: PatternGrid | undefined): void;

  /**
   * Checks if this boundary contains a parameter template
   * @returns True if a pattern is defined
   */
  containsParamTemplate(): boolean;

  /**
   * Checks if this boundary contains a pattern grid
   * @returns True if a grid is defined
   */
  containsGrid(): boolean;

  /**
   * Handles pattern dirty events
   * Propagates geometry/material changes to the grid
   * @param event - The entity event
   */
  onPatternDirty(event: EntityEvent): void;

  /**
   * Handles pattern reset events
   * Notifies the grid to reset based on pattern changes
   * @param event - The entity event
   */
  onPatternReset(event: EntityEvent): void;

  /**
   * Handles pattern reset override events
   * @param event - The entity event
   */
  onPatternResetOverride(event: EntityEvent): void;

  /**
   * Internal handler for pattern changes
   * Triggers grid regeneration or pattern migration
   * @internal
   */
  _onPatternChanged(): void;

  /**
   * Gets the inner boundary points
   * @returns The boundary points array
   */
  getInnerBoundaryPoints(): Point2D[];
}