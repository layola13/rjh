/**
 * VSlider component module
 * 
 * This module exports the VSlider component, which provides a vertical slider UI control.
 * 
 * @module VSlider
 * @packageDocumentation
 */

/**
 * VSlider component class
 * 
 * A vertical slider component that allows users to select a value from a range
 * by dragging a handle along a vertical track.
 * 
 * @public
 */
export declare class VSlider {
  /**
   * Creates a new VSlider instance
   * 
   * @param options - Configuration options for the slider
   */
  constructor(options?: VSliderOptions);
}

/**
 * Configuration options for VSlider component
 * 
 * @public
 */
export interface VSliderOptions {
  /**
   * Minimum value of the slider range
   * @defaultValue 0
   */
  min?: number;
  
  /**
   * Maximum value of the slider range
   * @defaultValue 100
   */
  max?: number;
  
  /**
   * Current value of the slider
   * @defaultValue 0
   */
  value?: number;
  
  /**
   * Step increment for value changes
   * @defaultValue 1
   */
  step?: number;
}

/**
 * Default export of VSlider component
 * 
 * @public
 */
export default VSlider;