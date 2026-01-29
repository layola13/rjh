/**
 * Module: BlockGroup
 * Manages grouping and merging of blocks in a paving pattern system
 */

import { Box2, Vector2, Matrix3 } from './geometry';

/**
 * Represents a brick's geometric properties within a pattern
 */
interface BrickProperties {
  /** Outline points of the brick */
  outer: number[];
  /** Bounding box of the brick */
  bbox: Box2;
  /** Center of mass position */
  mass: Vector2;
}

/**
 * Represents a block with paving information
 */
interface Block {
  /** Unique local identifier */
  localId: string | number;
  /** Array of points defining the block shape */
  points: number[];
  /** Rotation angle in radians */
  rotation: number;
  /** Reference to the parent pattern */
  pattern: Pattern;
  /** Paving options including offset point */
  pavingOption: {
    point: Vector2;
  };
}

/**
 * Pattern interface with anchor points and child elements
 */
interface Pattern {
  /** Anchor points defining pattern alignment */
  anchorPoints: {
    anchorPoint1: { x: number; y: number };
    anchorPoint2: { x: number; y: number };
    basePoint1: { x: number; y: number };
    basePoint2: { x: number; y: number };
  };
  /** Iterates over child bricks in the pattern */
  forEachChild(callback: (brick: Brick) => void): void;
}

/**
 * Represents a brick element within a pattern
 */
interface Brick {
  /** Unique local identifier */
  localId: string | number;
  /** Gets the paint outline points */
  getPaintOutline(): number[];
}

/**
 * Caches geometric properties of a pattern and its bricks
 */
declare class PatternCache {
  /** Map of brick local IDs to their properties */
  readonly brickMap: Map<string | number, BrickProperties>;
  
  /** Outline points of all bricks combined */
  readonly outer: number[];
  
  /** Bounding box encompassing all bricks */
  readonly bbox: Box2;
  
  /** Reference to the source pattern */
  readonly pattern: Pattern;
  
  /** First basis vector for pattern alignment */
  readonly u: Vector2;
  
  /** Second basis vector for pattern alignment */
  readonly v: Vector2;

  /**
   * Creates a pattern cache from a pattern definition
   * @param pattern - The pattern to cache
   */
  constructor(pattern: Pattern);

  /**
   * Computes the global paving point for a block
   * @param block - The block to compute for
   * @param bbox - Optional pre-computed bounding box
   * @returns The global paving point adjusted by mass center
   */
  computeGlobalPavingPoint(block: Block, bbox?: Box2): Vector2;

  /**
   * Computes the local paving point relative to block's bounding box
   * @param block - The block to compute for
   * @returns The local paving point
   */
  computeLocalPavingPoint(block: Block): Vector2;
}

/**
 * Groups blocks that share the same pattern and rotation
 * Manages merging logic based on geometric constraints
 */
export declare class BlockGroup {
  /** Blocks belonging to this group */
  readonly blocks: Block[];
  
  /** Maps local IDs to mass center positions */
  readonly localIdToMassMap: Map<string | number, Vector2>;
  
  /** Cached pattern geometry */
  readonly patternCache: PatternCache;
  
  /** Transformed first basis vector */
  readonly u: Vector2;
  
  /** Transformed second basis vector */
  readonly v: Vector2;

  /**
   * Creates a block group with initial block
   * @param initialBlock - First block in the group
   * @param patternCache - Cached pattern geometry
   * @param massCenter - Mass center of the initial block
   */
  constructor(initialBlock: Block, patternCache: PatternCache, massCenter: Vector2);

  /**
   * Computes the mass center (reference point) for a block
   * @param block - The block to compute for
   * @returns The mass center position
   */
  static getBlockMass(block: Block): Vector2;

  /**
   * Checks if a block can be merged into this group
   * Validates if the mass center aligns with the pattern grid
   * @param block - The block to test
   * @param massCenter - Mass center of the block
   * @returns True if the block fits the pattern grid
   */
  canMerge(block: Block, massCenter: Vector2): boolean;

  /**
   * Attempts to merge a block into this group
   * @param block - The block to merge
   * @param massCenter - Mass center of the block
   * @returns True if merge succeeded
   */
  merge(block: Block, massCenter: Vector2): boolean;
}

/**
 * Manages multiple block groups organized by pattern and rotation
 * Provides efficient merging of blocks into appropriate groups
 */
export declare class BlockGroupMap {
  /** Maps patterns to rotation-keyed group arrays */
  private readonly patToRotGroupMap: Map<Pattern, Map<number, BlockGroup[]>>;
  
  /** Maps patterns to cached geometry */
  private readonly _patToCacheMap: Map<Pattern, PatternCache>;

  /**
   * Creates an empty block group map
   */
  constructor();

  /**
   * Merges a block into an existing group or creates a new group
   * Organizes groups by pattern and rotation for efficient lookup
   * @param block - The block to merge
   */
  mergeBlock(block: Block): void;

  /**
   * Retrieves or creates a pattern cache
   * @param pattern - The pattern to cache
   * @returns The pattern cache instance
   */
  getPatternCache(pattern: Pattern): PatternCache;
}