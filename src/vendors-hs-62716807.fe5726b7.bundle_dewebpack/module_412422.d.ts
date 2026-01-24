/**
 * Ant Design Base Styles Module
 * 
 * This module contains the foundational CSS styles for Ant Design components.
 * It includes:
 * - CSS reset and normalization
 * - Global typography and color styles
 * - Animation keyframes (fade, move, slide, zoom effects)
 * - Ant Design icon base styles
 * - Motion and transition utilities
 * 
 * @module antd-base-styles
 * @version Based on Ant Design CSS framework
 */

declare module '*.css' {
  /**
   * CSS module class names mapping
   * Each CSS class is available as a property on this object
   */
  const styles: Readonly<Record<string, string>>;
  export default styles;
}

/**
 * Ant Design global CSS custom properties (CSS variables)
 */
declare global {
  interface CSSStyleDeclaration {
    /** Primary wave shadow color for click animations */
    '--antd-wave-shadow-color'?: string;
    /** Scrollbar width compensation */
    '--scroll-bar'?: string;
  }
}

export {};