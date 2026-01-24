import { Direction } from './Direction';
import { DrawParams } from './DrawParams';
import { Dimension, CornerJoiner, Connector, SubFrame } from './CommonTypes';

/**
 * Size dimension class for measuring width or height of shapes.
 * Extends the base Dimension class to provide specific sizing functionality.
 */
export declare class SizeDim extends Dimension {
  /**
   * The shape this dimension is measuring
   */
  shape: any;

  /**
   * Whether this dimension is hidden from view
   */
  hidden: boolean;

  /**
   * The margin/offset distance from the shape edge
   */
  margin: number;

  /**
   * Internal flag for height measurement mode
   * @private
   */
  private _forHeight: boolean;

  /**
   * The direction/position of the dimension line relative to the shape
   */
  position: Direction;

  /**
   * Creates a new SizeDim instance
   * @param shape - The shape to measure
   * @param forHeight - True to measure height, false to measure width (default: true)
   * @param hidden - Whether the dimension should be hidden (default: false)
   * @param margin - The offset distance from shape edge (default: calculated from font size)
   */
  constructor(
    shape: any,
    forHeight?: boolean,
    hidden?: boolean,
    margin?: number
  );

  /**
   * Gets whether this dimension measures height (true) or width (false)
   */
  get forHeight(): boolean;

  /**
   * Sets whether this dimension measures height or width.
   * Automatically updates position: Left for height, Down for width
   */
  set forHeight(value: boolean);

  /**
   * Calculates and sets the dimension line start/end points based on shape bounds,
   * measurement direction (height/width), and position settings
   */
  locate(): void;

  /**
   * Handles edit events by delegating to shape's width or height edit handler
   * @param value - The new dimension value
   */
  onEdit(value: number): void;

  /**
   * Clones properties from another SizeDim instance
   * @param source - The source dimension to clone from
   * @returns This instance for chaining
   */
  cloneFrom(source: SizeDim): this;

  /**
   * Serializes this dimension to a JSON-compatible object
   * @returns Plain object representation including position
   */
  toJSON(): {
    position: Direction;
    [key: string]: any;
  };

  /**
   * Deserializes dimension data from a plain object
   * @param data - The serialized dimension data
   */
  deserialize(data: { position: Direction; [key: string]: any }): void;
}