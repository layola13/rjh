/**
 * Text alignment options
 */
export enum TextAlign {
  /** Center alignment */
  Center = 0,
  /** Left alignment */
  Left = 1,
  /** Right alignment */
  Right = 2
}

/**
 * Point interface representing 2D coordinates
 */
interface Point {
  x: number;
  y: number;
  translate(vector: Vector): Point;
}

/**
 * Vector interface representing 2D direction and magnitude
 */
interface Vector {
  add(other: Vector): Vector;
}

/**
 * Box interface representing rectangular bounds
 */
interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Polygon interface with geometry operations
 */
interface Polygon {
  box: Box;
  contains(point: Point): boolean;
  translate(vector: Vector): Polygon;
}

/**
 * Shape color configuration
 */
interface ShapeColorConfig {
  darkMode: boolean;
}

/**
 * Drawing parameters singleton
 */
interface DrawParamsInstance {
  font: string;
  dimFontSize: number;
}

/**
 * Polygon creator utility
 */
interface PolygonCreatorInstance {
  joinRelativePro(vectors: Vector[], startPoint: Point): Polygon;
}

/**
 * Text rendering and positioning class
 * Handles text display with customizable styling, alignment, and interaction
 */
export class Text {
  /** Text content to display */
  content: string;
  
  /** Position of the text in 2D space */
  position: Point;
  
  /** Text alignment mode */
  align: TextAlign;
  
  /** Whether the text can be dragged */
  draggable: boolean;
  
  /** Bold text styling */
  bold: boolean;
  
  /** Text color */
  color: string;
  
  /** Calculated text width in pixels */
  width: number;
  
  /** Calculated text height in pixels */
  height: number;
  
  /** Padding around text for bounding box */
  padding: number;
  
  /** Offset vector for positioning adjustments */
  offVec: Vector;
  
  /** Internal font size storage */
  private _fontSize: number;

  /**
   * Creates a new Text instance
   * @param content - The text string to display
   * @param position - Position in 2D space (default: origin point)
   * @param align - Text alignment mode (default: Center)
   * @param draggable - Whether text can be dragged (default: true)
   * @param fontSize - Font size in pixels (default: from DrawParams)
   * @param bold - Bold styling (default: false)
   * @param color - Text color (default: yellow in dark mode, blue in light mode)
   */
  constructor(
    content: string,
    position?: Point,
    align?: TextAlign,
    draggable?: boolean,
    fontSize?: number,
    bold?: boolean,
    color?: string
  );

  /**
   * Gets the computed font string with size and weight
   * Applies bold styling and current font size to base font
   */
  get font(): string;

  /**
   * Gets the current font size
   */
  get fontSize(): number;

  /**
   * Sets the font size and recalculates text dimensions
   */
  set fontSize(value: number);

  /**
   * Gets the alignment-based offset vector
   * Adjusts position based on text alignment (left/center/right)
   */
  get selfOffset(): Vector;

  /**
   * Gets the bounding box of the text including padding
   */
  get box(): Box;

  /**
   * Checks if a point is contained within the text bounds
   * @param point - Point to test for containment
   * @returns True if point is inside text bounds
   */
  contains(point: Point): boolean;

  /**
   * Gets the border polygon around the text
   * Includes padding and applies alignment offset
   * @returns Polygon representing text border
   */
  border(): Polygon;

  /**
   * Translates the text position by a vector
   * @param vector - Translation vector to apply
   */
  translate(vector: Vector): void;

  /**
   * Analyzes and calculates text dimensions using canvas measurements
   * Updates width and height based on content and font
   * @private
   */
  private analyseSize(): void;
}