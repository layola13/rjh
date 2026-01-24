import type { VNode } from 'vue';
import type { DirectiveOptions } from 'vue';
import type { PropType } from 'vue';

/**
 * Direction type for VSpeedDial component
 */
export type SpeedDialDirection = 'top' | 'right' | 'bottom' | 'left';

/**
 * Props interface for VSpeedDial component
 */
export interface VSpeedDialProps {
  /**
   * Direction in which the speed dial menu items will appear
   * @default 'top'
   */
  direction?: SpeedDialDirection;

  /**
   * Whether to open the speed dial on hover instead of click
   * @default false
   */
  openOnHover?: boolean;

  /**
   * Transition name to use when opening/closing
   * @default 'scale-transition'
   */
  transition?: string;

  /**
   * Position the component at the top
   * @default false
   */
  top?: boolean;

  /**
   * Position the component at the right
   * @default false
   */
  right?: boolean;

  /**
   * Position the component at the bottom
   * @default false
   */
  bottom?: boolean;

  /**
   * Position the component at the left
   * @default false
   */
  left?: boolean;

  /**
   * Position the component with absolute positioning
   * @default false
   */
  absolute?: boolean;

  /**
   * Position the component with fixed positioning
   * @default false
   */
  fixed?: boolean;

  /**
   * Controls whether the speed dial is active/open
   * @default false
   */
  isActive?: boolean;

  /**
   * Transition mode
   */
  mode?: string;

  /**
   * Transition origin
   */
  origin?: string;
}

/**
 * Computed classes for VSpeedDial component
 */
export interface VSpeedDialClasses {
  'v-speed-dial': boolean;
  'v-speed-dial--top': boolean;
  'v-speed-dial--right': boolean;
  'v-speed-dial--bottom': boolean;
  'v-speed-dial--left': boolean;
  'v-speed-dial--absolute': boolean;
  'v-speed-dial--fixed': boolean;
  'v-speed-dial--is-active': boolean;
  [key: `v-speed-dial--direction-${SpeedDialDirection}`]: boolean;
}

/**
 * Slots for VSpeedDial component
 */
export interface VSpeedDialSlots {
  /**
   * Slot for the activator button that triggers the speed dial
   */
  activator?: VNode[];

  /**
   * Default slot for speed dial action buttons
   */
  default?: VNode[];
}

/**
 * VSpeedDial component
 * 
 * A floating action button that displays additional actions in a menu on activation.
 * Combines toggleable, positionable, and transitionable mixins.
 * 
 * @example
 *