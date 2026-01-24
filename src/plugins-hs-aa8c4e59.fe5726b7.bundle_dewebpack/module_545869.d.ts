/**
 * CSS Module Definition for Material Pick-up Page Component
 * 
 * This module exports CSS styles for a material selection/pick-up interface
 * that includes design information display, product container, and room type selection.
 */

/**
 * CSS module loader function type
 * @param useSourceMap - Whether to use source maps for debugging
 * @returns CSS module with push method for adding style rules
 */
type CSSModuleLoader = (useSourceMap: boolean) => CSSModule;

/**
 * CSS Module interface representing a collection of style rules
 */
interface CSSModule {
  /**
   * Adds a CSS rule to the module
   * @param rule - Array containing module ID and CSS string
   */
  push(rule: [string, string]): void;
}

/**
 * Webpack module context
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string;
  /** Module exports object */
  exports: CSSModule;
}

/**
 * Module require function type
 * @param moduleId - The ID of the module to require
 * @returns The requested module's exports
 */
type RequireFunction = (moduleId: number) => CSSModuleLoader;

/**
 * Material Pick-up Page CSS Styles Export
 * 
 * Defines comprehensive styling for:
 * - Fixed positioned wrapper container
 * - Design information header (68px height)
 * - Product list container (280px width)
 * - Cover images (245x164px)
 * - Room type selection menu
 * - Responsive layouts and scrollbar customization
 * - Internationalization support (global-en class)
 * 
 * Key features:
 * - Flexbox-based layouts
 * - Text overflow ellipsis for long content
 * - Custom scrollbar styling
 * - Border and spacing consistent with design system
 * - Font family specifications (PingFangSC, AlibabaPuHuiTi)
 * 
 * @param module - Webpack module context
 * @param exports - Module exports object
 * @param require - Webpack require function
 */
declare module "module_545869" {
  const styles: CSSModule;
  export = styles;
}

/**
 * CSS class names available in this module
 */
interface MaterialPickUpPageStyles {
  /** Root page container class */
  "material-pick-up-page": string;
  /** Fixed position wrapper */
  "hsc-material-pick-up-page-wrapper": string;
  /** Main flex container */
  "hsc-material-pick-up-page-container": string;
  /** Design information header section */
  "design-info": string;
  /** First row of design info (name and type) */
  "design-first": string;
  /** Design name with text overflow ellipsis */
  "design-name": string;
  /** Modified design name for 3 Chinese words max */
  "design-name-max-3-chinese-words": string;
  /** Import design type label */
  "import-design-type": string;
  /** Second row of design info (area and designer) */
  "design-second": string;
  /** Design area and designer information */
  "design-area-and-designer": string;
  /** Main content area */
  "material-pick-up-page-content": string;
  /** Product list scrollable container */
  "material-pick-up-page-product-container": string;
  /** Product list flex wrapper */
  "material-pick-up-page-product-list": string;
  /** Material cover image thumbnail */
  "hsc-material-pick-cover-image": string;
  /** Middle section with controls */
  "hsc-material-pick-up-page-middle": string;
  /** Room type selection dropdown container */
  "hsc-material-pick-up-page-select-container": string;
  /** Room type menu component */
  "room-type-menu": string;
  /** Room type menu inner container */
  "room-type-menu-container": string;
  /** Zoom control box */
  "zoom-box": string;
  /** Zoom title section */
  "zoom-title": string;
  /** Generic title class */
  "title": string;
  /** English locale specific styles */
  "global-en": string;
  /** Not applied model list */
  "hsc-material-pick-up-page-not-applied-model-list": string;
  /** Text content in menu */
  "text": string;
  /** Icon element in menu */
  "icon": string;
}

export type { MaterialPickUpPageStyles, CSSModule, WebpackModule, RequireFunction, CSSModuleLoader };