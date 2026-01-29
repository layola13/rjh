/**
 * Module: MixBlock_IO
 * 
 * Defines mixed block geometries that can contain multiple paint regions or extensions.
 * Supports complex polygon shapes with holes and transformation operations.
 */

/**
 * Enumeration of grid types for mixed blocks
 */
export enum GridTypeEnum {
  /** Mixed paint region type */
  MixedPaint = "mixedPaint",
  /** Extended paint region type */
  ExtPaint = "extPaint"
}

/**
 * 2D point coordinate interface
 */
export interface Point2D {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Bounding box interface
 */
export interface BoundingBox {
  /** Minimum X coordinate */
  x: number;
  /** Maximum X coordinate */
  x2: number;
  /** Minimum Y coordinate */
  y: number;
  /** Maximum Y coordinate */
  y2: number;
}

/**
 * Transformation matrix for 2D affine transformations
 */
export interface TransformMatrix {
  /** Matrix element [0,0] - X scale */
  m00_: number;
  /** Matrix element [0,1] - X shear */
  m01_: number;
  /** Matrix element [0,2] - X translation */
  m02_: number;
  /** Matrix element [1,0] - Y shear */
  m10_: number;
  /** Matrix element [1,1] - Y scale */
  m11_: number;
  /** Matrix element [1,2] - Y translation */
  m12_: number;
}

/**
 * Serialization/deserialization options
 */
export interface IOOptions {
  [key: string]: unknown;
}

/**
 * Callback for post-dump processing
 */
export type DumpCallback<T> = (dumped: T[], source: MixBlock) => void;

/**
 * IO handler for MixBlock serialization and deserialization.
 * Extends Shape_IO to handle block-specific point data.
 */
export declare class MixBlock_IO extends HSCore.IO.Shape_IO {
  /**
   * Singleton instance accessor
   * @returns The singleton MixBlock_IO instance
   */
  static instance(): MixBlock_IO;

  /**
   * Serialize a MixBlock instance to a plain object
   * 
   * @param entity - The MixBlock entity to serialize
   * @param callback - Optional callback for post-processing
   * @param deep - Whether to perform deep cloning (default: true)
   * @param options - Additional serialization options
   * @returns Array containing serialized data
   */
  dump<T = any>(
    entity: MixBlock,
    callback?: DumpCallback<T>,
    deep?: boolean,
    options?: IOOptions
  ): T[];

  /**
   * Deserialize plain object data into a MixBlock instance
   * 
   * @param entity - The target MixBlock entity to populate
   * @param data - The serialized data to load
   * @param options - Additional deserialization options
   */
  load(entity: MixBlock, data: any, options?: IOOptions): void;
}

/**
 * Mixed block shape entity representing complex polygon regions.
 * Supports holes, transformations, and geometric operations.
 */
export declare class MixBlock extends HSCore.Model.Shape {
  /**
   * Internal storage for polygon points
   * @private
   */
  private __points: Point2D[];

  /**
   * Internal storage for hole polygons
   * @private
   */
  private __holes: Point2D[][];

  /**
   * Original untransformed points for reference
   */
  originPoints: Point2D[];

  /**
   * Constructor
   * @param id - Optional entity identifier
   * @param parent - Optional parent entity
   */
  constructor(id?: string, parent?: any);

  /**
   * Factory method to create a MixBlock from point arrays
   * 
   * @param points - Array of points defining the outer boundary
   * @param holes - Optional array of hole polygons (default: [])
   * @returns A new MixBlock instance
   */
  static create(points: Point2D[], holes?: Point2D[][]): MixBlock;

  /**
   * Get the IO handler for this entity type
   * @returns The MixBlock_IO singleton instance
   */
  getIO(): MixBlock_IO;

  /**
   * Current polygon points defining the outer boundary
   */
  points: Point2D[];

  /**
   * Array of hole polygons (each hole is an array of points)
   */
  holes: Point2D[][];

  /**
   * Get the closed path by ensuring first and last points match
   * @returns Array of points forming a closed polygon
   */
  get closedPath(): Point2D[];

  /**
   * Check if this block is part of a MixGrid parent
   * @returns True if parent is a MixGrid instance
   */
  partOfGrid(): boolean;

  /**
   * Translate all points by the given offset
   * 
   * @param deltaX - X-axis offset
   * @param deltaY - Y-axis offset
   */
  offset(deltaX: number, deltaY: number): void;

  /**
   * Apply an affine transformation to all points and holes
   * 
   * @param matrix - Transformation matrix to apply
   * @returns This instance for chaining
   */
  transform(matrix: TransformMatrix): this;

  /**
   * Calculate the axis-aligned bounding box
   * @returns Bounding box coordinates
   */
  bounding(): BoundingBox;

  /**
   * Get the complete path including outer boundary and holes
   * @returns Array where first element is outer points, rest are holes
   */
  getPath(): Point2D[][];

  /**
   * Get discretized path representation
   * @returns Array of point arrays
   */
  getDiscretePath(): Point2D[][];

  /**
   * Get discretized outer boundary points
   * @returns Array of points
   */
  getDiscretePoints(): Point2D[];

  /**
   * Get simplified outer boundary points
   * Uses collision utility to simplify the polygon while preserving shape
   * @returns Array of simplified points
   */
  getOuterPoints(): Point2D[];

  /**
   * Convert to a simple polygon representation
   * @returns Copy of the points array
   */
  toPolygon(): Point2D[];

  /**
   * Deep copy properties from another MixBlock
   * @param source - The source MixBlock to copy from
   */
  copyFrom(source: MixBlock): void;

  /**
   * Create a deep clone of this MixBlock
   * @returns A new MixBlock instance with copied data
   */
  clone(): MixBlock;

  /**
   * Hook called when entity fields are modified
   * Marks geometry as dirty when points or holes change
   * 
   * @param fieldName - Name of the changed field
   * @param newValue - New field value
   * @param oldValue - Previous field value
   */
  protected onFieldChanged(fieldName: string, newValue: any, oldValue: any): void;
}