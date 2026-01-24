/**
 * VSwitch Component Type Definitions
 * A customizable switch/toggle component for Vue.js
 * 
 * @module VSwitch
 * @see {@link https://vuetifyjs.com/components/selection-controls#switches}
 */

import Vue, { VNode } from 'vue';
import { VInput } from '../VInput';

/**
 * Color validation state type
 * Represents the visual state of the switch component
 */
export type ValidationState = 'error' | 'success' | string | null | undefined;

/**
 * Loading property type
 * Can be a boolean flag or a string representing a color
 */
export type LoadingType = boolean | string;

/**
 * Touch gesture direction
 */
export type SwipeDirection = 'left' | 'right';

/**
 * Touch directive value configuration
 */
export interface TouchDirectiveValue {
  /** Handler for left swipe gesture */
  left?: () => void;
  /** Handler for right swipe gesture */
  right?: () => void;
}

/**
 * Switch data attributes for styling and theming
 */
export interface SwitchData {
  /** CSS class bindings including theme classes */
  class?: Record<string, boolean> | string | string[];
  /** Additional data attributes */
  [key: string]: any;
}

/**
 * Computed classes for the VSwitch component
 */
export interface VSwitchClasses {
  /** Base selection controls class */
  'v-input--selection-controls'?: boolean;
  /** Base switch class */
  'v-input--switch'?: boolean;
  /** Flat variant styling */
  'v-input--switch--flat'?: boolean;
  /** Inset variant styling */
  'v-input--switch--inset'?: boolean;
  /** Additional classes from parent VInput */
  [key: string]: boolean | undefined;
}

/**
 * ARIA attributes for accessibility
 */
export interface SwitchAttrs {
  /** Indicates whether the switch is checked */
  'aria-checked': string;
  /** Indicates whether the switch is disabled */
  'aria-disabled': string;
  /** ARIA role for screen readers */
  role: 'switch';
}

/**
 * VSwitch Component Props
 */
export interface VSwitchProps {
  /**
   * Reduces the component's width and increases thumb size
   * @default false
   */
  inset?: boolean;

  /**
   * Displays a circular progress indicator inside the switch thumb
   * Can be a boolean to show/hide or a string to specify the color
   * @default false
   */
  loading?: LoadingType;

  /**
   * Removes elevation (box-shadow) from the component
   * @default false
   */
  flat?: boolean;
}

/**
 * VSwitch Component Methods
 */
export interface VSwitchMethods {
  /**
   * Generates the default slot content (switch + label)
   * @returns Array of VNodes representing the switch and label
   */
  genDefaultSlot(): VNode[];

  /**
   * Generates the switch input and visual elements
   * @returns VNode containing the complete switch structure
   */
  genSwitch(): VNode;

  /**
   * Generates the loading progress indicator
   * @returns VNode containing the VProgressCircular component or slot content
   */
  genProgress(): VNode;

  /**
   * Handler for left swipe gesture
   * Turns off the switch if currently active
   */
  onSwipeLeft(): void;

  /**
   * Handler for right swipe gesture
   * Turns on the switch if currently inactive
   */
  onSwipeRight(): void;

  /**
   * Keyboard event handler for arrow key navigation
   * @param event - KeyboardEvent from user interaction
   */
  onKeydown(event: KeyboardEvent): void;
}

/**
 * VSwitch Component Computed Properties
 */
export interface VSwitchComputed {
  /**
   * Merged CSS classes for the component
   * Combines parent VInput classes with switch-specific classes
   */
  classes: VSwitchClasses;

  /**
   * ARIA attributes for accessibility support
   */
  attrs: SwitchAttrs;

  /**
   * Current validation state based on validation rules
   * Returns 'error', 'success', computed color, or undefined
   */
  validationState: ValidationState;

  /**
   * Data object for switch track and thumb styling
   * Includes theme classes and text color bindings
   */
  switchData: SwitchData;
}

/**
 * VSwitch Component Instance
 * 
 * A Material Design switch component that extends VInput.
 * Provides toggle functionality with support for:
 * - Loading states with progress indicators
 * - Touch gestures (swipe left/right)
 * - Keyboard navigation (arrow keys)
 * - Flat and inset visual variants
 * - Full accessibility support
 * 
 * @example
 *