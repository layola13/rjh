import { Color3 } from 'core/Maths/math.color';
import { Observable } from 'core/Misc/observable';
import { Control } from '../controls/control';
import { AdvancedDynamicTexture } from '../advancedDynamicTexture';

/**
 * Configuration options for the color picker dialog
 */
export interface IColorPickerDialogOptions {
  /** Width of the picker dialog (e.g., "640px") */
  pickerWidth?: string;
  
  /** Height of the picker dialog (e.g., "400px") */
  pickerHeight?: string;
  
  /** Height of the dialog header bar (e.g., "35px") */
  headerHeight?: string;
  
  /** Initial color value in hex format (default: "#000000") */
  lastColor?: string;
  
  /** Maximum number of saved color swatches (default: 20) */
  swatchLimit?: number;
  
  /** Number of swatches to display per line (default: 10) */
  numSwatchesPerLine?: number;
  
  /** Array of previously saved colors in hex format */
  savedColors?: string[];
}

/**
 * Result returned when the color picker dialog is closed
 */
export interface IColorPickerDialogResult {
  /** The selected color in hex format */
  pickedColor: string;
  
  /** Updated array of saved colors (if applicable) */
  savedColors?: string[];
}

/**
 * A color picker control that allows users to select colors using HSV color wheel
 * and RGB/hex input fields
 */
export declare class ColorPicker extends Control {
  /** Internal epsilon value for floating point comparisons */
  private static readonly _Epsilon: number;
  
  /** The control name */
  name: string;
  
  /** Current selected color value (Color3) */
  private _value: Color3;
  
  /** Temporary color storage for conversions */
  private _tmpColor: Color3;
  
  /** Flag indicating if pointer interaction started on the gradient square */
  private _pointerStartedOnSquare: boolean;
  
  /** Flag indicating if pointer interaction started on the color wheel */
  private _pointerStartedOnWheel: boolean;
  
  /** Left position of the gradient square in pixels */
  private _squareLeft: number;
  
  /** Top position of the gradient square in pixels */
  private _squareTop: number;
  
  /** Size of the gradient square in pixels */
  private _squareSize: number;
  
  /** Hue value (0-360 degrees) */
  private _h: number;
  
  /** Saturation value (0-1) */
  private _s: number;
  
  /** Value/brightness (0-1) */
  private _v: number;
  
  /** ID of the last pointer that triggered a down event */
  private _lastPointerDownId: number;
  
  /** Canvas element containing the rendered color wheel */
  private _colorWheelCanvas: HTMLCanvasElement | null;
  
  /** Flag indicating if a pointer is currently pressed down */
  private _pointerIsDown: boolean;
  
  /**
   * Observable triggered when the selected color value changes
   * Notifies observers with the new Color3 value
   */
  onValueChangedObservable: Observable<Color3>;
  
  /**
   * Gets or sets the current color value
   */
  get value(): Color3;
  set value(value: Color3);
  
  /**
   * Gets or sets the width of the color picker
   * Setting width also updates height to maintain aspect ratio
   */
  get width(): string;
  set width(value: string);
  
  /**
   * Gets or sets the height of the color picker
   * Setting height also updates width to maintain aspect ratio
   */
  get height(): string;
  set height(value: string);
  
  /**
   * Gets or sets the size (applies to both width and height)
   * Maintains a square aspect ratio
   */
  get size(): string;
  set size(value: string);
  
  /**
   * Creates a new ColorPicker instance
   * @param name - The name identifier for this control
   */
  constructor(name: string);
  
  /**
   * Returns the type name of this control
   * @returns "ColorPicker"
   */
  protected _getTypeName(): string;
  
  /**
   * Pre-measurement logic to ensure the picker maintains a square aspect ratio
   * @param parentMeasure - The parent control's measure dimensions
   */
  protected _preMeasure(parentMeasure: { width: number; height: number }): void;
  
  /**
   * Updates internal properties for the gradient square positioning and size
   */
  private _updateSquareProps(): void;
  
  /**
   * Renders the gradient square showing saturation and value
   * @param hue - Hue value (0-360)
   * @param left - Left position in pixels
   * @param top - Top position in pixels
   * @param width - Width in pixels
   * @param height - Height in pixels
   * @param context - Canvas 2D rendering context
   */
  private _drawGradientSquare(
    hue: number,
    left: number,
    top: number,
    width: number,
    height: number,
    context: CanvasRenderingContext2D
  ): void;
  
  /**
   * Draws a selection circle indicator
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param radius - Circle radius
   * @param context - Canvas 2D rendering context
   */
  private _drawCircle(
    x: number,
    y: number,
    radius: number,
    context: CanvasRenderingContext2D
  ): void;
  
  /**
   * Creates and renders the HSV color wheel canvas
   * @param radius - Outer radius of the wheel
   * @param thickness - Thickness of the wheel ring
   * @returns HTMLCanvasElement containing the rendered color wheel
   */
  private _createColorWheelCanvas(radius: number, thickness: number): HTMLCanvasElement;
  
  /**
   * Main rendering method for the color picker
   * @param context - Canvas 2D rendering context
   */
  protected _draw(context: CanvasRenderingContext2D): void;
  
  /**
   * Updates the color value based on pointer/mouse position
   * @param x - X coordinate in control space
   * @param y - Y coordinate in control space
   */
  private _updateValueFromPointer(x: number, y: number): void;
  
  /**
   * Checks if a point is within the gradient square area
   * @param x - X coordinate
   * @param y - Y coordinate
   * @returns True if point is within the square
   */
  private _isPointOnSquare(x: number, y: number): boolean;
  
  /**
   * Checks if a point is within the color wheel area
   * @param x - X coordinate
   * @param y - Y coordinate
   * @returns True if point is within the wheel
   */
  private _isPointOnWheel(x: number, y: number): boolean;
  
  /**
   * Handles pointer down events
   */
  protected _onPointerDown(
    target: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    buttonIndex: number,
    pi: unknown
  ): boolean;
  
  /**
   * Handles pointer move events
   */
  protected _onPointerMove(
    target: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    pi: unknown
  ): void;
  
  /**
   * Handles pointer up events
   */
  protected _onPointerUp(
    target: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    buttonIndex: number,
    notifyClick: boolean,
    pi: unknown
  ): void;
  
  /**
   * Handles canvas blur events
   */
  protected _onCanvasBlur(): void;
  
  /**
   * Displays a modal color picker dialog with advanced features including
   * RGB/hex input, color swatches, and save functionality
   * 
   * @param host - The AdvancedDynamicTexture to display the dialog on
   * @param options - Configuration options for the dialog
   * @returns Promise that resolves with the selected color and saved swatches
   * 
   * @example
   *