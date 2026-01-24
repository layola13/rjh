/**
 * Polygon module providing polygon geometry classes and I/O operations.
 * @module Polygon_IO
 */

import { Region_IO, Region } from './Region';
import { Entity } from './Entity';
import { Wire } from './Wire';
import { VerticalLayout } from './VerticalLayout';
import { Waistline } from './Waistline';
import { StretchType, RegionLayoutItem } from './LayoutTypes';
import { DiscretePolygon2d } from './DiscretePolygon2d';
import { Point2d, clonePoint2ds } from './Point2d';
import { Util } from './Util';
import { EntityField } from './Decorators';

/**
 * Serialization context for entity loading/dumping.
 */
export interface SerializationContext {
  [key: string]: unknown;
}

/**
 * Options for dump operations.
 */
export interface DumpOptions {
  [key: string]: unknown;
}

/**
 * Serialized polygon data structure.
 */
export interface PolygonDumpData {
  originPoints?: Point2d[];
  outerLoop?: string;
  outterLoop?: string; // Legacy typo support
  innerLoops?: string[];
  [key: string]: unknown;
}

/**
 * 2D transformation matrix.
 */
export interface TransformMatrix {
  m00_: number;
  m01_: number;
  m02_: number;
  m10_: number;
  m11_: number;
  m12_: number;
}

/**
 * Bounding box representation.
 */
export interface BoundingBox {
  x: number;
  x2: number;
  y: number;
  y2: number;
}

/**
 * Internal bound structure.
 */
export interface Bound {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Geometric polygon representation with outer boundary and holes.
 */
export interface GeomPolygon {
  outer: Point2d[];
  holes: Point2d[][];
}

/**
 * Waistline neighbor regions.
 */
export interface WaistlineNeighbors {
  pre: Waistline | null;
  next: Waistline | null;
}

/**
 * I/O handler for Polygon serialization and deserialization.
 * Extends Region_IO to handle polygon-specific data structures.
 */
export declare class Polygon_IO extends Region_IO {
  private static _Polygon_IO_instance?: Polygon_IO;

  /**
   * Gets the singleton instance of Polygon_IO.
   * @returns The singleton Polygon_IO instance
   */
  static instance(): Polygon_IO;

  /**
   * Serializes a polygon entity to a transferable format.
   * @param entity - The polygon entity to dump
   * @param callback - Optional callback for post-processing
   * @param includeChildren - Whether to include child entities
   * @param options - Additional dump options
   * @returns Array of serialized data
   */
  dump(
    entity: Polygon,
    callback?: (data: unknown[], entity: Polygon) => void,
    includeChildren?: boolean,
    options?: DumpOptions
  ): unknown[];

  /**
   * Deserializes polygon data into an entity instance.
   * @param entity - The target polygon entity
   * @param data - Serialized polygon data
   * @param context - Deserialization context
   */
  load(
    entity: Polygon,
    data: PolygonDumpData,
    context?: SerializationContext
  ): void;
}

/**
 * Represents a 2D polygon with outer loop and optional inner loops (holes).
 * Supports complex operations including waistline management, transformations, and geometric queries.
 */
export declare class Polygon extends Region {
  /** Outer boundary wire */
  private __outerLoop?: Wire;

  /** Inner boundary wires (holes) indexed by ID */
  private __innerLoops: Record<string, Wire>;

  /** Original defining points */
  originPoints: Point2d[];

  /** Cached inner loop array */
  innerLoops: Wire[];

  /** Associated curve entities */
  curves: unknown[];

  /** Hole polygons */
  holes: Point2d[][];

  /** Parent grid reference */
  parentgrid: unknown | null;

  /** Internal bounding box cache */
  protected boundInternal?: Bound;

  /** Layout manager for waistlines */
  layout?: VerticalLayout | null;

  /**
   * Creates a new Polygon instance.
   * @param id - Optional entity identifier
   * @param options - Additional creation options
   */
  constructor(id?: string, options?: unknown);

  /**
   * Initializes the polygon with outer and inner loops.
   * @param outerLoop - The outer boundary wire
   * @param innerLoops - Array of inner boundary wires (holes)
   * @returns This polygon instance for chaining
   */
  init(outerLoop: Wire, innerLoops: Wire[]): this;

  /**
   * Sets or replaces the outer loop.
   * @param loop - The new outer loop wire
   * @param updateChildren - Whether to update child relationships
   */
  setOuterLoop(loop: Wire, updateChildren?: boolean): void;

  /**
   * Sets or replaces all inner loops.
   * @param loops - Array of inner loop wires
   * @param updateChildren - Whether to update child relationships
   */
  setInnerLoops(loops: Wire[], updateChildren?: boolean): void;

  /**
   * Gets the outer boundary wire.
   */
  get outerLoop(): Wire | undefined;

  /**
   * Sets the outer boundary wire (decorated property).
   */
  set outerLoop(value: Wire | undefined);

  /**
   * Gets geometric polygon representation for computations.
   * @returns Array of geometric polygons
   */
  protected _getGeomPolygons(): GeomPolygon[];

  /**
   * Sets geometric polygon representation (internal use).
   * @param polygons - Geometric polygon data
   */
  protected _setGeomPolygons(polygons: GeomPolygon[]): void;

  /**
   * Checks if polygon contains any waistline entities.
   * @returns True if waistlines exist
   */
  hasWaistline(): boolean;

  /**
   * Gets all regions including waistline regions.
   * @returns Array of region entities
   */
  getAllRegions(): Region[];

  /**
   * Gets the index of a specific region in the layout.
   * @param region - The region to find
   * @returns Region index or -1 if not found
   */
  getRegionIndex(region: Region): number;

