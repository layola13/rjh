import type Flatten from '@flatten-js/core';

/**
 * Direction enumeration for positioning
 */
export enum Direction {
  Left = 'left',
  Right = 'right'
}

/**
 * Base Dimension class interface
 */
export interface Dimension {
  from: Flatten.Point;
  to: Flatten.Point;
  hardware: Hardware;
  topFrame: TopFrame;
  toJSON(): DimensionJSON;
  deserialize(data: DimensionJSON): void;
  cloneFrom(source: Dimension): this;
}

/**
 * Hardware interface representing the dimensional hardware component
 */
export interface Hardware {
  /** Center position of the hardware */
  centerPosition: Flatten.Point;
  
  /** Hardware manager reference */
  manager: HardwareManager;
  
  /** Parent component, can be a SlideSash or other types */
  parent: SlideSash | unknown;
  
  /**
   * Get the shape direction vector of the hardware
   */
  hardwareShapeDirection(): Flatten.Vector;
  
  /**
   * Set the distance from hardware to sash
   * @param delta - The delta value for distance adjustment
   * @param value - The target distance value
   * @param lockHeight - Whether to lock the same height constraint
   */
  setDistanceToSash(delta: number, value: number, lockHeight: boolean): void;
}

/**
 * Hardware manager interface
 */
export interface HardwareManager {
  /** Associated sash component */
  sash: Sash;
}

/**
 * Sash component interface
 */
export interface Sash {
  /** Polygon shape of the sash */
  polygon: Polygon;
}

/**
 * Polygon interface with rectangle detection
 */
export interface Polygon {
  /** Bounding box of the polygon */
  box: Box;
  
  /**
   * Check if the polygon is a rectangle
   */
  isRectangle(): boolean;
}

/**
 * Bounding box interface
 */
export interface Box {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

/**
 * SlideSash component interface
 */
export interface SlideSash {
  /** Host configuration */
  host: SlideSashHost;
}

/**
 * SlideSash host configuration
 */
export interface SlideSashHost {
  /** Whether to lock the same height for all sashes */
  locksSameHeight: boolean;
}

/**
 * Top frame interface
 */
export interface TopFrame {
  /** View reference */
  view: View;
  
  /** Sash manager */
  sashManager: SashManager;
}

/**
 * View interface for rendering
 */
export interface View {
  /** Shape manager */
  shapeManager: ShapeManager;
  
  /**
   * Refresh the view
   */
  refresh(): void;
}

/**
 * Shape manager interface
 */
export interface ShapeManager {
  /**
   * Optimize handle dimensions
   */
  optimizeHandleDim(): void;
}

/**
 * Sash manager interface
 */
export interface SashManager {
  /** Collection of theft components */
  thefts: Theft[];
}

/**
 * Theft component interface
 */
export interface Theft {
  /**
   * Update the polygon shape
   */
  updatePoly(): void;
  
  /**
   * Draw the theft on the view
   * @param view - Target view to draw on
   */
  draw(view: View): void;
}

/**
 * Serialized dimension data
 */
export interface DimensionJSON {
  position?: Direction;
  [key: string]: unknown;
}

/**
 * Dimension from hardware to sash
 * Represents the dimensional constraint between hardware component and sash edge
 */
export declare class DimToSash extends Dimension {
  /** Associated hardware component */
  hardware: Hardware;
  
  /** Margin distance in units (default: 280) */
  margin: number;
  
  /** Position direction relative to sash (Left or Right) */
  position: Direction;
  
  /** Start point of the dimension line */
  from: Flatten.Point;
  
  /** End point of the dimension line */
  to: Flatten.Point;
  
  /** Top frame reference */
  topFrame: TopFrame;
  
  /**
   * Create a new DimToSash instance
   * @param hardware - The hardware component to associate with
   */
  constructor(hardware: Hardware);
  
  /**
   * Calculate and set the dimension line position
   * Handles both rectangular and non-rectangular sash polygons
   */
  locate(): void;
  
  /**
   * Handle dimension edit event
   * @param delta - The delta value for the edit operation
   * @param value - The new dimension value
   */
  onEdit(delta: number, value: number): void;
  
  /**
   * Serialize the dimension to JSON
   * @returns Serialized dimension data
   */
  toJSON(): DimensionJSON;
  
  /**
   * Deserialize dimension from JSON data
   * @param data - Serialized dimension data
   */
  deserialize(data?: DimensionJSON): void;
  
  /**
   * Clone properties from another DimToSash instance
   * @param source - Source dimension to clone from
   * @returns This instance for chaining
   */
  cloneFrom(source: DimToSash): this;
}