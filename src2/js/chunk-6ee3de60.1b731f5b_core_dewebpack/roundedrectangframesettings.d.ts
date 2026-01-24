import type { Vector } from './vector';
import type { FrameSettings } from './frame-settings';
import type { RoundedRectanglePolygon } from './rounded-rectangle-polygon';
import type { Frame } from './frame';
import type { View } from './view';

/**
 * Settings interface for rounded rectangle frames.
 * Manages geometric properties and tangency behavior of rounded rectangular frame shapes.
 */
export interface RoundedRectangFrameSettings extends FrameSettings {
  /**
   * Reference to the underlying frame object.
   */
  frame: Frame;

  /**
   * Reference to the current view context.
   */
  view: View;

  /**
   * Gets the polygon geometry associated with this frame.
   * @readonly
   */
  readonly poly: RoundedRectanglePolygon;

  /**
   * Gets or sets the height of the rounded rectangle frame.
   * The height must be greater than twice the border radius.
   * Setting this value triggers frame recreation and view updates.
   * @remarks Value is rounded to 2 decimal places when reading.
   */
  height: number;

  /**
   * Gets or sets the width of the rounded rectangle frame.
   * The width must be greater than twice the border radius.
   * Setting this value triggers frame recreation and view updates.
   * @remarks Value is rounded to 2 decimal places when reading.
   */
  width: number;

  /**
   * Gets or sets the border radius of the rounded corners.
   * The radius must satisfy:
   * - Greater than or equal to frame profile size × √2
   * - Less than or equal to half the height
   * - Less than or equal to half the width
   * Setting this value triggers frame recreation and view updates.
   */
  borderRadius: number;

  /**
   * Gets or sets whether the rounded corners are tangent to the frame profile.
   * When enabled (true), dimension indicators at corners (indices 1, 3, 5, 7) are hidden.
   * When disabled (false), all dimension indicators are shown.
   * Changing this value triggers polygon recreation and dimension updates.
   */
  isTangency: boolean;
}

/**
 * Concrete implementation of rounded rectangle frame settings.
 * Extends base FrameSettings with rounded rectangle-specific geometry management.
 */
export declare class RoundedRectangFrameSettings implements RoundedRectangFrameSettings {
  /**
   * Creates an instance of RoundedRectangFrameSettings.
   * Inherits constructor behavior from FrameSettings base class.
   */
  constructor();
}