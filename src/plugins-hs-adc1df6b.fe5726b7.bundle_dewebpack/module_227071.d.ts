/**
 * Camera setting popup styles module
 * Exports CSS styles for camera configuration UI components including sliders and input controls
 */

/**
 * CSS module loader function type
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method for style injection
 */
type CSSLoaderFunction = (useSourceMap: boolean) => CSSLoader;

/**
 * CSS loader interface for style injection
 */
interface CSSLoader {
  /**
   * Push CSS styles into the module system
   * @param entry - Tuple containing module ID and CSS content
   */
  push(entry: [string, string]): void;
}

/**
 * Webpack module exports interface
 */
interface ModuleExports {
  /** The exported CSS loader instance */
  exports: CSSLoader;
  /** Unique module identifier */
  id: string;
}

/**
 * Camera setting popup style module
 * 
 * This module contains all CSS styles for:
 * - Camera setting popup container (positioning, shadows, layout)
 * - Camera Z-position slider controls
 * - Camera angle slider controls  
 * - Length input fields with unit display
 * - Reset button styling
 * 
 * Key style features:
 * - Fixed positioning with elevated z-index (100)
 * - Custom slider circle styling with blue borders (#327dff)
 * - Integrated input fields with arrow controls
 * - Responsive layout with flexbox
 * - Consistent border radius (4px for inputs, 10px for popup)
 * 
 * @param exports - Module exports object to attach CSS loader
 * @param require - Module require function  
 * @param moduleLoader - CSS loader factory function (module 986380)
 */
declare module "module_227071" {
  const styles: CSSLoader;
  export = styles;
}

/**
 * CSS class structure for camera setting popup
 */
interface CameraSettingPopupStyles {
  /** Main popup container */
  "camera-setting-popup": string;
  /** Camera slider container */
  "camera-slider": string;
  /** Z-position slider control */
  "camera-z-position": string;
  /** Angle slider control */
  "camera-angle": string;
  /** Slider outer wrapper */
  "slider-outer": string;
  /** Slider bar wrapper */
  "slider-bar-wrapper": string;
  /** Slider bar component */
  "slider-bar": string;
  /** Slider label text */
  "slider-label": string;
  /** Slider track wrapper */
  "slider-wrapper": string;
  /** Slider handle circle */
  "slider-circle": string;
  /** Length input outer container */
  "length-input-outer": string;
  /** Length input wrapper */
  "length-input-wrapper": string;
  /** Length input component */
  "length-input": string;
  /** Input field wrapper */
  "input-wrapper": string;
  /** Text input field */
  input: string;
  /** Arrow control group */
  "arrow-group": string;
  /** Up arrow wrapper */
  "arrow-up-wrapper": string;
  /** Focused input state */
  "focus-input": string;
  /** Unit display label */
  unit: string;
  /** Disabled state */
  disabled: string;
  /** Reset button */
  "reset-button": string;
}