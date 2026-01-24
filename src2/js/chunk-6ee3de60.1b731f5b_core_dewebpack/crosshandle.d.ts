import type { Point, Segment, Vector, Line, Box, Polygon } from './geometry';
import type { Hardware, HardwareManager } from './hardware';
import type { Sash } from './sash';
import type { Frame } from './frame';
import type { View } from './view';

/**
 * Orientation enum for polygon winding order
 */
export enum Orientation {
  CW = 'CW',
  CCW = 'CCW'
}

/**
 * Hardware shape type enumeration
 */
export enum HardwareShape {
  CrossHandle = 'CrossHandle'
}

/**
 * Shape type enumeration
 */
export enum ShapeType {
  Handle = 'Handle'
}

/**
 * Tool type enumeration for editing operations
 */
export enum ToolType {
  editCrossHandle = 'editCrossHandle'
}

/**
 * Snap result information for hardware alignment
 */
export interface SnapResult {
  /** The line segment representing the snap alignment */
  snapLine: Segment;
  /** The target hardware being snapped to */
  snapTarget: CrossHandle;
  /** Whether snapping occurs on X axis (true) or Y axis (false) */
  snapOnX: boolean;
}

/**
 * Serialized representation of CrossHandle for JSON persistence
 */
export interface CrossHandleJSON {
  /** Whether the handle is oriented vertically */
  isVertical: boolean;
  /** Additional properties from Hardware base class */
  [key: string]: unknown;
}

/**
 * Cross handle hardware component for window/door sash systems.
 * Provides a draggable handle that can be positioned along either
 * vertical or horizontal axis of the sash.
 */
export declare class CrossHandle extends Hardware {
  /** The hardware manager controlling this handle */
  readonly manager: HardwareManager;
  
  /** The shape identifier for this hardware */
  readonly hardwareShape: HardwareShape.CrossHandle;
  
  /** Whether the handle is oriented vertically (true) or horizontally (false) */
  isVertical: boolean;
  
  /** The editing tool type associated with this hardware */
  readonly editTool: ToolType.editCrossHandle;
  
  /** The line segment dividing the sash where the handle is positioned */
  divideLine: Segment;
  
  /**
   * Creates a new CrossHandle instance
   * @param manager - The hardware manager that controls this handle
   */
  constructor(manager: HardwareManager);
  
  /**
   * Maximum offset distance the handle can travel along its axis.
   * For vertical handles: horizontal width of sash
   * For horizontal handles: vertical height of sash
   */
  readonly maxOffset: number;
  
  /**
   * Current offset distance from the minimum edge of the sash
   */
  offset: number;
  
  /**
   * Sets the handle position based on a point coordinate
   */
  offsetPoint: Point;
  
  /**
   * Length of the hardware shape along the divide line
   */
  readonly hardwareShapeLength: number;
  
  /**
   * Current position of the handle
   */
  readonly handlePosition: Point;
  
  /**
   * Center position of the handle (middle of divide line)
   */
  readonly centerPosition: Point;
  
  /**
   * Current position point (middle of divide line)
   */
  readonly position: Point;
  
  /**
   * Pre-creation initialization hook
   */
  preCreate(): void;
  
  /**
   * Computes the automatic offset percentage based on opening direction
   * @returns Offset percentage (0.0 to 1.0)
   */
  computeAutoOffset(): number;
  
  /**
   * Computes the divide line segment where the handle is positioned
   * based on current offset and orientation
   */
  computeDivideLine(): void;
  
  /**
   * Validates whether a point is within valid offset bounds
   * @param point - The point to validate
   * @returns True if point is within valid range
   */
  isValidOffsetPoint(point: Point): boolean;
  
  /**
   * Checks if this handle is aligned with another handle
   * @param other - Another CrossHandle to compare with
   * @returns True if both handles share the same orientation and position
   */
  alignedWith(other: CrossHandle): boolean;
  
  /**
   * Clones properties from another CrossHandle
   * @param source - The source handle to clone from
   * @returns This instance for chaining
   */
  cloneFrom(source: CrossHandle): this;
  
  /**
   * Creates a new instance cloned from this handle
   * @returns A new CrossHandle with identical properties
   */
  recreate(): CrossHandle;
  
  /**
   * Serializes the handle to JSON format
   * @returns JSON representation of the handle
   */
  toJSON(): CrossHandleJSON;
  
  /**
   * Deserializes the handle from JSON format
   * @param json - The JSON data to deserialize from
   * @returns This instance for chaining
   */
  deserialize(json: CrossHandleJSON): this;
  
  /**
   * Sets the handle's distance from ground level
   * @param distance - Distance from ground in pixels/units
   */
  setDistanceToGround(distance: number): void;
  
  /**
   * Aligns this handle to match another handle's offset
   * @param target - The target handle to align to
   * @param force - Whether to force alignment (default: false)
   */
  alignTo(target: CrossHandle, force?: boolean): void;
  
  /**
   * Attempts to snap this hardware to another hardware component
   * @param target - The target hardware to snap to
   * @returns Snap result if snapping is possible, undefined otherwise
   */
  snapHardware(target: CrossHandle): SnapResult | undefined;
  
  /**
   * Calculates the direction vector for the hardware shape
   * @returns Direction vector based on orientation and offset
   */
  hardwareShapeDirection(): Vector;
  
  /**
   * Adjusts a point to the proper position accounting for profile size
   * @param point - The point to adjust
   * @returns The adjusted point positioned correctly on the profile
   */
  properPosition(point: Point): Point;
}