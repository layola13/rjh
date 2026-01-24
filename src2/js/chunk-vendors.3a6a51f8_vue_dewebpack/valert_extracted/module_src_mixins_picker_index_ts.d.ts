/**
 * Picker mixin for Vuetify components
 * Provides common functionality for picker-type components (date picker, time picker, etc.)
 */

import Vue, { VNode, CreateElement, ScopedSlot } from 'vue';
import VPicker from '../../components/VPicker';
import Colorable from '../colorable';
import Elevatable from '../elevatable';
import Themeable from '../themeable';

/**
 * Scoped slot props for picker actions
 */
export interface PickerActionsSlotProps {
  /** Save handler function */
  save: () => void;
  /** Cancel handler function */
  cancel: () => void;
}

/**
 * Props interface for Picker mixin
 */
export interface PickerProps {
  /** Removes elevation shadow */
  flat: boolean;
  /** Forces component to take full available width */
  fullWidth: boolean;
  /** Defines header background color */
  headerColor?: string;
  /** Orients picker horizontally */
  landscape: boolean;
  /** Hides picker title section */
  noTitle: boolean;
  /** Width of the picker in pixels */
  width: number | string;
}

/**
 * Methods interface for Picker mixin
 */
export interface PickerMethods {
  /**
   * Generates the title section of the picker
   * @returns VNode or null if no title should be rendered
   */
  genPickerTitle(): VNode | null;

  /**
   * Generates the main body content of the picker
   * @returns VNode or null if no body should be rendered
   */
  genPickerBody(): VNode | null;

  /**
   * Generates the actions slot content (e.g., save/cancel buttons)
   * @returns VNode array from scoped slot or default slot
   */
  genPickerActionsSlot(): VNode | VNode[] | undefined;

  /**
   * Generates the complete picker component
   * @param staticClass - CSS class to apply to the picker root element
   * @returns VNode of the complete picker component
   */
  genPicker(staticClass: string): VNode;

  /** Save action handler */
  save(): void;

  /** Cancel action handler */
  cancel(): void;
}

/**
 * Picker mixin combining colorable, elevatable, and themeable behaviors
 * Used as base for date pickers, time pickers, and similar selection components
 */
declare const Picker: Vue & PickerProps & PickerMethods;

export default Picker;