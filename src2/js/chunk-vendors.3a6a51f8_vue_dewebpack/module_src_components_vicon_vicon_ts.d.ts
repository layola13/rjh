/**
 * VIcon Component Type Definitions
 * A flexible icon component for Vue.js that supports multiple icon formats
 */

import Vue, { VNode, VNodeData, CreateElement, FunctionalComponentOptions } from 'vue';

/**
 * Icon size presets mapping
 */
export interface IconSizePresets {
  /** Extra small icon size: 12px */
  xSmall: string;
  /** Small icon size: 16px */
  small: string;
  /** Default icon size: 24px */
  default: string;
  /** Medium icon size: 28px */
  medium: string;
  /** Large icon size: 36px */
  large: string;
  /** Extra large icon size: 40px */
  xLarge: string;
}

/**
 * SVG icon configuration object
 */
export interface SvgIconComponent {
  /** The Vue component to render */
  component: Vue.Component;
  /** Props to pass to the SVG component */
  props?: Record<string, unknown>;
}

/**
 * VIcon component properties
 */
export interface VIconProps {
  /** Apply dense styling (reduced padding/spacing) */
  dense?: boolean;
  
  /** Disable the icon (grays out, prevents interactions) */
  disabled?: boolean;
  
  /** Apply left margin for spacing when icon is inline with text */
  left?: boolean;
  
  /** Apply right margin for spacing when icon is inline with text */
  right?: boolean;
  
  /** Custom icon size (number in px or string with units) */
  size?: number | string;
  
  /** HTML tag to render (default: 'i') */
  tag?: string;
  
  /** Color theme to apply to the icon */
  color?: string;
  
  /** Apply extra small size preset (12px) */
  xSmall?: boolean;
  
  /** Apply small size preset (16px) */
  small?: boolean;
  
  /** Apply large size preset (36px) */
  large?: boolean;
  
  /** Apply extra large size preset (40px) */
  xLarge?: boolean;
  
  /** Apply dark theme */
  dark?: boolean;
  
  /** Apply light theme */
  light?: boolean;
}

/**
 * VIcon component computed properties
 */
export interface VIconComputed {
  /** Always returns false for medium size check */
  medium: boolean;
  
  /** Check if component has click event listeners attached */
  hasClickListener: boolean;
}

/**
 * VIcon component methods
 */
export interface VIconMethods {
  /**
   * Extract icon identifier from default slot content
   * @returns The icon identifier string or SVG component config
   */
  getIcon(): string | SvgIconComponent;
  
  /**
   * Calculate the effective icon size based on props
   * @returns CSS size value (e.g., '24px') or undefined
   */
  getSize(): string | undefined;
  
  /**
   * Build default VNode data object with base classes and attributes
   * @returns VNode data configuration
   */
  getDefaultData(): VNodeData;
  
  /**
   * Build VNode data for SVG wrapper element
   * @returns VNode data with size styles applied
   */
  getSvgWrapperData(): VNodeData;
  
  /**
   * Apply color and theme classes to VNode data
   * @param data - VNode data object to modify
   */
  applyColors(data: VNodeData): void;
  
  /**
   * Render an icon using icon font (Material Icons, Font Awesome, etc.)
   * @param iconName - The icon identifier string
   * @param createElement - Vue's render function createElement
   * @returns Rendered VNode
   */
  renderFontIcon(iconName: string, createElement: CreateElement): VNode;
  
  /**
   * Render an SVG icon from path data
   * @param pathData - SVG path 'd' attribute value
   * @param createElement - Vue's render function createElement
   * @returns Rendered VNode with inline SVG
   */
  renderSvgIcon(pathData: string, createElement: CreateElement): VNode;
  
  /**
   * Render a custom Vue SVG component
   * @param config - SVG component configuration object
   * @param createElement - Vue's render function createElement
   * @returns Rendered VNode wrapping the component
   */
  renderSvgIconComponent(config: SvgIconComponent, createElement: CreateElement): VNode;
}

/**
 * VIcon component definition (internal implementation)
 * Extends multiple mixins for cross-cutting concerns
 */
export interface VIconComponent extends Vue, VIconProps, VIconComputed, VIconMethods {
  /** Component name identifier */
  readonly name: 'v-icon';
  
  /** Event listeners bound to the component */
  readonly listeners$: Record<string, Function | Function[]>;
  
  /** HTML attributes bound to the component */
  readonly attrs$: Record<string, unknown>;
  
  /** Default slot content */
  readonly $slots: {
    default?: VNode[];
  };
}

/**
 * Functional wrapper component options
 */
export interface VIconFunctionalOptions extends FunctionalComponentOptions<VIconProps> {
  /** Component name */
  name: 'v-icon';
  
  /** Reference to wrapped implementation component */
  $_wrapperFor: typeof VIconComponent;
  
  /** Mark as functional component */
  functional: true;
}

/**
 * VIcon - A versatile icon component supporting multiple formats
 * 
 * @remarks
 * Supports three icon types:
 * 1. Font icons (Material Icons, Font Awesome)
 * 2. SVG path data (inline SVG generation)
 * 3. Custom Vue SVG components
 * 
 * @example
 *