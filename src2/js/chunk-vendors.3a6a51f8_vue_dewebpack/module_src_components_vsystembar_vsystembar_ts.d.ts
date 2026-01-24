/**
 * VSystemBar Component Type Definitions
 * A system bar component that displays at the top of the application
 */

import Vue, { VNode, VNodeData } from 'vue';

/**
 * Applicationable mixin configuration
 * Manages application layout positioning
 */
interface ApplicationableOptions {
  /** Position key for application layout */
  readonly positionKey: 'bar';
  /** Properties that affect application layout */
  readonly layoutProperties: readonly ['height', 'window'];
}

/**
 * Colorable mixin interface
 * Provides color theming capabilities
 */
interface Colorable {
  /** The color to apply to the component */
  color?: string;
  /**
   * Sets the background color of an element
   * @param color - The color value to apply
   * @param data - Vue VNode data object
   * @returns Modified VNode data with color styling
   */
  setBackgroundColor(color: string | undefined, data: VNodeData): VNodeData;
}

/**
 * Themeable mixin interface
 * Provides light/dark theme support
 */
interface Themeable {
  /** Enable dark theme */
  dark?: boolean;
  /** Enable light theme */
  light?: boolean;
  /** Computed theme classes */
  readonly themeClasses: Record<string, boolean>;
}

/**
 * Props for VSystemBar component
 */
interface VSystemBarProps {
  /** 
   * Height of the system bar
   * @default 24 (normal), 32 (window mode)
   */
  height?: number | string;
  
  /** 
   * Reduces the system bar opacity
   * Creates a "lights out" effect for immersive experiences
   */
  lightsOut?: boolean;
  
  /** 
   * Increases default height to match window controls
   * Sets height to 32px instead of 24px
   */
  window?: boolean;
  
  /** Positions the system bar absolutely */
  absolute?: boolean;
  
  /** Makes the system bar part of the application layout */
  app?: boolean;
  
  /** Fixes the system bar to the viewport */
  fixed?: boolean;
  
  /** Component color theme */
  color?: string;
  
  /** Enable dark theme */
  dark?: boolean;
  
  /** Enable light theme */
  light?: boolean;
}

/**
 * Computed properties for VSystemBar
 */
interface VSystemBarComputed {
  /** 
   * CSS classes for the component
   * Merges positioning, theme, and state classes
   */
  readonly classes: Record<string, boolean>;
  
  /** 
   * Computed height value
   * Returns numeric or string height based on props
   */
  readonly computedHeight: number | string;
  
  /** 
   * Inline styles for the component
   * Applies computed height
   */
  readonly styles: {
    height: string | number;
  };
}

/**
 * Methods for VSystemBar
 */
interface VSystemBarMethods {
  /**
   * Updates the application layout
   * Called when component dimensions change
   * @returns The client height of the element or computed height
   */
  updateApplication(): number;
}

/**
 * VSystemBar Component
 * 
 * A system status bar typically displayed at the top of an application.
 * Commonly used to show system information, notifications, or app status.
 * 
 * @example
 *