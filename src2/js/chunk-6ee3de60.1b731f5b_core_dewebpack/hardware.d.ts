import { Shape, DimToGround, DimToSash, HardwareShapeCreator } from './shapes';
import { ShapeColor } from './colors';
import { Artisan, DrawParams } from './drawing';
import { Polygon, Point } from './geometry';
import { ColorManager } from './color-manager';
import { Sash } from './sash';
import { HardwareManager } from './hardware-manager';

/**
 * Hardware shape type enumeration
 */
export enum HardwareShapeType {
  // Define specific hardware shape types based on your application
}

/**
 * Serialized hardware data structure
 */
export interface HardwareData {
  /** Whether the hardware is hidden */
  hidden: boolean;
  /** Type of hardware shape */
  hardwareShape: HardwareShapeType;
  /** Whether to use automatic offset calculation */
  autoOffset: boolean;
  /** Percentage-based offset position (0-1) */
  percentOffset?: number;
  /** Whether to use profile color instead of hardware color */
  useProfileColor: boolean;
  /** Dimension to ground data */
  dim: unknown;
  /** Dimension to sash data */
  dimToSash: unknown;
  /** Whether dimension to ground is locked */
  lockDimToGround: boolean;
  /** Whether dimension to sash is locked */
  lockDimToSash: boolean;
}

/**
 * Represents a hardware component attached to a window sash
 * Handles rendering, positioning, and serialization of hardware elements
 */
export declare class Hardware extends Shape {
  /** Reference to the hardware manager */
  readonly manager: HardwareManager;
  
  /** Visual shape representations */
  vshape: unknown[];
  
  /** Internal auto offset flag */
  private _autoOffset: boolean;
  
  /** Internal percent offset value */
  private _percentOffset: number;
  
  /** Generated shape polygons */
  shapes: Polygon[];
  
  /** Visibility flag */
  hidden: boolean;
  
  /** Whether ground dimension is locked */
  lockDimToGround: boolean;
  
  /** Whether sash dimension is locked */
  lockDimToSash: boolean;
  
  /** Whether to use profile color */
  useProfileColor: boolean;
  
  /** Dimension measurement to ground */
  dim: DimToGround;
  
  /** Dimension measurement to sash */
  dimToSash: DimToSash;

  /**
   * Creates a new Hardware instance
   * @param manager - The hardware manager owning this hardware
   * @param polygon - The polygon boundary for this hardware
   */
  constructor(manager: HardwareManager, polygon: Polygon);

  /**
   * Gets the color for this hardware
   * Uses profile bar color if useProfileColor is true, otherwise uses hardware color
   */
  get color(): string;

  /**
   * Gets the parent sash this hardware is attached to
   */
  get sash(): Sash;

  /**
   * Gets whether automatic offset calculation is enabled
   */
  get autoOffset(): boolean;

  /**
   * Sets whether automatic offset calculation is enabled
   */
  set autoOffset(value: boolean);

  /**
   * Gets the percentage-based offset (0-1)
   */
  get percentOffset(): number;

  /**
   * Sets the percentage-based offset
   * Value must be between 0 and 1 (exclusive)
   * Setting this disables auto offset
   */
  set percentOffset(value: number);

  /**
   * Gets the length of the hardware shape
   * @returns -1 by default (override in subclasses)
   */
  get hardwareShapeLength(): number;

  /**
   * Gets whether this hardware can be dragged
   * Hardware on circular sashes cannot be dragged
   */
  get draggable(): boolean;

  /**
   * Checks if this hardware is aligned with another hardware (same Y position)
   * @param other - The other hardware to compare with
   * @returns true if Y positions are equal
   */
  alignedWith(other: Hardware): boolean;

  /**
   * Clones all properties from another hardware instance
   * @param source - The hardware to clone from
   * @returns this instance for chaining
   */
  cloneFrom(source: Hardware): this;

  /**
   * Copies common settings from another hardware
   * @param source - The hardware to copy settings from
   */
  copyCommonSettings(source: Hardware): void;

  /**
   * Determines if this hardware should be ignored during rendering
   * @returns true if sash polygon is empty or hardware is hidden
   */
  ignore(): boolean;

  /**
   * Creates the hardware shapes and dimensions
   * @returns this instance for chaining
   */
  create(): this;

  /**
   * Pre-creation setup, calculates auto offset if enabled
   */
  preCreate(): void;

  /**
   * Computes automatic offset position
   * @returns 0.5 (center) by default, override in subclasses
   */
  computeAutoOffset(): number;

  /**
   * Creates the visual shapes for this hardware
   */
  createShapes(): void;

  /**
   * Draws the hardware on the canvas
   * @param context - Drawing context or layer
   */
  draw(context: unknown): void;

  /**
   * Updates the polygon representation
   * Recreates shapes and updates dimensions
   * @returns this instance for chaining
   */
  updatePoly(): this;

  /**
   * Translates the hardware by a given offset
   * @param offset - The translation offset point
   */
  translate(offset: Point): void;

  /**
   * Recycles the hardware, cleaning up visual resources
   * @param deep - Whether to perform deep recycling (default: false)
   */
  recycle(deep?: boolean): void;

  /**
   * Serializes the hardware to JSON
   * @returns Serialized hardware data
   */
  toJSON(): HardwareData;

  /**
   * Deserializes hardware from JSON data
   * @param data - The serialized hardware data
   * @returns this instance for chaining
   */
  deserialize(data: Partial<HardwareData>): this;

  /**
   * Fixes and validates deserialized data, applying defaults
   * @param data - The data to fix
   * @returns Fixed data with all required fields
   */
  fixData(data: Partial<HardwareData>): HardwareData;

  /**
   * Sets the distance from hardware to ground
   * @param distance - The distance value
   * @param param2 - Additional parameter
   * @param param3 - Additional parameter
   */
  setDistanceToGround(distance: number, param2: unknown, param3: unknown): void;

  /**
   * Sets the distance from hardware to sash
   * @param distance - The distance value
   * @param param2 - Additional parameter
   * @param param3 - Additional parameter
   */
  setDistanceToSash(distance: number, param2: unknown, param3: unknown): void;

  /**
   * Snaps hardware to a specific position
   * @param param1 - Snap parameter
   * @param param2 - Snap parameter
   */
  snapHardware(param1: unknown, param2: unknown): void;

  /**
   * Gets all hardware instances of the same type across all sashes
   * @returns Array of matching hardware instances
   */
  allSameHardwares(): Hardware[];

  /**
   * Gets all hardware of the same type that are aligned with this one
   * @returns Array of aligned hardware instances
   */
  allHardwaresAlignedWith(): Hardware[];
}