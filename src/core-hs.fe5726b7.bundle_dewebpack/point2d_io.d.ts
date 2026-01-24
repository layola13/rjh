/**
 * Point2d module - 2D point entity with geometry and intersection type support
 * @module Point2d_IO
 */

/**
 * Enum defining different types of point intersections
 */
export enum Point2dTypeEnum {
  /** Intersection point between two lines */
  LineLineIntersect = 2,
  /** Intersection point between a line and an arc */
  LineArcIntersect = 4,
  /** Intersection point between two arcs */
  ArcArcIntersect = 8
}

/**
 * Geometry representation of a 2D point
 */
export interface Point2dGeometry {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Serialized point data structure
 */
export interface Point2dData {
  /** X coordinate */
  x?: number;
  /** Y coordinate */
  y?: number;
  /** Whether the point is a background element */
  isbk?: boolean;
  /** Legacy background flag */
  isbackground?: boolean;
  [key: string]: unknown;
}

/**
 * Options for load operations
 */
export interface LoadOptions {
  /** Whether to dispatch change events */
  dispatchEvent?: boolean;
  [key: string]: unknown;
}

/**
 * Options for dump operations
 */
export interface DumpOptions {
  [key: string]: unknown;
}

/**
 * Callback type for dump post-processing
 */
export type DumpCallback = (serialized: unknown[], entity: Point2d) => void;

/**
 * I/O handler for Point2d entity serialization and deserialization
 * Implements singleton pattern for efficient resource usage
 */
export class Point2d_IO extends Entity_IO {
  private static _Point2d_IO_instance?: Point2d_IO;

  /**
   * Gets the singleton instance of Point2d_IO
   * @returns The shared Point2d_IO instance
   */
  static instance(): Point2d_IO;

  /**
   * Serializes a Point2d entity to a data structure
   * @param entity - The Point2d entity to serialize
   * @param callback - Optional callback for post-processing serialized data
   * @param includeMetadata - Whether to include metadata in output (default: true)
   * @param options - Additional dump options
   * @returns Array containing serialized point data
   */
  dump(
    entity: Point2d,
    callback?: DumpCallback,
    includeMetadata?: boolean,
    options?: DumpOptions
  ): unknown[];

  /**
   * Deserializes data into a Point2d entity
   * @param entity - The target Point2d entity to populate
   * @param data - Serialized point data
   * @param options - Load options (e.g., dispatchEvent flag)
   */
  load(entity: Point2d, data: Point2dData, options?: LoadOptions): void;
}

/**
 * 2D Point entity class representing a point in 2D space
 * Supports intersection types, background flagging, and parent polygon tracking
 */
export class Point2d extends Entity {
  /** Internal X coordinate storage */
  private __x: number;
  
  /** Internal Y coordinate storage */
  private __y: number;
  
  /** X coordinate of the point */
  x: number;
  
  /** Y coordinate of the point */
  y: number;
  
  /** Indicates if this point is a background element */
  isbackground: boolean;
  
  /** Type of intersection this point represents */
  point2dType: Point2dTypeEnum;

  /**
   * Creates a new Point2d instance
   * @param id - Optional entity identifier
   * @param metadata - Optional metadata object
   */
  constructor(id?: string, metadata?: unknown);

  /**
   * Factory method to create a Point2d with specified coordinates
   * @param x - X coordinate (default: 0)
   * @param y - Y coordinate (default: 0)
   * @param type - Intersection type (default: LineLineIntersect)
   * @returns New Point2d instance
   */
  static create(x?: number, y?: number, type?: Point2dTypeEnum): Point2d;

  /**
   * Creates a Point2d from an existing point-like object
   * @param point - Object with x and y properties
   * @returns New Point2d instance with copied coordinates
   */
  static createFromPoint(point: Point2dGeometry): Point2d;

  /**
   * Gets the geometric representation of this point
   * @returns Object containing x and y coordinates
   */
  get geometry(): Point2dGeometry;

  /**
   * Gets the I/O handler for this entity type
   * @returns Singleton Point2d_IO instance
   */
  getIO(): Point2d_IO;

  /**
   * Creates a deep copy of this point
   * @returns New Point2d with identical coordinates
   */
  clone(): Point2d;

  /**
   * Sets the point coordinates
   * @param x - New X coordinate
   * @param y - New Y coordinate
   */
  set(x: number, y: number): void;

  /**
   * Offsets the point by specified deltas
   * @param dx - X offset amount
   * @param dy - Y offset amount
   */
  offset(dx: number, dy: number): void;

  /**
   * Verifies that the point has valid numeric coordinates
   * @returns True if coordinates are valid numbers, false otherwise
   */
  verify(): boolean;

  /**
   * Checks if this point is marked as a background element
   * @returns True if background flag is set
   */
  isBackground(): boolean;

  /**
   * Retrieves all parent polygons containing this point
   * Traverses the parent hierarchy: Point -> Edge -> Segment -> Polygon
   * @returns Set of unique parent polygon entities
   */
  getPolygons(): Set<unknown>;

  /**
   * Updates the internal bounding box to contain this point
   * @internal
   */
  refreshBoundInternal(): void;

  /**
   * Callback invoked when entity fields change
   * Triggers geometry dirty flag for coordinate changes
   * @param fieldName - Name of the changed field
   * @param newValue - New field value
   * @param oldValue - Previous field value
   * @internal
   */
  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void;
}

/**
 * Base Entity class (imported dependency)
 */
declare class Entity {
  tag: string;
  parents: Record<string, unknown>;
  boundInternal: {
    reset(): void;
    appendPoint(point: Point2dGeometry): void;
  };
  
  constructor(id?: string, metadata?: unknown);
  verify(): boolean;
  dirtyGeometry(): void;
  onFieldChanged(field: string, newVal: unknown, oldVal: unknown): void;
  
  static registerClass(classType: string, classConstructor: unknown): void;
}

/**
 * Base Entity I/O handler (imported dependency)
 */
declare class Entity_IO {
  dump(
    entity: unknown,
    metadata: unknown,
    includeMetadata: boolean,
    options: DumpOptions
  ): unknown[];
  
  load(entity: unknown, data: unknown, options: LoadOptions): void;
}

/**
 * EntityField decorator for marking serializable properties
 */
declare function EntityField(): PropertyDecorator;