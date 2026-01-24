/**
 * VPicker component module
 * Provides picker functionality for selecting values from a list
 */

/**
 * VPicker component class or interface
 * Main picker component for value selection
 */
export declare class VPicker {
  /**
   * Creates a new VPicker instance
   * @param options - Configuration options for the picker
   */
  constructor(options?: VPickerOptions);
}

/**
 * Configuration options for VPicker component
 */
export interface VPickerOptions {
  /**
   * Initial selected value
   */
  value?: unknown;
  
  /**
   * Available items to pick from
   */
  items?: unknown[];
  
  /**
   * Whether the picker is disabled
   */
  disabled?: boolean;
  
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * Additional HTML attributes
   */
  attrs?: Record<string, unknown>;
}

/**
 * Default export of VPicker component
 */
export default VPicker;

/**
 * Named export of VPicker component
 */
export { VPicker };