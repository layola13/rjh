/**
 * Grid and Grid_IO module for managing free patterns and gusset blocks
 * @module Grid_IO
 */

import { Entity, Entity_IO } from './Entity';
import { Signal } from './Signal';

/**
 * Serialization/Deserialization handler for Grid entities
 */
export class Grid_IO extends Entity_IO {
  private static _Grid_IO_instance?: Grid_IO;

  /**
   * Returns the singleton instance of Grid_IO
   */
  static instance(): Grid_IO;

  /**
   * Serializes a Grid entity to a dumpable format
   * @param entity - The Grid entity to serialize
   * @param callback - Optional callback invoked after serialization
   * @param includeChildren - Whether to include child entities
   * @param options - Additional serialization options
   * @returns Array of serialized data
   */
  dump(
    entity: Grid,
    callback?: (dump: unknown[], entity: Grid) => void,
    includeChildren?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserializes data into a Grid entity
   * @param entity - The Grid entity to populate
   * @param data - Serialized data to load
   * @param options - Deserialization options
   */
  load(
    entity: Grid,
    data: GridDumpData,
    options?: Record<string, unknown>
  ): void;
}

/**
 * Data structure for Grid serialization
 */
interface GridDumpData {
  /** IDs of free patterns associated with the grid */
  freePatterns?: string[];
  [key: string]: unknown;
}

/**
 * Pattern entity that can be placed freely on the grid
 */
interface FreePattern {
  /** Unique identifier for the pattern */
  id: string;
  
  /**
   * Serializes the pattern to a dumpable format
   */
  dump(
    callback?: unknown,
    includeChildren?: boolean,
    options?: Record<string, unknown>
  ): unknown[];
}

/**
 * Block that contains a free pattern placement
 */
interface FreePatternBlock extends Entity {
  /** The pattern contained in this block */
  pattern: FreePattern;
}

/**
 * Specialized block representing a gusset (reinforcement piece)
 */
interface GussetBlock extends FreePatternBlock {}

/**
 * Grid entity that manages collections of free pattern blocks
 */
export class Grid extends Entity {
  private _freePatterns: Record<string, FreePattern>;
  private _freePatternBlocks: FreePatternBlock[];

  /** Signal emitted when a free pattern block is added */
  readonly signalFreePatternBlockAdded: Signal<Grid>;
  
  /** Signal emitted when a free pattern block is removed */
  readonly signalFreePatternBlockRemoved: Signal<Grid>;

  /** Collection of all free pattern blocks in the grid */
  freePatternBlocks: FreePatternBlock[];

  /**
   * Creates a new Grid instance
   * @param id - Optional unique identifier
   * @param parent - Optional parent entity
   */
  constructor(id?: string, parent?: Entity);

  /**
   * Internal method to update the collection of free pattern blocks
   * @param blocks - New array of free pattern blocks
   */
  private _setFreePatternBlocks(blocks: FreePatternBlock[]): void;

  /**
   * Gets all free patterns indexed by their IDs
   * @returns Dictionary of patterns keyed by ID
   */
  get freePatterns(): Record<string, FreePattern>;

  /**
   * Adds a free pattern block to the grid
   * @param block - The block to add
   */
  addFreePatternBlock(block: FreePatternBlock): void;

  /**
   * Removes a free pattern block from the grid
   * @param block - The block to remove
   */
  removeFreePatternBlock(block: FreePatternBlock): void;

  /**
   * Gets all gusset blocks in the grid
   * @returns Array of gusset blocks
   */
  get gussetBlocks(): GussetBlock[];

  /**
   * Checks if the grid contains any gusset blocks
   * @returns True if gusset blocks exist
   */
  hasGussetBlocks(): boolean;

  /**
   * Returns the I/O handler for this entity type
   */
  getIO(): Grid_IO;

  /**
   * Validates the grid state
   * @returns True if valid
   */
  isValid(): boolean;

  /**
   * Verifies the result of a clone operation
   * @param clonedEntity - The cloned entity to check
   */
  checkClonedResult(clonedEntity: Grid): void;
}