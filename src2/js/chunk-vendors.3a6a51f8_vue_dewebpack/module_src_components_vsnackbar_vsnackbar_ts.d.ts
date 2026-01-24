/**
 * VSnackbar component for Vuetify
 * Displays temporary notifications to users
 * @module VSnackbar
 */

import Vue, { VNode, CreateElement } from 'vue';
import VSheet from '../VSheet/VSheet';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
import Toggleable from '../../mixins/toggleable';
import { factory as positionableFactory } from '../../mixins/positionable';
import { convertToUnit, getSlot } from '../../util/helpers';
import { removed, deprecate } from '../../util/console';

/**
 * Position options for the snackbar
 */
type PositionProps = 'absolute' | 'bottom' | 'left' | 'right' | 'top';

/**
 * Vuetify application layout properties
 */
interface VuetifyApplication {
  /** App bar height */
  bar: number;
  /** Bottom navigation height */
  bottom: number;
  /** Footer height */
  footer: number;
  /** Inset footer height */
  insetFooter: number;
  /** Left navigation width */
  left: number;
  /** Right navigation width */
  right: number;
  /** Top toolbar height */
  top: number;
}

/**
 * Component data structure
 */
interface VSnackbarData {
  /** Active timeout ID for auto-hide functionality */
  activeTimeout: number;
}

/**
 * Computed class bindings for the snackbar
 */
interface VSnackbarClasses {
  'v-snack--absolute': boolean;
  'v-snack--active': boolean;
  'v-snack--bottom': boolean;
  'v-snack--centered': boolean;
  'v-snack--has-background': boolean;
  'v-snack--left': boolean;
  'v-snack--multi-line': boolean;
  'v-snack--right': boolean;
  'v-snack--text': boolean;
  'v-snack--top': boolean;
  'v-snack--vertical': boolean;
}

/**
 * Style properties for the snackbar container
 */
interface VSnackbarStyles {
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
}

/**
 * Props for VSnackbar component
 */
interface VSnackbarProps {
  /** Position snackbar absolutely */
  app?: boolean;
  /** Center the snackbar horizontally */
  centered?: boolean;
  /** CSS class to apply to content wrapper */
  contentClass?: string;
  /** Enable multi-line layout */
  multiLine?: boolean;
  /** Use text styling (transparent background) */
  text?: boolean;
  /** Auto-hide timeout in milliseconds (-1 to disable, 0 deprecated) */
  timeout?: number | string;
  /** Transition name or false to disable */
  transition?: boolean | string;
  /** Enable vertical layout */
  vertical?: boolean;
  /** Inherited from Colorable */
  color?: string;
  /** Inherited from Themeable */
  light?: boolean;
  dark?: boolean;
  /** Inherited from Toggleable */
  isActive?: boolean;
  /** Inherited from VSheet */
  outlined?: boolean;
  /** Inherited from Positionable */
  absolute?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
}

/**
 * Slot scope for action slot
 */
interface ActionSlotScope {
  attrs: {
    class: string;
  };
}

/**
 * VSnackbar component instance type
 */
declare const VSnackbar: Vue & {
  // Props
  app: boolean;
  centered: boolean;
  contentClass: string;
  multiLine: boolean;
  text: boolean;
  timeout: number | string;
  transition: boolean | string;
  vertical: boolean;
  color?: string;
  light?: boolean;
  outlined?: boolean;
  isActive: boolean;
  absolute?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;

  // Data
  activeTimeout: number;

  // Computed
  readonly classes: VSnackbarClasses;
  readonly hasBackground: boolean;
  readonly isDark: boolean;
  readonly styles: VSnackbarStyles;

  // Methods
  /**
   * Generate the action button wrapper element
   * @returns VNode containing action slot content
   */
  genActions(): VNode;

  /**
   * Generate the content wrapper element
   * @returns VNode containing main slot content
   */
  genContent(): VNode;

  /**
   * Generate the snackbar wrapper with background and styling
   * @returns VNode with applied colors and classes
   */
  genWrapper(): VNode;

  /**
   * Generate the transition wrapper if enabled
   * @returns VNode with transition or wrapper directly
   */
  genTransition(): VNode;

  /**
   * Set or clear the auto-hide timeout
   * Called when isActive or timeout changes
   */
  setTimeout(): void;

  // Vuetify internals
  $vuetify: {
    application: VuetifyApplication;
  };
  setBackgroundColor(color: string | undefined, data: any): any;
  setTextColor(color: string | undefined, data: any): any;
};

export default VSnackbar;