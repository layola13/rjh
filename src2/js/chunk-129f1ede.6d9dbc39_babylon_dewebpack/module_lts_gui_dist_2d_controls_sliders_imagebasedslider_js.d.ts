/**
 * Module: ImageBasedSlider
 * A slider control that uses images for background, value bar, and thumb components.
 */

import { BaseSlider } from './baseSlider';
import { Measure } from '../../measure';
import { Image } from '../image';
import { Observable } from 'core/Misc/observable';
import { ICanvasRenderingContext } from '../../ICanvasRenderingContext';

/**
 * Serialized representation of an ImageBasedSlider
 */
export interface IImageBasedSliderSerialized {
  /** Serialized background image data */
  backgroundImage: Record<string, unknown>;
  /** Serialized thumb image data */
  thumbImage: Record<string, unknown>;
  /** Serialized value bar image data */
  valueBarImage: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * A slider control that renders using images instead of basic shapes.
 * Supports vertical and horizontal orientations with customizable background,
 * value bar, and thumb images.
 */
export declare class ImageBasedSlider extends BaseSlider {
  /** The name identifier for this slider */
  name: string;

  /** Internal measure used for rendering calculations */
  private _tempMeasure: Measure;

  /** Internal flag for thumb display state */
  private _displayThumb: boolean;

  /** Internal reference to background image */
  private _backgroundImage?: Image;

  /** Internal reference to value bar image */
  private _valueBarImage?: Image;

  /** Internal reference to thumb image */
  private _thumbImage?: Image;

  /**
   * Creates a new ImageBasedSlider
   * @param name - The name identifier for this slider
   */
  constructor(name: string);

  /**
   * Gets whether the thumb should be displayed.
   * Returns true only if _displayThumb is true and thumbImage is set.
   */
  get displayThumb(): boolean;

  /**
   * Sets whether the thumb should be displayed
   * @param value - True to display the thumb, false to hide it
   */
  set displayThumb(value: boolean);

  /**
   * Gets the background image for the slider
   */
  get backgroundImage(): Image | undefined;

  /**
   * Sets the background image for the slider.
   * Automatically marks the control as dirty when the image loads.
   * @param value - The Image control to use as background
   */
  set backgroundImage(value: Image | undefined);

  /**
   * Gets the value bar image (the filled portion of the slider)
   */
  get valueBarImage(): Image | undefined;

  /**
   * Sets the value bar image (the filled portion of the slider).
   * Automatically marks the control as dirty when the image loads.
   * @param value - The Image control to use as value bar
   */
  set valueBarImage(value: Image | undefined);

  /**
   * Gets the thumb image (the draggable indicator)
   */
  get thumbImage(): Image | undefined;

  /**
   * Sets the thumb image (the draggable indicator).
   * Automatically marks the control as dirty when the image loads.
   * @param value - The Image control to use as thumb
   */
  set thumbImage(value: Image | undefined);

  /**
   * Gets the type name of this control
   * @returns "ImageBasedSlider"
   */
  protected _getTypeName(): string;

  /**
   * Renders the slider to the canvas context.
   * Draws background image, value bar image, and thumb image in order.
   * @param context - The canvas rendering context
   */
  protected _draw(context: ICanvasRenderingContext): void;

  /**
   * Serializes the slider configuration to a JSON object
   * @param serializationObject - The object to serialize into
   */
  serialize(serializationObject: IImageBasedSliderSerialized): void;

  /**
   * Parses and reconstructs the slider from serialized data
   * @param serializedObject - The serialized slider data
   * @param host - The host control manager
   */
  protected _parseFromContent(
    serializedObject: IImageBasedSliderSerialized,
    host: unknown
  ): void;
}