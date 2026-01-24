/**
 * VToolbar Component Type Definitions
 * A versatile toolbar component with support for various layouts, styles, and extensions
 */

import Vue, { VNode, PropType, CreateElement } from 'vue';
import { VSheet } from '../VSheet/VSheet';

/**
 * Background image properties for toolbar
 */
export interface VToolbarImageProps {
  /** Height of the background image */
  height: string | number;
  /** Source URL or object for the background image */
  src: string | object;
}

/**
 * Scoped slot properties for custom image rendering
 */
export interface VToolbarImageSlotProps {
  props: VToolbarImageProps;
}

/**
 * VToolbar component props interface
 */
export interface VToolbarProps {
  /** Positions the toolbar absolutely */
  absolute?: boolean;
  /** Aligns the toolbar to the bottom */
  bottom?: boolean;
  /** Collapses the toolbar height */
  collapse?: boolean;
  /** Reduces the toolbar height */
  dense?: boolean;
  /** Extends the toolbar with an extension slot */
  extended?: boolean;
  /** Height of the extension area in pixels */
  extensionHeight?: number | string;
  /** Removes the toolbar shadow */
  flat?: boolean;
  /** Applies a floating style */
  floating?: boolean;
  /** Increases the toolbar height */
  prominent?: boolean;
  /** Applies short height variant */
  short?: boolean;
  /** Background image source (URL string or image object) */
  src?: string | object;
  /** HTML tag to use for the root element */
  tag?: string;
  /** Toolbar color (theme color name or hex/rgb) */
  color?: string;
  /** Explicit height override */
  height?: number | string;
}

/**
 * VToolbar component data interface
 */
export interface VToolbarData {
  /** Internal state tracking if toolbar is currently extended */
  isExtended: boolean;
}

/**
 * VToolbar component computed properties interface
 */
export interface VToolbarComputed {
  /** Total computed height including extension */
  computedHeight: number;
  /** Height of the main content area */
  computedContentHeight: number;
  /** CSS classes for the toolbar */
  classes: Record<string, boolean>;
  /** Whether the toolbar is in collapsed state */
  isCollapsed: boolean;
  /** Whether the toolbar is in prominent state */
  isProminent: boolean;
  /** Inline styles for the toolbar */
  styles: Record<string, string | number>;
}

/**
 * VToolbar component methods interface
 */
export interface VToolbarMethods {
  /**
   * Generates the background image container
   * @returns VNode for the background element
   */
  genBackground(): VNode;
  
  /**
   * Generates the main content container
   * @returns VNode for the content element
   */
  genContent(): VNode;
  
  /**
   * Generates the extension container
   * @returns VNode for the extension element
   */
  genExtension(): VNode;
}

/**
 * VToolbar scoped slots interface
 */
export interface VToolbarSlots {
  /** Default slot for toolbar content */
  default?: VNode[];
  /** Extension slot for additional content below main toolbar */
  extension?: VNode[];
  /** Custom image slot for background rendering */
  img?: (props: VToolbarImageSlotProps) => VNode | VNode[];
}

/**
 * VToolbar Vue Component
 * 
 * A flexible toolbar component that extends VSheet with various layout options.
 * Supports absolute/fixed positioning, collapsible states, background images,
 * and extension areas for complex toolbar layouts.
 * 
 * @example
 *