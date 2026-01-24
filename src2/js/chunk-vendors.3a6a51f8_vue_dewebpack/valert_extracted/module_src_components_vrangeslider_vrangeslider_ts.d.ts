/**
 * VRangeSlider Component Type Definitions
 * A range slider component that extends VSlider with dual thumb controls
 */

import Vue, { VNode } from 'vue';
import VSlider from '../VSlider';

/**
 * Range value type - tuple of two numbers representing min and max values
 */
export type RangeValue = [number, number];

/**
 * Thumb index type - identifies which thumb is active (0 for min, 1 for max)
 */
export type ThumbIndex = 0 | 1 | null;

/**
 * Track segment configuration for rendering track sections
 */
interface TrackSegment {
  /** CSS class name for the track segment */
  class: string;
  /** Color of the track segment */
  color: string;
  /** Style parameters: [start%, width%, startOffset, widthOffset] */
  styles: [number, number, number, number];
}

/**
 * Mouse move parse result
 */
interface ParsedMouseMove {
  /** The calculated value from mouse position */
  value: number;
  /** Whether the mouse is inside the track bounds */
  isInsideTrack: boolean;
}

/**
 * Component data interface
 */
interface VRangeSliderData {
  /** Currently active thumb index (0 or 1), null if none */
  activeThumb: ThumbIndex;
  /** Internal lazy value for the range */
  lazyValue: RangeValue;
}

/**
 * Component computed properties interface
 */
interface VRangeSliderComputed {
  /** Combined CSS classes including parent VSlider classes */
  classes: Record<string, boolean>;
  /** Internal value with getter/setter for range synchronization */
  internalValue: RangeValue;
  /** Array of percentage widths for each thumb position */
  inputWidth: [number, number];
}

/**
 * Component methods interface
 */
interface VRangeSliderMethods {
  /**
   * Generate CSS styles for a track segment
   * @param startPercent - Starting position as percentage (0-100)
   * @param widthPercent - Width as percentage (0-100)
   * @param startOffset - Starting position offset in pixels
   * @param widthOffset - Width offset in pixels
   * @returns CSS style object with transition, position, and dimension properties
   */
  getTrackStyle(
    startPercent: number,
    widthPercent: number,
    startOffset?: number,
    widthOffset?: number
  ): Record<string, string>;

  /**
   * Determine which thumb is closest to a given value
   * @param rangeValues - Current [min, max] values
   * @param targetValue - Value to compare against
   * @returns Index of the closest thumb (0 for min, 1 for max)
   */
  getIndexOfClosestValue(rangeValues: RangeValue, targetValue: number): ThumbIndex;

  /**
   * Generate hidden input elements for each thumb
   * @returns Array of two VNode input elements
   */
  genInput(): VNode[];

  /**
   * Generate the track container with background and fill segments
   * @returns VNode containing all track segment elements
   */
  genTrackContainer(): VNode;

  /**
   * Generate all child elements (inputs, track, steps, thumbs)
   * @returns Array of child VNodes
   */
  genChildren(): VNode[];

  /**
   * Handle click events on the slider track
   * @param event - Mouse event from click
   */
  onSliderClick(event: MouseEvent): void;

  /**
   * Handle mouse move events during dragging
   * @param event - Mouse event from movement
   */
  onMouseMove(event: MouseEvent): void;

  /**
   * Handle keyboard navigation events
   * @param event - Keyboard event
   */
  onKeyDown(event: KeyboardEvent): void;

  /**
   * Update the internal value for the active thumb
   * @param newValue - New value to set for the active thumb
   */
  setInternalValue(newValue: number): void;

  /**
   * Parse mouse move event (inherited from VSlider)
   * @param event - Mouse event
   * @returns Parsed value and track state
   */
  parseMouseMove(event: MouseEvent): ParsedMouseMove;

  /**
   * Parse keyboard event (inherited from VSlider)
   * @param event - Keyboard event
   * @param currentValue - Current thumb value
   * @returns New value or null if key not handled
   */
  parseKeyDown(event: KeyboardEvent, currentValue: number): number | null;

  /**
   * Round value according to step (inherited from VSlider)
   * @param value - Value to round
   * @returns Rounded value
   */
  roundValue(value: number): number;

  /**
   * Validate the current value (inherited from VSlider)
   */
  validate(): void;

  /**
   * Generate thumb container element (inherited from VSlider)
   */
  genThumbContainer(
    value: number,
    position: number,
    isActive: boolean,
    isFocused: boolean,
    onMouseDown: (event: MouseEvent) => void,
    onFocus: (event: FocusEvent) => void,
    onBlur: (event: FocusEvent) => void,
    refName: string
  ): VNode;

  /**
   * Handle thumb mouse down event (inherited from VSlider)
   */
  onThumbMouseDown(event: MouseEvent): void;

  /**
   * Generate step markers (inherited from VSlider)
   */
  genSteps(): VNode;

  /**
   * Set background color utility (inherited from VSlider)
   */
  setBackgroundColor(color: string, data: Record<string, unknown>): Record<string, unknown>;
}

/**
 * Component props interface
 */
interface VRangeSliderProps {
  /** Range value as [min, max] tuple */
  value: RangeValue;
  /** Inherited props from VSlider */
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  readonly?: boolean;
  vertical?: boolean;
  thumbLabel?: boolean | string;
  thumbSize?: number | string;
  tickLabels?: string[];
  ticks?: boolean | string;
  trackColor?: string;
  trackFillColor?: string;
}

/**
 * VRangeSlider Component
 * 
 * A dual-thumb range slider component for selecting a numeric range.
 * Extends VSlider with support for two independent thumb controls.
 * 
 * @example
 *