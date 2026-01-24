/**
 * GuardSash Module
 * 
 * Provides specialized sash component with height constraints and custom rendering logic.
 * Extends the base Sash class with guard rail functionality.
 */

import { Sash } from './Sash';
import { ShapeType } from './ShapeType';
import { Polygon, Point, Segment, Box } from './geometry';
import { DisplayUtils } from './DisplayUtils';
import { EdgeFinder, Direction } from './EdgeFinder';
import { SingleTrackPolygon, WinPolygon } from './polygon-types';
import { Frametify } from './Frametify';
import { GuardSashHeightDim } from './GuardSashHeightDim';
import { FrameManager } from './FrameManager';
import { MulManager } from './MulManager';

/**
 * Serialized representation of GuardSash state
 */
export interface GuardSashJSON {
  /** Height of the guard sash in millimeters */
  ht: number;
  [key: string]: unknown;
}

/**
 * GuardSash class
 * 
 * A specialized sash component designed for guard rails with configurable height.
 * Handles custom polygon rendering, frame management, and height dimensioning.
 */
export declare class GuardSash extends Sash {
  /**
   * Height of the guard sash in millimeters
   * @default 1000
   */
  height: number;

  /**
   * Height dimension handler for the guard sash
   */
  readonly heightDim: GuardSashHeightDim;

  /**
   * Frame manager responsible for bar rendering and recreation
   */
  readonly frameManager: FrameManager;

  /**
   * Mullion manager for polygon updates and bar hit detection
   */
  readonly mulManager: MulManager;

  /**
   * Polygon defining the sash boundary
   */
  polygon: Polygon;

  /**
   * Profile size in millimeters used for edge calculations
   */
  readonly profileSize: number;

  /**
   * Creates a new GuardSash instance
   * 
   * @param context - Rendering or application context
   * @param config - Configuration object for the sash
   * @param options - Additional initialization options
   */
  constructor(context: unknown, config: unknown, options: unknown);

  /**
   * Updates the polygon geometry and triggers related updates
   * 
   * @param polygon - New polygon to apply (optional, uses existing if not provided)
   */
  updatePoly(polygon?: Polygon): void;

  /**
   * Serializes the GuardSash to JSON format
   * 
   * @returns JSON object containing sash state including height
   */
  toJSON(): GuardSashJSON;

  /**
   * Deserializes GuardSash from JSON data
   * 
   * @param data - JSON object containing serialized state
   * @returns This instance for method chaining
   */
  deserialize(data: GuardSashJSON): this;

  /**
   * Computed Z-index for layering in the display
   * 
   * Calculated based on sash sorting rules for proper overlap rendering
   */
  get Zindex(): number;

  /**
   * Generates the rendering polygon from the current geometry
   * 
   * Creates a rectangular render area based on the polygon bounds and height,
   * with special handling for up/down edges.
   * 
   * @internal
   */
  makeRenderPoly(): void;

  /**
   * Calculates the outer polygon with profile offsets applied
   * 
   * @param polygon - Source polygon to process
   * @param offsets - Array of offset values for each edge (4 elements)
   * @returns New polygon with parallel edges offset by specified amounts
   * 
   * @internal
   */
  findOuterPoly(polygon: Polygon, offsets: number[]): WinPolygon;

  /**
   * Tests if a point hits any bar in the mullion manager
   * 
   * @param x - X coordinate in local space
   * @param y - Y coordinate in local space
   * @returns Hit test result (bar reference or null)
   */
  hitBar(x: number, y: number): unknown;
}