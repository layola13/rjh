/**
 * Hinge module - represents a hinge hardware component on a window/door frame
 * @module Hinge
 */

import { ToolType } from './tools';
import { HardwareOnFrame, HardwareShape, ShapeType, DockSide } from './hardware';

/**
 * Manager interface for handling multiple hinges on a frame
 */
export interface HingeManager {
  /** Collection of all hinges managed by this manager */
  hinges: Hinge[];
  /** Index of the edge where hinges are placed */
  hingeEdgeIndex: number;
  /** Total number of hinges */
  hingeCount: number;
}

/**
 * Sash interface representing the window/door sash containing the frame
 */
export interface Sash {
  /** Polygon geometry defining the sash shape */
  polygon: Polygon;
  /** Manager for frame edges and dimensions */
  frameManager: FrameManager;
}

/**
 * Polygon geometry interface
 */
export interface Polygon {
  /** Array of edges forming the polygon */
  edges: Edge[];
}

/**
 * Edge interface representing a single edge of a polygon
 */
export interface Edge {
  /** Starting point of the edge */
  start: Point;
  /** Ending point of the edge */
  end: Point;
  /** Length of the edge in millimeters */
  length: number;
}

/**
 * Point interface for 2D coordinates
 */
export interface Point {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Frame manager interface for handling frame dimensions
 */
export interface FrameManager {
  /**
   * Get the width of a specific edge
   * @param edgeIndex - Index of the edge
   * @returns Width of the edge in millimeters
   */
  getEdgeWidth(edgeIndex: number): number;
}

/**
 * Dimension configuration interface
 */
export interface DimensionConfig {
  /** Whether dimensions are hidden in the UI */
  hidden: boolean;
}

/**
 * Hardware data interface for serialization
 */
export interface HardwareData {
  /** Shape type of the hardware */
  hardwareShape?: HardwareShape;
  [key: string]: unknown;
}

/**
 * Hinge class - represents a single hinge hardware component
 * Hinges connect moving parts (sashes) to the frame and allow rotation
 */
export declare class Hinge extends HardwareOnFrame {
  /** Manager instance controlling this hinge */
  readonly manager: HingeManager;
  
  /** Tool type used for editing this hinge */
  editTool: ToolType;
  
  /** Dimension configuration */
  dim: DimensionConfig;
  
  /** Shape identifier for the hardware */
  hardwareShape: HardwareShape;
  
  /** Side where the hinge is docked (always Outside for hinges) */
  protected _dockSide: DockSide;
  
  /** Whether to ignore arc edges when positioning */
  protected _ignoreArcEdge: boolean;
  
  /**
   * Creates a new Hinge instance
   * @param manager - The hinge manager controlling this hinge
   */
  constructor(manager: HingeManager);
  
  /**
   * Gets the index of this hinge in the manager's hinge collection
   * @returns Zero-based index, or -1 if not found
   */
  get index(): number;
  
  /**
   * Clones properties from another hinge instance
   * @param source - Source hinge to clone from
   * @returns This instance for method chaining
   */
  cloneFrom(source: Hinge): this;
  
  /**
   * Creates a new hinge instance with the same properties as this one
   * @returns New cloned hinge instance
   */
  recreate(): Hinge;
  
  /**
   * Fixes and validates hardware data, ensuring required properties exist
   * @param data - Hardware data to fix
   * @returns Fixed hardware data with guaranteed hardwareShape property
   */
  fixData(data: HardwareData): HardwareData;
  
  /**
   * Computes the automatic offset position for this hinge
   * Uses predefined positioning algorithms based on hinge count and placement
   * @returns Percentage offset (0-1) along the edge where hinge should be placed
   */
  computeAutoOffset(): number;
  
  /**
   * Calculates default percentage offsets for all hinges based on configuration
   * 
   * Single hinge: centered at 50%
   * Three hinges on edge: positioned at calculated distances accounting for frame width
   * Multiple hinges: distributed symmetrically with 20%-80% range
   * 
   * @returns Array of percentage offsets (0-1) for each hinge position
   */
  defaultPercentOffsets(): number[];
  
  /** Reference to the sash containing this hinge */
  sash: Sash;
}