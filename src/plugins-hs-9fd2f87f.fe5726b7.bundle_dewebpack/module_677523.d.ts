/**
 * CSS module definition for DIY property plane component
 * Exports stylesheet configuration for webpack css-loader
 */

/**
 * Webpack module factory function signature
 * @param exports - Module exports object
 * @param module - Current module metadata
 * @param require - Webpack require function for loading dependencies
 */
type WebpackModuleFactory = (
  exports: any,
  module: WebpackModule,
  require: WebpackRequire
) => void;

/**
 * Webpack module metadata interface
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: any;
  /** Whether module has been loaded */
  loaded?: boolean;
  /** Parent module references */
  parents?: string[];
}

/**
 * Webpack require function interface
 */
interface WebpackRequire {
  /** Load module by ID */
  (moduleId: string | number): any;
  /** Cache of loaded modules */
  c?: Record<string, WebpackModule>;
  /** Module resolution utilities */
  resolve?: (id: string) => string;
}

/**
 * CSS loader result tuple
 * Format: [moduleId, cssContent, sourceMap?]
 */
type CSSLoaderResult = [
  moduleId: string | number,
  cssContent: string,
  sourceMap?: string | null
];

/**
 * CSS loader export interface
 * Provides methods to manage CSS module exports
 */
interface CSSLoaderExport {
  /**
   * Add CSS rule to the module
   * @param item - CSS loader result tuple containing module ID and CSS content
   */
  push(item: CSSLoaderResult): void;
  
  /**
   * Convert to string representation
   * @returns Concatenated CSS content
   */
  toString(): string;
  
  /**
   * Internal storage for CSS rules
   */
  readonly items?: CSSLoaderResult[];
}

/**
 * CSS loader factory function signature
 * @param useSourceMap - Whether to include source maps
 * @returns CSS loader export instance
 */
type CSSLoaderFactory = (useSourceMap: boolean) => CSSLoaderExport;

/**
 * Module 677523: DIY Property Plane Styles
 * 
 * Defines CSS styles for the DIY property configuration panel including:
 * - Main container (#diy_property_plane)
 * - Header section with title and close button
 * - Command label bar with icon, name, and action buttons
 * - Property input components
 * - Step indicator tips
 * - Responsive layouts and hover states
 * 
 * @remarks
 * This module is loaded via webpack css-loader (module 986380)
 * CSS is injected at runtime and supports HMR (Hot Module Replacement)
 */
declare module '677523' {
  const content: CSSLoaderExport;
  export = content;
}

/**
 * CSS class names exported by this module
 */
export interface PropertyPlaneClassNames {
  /** Main property plane container (340px width, absolute positioned) */
  'diy_property_plane': string;
  
  /** Hidden state for property plane */
  'diy_property_plane_hide': string;
  
  /** Header section with title and close button */
  'property_plane_header': string;
  
  /** Close button icon in header */
  'property_plane_close': string;
  
  /** Command label container */
  'command_label': string;
  
  /** Circular icon in command label */
  'command_label_icon': string;
  
  /** Command name text */
  'command_label_name': string;
  
  /** Button container in command label */
  'command_label_button': string;
  
  /** Hidden state for command buttons */
  'command_label_button_hide': string;
  
  /** Cancel button styling */
  'command_label_cancel': string;
  
  /** Apply/Next button styling */
  'command_label_apply': string;
  
  /** Next step button styling */
  'command_label_next': string;
  
  /** Spacing divider */
  'detail_divider': string;
  
  /** Command detail container */
  'diy_command_detail': string;
  
  /** Property input component wrapper */
  'property_input_component': string;
  
  /** Property input label */
  'property_input_label': string;
  
  /** Property input detail section */
  'property_input_detail': string;
  
  /** Tips/hints container */
  'property-tips-container': string;
  
  /** First step in property configuration */
  'first-property-step': string;
  
  /** Active step indicator */
  'property-step-active': string;
  
  /** Inactive step indicator */
  'property-step': string;
  
  /** Tips content area */
  'property-tips-content': string;
}