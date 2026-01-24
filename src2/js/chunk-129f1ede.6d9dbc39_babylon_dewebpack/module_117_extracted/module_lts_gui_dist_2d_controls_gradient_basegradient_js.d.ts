/**
 * Color stop definition for gradient
 */
export interface ColorStop {
  /** Offset position (0.0 to 1.0) where the color should be applied */
  offset: number;
  /** Color value in CSS format (e.g., "#FF0000", "rgba(255,0,0,0.5)") */
  color: string;
}

/**
 * Serialized gradient data structure
 */
export interface SerializedGradient {
  /** Array of color stops defining the gradient */
  colorStops: ColorStop[];
  /** Class name identifier for deserialization */
  className: string;
}

/**
 * Base class for gradient rendering in 2D canvas context
 * Provides core functionality for managing color stops and generating canvas gradients
 */
export declare class BaseGradient {
  /** Internal storage for color stop definitions */
  protected _colorStops: ColorStop[];
  
  /** Flag indicating if gradient needs regeneration */
  protected _gradientDirty: boolean;
  
  /** Cached canvas gradient object */
  protected _canvasGradient: CanvasGradient | null;
  
  /** Canvas rendering context associated with current gradient */
  protected _context: CanvasRenderingContext2D | null;

  /**
   * Creates a new BaseGradient instance
   */
  constructor();

  /**
   * Gets the array of color stops
   * @readonly
   */
  get colorStops(): ColorStop[];

  /**
   * Applies all color stops to the canvas gradient object
   * @protected
   */
  protected _addColorStopsToCanvasGradient(): void;

  /**
   * Creates the canvas gradient object (must be implemented by subclasses)
   * @param context - Canvas 2D rendering context
   * @returns Canvas gradient instance
   * @protected
   */
  protected _createCanvasGradient(context: CanvasRenderingContext2D): CanvasGradient;

  /**
   * Gets or creates the canvas gradient for the specified context
   * Caches the result until gradient becomes dirty
   * @param context - Canvas 2D rendering context
   * @returns Canvas gradient ready for rendering
   */
  getCanvasGradient(context: CanvasRenderingContext2D): CanvasGradient;

  /**
   * Adds a color stop to the gradient
   * @param offset - Position between 0.0 and 1.0
   * @param color - CSS color string
   */
  addColorStop(offset: number, color: string): void;

  /**
   * Removes a color stop at the specified offset
   * @param offset - Offset position to remove
   */
  removeColorStop(offset: number): void;

  /**
   * Clears all color stops from the gradient
   */
  clearColorStops(): void;

  /**
   * Gets the class name identifier
   * @returns Class name string "BaseGradient"
   */
  getClassName(): string;

  /**
   * Serializes the gradient to a plain object
   * @param target - Object to populate with serialized data
   */
  serialize(target: SerializedGradient): void;

  /**
   * Parses serialized data to restore gradient state
   * @param source - Serialized gradient data
   */
  parse(source: SerializedGradient): void;
}