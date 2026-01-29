/**
 * Waistline region module
 * Represents a waistline component in a garment design system
 */

import { Region, Region_IO } from './Region';
import { Entity } from './Entity';
import { DiscretePolygon2d } from './DiscretePolygon2d';
import { BoundingBox2D } from './BoundingBox2D';
import { EntityField } from './EntityField';

/**
 * Polygon structure with outer boundary and inner holes
 */
interface Polygon {
  /** Outer boundary vertices */
  outer: Array<{ x: number; y: number }>;
  /** Inner hole vertices */
  holes: Array<Array<{ x: number; y: number }>>;
}

/**
 * Bounding rectangle structure
 */
interface Bounds {
  x: number;
  x2: number;
  y: number;
  y2: number;
}

/**
 * Clipping operation options
 */
interface ClipOptions {
  /** Type of clipping operation (e.g., intersection) */
  operation: HSCore.Util.Collision.ClipType;
  /** Fill type for subject polygons */
  subject_fillType: HSCore.Util.Collision.PolyFillType;
  /** Fill type for clip polygons */
  clip_fillType: HSCore.Util.Collision.PolyFillType;
}

/**
 * Dump context for serialization
 */
interface DumpContext {
  [key: string]: unknown;
}

/**
 * Serialized waistline data
 */
interface WaistlineData {
  /** Thickness of the waistline */
  thickness?: number;
  /** Height of the bottom line */
  bottomLineHeight?: number;
  [key: string]: unknown;
}

/**
 * Waistline region class
 * Represents a horizontal band region typically used for waistlines in garment patterns
 */
export declare class Waistline extends Region {
  /** Default width (thickness) of waistline in units */
  static readonly DefaultWidth: number;

  /** Current width/thickness of the waistline */
  @EntityField()
  width: number;

  /** Height offset from bottom reference line */
  @EntityField()
  bottomLineHeight: number;

  /** Internal storage for width */
  private __width: number;

  /** Internal storage for bottom line height */
  private __bottomLineHeight: number;

  /**
   * Creates a new Waistline instance
   * @param id - Optional unique identifier
   * @param options - Optional configuration options
   */
  constructor(id?: string, options?: unknown);

  /**
   * Factory method to create and insert a waistline into a parent region
   * @param parent - Parent region to insert the waistline into
   * @param width - Width/thickness of the waistline
   * @param bottomLineHeight - Height offset from bottom line
   * @param insertIndex - Optional insertion index (default: 0)
   * @returns Newly created waistline instance
   */
  static createWaistline(
    parent: Region,
    width: number,
    bottomLineHeight: number,
    insertIndex?: number
  ): Waistline;

  /**
   * Gets the thickness of the waistline (alias for width)
   */
  get thickness(): number;

  /**
   * Sets the thickness of the waistline (alias for width)
   */
  set thickness(value: number);

  /**
   * Gets the internal thickness value
   */
  get __thickness(): number;

  /**
   * Sets the internal thickness value
   */
  set __thickness(value: number);

  /**
   * Updates the geometric polygons by clipping against parent geometry
   * Recalculates the waistline shape based on parent boundaries
   */
  updateGeometry(): void;

  /**
   * Sets the bottom line height based on paint position
   * @param paintPosY - Y-coordinate in paint/canvas space
   */
  setBottomLinePaintPos(paintPosY: number): void;

  /**
   * Calculates bottom line height from a paint position
   * @param paintPosY - Y-coordinate in paint space
   * @param parent - Parent region for reference
   * @returns Calculated bottom line height
   */
  static getBottomLineHeightOfPaintPos(
    paintPosY: number,
    parent: Region | null
  ): number;

  /**
   * Gets the bounding box before clipping operations
   * @returns Bounding box or null if no parent exists
   */
  getUnCutBound(): BoundingBox2D | null;

  /**
   * Gets the polygon representation before clipping
   * @returns Polygon with outer boundary and holes
   */
  getUnCutPolygon(): Polygon;

  /**
   * Gets the I/O handler for serialization
   * @returns Waistline_IO singleton instance
   */
  getIO(): Waistline_IO;

  /**
   * Creates a deep copy of this waistline
   * @returns Cloned waistline instance
   */
  clone(): Waistline;

  /**
   * Gets the bounding rectangle of the waistline
   * @returns Bounding rectangle coordinates
   */
  bounding(): Bounds;

  /**
   * Fits the waistline to a layout (implementation pending)
   * @param layout - Layout configuration
   */
  fitToLayout(layout: unknown): void;
}

/**
 * I/O handler for Waistline serialization and deserialization
 */
export declare class Waistline_IO extends Region_IO {
  /** Singleton instance */
  private static _Waistline_IO_instance: Waistline_IO;

  /**
   * Gets the singleton instance of Waistline_IO
   * @returns Singleton instance
   */
  static instance(): Waistline_IO;

  /**
   * Serializes a waistline instance to data format
   * @param entity - Waistline instance to serialize
   * @param callback - Optional callback after dump
   * @param includeDefaults - Whether to include default values (default: true)
   * @param context - Serialization context
   * @returns Array of serialized data objects
   */
  dump(
    entity: Waistline,
    callback?: (data: WaistlineData[], entity: Waistline) => void,
    includeDefaults?: boolean,
    context?: DumpContext
  ): WaistlineData[];

  /**
   * Deserializes data into a waistline instance
   * @param entity - Target waistline instance to populate
   * @param data - Serialized waistline data
   * @param context - Deserialization context
   */
  load(
    entity: Waistline,
    data: WaistlineData,
    context?: DumpContext
  ): void;
}