  /**
   * Inserts a waistline at a specific position.
   * @param waistline - The waistline entity to insert
   * @param index - Insertion position
   */
  insertWaistline(waistline: Waistline, index: number): void;

  /**
   * Inserts a waistline region with expand stretch type.
   * @param region - The region to insert
   * @param index - Insertion position
   */
  insertWaistlineRegion(region: Region, index: number): void;

  /**
   * Removes a waistline and adjusts layout accordingly.
   * @param waistline - The waistline to remove
   * @returns True if removal was successful
   */
  removeWaistline(waistline: Waistline): boolean;

  /**
   * Gets the neighboring waistlines of a given waistline.
   * @param waistline - The reference waistline
   * @returns Object containing previous and next waistlines
   */
  getWaistLineNeighbors(waistline: Waistline): WaistlineNeighbors;

  /**
   * Gets all waistlines in the polygon.
   * @returns Array of waistline entities
   */
  getWaistlines(): Waistline[];

  /**
   * Updates the layout and all waistline geometries.
   */
  updateLayout(): void;

  /**
   * Fixes waistline layout consistency (internal method).
   */
  fixWaistlineLayout(): void;

  /**
   * Gets the I/O handler for this polygon.
   * @returns The Polygon_IO singleton instance
   */
  getIO(): Polygon_IO;

  /**
   * Creates a deep clone of this polygon.
   * @returns A new polygon instance with copied data
   */
  clone(): Polygon;

  /**
   * Gets all wire entities (outer and inner loops).
   * @returns Array of wire entities
   */
  getWires(): Wire[];

  /**
   * Gets all curve entities from all wires.
   * @returns Array of unique curve entities
   */
  getAllCurves(): unknown[];

  /**
   * Gets the bounding box of the polygon.
   * @returns Bounding box coordinates
   */
  bounding(): BoundingBox;

  /**
   * Gets the bounding box (alias for bounding).
   * @returns Bounding box coordinates
   */
  getBounding(): BoundingBox;

  /**
   * Gets the internal bound structure.
   */
  get bound(): Bound;

  /**
   * Refreshes the internal bounding box cache.
   */
  protected refreshBoundInternal(): void;

  /**
   * Tests if a point is inside the polygon (accounting for holes).
   * @param point - The point to test
   * @returns True if point is inside
   */
  isPointInside(point: Point2d): boolean;

  /**
   * Gets the outer loop path points.
   */
  get points(): Point2d[];

  /**
   * Gets all points from all wires.
   * @returns Array of all points
   */
  getAllPoints(): Point2d[];

  /**
   * Gets discrete points along the outer loop.
   * @returns Array of discrete points
   */
  getDiscretePoints(): Point2d[];

  /**
   * Checks if any point is marked as background.
   * @returns True if background point exists
   */
  hasBackgroundPoint(): boolean;

  /**
   * Checks if any curve is marked as background.
   * @returns True if background curve exists
   */
  hasBackgroundCurve(): boolean;

  /**
   * Checks if the entire polygon is a background entity.
   * @returns True if all outer loop curves are background
   */
  isBackground(): boolean;

  /**
   * Checks if outer loop contains a circle entity.
   * @returns True if circle exists
   */
  isOuterLoopContainsCircle(): boolean;

  /**
   * Checks if outer loop contains a circular arc entity.
   * @returns True if circular arc exists
   */
  isOuterLoopContainsCircleArc(): boolean;

  /**
   * Handles child entity dirty notifications.
   * @param child - The child that became dirty
   * @param data - Additional notification data
   */
  protected onChildDirty(child: Entity, data: unknown): void;

  /**
   * Creates a polygon from point arrays.
   * @param outerPoints - Outer boundary points
   * @param holes - Optional array of hole point arrays
   * @returns A new polygon instance
   */
  static createPolygon(
    outerPoints: Point2d[],
    holes?: Point2d[][]
  ): Polygon;

  /**
   * Translates the polygon by an offset.
   * @param offsetX - X-axis offset
   * @param offsetY - Y-axis offset
   */
  offset(offsetX: number, offsetY: number): void;

  /**
   * Applies a transformation matrix to all points.
   * @param matrix - The transformation matrix
   */
  transform(matrix: TransformMatrix): void;

  /**
   * Gets unique outer boundary points.
   * @returns Array of deduplicated outer points
   */
  getOuterPoints(): Point2d[];

  /**
   * Gets all wire paths as point arrays.
   * @returns Array of paths (each path is an array of points)
   */
  getPath(): Point2d[][];

  /**
   * Gets discrete paths for all wires.
   * @returns Array of discrete paths
   */
  getDiscretePath(): Point2d[][];

  /**
   * Converts to a simple polygon point array.
   * @returns Cloned array of outer loop points
   */
  toPolygon(): Point2d[];

  /**
   * Handles field change notifications.
   * @param fieldName - Name of the changed field
   * @param newValue - New field value
   * @param oldValue - Previous field value
   */
  protected onFieldChanged(
    fieldName: string,
    newValue: unknown,
    oldValue: unknown
  ): void;

  /**
   * Cleans up resources and prepares for disposal.
   */
  destroy(): void;

  /**
   * Removes a child region and updates relationships.
   * @param region - The region to remove
   */
  protected removeChildRegion(region: Region): void;

  /**
   * Copies style properties from another region.
   * @param region - Source region for style copying
   */
  protected copyStyleFromOtherRegion(region: Region): void;

  /**
   * Marks geometry as dirty/needing recalculation.
   */
  protected dirtyGeometry(): void;

  /**
   * Gets cloned dump data for serialization.
   * @returns Dump data with context
   */
  protected getClonedDumpData(): {
    dumps: unknown[];
    context: SerializationContext;
  };
}