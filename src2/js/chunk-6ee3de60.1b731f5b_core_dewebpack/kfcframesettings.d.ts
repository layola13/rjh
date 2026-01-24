/**
 * KFC Frame Settings Module
 * Provides configuration and management for KFC polygon frames
 */

import { Kfc3Polygon } from './Kfc3Polygon';
import { FrameSettings } from './FrameSettings';
import { Polygon } from './Polygon';
import { View } from './View';
import { Frame } from './Frame';
import { Layer } from './Layer';
import { MomentoManager } from './MomentoManager';
import { FrameManager } from './FrameManager';

/**
 * KFC Frame Settings class
 * Extends base FrameSettings with KFC-specific polygon configuration
 */
export declare class KfcFrameSettings extends FrameSettings {
  /**
   * Reference to the frame being configured
   */
  protected frame: Frame;

  /**
   * Reference to the current view
   */
  protected view: View;

  /**
   * Gets the polygon associated with this frame
   * @returns The frame's polygon instance
   */
  get poly(): Polygon;

  /**
   * Gets the hidden sides configuration of the polygon
   * @returns Array or bitmask representing hidden sides
   */
  get hiddenSides(): number | number[];

  /**
   * Sets which sides of the polygon should be hidden
   * Triggers polygon re-initialization, frame recreation, and view update
   * @param value - Hidden sides configuration
   */
  set hiddenSides(value: number | number[]);

  /**
   * Gets the bottom inner dimension for KFC3 polygons
   * @returns Bottom inner dimension value, or undefined if not a Kfc3Polygon
   */
  get bottomInnerDim(): number | undefined;

  /**
   * Sets the bottom inner dimension for KFC3 polygons
   * Updates polygon geometry and refreshes the view
   * @param value - New bottom inner dimension value
   */
  set bottomInnerDim(value: number);

  /**
   * Constructor
   * Inherits from FrameSettings base class
   */
  constructor();
}