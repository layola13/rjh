/**
 * VResponsive Component Type Definitions
 * A component that maintains aspect ratio and provides measurable functionality
 */

import Vue, { VNode, CreateElement } from 'vue';

/**
 * Style object for aspect ratio calculation
 */
interface AspectStyle {
  paddingBottom: string;
}

/**
 * Props interface for VResponsive component
 */
interface VResponsiveProps {
  /**
   * Aspect ratio for the component (width/height)
   * Can be specified as a number (e.g., 16/9) or string (e.g., "1.777")
   */
  aspectRatio?: string | number;
  
  /**
   * Inherited from Measurable mixin - component height
   */
  height?: string | number;
  
  /**
   * Inherited from Measurable mixin - component max-height
   */
  maxHeight?: string | number;
  
  /**
   * Inherited from Measurable mixin - component max-width
   */
  maxWidth?: string | number;
  
  /**
   * Inherited from Measurable mixin - component min-height
   */
  minHeight?: string | number;
  
  /**
   * Inherited from Measurable mixin - component min-width
   */
  minWidth?: string | number;
  
  /**
   * Inherited from Measurable mixin - component width
   */
  width?: string | number;
}

/**
 * Computed properties interface
 */
interface VResponsiveComputed {
  /**
   * Converts aspectRatio prop to a number
   * @returns {number} The computed aspect ratio as a number
   */
  computedAspectRatio: number;
  
  /**
   * Generates inline styles for aspect ratio sizer element
   * @returns {AspectStyle | undefined} Style object with paddingBottom or undefined
   */
  aspectStyle: AspectStyle | undefined;
  
  /**
   * Cached VNode for the aspect ratio sizer element
   * @returns {VNode | VNode[]} Sizer element or empty array
   */
  __cachedSizer: VNode | VNode[];
  
  /**
   * Inherited from Measurable mixin - styles for width/height constraints
   */
  measurableStyles: Record<string, string>;
}

/**
 * Methods interface
 */
interface VResponsiveMethods {
  /**
   * Generates the content wrapper element containing default slot
   * @returns {VNode} The content wrapper VNode
   */
  genContent(): VNode;
}

/**
 * VResponsive Component
 * 
 * A utility component that maintains aspect ratio and provides dimensional constraints.
 * Useful for responsive images, videos, and iframes.
 * 
 * @example
 *