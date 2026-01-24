import Vue, { VNode, VNodeData, CreateElement } from 'vue';

/**
 * Props for the VSystemBar component
 */
export interface VSystemBarProps {
  /**
   * Height of the system bar in pixels or CSS unit string
   * @default 24 (normal mode) or 32 (window mode)
   */
  height?: number | string;

  /**
   * Reduces the system bar opacity for a "lights out" effect
   * @default false
   */
  lightsOut?: boolean;

  /**
   * Uses window-specific styling with increased default height
   * @default false
   */
  window?: boolean;

  /**
   * Color of the system bar (from theme or CSS color)
   */
  color?: string;

  /**
   * Applies absolute positioning to the component
   * @default false
   */
  absolute?: boolean;

  /**
   * Applies fixed positioning to the component
   * @default false
   */
  fixed?: boolean;

  /**
   * Designates the component as part of the application layout (from applicationable mixin)
   * @default false
   */
  app?: boolean;

  /**
   * Applies the dark theme variant (from themeable mixin)
   * @default false
   */
  dark?: boolean;

  /**
   * Applies the light theme variant (from themeable mixin)
   * @default false
   */
  light?: boolean;
}

/**
 * Computed properties interface
 */
export interface VSystemBarComputed {
  /**
   * CSS classes applied to the component based on props state
   */
  classes: Record<string, boolean>;

  /**
   * Computed height value in pixels, respecting window mode
   */
  computedHeight: number;

  /**
   * Inline styles object for the component
   */
  styles: {
    height: string;
  };

  /**
   * Theme classes from themeable mixin
   */
  themeClasses: Record<string, boolean>;
}

/**
 * Methods interface
 */
export interface VSystemBarMethods {
  /**
   * Updates the application layout with the component's height
   * Called by the applicationable mixin when the component is part of app layout
   * @returns The client height of the element or computed height if element not mounted
   */
  updateApplication(): number;

  /**
   * Sets background color on the provided VNodeData object
   * Inherited from colorable mixin
   * @param color - Color name or CSS color value
   * @param data - Vue VNode data object to modify
   * @returns Modified VNode data with color styles/classes applied
   */
  setBackgroundColor(color: string | undefined, data: VNodeData): VNodeData;
}

/**
 * VSystemBar - A status bar component typically placed at the top of an application
 * 
 * Displays system-level information with optional window styling and lights-out mode.
 * Can be positioned as part of the application layout or independently.
 * 
 * @example
 *