/**
 * CSS module exports for autostyler component styles
 * @module AutostylerStyles
 * @description Provides CSS styling definitions for the autostyler UI component,
 * including buttons, modals, form inputs, and image picker panel
 */

/**
 * CSS module loader function type
 * @param sourceMaps - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method
 */
type CSSModuleLoader = (sourceMaps: boolean) => {
  /**
   * Pushes CSS content to the module
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [string, string]): void;
};

/**
 * Webpack module definition for autostyler CSS styles
 * @param exports - Module exports object
 * @param module - Module metadata object
 * @param require - Module require function to load dependencies
 */
declare module 'autostyler-styles' {
  /**
   * Module metadata interface
   */
  interface ModuleInfo {
    /** Unique module identifier */
    id: string;
    /** Module exports object */
    exports: CSSModuleExports;
  }

  /**
   * CSS module exports interface
   */
  interface CSSModuleExports {
    /** Raw CSS string content */
    toString(): string;
    /** CSS module metadata */
    [key: string]: unknown;
  }

  /**
   * Main module initialization function
   * Loads and injects autostyler component CSS styles including:
   * - Button styles (.btn, .btn-primary, .btn-default)
   * - Modal overlay styles (.modalCover)
   * - Form input and select styles (.model-input, .model-select)
   * - Image picker panel styles (.pickImagePanel)
   * - Checkbox and selection states
   * 
   * @param exports - Module exports object to populate
   * @param module - Module metadata containing ID and configuration
   * @param require - Function to load CSS loader dependency (module 986380)
   */
  function initializeModule(
    exports: CSSModuleExports,
    module: ModuleInfo,
    require: (moduleId: number) => CSSModuleLoader
  ): void;

  export = initializeModule;
}

/**
 * CSS class names exported by this module
 */
declare namespace AutostylerClasses {
  /** Base button class with border-radius, padding, and margin */
  export const btn: string;
  
  /** Primary button variant with blue background (#4d9bd6) */
  export const btnPrimary: string;
  
  /** Default button variant with white background and border */
  export const btnDefault: string;
  
  /** Fixed position modal overlay with semi-transparent background */
  export const modalCover: string;
  
  /** Warning state class that applies red border */
  export const autostylerWarningShow: string;
  
  /** Form input field with 36px height and 14px font */
  export const modelInput: string;
  
  /** Select dropdown with 340px width and custom styling */
  export const modelSelect: string;
  
  /** Image picker panel container */
  export const pickImagePanel: string;
  
  /** Individual picture item in picker (196x110px) */
  export const pictureItem: string;
  
  /** Checkbox indicator element */
  export const check: string;
  
  /** Unchecked state for checkbox */
  export const unchecked: string;
  
  /** Checked state for checkbox with blue background */
  export const checked: string;
  
  /** Small inner check indicator */
  export const smallCheck: string;
  
  /** Image element with cover/contain object-fit */
  export const img: string;
  
  /** Selected state with blue border (#396efe) */
  export const selected: string;
  
  /** Icon element positioned in top-right corner */
  export const icon: string;
}