import Vue, { VueConstructor } from 'vue';
import { VNode } from 'vue/types/vnode';

/**
 * VBtnToggle component props interface
 * Defines the properties available for the button toggle component
 */
interface VBtnToggleProps {
  /** Background color for the toggle group */
  backgroundColor?: string;
  /** Removes borders from the toggle buttons */
  borderless?: boolean;
  /** Applies a more compact layout */
  dense?: boolean;
  /** Applies group styling to the toggle buttons */
  group?: boolean;
  /** Applies rounded corners to the toggle buttons */
  rounded?: boolean;
  /** Applies shaped styling to the toggle buttons */
  shaped?: boolean;
  /** Removes border radius, making corners square */
  tile?: boolean;
  /** Color theme for the component */
  color?: string;
  /** Model value for the toggle state */
  value?: any;
  /** Allows multiple selection */
  multiple?: boolean;
  /** Makes the toggle group mandatory (at least one must be selected) */
  mandatory?: boolean;
  /** Maximum number of selections allowed */
  max?: number;
}

/**
 * VBtnToggle computed properties interface
 */
interface VBtnToggleComputed {
  /** Combined CSS classes for the component */
  classes: Record<string, boolean>;
  /** Theme classes (light/dark) */
  themeClasses: Record<string, boolean>;
}

/**
 * VBtnToggle methods interface
 */
interface VBtnToggleMethods {
  /**
   * Generates the data object for the component render
   * Applies color and background color based on component state
   * @returns VNode data object with applied colors and classes
   */
  genData(): Record<string, any>;
  
  /**
   * Sets text color on the data object
   * @param color - Color value to apply
   * @param data - VNode data object to modify
   * @returns Modified data object with text color applied
   */
  setTextColor(color: string | undefined, data: Record<string, any>): Record<string, any>;
  
  /**
   * Sets background color on the data object
   * @param color - Background color value to apply
   * @param data - VNode data object to modify
   * @returns Modified data object with background color applied
   */
  setBackgroundColor(color: string | undefined, data: Record<string, any>): Record<string, any>;
}

/**
 * VBtnToggle component type definition
 * A toggle component that groups buttons together for single or multiple selection
 * 
 * @example
 *