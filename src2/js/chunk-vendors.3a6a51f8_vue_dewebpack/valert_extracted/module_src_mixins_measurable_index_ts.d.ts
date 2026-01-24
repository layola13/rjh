import Vue from 'vue';

/**
 * Measurable mixin interface
 * Provides dimension-related properties and computed styles for Vue components
 */
export interface MeasurableMixin extends Vue {
  /** Component height */
  height?: number | string;
  /** Maximum height constraint */
  maxHeight?: number | string;
  /** Maximum width constraint */
  maxWidth?: number | string;
  /** Minimum height constraint */
  minHeight?: number | string;
  /** Minimum width constraint */
  minWidth?: number | string;
  /** Component width */
  width?: number | string;
  
  /**
   * Computed styles object containing all measurable dimensions
   * Converts numeric values to CSS units automatically
   */
  readonly measurableStyles: MeasurableStyles;
}

/**
 * CSS styles object for measurable dimensions
 */
export interface MeasurableStyles {
  height?: string;
  minHeight?: string;
  minWidth?: string;
  maxHeight?: string;
  maxWidth?: string;
  width?: string;
}

/**
 * Measurable mixin for Vue components
 * Provides props and computed properties for controlling component dimensions
 * 
 * @example
 *