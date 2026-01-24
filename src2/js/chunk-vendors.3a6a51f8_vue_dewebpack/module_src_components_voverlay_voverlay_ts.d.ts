/**
 * VOverlay Component Type Definitions
 * A component that displays an overlay/scrim layer with configurable opacity and color
 */

import Vue, { VNode, CreateElement } from 'vue';
import { CombinedVueInstance } from 'vue/types/vue';

/**
 * Props interface for VOverlay component
 */
interface VOverlayProps {
  /**
   * Applies position: absolute to the overlay
   * @default false
   */
  absolute?: boolean;

  /**
   * Background color of the overlay scrim
   * @default "#212121"
   */
  color?: string;

  /**
   * Applies dark theme variant
   * @default true
   */
  dark?: boolean;

  /**
   * Opacity of the overlay when active
   * @default 0.46
   */
  opacity?: number | string;

  /**
   * Controls whether the overlay is visible
   * @default true
   */
  value?: boolean;

  /**
   * Z-index of the overlay
   * @default 5
   */
  zIndex?: number | string;
}

/**
 * Computed properties interface
 */
interface VOverlayComputed {
  /**
   * Internal scrim element VNode
   */
  __scrim: VNode;

  /**
   * CSS classes for the overlay container
   */
  classes: Record<string, boolean>;

  /**
   * Computed opacity value based on active state
   */
  computedOpacity: number;

  /**
   * Inline styles for the overlay
   */
  styles: {
    zIndex: number | string;
  };

  /**
   * Whether the overlay is currently active (from toggleable mixin)
   */
  isActive: boolean;

  /**
   * Theme classes (from themeable mixin)
   */
  themeClasses: Record<string, boolean>;
}

/**
 * Methods interface
 */
interface VOverlayMethods {
  /**
   * Generates the content wrapper element
   * @returns VNode containing slot content
   */
  genContent(): VNode;

  /**
   * Sets background color with optional data object (from colorable mixin)
   * @param color - The color to apply
   * @param data - Optional VNode data object
   * @returns Modified VNode data object
   */
  setBackgroundColor(color: string, data?: Record<string, any>): Record<string, any>;
}

/**
 * VOverlay Component Instance Type
 */
export type VOverlay = CombinedVueInstance<
  Vue,
  {},
  VOverlayMethods,
  VOverlayComputed,
  VOverlayProps
>;

/**
 * VOverlay Component Constructor
 */
declare const VOverlay: {
  new (): VOverlay;
};

export default VOverlay;