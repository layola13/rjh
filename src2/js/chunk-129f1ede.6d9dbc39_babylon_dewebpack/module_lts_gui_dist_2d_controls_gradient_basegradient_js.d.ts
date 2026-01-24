/**
 * Color stop interface representing a gradient color position
 */
interface ColorStop {
  /** Position in gradient (0.0 to 1.0) */
  offset: number;
  /** Color value (CSS color string) */
  color: string;
}

/**
 * Serialized gradient data structure
 */
interface SerializedGradient {
  /** Array of color stops */
  colorStops: ColorStop[];
  /** Class name identifier */
  className: string;
}

/**
 * Base abstract class for gradient implementations
 * Provides common functionality for managing color stops and canvas gradient generation
 */
declare abstract class BaseGradient {
  /** Internal storage for color stops */
  private _colorStops: ColorStop[];
  
  /** Canvas rendering context reference */
  private _context?: CanvasRenderingContext2D;
  
  /** Cached canvas gradient object */
  private _canvasGradient?: CanvasGradient;
  
  /** Flag indicating if gradient needs regeneration */
  private _gradientDirty: boolean;

  constructor();

  /**
   * Creates the platform-specific canvas gradient object
   * Must be implemented by derived classes (e.g., LinearGradient, RadialGradient)
   * @param context - The 2D rendering context
   * @returns The created canvas gradient instance
   */
  protected abstract _createCanvasGradient(context: CanvasRenderingContext2D): CanvasGradient;

  /**
   * Applies all color stops to the internal canvas gradient
   * @private
   */
  private _addColorStopsToCanvasGradient(): void;

  /**
   * Retrieves the canvas gradient, creating or updating it if necessary
   * @param context - The 2D rendering context
   * @returns The canvas gradient ready for rendering
   */
  getCanvasGradient(context: CanvasRenderingContext2D): CanvasGradient;

  /**
   * Adds a color stop to the gradient
   * @param offset - Position in gradient (0.0 = start, 1.0 = end)
   * @param color - CSS color string (e.g., "#FF0000", "rgba(255,0,0,0.5)")
   */
  addColorStop(offset: number, color: string): void;

  /**
   * Removes a color stop at the specified offset
   * @param offset - The offset position to remove
   */
  removeColorStop(offset: number): void;

  /**
   * Removes all color stops from the gradient
   */
  clearColorStops(): void;

  /**
   * Gets the array of color stops
   * @readonly
   */
  get colorStops(): ColorStop[];

  /**
   * Returns the class name identifier
   * @returns "BaseGradient"
   */
  getClassName(): string;

  /**
   * Serializes gradient data to a plain object
   * @param target - Object to populate with serialized data
   */
  serialize(target: SerializedGradient): void;

  /**
   * Restores gradient state from serialized data
   * @param source - Serialized gradient data
   */
  parse(source: SerializedGradient): void;
}

export { BaseGradient, ColorStop, SerializedGradient };