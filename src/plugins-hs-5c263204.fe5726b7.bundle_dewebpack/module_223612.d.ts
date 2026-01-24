/**
 * CSS Module Type Definitions
 * 
 * This module exports CSS styles for an address selection component.
 * Includes font styles, selected/hover states, and a complex address picker UI.
 */

/**
 * CSS Module Export Function Type
 * 
 * Represents a webpack css-loader module that pushes CSS content to a stylesheet collection.
 * 
 * @param cssLoaderApi - The css-loader API function (typically from webpack)
 * @returns A stylesheet array with push method for adding CSS rules
 */
declare module 'module_223612' {
  /**
   * CSS Loader API function signature
   * 
   * @param sourceMap - Whether to include source maps (false in this case)
   * @returns An array-like object for collecting CSS rules
   */
  type CssLoaderApi = (sourceMap: boolean) => CssStylesheet;

  /**
   * Stylesheet collection with module metadata
   */
  interface CssStylesheet extends Array<[string, string, string?]> {
    /** Adds a CSS rule to the stylesheet */
    push(rule: [moduleId: string, cssContent: string, sourceMap?: string]): void;
  }

  /**
   * CSS Class Names exported by this module
   */
  export interface CssClasses {
    /** Base font style: 12px, #33353B color, -0.03px letter-spacing */
    font1: string;
    
    /** Secondary font style: identical to font1 */
    font2: string;
    
    /** Tertiary font style: 12px, #33353B color, no letter-spacing */
    font4: string;
    
    /** Selected state style: primary blue color (#396EFE), normal weight */
    selectedStyle: string;
    
    /** Hover state style: primary blue color, 2px border-radius */
    hoverStyle: string;
    
    /** Text truncation utility: ellipsis overflow handling */
    commonTextStyleForLongText: string;
    
    /** Main container for address picker: 900x539px, positioned absolutely */
    addressViewContainer: string;
    
    /** Hide modifier: display none */
    hide: string;
    
    /** Show modifier: displays picker with high z-index (4444444) */
    showUp: string;
    
    /** Address view wrapper: full size, absolute positioning */
    addressView: string;
    
    /** Semi-transparent mask overlay: white 50% opacity, rounded corners */
    addressViewMask: string;
    
    /** Address info panel: 280px width, white background, shadowed */
    addressInfoContainer: string;
    
    /** Current location header section */
    currentLocation: string;
    
    /** Location label text: 14px, bold, clickable */
    label: string;
    
    /** Scrollable address list: 472px height */
    addressList: string;
    
    /** Region grouping block with margin */
    regionBlock: string;
    
    /** Region name header: bold, 25px height */
    regionName: string;
    
    /** Province container block: full width, centered */
    provinceBlock: string;
    
    /** Province name item: light weight, rounded, hoverable */
    provinceName: string;
    
    /** Selected province indicator: blue underline */
    selected: string;
    
    /** Blue underline triangle for selected province */
    triangleUp: string;
    
    /** City list container: gray background, rounded, padded */
    cityBlock: string;
    
    /** Individual city name: light weight, truncated text */
    cityNameBlock: string;
    
    /** Selected city state: blue color, normal weight */
    citySeleted: string;
    
    /** Alternative selected state name */
    seleted: string;
  }

  /**
   * Module export structure matching webpack's module format
   */
  const cssModule: {
    /** The CSS class names object */
    readonly classes: CssClasses;
    
    /** The raw CSS string content */
    readonly toString: () => string;
  };

  export default cssModule;
}

/**
 * CSS Content Summary:
 * 
 * This module defines styles for a dropdown address selector with:
 * - Three font presets (font1, font2, font4)
 * - Interaction states (selected, hover)
 * - Text overflow handling
 * - A 900x539px positioned container (#addressViewContainer)
 * - Nested structure: Container > View > Mask > InfoContainer
 * - Region-based organization: Region > Province > City
 * - Visual features: shadows, rounded corners, semi-transparent overlays
 * - Responsive states: .hide, .showUp modifiers
 * - Color scheme: Primary #396EFE (blue), Text #33353B (dark gray)
 */