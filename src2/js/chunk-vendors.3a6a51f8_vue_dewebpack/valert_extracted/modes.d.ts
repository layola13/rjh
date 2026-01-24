/**
 * Color picker edit component - Type definitions
 * Provides color value editing in different modes (RGBA, HSLA, HEXA)
 */

import { Vue } from 'vue';
import { Color } from '../../util/colorUtils';

/**
 * Input field configuration tuple
 * [fieldName, maxValue, valueType]
 */
type InputConfig = [string, number, 'int' | 'float'];

/**
 * Color mode configuration interface
 */
interface ColorMode {
  /**
   * Input field configurations for this mode
   * Only present for modes with numeric inputs (rgba, hsla)
   */
  inputs?: InputConfig[];
  
  /**
   * Conversion function from this mode's representation to Color object
   * @param value - Color values in this mode's format
   * @param alpha - Optional alpha channel value
   * @returns Parsed Color object
   */
  from: (value: Record<string, number> | string, alpha?: number) => Color;
}

/**
 * Available color picker editing modes
 */
export const modes: {
  /** Red, Green, Blue, Alpha mode (0-255, 0-255, 0-255, 0-1) */
  rgba: ColorMode;
  
  /** Hue, Saturation, Lightness, Alpha mode (0-360, 0-1, 0-1, 0-1) */
  hsla: ColorMode;
  
  /** Hexadecimal color mode (#RRGGBB or #RRGGBBAA) */
  hexa: ColorMode;
};

/**
 * Color picker edit component props
 */
interface VColorPickerEditProps {
  /**
   * Current color object containing values in all modes
   */
  color: Color;
  
  /**
   * Whether the input fields are disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Hide the alpha channel input
   * @default false
   */
  hideAlpha?: boolean;
  
  /**
   * Hide the mode switch button
   * @default false
   */
  hideModeSwitch?: boolean;
  
  /**
   * Current editing mode
   * @default 'rgba'
   */
  mode?: 'rgba' | 'hsla' | 'hexa';
}

/**
 * Color picker edit component data
 */
interface VColorPickerEditData {
  /**
   * Reference to available color modes
   */
  modes: typeof modes;
  
  /**
   * Internal state tracking current mode
   */
  internalMode: 'rgba' | 'hsla' | 'hexa';
}

/**
 * Color picker edit component computed properties
 */
interface VColorPickerEditComputed {
  /**
   * Get the configuration for the currently active mode
   */
  currentMode: ColorMode;
}

/**
 * Color picker edit component methods
 */
interface VColorPickerEditMethods {
  /**
   * Format a color value for display based on its type
   * @param value - Raw numeric value
   * @param type - Value type ('int' or 'float')
   * @returns Formatted value
   */
  getValue(value: number, type: 'int' | 'float'): number;
  
  /**
   * Parse user input string to numeric value
   * @param value - Input string value
   * @param type - Target value type
   * @returns Parsed numeric value
   */
  parseValue(value: string, type: 'int' | 'float'): number;
  
  /**
   * Cycle to the next available color mode
   * Emits 'update:mode' event
   */
  changeMode(): void;
  
  /**
   * Generate a single input field VNode
   * @param name - Field name/key
   * @param attrs - HTML input attributes
   * @param value - Current field value
   * @param listeners - Event listeners
   * @returns VNode for input field with label
   */
  genInput(
    name: string,
    attrs: Record<string, string | number | boolean | undefined>,
    value: string | number,
    listeners: Record<string, (event: Event) => void>
  ): Vue.VNode;
  
  /**
   * Generate all input fields for current mode
   * @returns Array of input field VNodes or single hex input VNode
   */
  genInputs(): Vue.VNode | Vue.VNode[];
  
  /**
   * Generate the mode switch button
   * @returns VNode for mode switch button
   */
  genSwitch(): Vue.VNode;
}

/**
 * VColorPickerEdit component instance type
 */
export type VColorPickerEdit = Vue & 
  VColorPickerEditProps & 
  VColorPickerEditData & 
  VColorPickerEditComputed & 
  VColorPickerEditMethods;

/**
 * VColorPickerEdit component definition
 */
declare const VColorPickerEditComponent: {
  new (): VColorPickerEdit;
};

export default VColorPickerEditComponent;