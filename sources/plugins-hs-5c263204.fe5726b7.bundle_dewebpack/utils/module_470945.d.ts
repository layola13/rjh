/**
 * CSS Module Definition
 * Webpack module for guide-global popup styles
 * Original Module ID: 470945
 */

declare module 'module_470945' {
  /**
   * CSS content string exported by this module
   * Contains styles for guide-global popup components including:
   * - Popup overlay with modal backdrop
   * - Content container with centered positioning
   * - Guide backgrounds for ezhome and fp variants
   * - New user guide dialog with recommendations
   * - Button styles and interactive elements
   * - Localization support for global-en variant
   */
  const styles: string;
  
  export default styles;
}

/**
 * CSS Module Loader Function Type
 * @param exports - Module exports object
 * @param require - Webpack require function for module dependencies
 * @param module - Current module metadata
 */
declare type CSSModuleLoader = (
  exports: { id: string; exports: CSSModule },
  require: WebpackRequire,
  module: WebpackModule
) => void;

/**
 * CSS Module Export Interface
 */
interface CSSModule {
  /**
   * Pushes CSS content array to the module exports
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string, string]): void;
}

/**
 * Webpack Module Metadata
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string;
  /** Module exports object */
  exports: CSSModule;
}

/**
 * Webpack Require Function
 * @param moduleId - Numeric module identifier
 * @returns Module exports
 */
interface WebpackRequire {
  (moduleId: number): unknown;
}

/**
 * CSS Class Names exported by this module
 */
interface GuideGlobalStyles {
  /** Root container class */
  'guide-global': string;
  /** Popup overlay class */
  popup: string;
  /** Content container class */
  content: string;
  /** EZHome guide background variant */
  'guide-ezhome': string;
  /** FP guide background variant */
  'guide-fp': string;
  /** Guide background container */
  guidebg: string;
  /** Close button for guide background */
  'guidebg-close-btn': string;
  /** Action button in guide */
  guidebtn: string;
  /** New user guide dialog container */
  'new-user-guide-dialog': string;
  /** Dialog title section */
  'new-user-guide-dialog-title': string;
  /** Dialog content section */
  'new-user-guide-dialog-content': string;
  /** Guide header with checkbox */
  'guide-header': string;
  /** Checkbox element in header */
  'guide-header-checkbox': string;
  /** Label text in header */
  'guide-header-label': string;
  /** Recommendations section container */
  'guide-recommendations': string;
  /** Recommendations section header */
  'guide-recommendations-head': string;
  /** Individual recommendation item */
  'guide-recommendations-item': string;
  /** Image in recommendation item */
  'guide-recommendations-item-img': string;
  /** Info container in recommendation item */
  'guide-recommendations-item-info': string;
  /** Title of recommendation item */
  'guide-recommendations-item-title': string;
  /** Description of recommendation item */
  'guide-recommendations-item-desc': string;
  /** Arrow icon in recommendation item */
  'guide-recommendations-item-arrow': string;
  /** Footer of recommendations section */
  'guide-recommendations-foot': string;
  /** Communications section */
  'guide-communications': string;
  /** Button container */
  'guide-buttons': string;
  /** Image button style */
  imageBtn: string;
  /** Link button style */
  linkbtn: string;
  /** Global English variant modifier */
  'global-en': string;
}

/**
 * Module Dependencies
 * - 992716: CSS loader utility
 * - 986380: CSS module factory (returns false for non-source-map mode)
 * - 467702: EZHome guide background image asset
 * - 489734: FP guide background image asset
 * - 501317: Default arrow icon asset
 * - 192371: Hover state arrow icon asset
 */
declare const moduleDependencies: {
  cssLoader: 992716;
  cssModuleFactory: 986380;
  ezHomeBackgroundImage: 467702;
  fpBackgroundImage: 489734;
  defaultArrowIcon: 501317;
  hoverArrowIcon: 192371;
};