/**
 * Module: ScrollBar Component
 * GUI 2D scrollbar control for scrollable content
 */

import type { BaseSlider } from './baseSlider';
import type { Measure } from '../../measure';
import type { Observable } from 'core/Misc/observable';
import type { ICanvasRenderingContext } from '../../ICanvasRenderingContext';
import type { Vector2 } from 'core/Maths/math.vector';
import type { AdvancedDynamicTexture } from '../../advancedDynamicTexture';

/**
 * Gradient configuration for scrollbar background
 */
export interface IBackgroundGradient {
  /**
   * Class name for serialization
   */
  readonly className: string;

  /**
   * Get the canvas gradient for rendering
   * @param context - Canvas rendering context
   * @returns Canvas gradient instance
   */
  getCanvasGradient(context: ICanvasRenderingContext): CanvasGradient;

  /**
   * Serialize gradient configuration
   * @param serializationObject - Target object for serialization
   */
  serialize(serializationObject: Record<string, unknown>): void;

  /**
   * Parse gradient from serialized data
   * @param serializationObject - Serialized gradient data
   */
  parse(serializationObject: Record<string, unknown>): void;
}

/**
 * Serialized scrollbar state
 */
export interface IScrollBarSerializedState {
  /**
   * Border color (CSS color string)
   */
  borderColor?: string;

  /**
   * Background color (CSS color string)
   */
  background?: string;

  /**
   * Whether scroll direction is inverted
   */
  invertScrollDirection?: boolean;

  /**
   * Background gradient configuration
   */
  backgroundGradient?: {
    className: string;
    [key: string]: unknown;
  };

  [key: string]: unknown;
}

/**
 * ScrollBar control for handling scrollable content in GUI
 * Extends BaseSlider to provide scrolling functionality with customizable appearance
 */
export declare class ScrollBar extends BaseSlider {
  /**
   * Control name identifier
   */
  name: string;

  /**
   * Border color of the scrollbar (CSS color string)
   */
  get borderColor(): string;
  set borderColor(value: string);

  /**
   * Background color of the scrollbar track (CSS color string)
   */
  get background(): string;
  set background(value: string);

  /**
   * Optional gradient for the scrollbar background
   * Takes precedence over solid background color when set
   */
  get backgroundGradient(): IBackgroundGradient | null;
  set backgroundGradient(value: IBackgroundGradient | null);

  /**
   * Whether to invert the scroll direction
   * When true, scrolling up moves content down and vice versa
   */
  get invertScrollDirection(): boolean;
  set invertScrollDirection(value: boolean);

  /**
   * Creates a new ScrollBar instance
   * @param name - Unique name for the scrollbar control
   */
  constructor(name?: string);

  /**
   * Get the type name of this control
   * @returns "Scrollbar"
   */
  protected _getTypeName(): string;

  /**
   * Calculate the effective thickness of the scrollbar thumb
   * @returns Thumb thickness in pixels
   */
  protected _getThumbThickness(): number;

  /**
   * Get the background color or gradient for rendering
   * @param context - Canvas rendering context
   * @returns Canvas gradient or CSS color string
   */
  protected _getBackgroundColor(context: ICanvasRenderingContext): string | CanvasGradient;

  /**
   * Render the scrollbar to the canvas
   * @param context - Canvas rendering context
   */
  protected _draw(context: ICanvasRenderingContext): void;

  /**
   * Update scrollbar value based on pointer position
   * @param x - Pointer X coordinate
   * @param y - Pointer Y coordinate
   */
  protected _updateValueFromPointer(x: number, y: number): void;

  /**
   * Handle pointer down event
   * @param target - The control that was clicked
   * @param coordinates - Pointer coordinates
   * @param pointerId - Unique pointer identifier
   * @param buttonIndex - Mouse button index
   * @param type - Pointer event type
   * @returns True if event was handled
   */
  protected _onPointerDown(
    target: unknown,
    coordinates: Vector2,
    pointerId: number,
    buttonIndex: number,
    type: number
  ): boolean;

  /**
   * Serialize the scrollbar state
   * @param serializationObject - Target object for serialization
   */
  serialize(serializationObject: IScrollBarSerializedState): void;

  /**
   * Parse scrollbar from serialized content
   * @param serializedObject - Serialized scrollbar data
   * @param host - The host AdvancedDynamicTexture
   */
  protected _parseFromContent(
    serializedObject: IScrollBarSerializedState,
    host: AdvancedDynamicTexture
  ): void;

  // Internal state (private members - for reference only)
  private _background: string;
  private _borderColor: string;
  private _backgroundGradient: IBackgroundGradient | null;
  private _invertScrollDirection: boolean;
  private _tempMeasure: Measure;
  private _first: boolean;
  private _originX: number;
  private _originY: number;
}