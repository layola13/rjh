import type { VNode } from 'vue';
import type { PropType } from 'vue';

/**
 * Scoped slot parameters for picker default slot
 */
export interface PickerScopedSlotParams {
  /** Function to save the picker value */
  save: () => void;
  /** Function to cancel the picker operation */
  cancel: () => void;
}

/**
 * Picker mixin props definition
 */
export interface PickerProps {
  /** Removes the picker's elevation shadow */
  flat: boolean;
  /** Forces the picker to take up full available width */
  fullWidth: boolean;
  /** Defines the header background color */
  headerColor?: string;
  /** Orients the picker horizontally */
  landscape: boolean;
  /** Hides the picker title/header section */
  noTitle: boolean;
  /** Sets the width of the picker */
  width: number | string;
}

/**
 * Picker mixin methods
 */
export interface PickerMethods {
  /**
   * Generates the picker title element
   * @returns VNode for the title or null if no title should be rendered
   */
  genPickerTitle(): VNode | null;

  /**
   * Generates the main body content of the picker
   * @returns VNode for the body or null if no body should be rendered
   */
  genPickerBody(): VNode | null;

  /**
   * Generates the actions slot content from default scoped slot or regular slot
   * @returns VNode array for the actions area
   */
  genPickerActionsSlot(): VNode | VNode[] | undefined;

  /**
   * Generates the complete picker component with all sections
   * @param staticClass - CSS class to apply to the root picker element
   * @returns VNode for the complete picker component
   */
  genPicker(staticClass: string): VNode;

  /** Saves the current picker value (implementation provided by consumer) */
  save(): void;

  /** Cancels the picker operation (implementation provided by consumer) */
  cancel(): void;
}

/**
 * Picker mixin combining colorable, elevatable, and themeable behaviors
 * 
 * Provides base functionality for picker-style components including:
 * - Configurable header with optional color
 * - Landscape/portrait orientation support
 * - Optional title section
 * - Actions slot for save/cancel buttons
 * - Elevation and theming support
 * 
 * @example
 *