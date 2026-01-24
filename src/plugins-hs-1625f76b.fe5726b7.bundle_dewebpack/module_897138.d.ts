/**
 * CSS module exports for template room basic page styles
 * @module TemplateRoomBasicPageStyles
 */

/**
 * CSS module loader function type
 * Processes and exports CSS content for webpack bundling
 */
declare module 'module_897138' {
  /**
   * Webpack CSS loader module export function
   * @param exports - The module exports object to be populated
   * @param moduleFactory - The CSS loader factory function from webpack
   * @param requireFn - The webpack require function for loading dependencies
   */
  export default function(
    exports: CSSModuleExports,
    moduleFactory: CSSLoaderFactory,
    requireFn: WebpackRequireFunction
  ): void;

  /**
   * CSS module exports object containing processed styles
   */
  interface CSSModuleExports {
    /** Module identifier */
    id: string | number;
    /** Exported module content */
    exports: CSSContent;
  }

  /**
   * CSS loader factory function
   * Creates a CSS loader instance with source map configuration
   * @param useSourceMap - Whether to generate source maps for the CSS
   * @returns CSS loader instance with push method
   */
  interface CSSLoaderFactory {
    (useSourceMap: boolean): CSSLoader;
  }

  /**
   * CSS loader instance for managing style content
   */
  interface CSSLoader {
    /**
     * Adds CSS content to the loader
     * @param content - Array containing module ID and CSS string
     */
    push(content: [string | number, string]): void;
  }

  /**
   * Webpack require function for module resolution
   * @param moduleId - The numeric or string identifier of the module to require
   * @returns The required module's exports
   */
  interface WebpackRequireFunction {
    (moduleId: number | string): unknown;
  }

  /**
   * CSS content type (string containing all style rules)
   */
  type CSSContent = string;

  /**
   * CSS class names exported by this module
   * Styles for Homestyler template room basic page component
   */
  export interface StyleClasses {
    /** Main container for template room basic page (280px width, flex column layout) */
    'hsc-template-room-basic-page-container': string;
    
    /** Loading indicator with centered spinning image */
    'loading': string;
    
    /** Search icon button (30x30px, top-right positioned with hover effect) */
    'template-room-basic-search-icon': string;
    
    /** Search box container with padding */
    'template-room-basic-list-searchbox': string;
    
    /** Room type switch tabs wrapper (244px width, 36px height) */
    'template-room-switch-room-type': string;
    
    /** Homestyler tabs component styling */
    'homestyler-tabs': string;
    
    /** Model container with flex-grow for dynamic sizing */
    'hsc-model-container': string;
    
    /** Create template room button container with hover popover */
    'template-room-create-template-room': string;
    
    /** Disabled state for create button (gray colors, not-allowed cursor) */
    'disabled': string;
    
    /** Upload template room button (36px height, rounded border with hover animations) */
    'upload-template-room': string;
    
    /** Icon wrapper for upload button */
    'icon': string;
    
    /** Upload button text label */
    'upload-text': string;
    
    /** Icon wrapper with absolute positioning for membership badge */
    'icon-wrapper': string;
    
    /** Membership upgrade popover tooltip (black background with arrow) */
    'popover-styler-membership': string;
    
    /** Popover header area with gradient background (FFDF77 to E0FFA2) */
    'popover-header-area': string;
    
    /** Text area within popover header */
    'text-area': string;
    
    /** Upgrade button area (dark background, 24px height) */
    'upgrade-area': string;
    
    /** AI Styler membership icon (18x18px) */
    'aistyler-membership-icon': string;
    
    /** Example image in membership popover */
    'aistyler-membership-example-img': string;
    
    /** Bottom description text in popover (white text, 12px font) */
    'popover-bottom-desc-area': string;
    
    /** Fake expand area for hover detection */
    'fake-expand': string;
    
    /** Filter item with max-width constraint (70px) */
    'hsc-filter-item': string;
    
    /** Small filter item text (max 48px width) */
    'filter-item-text-small': string;
    
    /** Template recommend page full height container */
    'template-recommend-page': string;
    
    /** Tooltip styling with disabled pointer events */
    'hsc-template-room-basic-page-tooltip': string;
  }
}