/**
 * Perfect Scrollbar CSS Module
 * 
 * This module exports CSS styles for the perfect-scrollbar library (v0.6.16).
 * Perfect Scrollbar is a minimalistic but perfect custom scrollbar plugin.
 * 
 * @module PerfectScrollbarStyles
 * @version 0.6.16
 */

/**
 * CSS module loader function type
 * Represents a function that processes CSS content and returns an array with module metadata
 */
type CSSLoaderFunction = (useSourceMap: boolean) => CSSModuleExports;

/**
 * CSS Module exports interface
 * Contains methods for managing CSS content in a module bundler context
 */
interface CSSModuleExports {
  /**
   * Adds CSS content to the module exports
   * 
   * @param data - Array containing module ID and CSS content string
   * @returns void
   */
  push(data: [string | number, string]): void;
}

/**
 * Module exports type
 * The module exports CSS content processed by a CSS loader (typically css-loader in Webpack)
 */
export type PerfectScrollbarCSSModule = CSSModuleExports;

/**
 * Module metadata
 */
export interface ModuleMetadata {
  /**
   * Unique module identifier
   */
  readonly id: string | number;
  
  /**
   * Module exports containing CSS content and push method
   */
  readonly exports: CSSModuleExports;
}

/**
 * CSS content string for Perfect Scrollbar
 * 
 * Features:
 * - Custom scrollbar styling with smooth transitions
 * - Horizontal (x-axis) and vertical (y-axis) scrollbar support
 * - Hover effects and active states
 * - IE/Edge compatibility with overflow fallbacks
 * - Touch-action support for mobile devices
 */
export const perfectScrollbarCSS: string;

/**
 * Perfect Scrollbar container states
 */
export type ScrollbarState = 
  | 'ps-active-x'    // Horizontal scrollbar is active
  | 'ps-active-y'    // Vertical scrollbar is active
  | 'ps-in-scrolling' // Currently scrolling
  | 'ps-x'           // Horizontal scroll mode
  | 'ps-y';          // Vertical scroll mode

/**
 * Scrollbar rail orientation
 */
export type ScrollbarOrientation = 'x' | 'y';

/**
 * CSS class names used by Perfect Scrollbar
 */
export interface PerfectScrollbarClassNames {
  /** Main container class */
  readonly container: 'ps-container';
  
  /** Horizontal scrollbar rail class */
  readonly scrollbarXRail: 'ps-scrollbar-x-rail';
  
  /** Horizontal scrollbar thumb class */
  readonly scrollbarX: 'ps-scrollbar-x';
  
  /** Vertical scrollbar rail class */
  readonly scrollbarYRail: 'ps-scrollbar-y-rail';
  
  /** Vertical scrollbar thumb class */
  readonly scrollbarY: 'ps-scrollbar-y';
}

/**
 * Default export: CSS module content
 */
declare const moduleExports: CSSModuleExports;
export default moduleExports;