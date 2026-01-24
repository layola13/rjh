import { Color3 } from 'core/Maths/math.color';
import { Observable } from 'core/Misc/observable';
import { Control } from '../controls/control';
import { AdvancedDynamicTexture } from '../advancedDynamicTexture';

/**
 * Options for configuring the color picker dialog
 */
export interface IColorPickerDialogOptions {
  /** Width of the picker dialog (default: "640px") */
  pickerWidth?: string;
  
  /** Height of the picker dialog (default: "400px") */
  pickerHeight?: string;
  
  /** Height of the dialog header bar (default: "35px") */
  headerHeight?: string;
  
  /** Initial/last selected color (default: "#000000") */
  lastColor?: string;
  
  /** Maximum number of saved color swatches (default: 20) */
  swatchLimit?: number;
  
  /** Number of swatches displayed per line (default: 10) */
  numSwatchesPerLine?: number;
  
  /** Array of previously saved color hex strings */
  savedColors?: string[];
}

/**
 * Result returned when the color picker dialog is closed
 */
export interface IColorPickerDialogResult {
  /** The color selected by the user (hex string) */
  pickedColor: string;
  
  /** Updated array of saved colors (if applicable) */
  savedColors?: string[];
}

/**
 * Class used to create a color picker control
 */
export declare class ColorPicker extends Control {
  /** @internal */
  private static readonly _Epsilon: number;

  /** Name identifier for the control */
  name: string;

  /** @internal */
  private _value: Color3;
  
  /** @internal */
  private _tmpColor: Color3;
  
  /** @internal */
  private _pointerStartedOnSquare: boolean;
  
  /** @internal */
  private _pointerStartedOnWheel: boolean;
  
  /** @internal */
  private _squareLeft: number;
  
  /** @internal */
  private _squareTop: number;
  
  /** @internal */
  private _squareSize: number;
  
  /** @internal - Hue value (0-360) */
  private _h: number;
  
  /** @internal - Saturation value (0-1) */
  private _s: number;
  
  /** @internal - Value/Brightness (0-1) */
  private _v: number;
  
  /** @internal */
  private _lastPointerDownId: number;
  
  /** @internal */
  private _pointerIsDown: boolean;
  
  /** @internal */
  private _colorWheelCanvas?: HTMLCanvasElement;

  /**
   * Observable raised when the color value changes
   */
  onValueChangedObservable: Observable<Color3>;

  /**
   * Gets or sets the current selected color value
   */
  get value(): Color3;
  set value(value: Color3);

  /**
   * Gets or sets the width of the color picker
   * Setting width also updates height to maintain square aspect ratio
   */
  get width(): string;
  set width(value: string);

  /**
   * Gets or sets the height of the color picker
   * Setting height also updates width to maintain square aspect ratio
   */
  get height(): string;
  set height(value: string);

  /**
   * Gets or sets the size (both width and height) of the color picker
   * Convenience property for setting both dimensions at once
   */
  get size(): string;
  set size(value: string);

  /**
   * Creates a new ColorPicker control
   * @param name defines the control name
   */
  constructor(name?: string);

  /**
   * @internal
   */
  protected _getTypeName(): string;

  /**
   * @internal
   */
  protected _preMeasure(parentMeasure: { width: number; height: number }): void;

  /**
   * @internal
   * Updates the position and size of the saturation/value square
   */
  private _updateSquareProps(): void;

  /**
   * @internal
   * Draws the gradient square for saturation and value selection
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
   * @internal
   * Draws a selection circle indicator
   */
  private _drawCircle(
    x: number,
    y: number,
    radius: number,
    context: CanvasRenderingContext2D
  ): void;

  /**
   * @internal
   * Creates the color wheel canvas for hue selection
   */
  private _createColorWheelCanvas(radius: number, thickness: number): HTMLCanvasElement;

  /**
   * @internal
   */
  protected _draw(context: CanvasRenderingContext2D): void;

  /**
   * @internal
   * Updates the color value based on pointer position
   */
  private _updateValueFromPointer(x: number, y: number): void;

  /**
   * @internal
   * Checks if a point is within the saturation/value square
   */
  private _isPointOnSquare(x: number, y: number): boolean;

  /**
   * @internal
   * Checks if a point is within the color wheel (hue ring)
   */
  private _isPointOnWheel(x: number, y: number): boolean;

  /**
   * @internal
   */
  protected _onPointerDown(
    target: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    buttonIndex: number,
    pi: unknown
  ): boolean;

  /**
   * @internal
   */
  protected _onPointerMove(
    target: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    pi: unknown
  ): void;

  /**
   * @internal
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
   * @internal
   */
  protected _onCanvasBlur(): void;

  /**
   * Shows a modal color picker dialog
   * @param host The AdvancedDynamicTexture to display the dialog on
   * @param options Configuration options for the dialog
   * @returns A promise that resolves with the selected color and saved colors (if any)
   */
  static ShowPickerDialogAsync(
    host: AdvancedDynamicTexture,
    options: IColorPickerDialogOptions
  ): Promise<IColorPickerDialogResult>;
}