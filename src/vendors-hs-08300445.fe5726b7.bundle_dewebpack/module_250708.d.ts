/**
 * Slider component module providing range slider functionality with tooltips
 * @module SliderModule
 */

import type Slider from './slider';
import type Handle from './handle';
import type Range from './range';
import type SliderTooltip from './slider-tooltip';
import type { createSliderWithTooltip } from './create-slider-with-tooltip';

/**
 * Named export: Handle component for slider control points
 */
export { Handle };

/**
 * Named export: Range component for multi-value slider ranges
 */
export { Range };

/**
 * Named export: SliderTooltip component for displaying value tooltips
 */
export { SliderTooltip };

/**
 * Named export: Factory function to create a slider with integrated tooltip functionality
 * @param Component - The base slider component to enhance
 * @returns Enhanced slider component with tooltip support
 */
export { createSliderWithTooltip };

/**
 * Extended Slider interface with additional components attached as static properties
 */
export interface SliderWithComponents extends typeof Slider {
  /**
   * Range component for creating multi-handle range sliders
   */
  Range: typeof Range;
  
  /**
   * Handle component for individual slider control points
   */
  Handle: typeof Handle;
  
  /**
   * Factory function to wrap slider components with tooltip functionality
   */
  createSliderWithTooltip: typeof createSliderWithTooltip;
}

/**
 * Default export: Main slider component with attached sub-components
 * Provides a complete slider solution with range, handle, and tooltip capabilities
 */
declare const SliderModule: SliderWithComponents;

export default SliderModule;