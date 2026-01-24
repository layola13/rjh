/**
 * CSS module for editor snapshot and resizable components
 * Defines styles for resizable snapshot overlays, borders, control handles, and action buttons
 */

/**
 * CSS module export function signature
 * @param exports - Module exports object to be populated
 * @param require - Webpack require function for loading dependencies
 * @param module - Current module metadata
 */
declare module 'module_428900' {
  /**
   * Webpack module loader function
   * @param exports - The exports object that will contain the CSS module
   * @param moduleRequire - Function to require other webpack modules
   * @param moduleMetadata - Module metadata including id and path information
   */
  export default function(
    exports: CSSModuleExports,
    moduleRequire: WebpackRequire,
    moduleMetadata: WebpackModule
  ): void;

  /**
   * CSS module exports interface
   */
  interface CSSModuleExports {
    /** Module identifier */
    id: string | number;
    /** CSS content as string or array */
    exports: string | CSSExport[];
    /** Push method to add CSS rules */
    push(rule: CSSExport): void;
  }

  /**
   * Single CSS export entry
   */
  type CSSExport = [
    /** Module ID */
    id: string | number,
    /** CSS content string */
    content: string
  ];

  /**
   * Webpack require function type
   */
  interface WebpackRequire {
    /** Load a module by numeric ID */
    (moduleId: number): unknown;
  }

  /**
   * Webpack module metadata
   */
  interface WebpackModule {
    /** Unique module identifier */
    id: string | number;
    /** Module file path */
    filename?: string;
    /** Loaded state */
    loaded?: boolean;
  }

  /**
   * CSS class names defined in this module
   */
  export interface CSSClasses {
    /** Base resizable snapshot overlay container */
    'snapshotresizable': string;
    /** Left-aligned resizable part */
    'left': string;
    /** Right-aligned resizable part */
    'right': string;
    /** Top-aligned resizable part */
    'top': string;
    /** Bottom-aligned resizable part */
    'bottom': string;
    /** Resizable container wrapper */
    'resizablePart': string;
    /** Decorative border line */
    'decorateline': string;
    /** Top border decoration */
    'tborder': string;
    /** Bottom border decoration */
    'bborder': string;
    /** Canvas controller overlay */
    'canvasController': string;
    /** Snapshot action buttons container */
    'snapshotBtnContanier': string;
    /** Snapshot buttons wrapper */
    'snapshotBtns': string;
    /** Save snapshot button */
    'savesnapshot': string;
    /** Dropdown menu container */
    'dropdown': string;
    /** Dropdown toggle button */
    'dropdown-toggle': string;
    /** Divider element */
    'sdivider': string;
    /** Button element */
    'btn': string;
    /** Default button style */
    'btn-default': string;
  }

  /**
   * jQuery UI resizable handle classes used in the module
   */
  export interface ResizableHandles {
    /** East (right) resize handle */
    'ui-resizable-e': string;
    /** West (left) resize handle */
    'ui-resizable-w': string;
    /** North (top) resize handle */
    'ui-resizable-n': string;
    /** South (bottom) resize handle */
    'ui-resizable-s': string;
    /** Northeast corner resize handle */
    'ui-resizable-ne': string;
    /** Northwest corner resize handle */
    'ui-resizable-nw': string;
    /** Southeast corner resize handle */
    'ui-resizable-se': string;
    /** Southwest corner resize handle */
    'ui-resizable-sw': string;
  }

  /**
   * Asset module IDs referenced in the CSS
   */
  export const enum AssetModuleIds {
    /** Image asset for northeast corner handle */
    NE_CORNER = 625095,
    /** Image asset for southeast corner handle */
    SE_CORNER = 124013,
    /** Image asset for northwest corner handle */
    NW_CORNER = 502769,
    /** Image asset for southwest corner handle */
    SW_CORNER = 218863,
    /** CSS loader utility module */
    CSS_LOADER = 986380,
    /** URL loader utility module */
    URL_LOADER = 992716
  }
}