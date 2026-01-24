/**
 * Direction enum for positioning dimensions
 */
export enum Direction {
  Left = 0,
  Right = 1
}

/**
 * Point interface representing 2D coordinates
 */
export interface Point {
  x: number;
  y: number;
  translate(vector: Vector): Point;
  projectionOn(line: Line): Point;
}

/**
 * Vector interface for 2D transformations
 */
export interface Vector {
  x: number;
  y: number;
}

/**
 * Line interface for geometric calculations
 */
export interface Line {
  // Line definition properties
}

/**
 * Top frame reference with view and sash management
 */
export interface TopFrame {
  view: View;
  sashManager: SashManager;
}

/**
 * View interface for rendering and shape management
 */
export interface View {
  shapeManager: ShapeManager;
  refresh(): void;
}

/**
 * Shape manager for optimizing handle dimensions
 */
export interface ShapeManager {
  optimizeHandleDim(): void;
}

/**
 * Sash manager containing theft elements
 */
export interface SashManager {
  thefts: Theft[];
}

/**
 * Theft element with drawing capabilities
 */
export interface Theft {
  updatePoly(): void;
  draw(view: View): void;
}

/**
 * Hardware component with positioning and ground distance
 */
export interface Hardware {
  centerPosition: Point;
  top: {
    groundLine: Line;
  };
  setDistanceToGround(value: number, unit: unknown, locksSameHeight: boolean): void;
}

/**
 * SlideSash interface for parent type checking
 */
export interface SlideSash {
  host: {
    locksSameHeight: boolean;
  };
}

/**
 * Base dimension class
 */
export declare class Dimension {
  from?: Point;
  to?: Point;
  hardware: Hardware;
  
  constructor(hardware: Hardware);
  
  toJSON(): DimensionJSON;
  deserialize(data: DimensionJSON): void;
  cloneFrom(source: Dimension): this;
}

/**
 * JSON serialization format for dimensions
 */
export interface DimensionJSON {
  position?: Direction;
  [key: string]: unknown;
}

/**
 * Dimension to ground measurement component
 * Calculates and displays the distance from hardware center to ground level
 */
export declare class DimToGround extends Dimension {
  /**
   * Associated hardware component
   */
  readonly hardware: Hardware;
  
  /**
   * Margin offset for dimension line positioning (in units)
   */
  margin: number;
  
  /**
   * Position direction (left or right) for dimension placement
   */
  position: Direction;
  
  /**
   * Reference to the top frame
   */
  readonly topFrame: TopFrame;
  
  /**
   * Start point of the dimension line
   */
  from?: Point;
  
  /**
   * End point of the dimension line
   */
  to?: Point;
  
  /**
   * Creates a new DimToGround instance
   * @param hardware - The hardware component to measure from
   */
  constructor(hardware: Hardware);
  
  /**
   * Calculates and positions the dimension line from hardware center to ground
   * Applies margin offset based on position direction
   */
  locate(): void;
  
  /**
   * Handles dimension value editing
   * @param value - New distance value
   * @param unit - Measurement unit
   */
  onEdit(value: number, unit: unknown): void;
  
  /**
   * Serializes the dimension to JSON format
   * @returns JSON representation including position
   */
  toJSON(): DimensionJSON;
  
  /**
   * Deserializes dimension data from JSON
   * @param data - JSON data to restore from
   */
  deserialize(data?: DimensionJSON): void;
  
  /**
   * Clones properties from another DimToGround instance
   * @param source - Source dimension to clone from
   * @returns This instance for chaining
   */
  cloneFrom(source: DimToGround): this;
}