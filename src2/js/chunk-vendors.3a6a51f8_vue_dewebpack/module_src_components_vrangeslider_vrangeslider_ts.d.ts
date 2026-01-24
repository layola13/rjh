/**
 * VRangeSlider Component Type Definitions
 * A range slider component that extends VSlider with dual thumb controls
 */

import Vue, { VNode } from 'vue';
import VSlider from '../VSlider';

/**
 * Range value tuple type [min, max]
 */
export type RangeValue = [number, number];

/**
 * Thumb identifier (0 = min thumb, 1 = max thumb)
 */
export type ThumbIndex = 0 | 1 | null;

/**
 * Track segment configuration for rendering
 */
interface TrackSegmentConfig {
  /** CSS class name for the track segment */
  class: string;
  /** Color of the track segment */
  color: string;
  /** Style parameters: [startPercent, widthPercent, startOffset, endOffset] */
  styles: [number, number, number, number];
}

/**
 * Mouse/touch event parsing result
 */
interface ParsedMouseEvent {
  /** Computed slider value from pointer position */
  value: number;
  /** Whether the pointer is within the track bounds */
  isInsideTrack: boolean;
}

/**
 * VRangeSlider Component
 * 
 * Extends VSlider to provide a dual-thumb range selection slider.
 * Supports vertical/horizontal orientation, RTL layouts, and all base slider features.
 * 
 * @example
 *