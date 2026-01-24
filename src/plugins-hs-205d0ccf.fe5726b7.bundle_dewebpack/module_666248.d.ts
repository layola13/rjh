/**
 * CSS module exports for thumbnail view component styles
 * 
 * This module exports CSS styles for a thumbnail view container including:
 * - Main container layout and positioning
 * - Editor containers (2D/3D)
 * - Auxiliary containers
 * - Action buttons and topbar
 * - Visibility states and responsive behavior
 */

/**
 * CSS loader module interface
 * Represents the structure of a webpack css-loader output
 */
interface CSSLoaderModule {
  /**
   * Module identifier
   */
  id: string;
  
  /**
   * Adds CSS content to the module
   * @param content - Array containing module metadata and CSS string
   */
  push(content: [string, string]): void;
}

/**
 * CSS loader factory function type
 * @param sourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader module instance
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoaderModule;

/**
 * Module exports interface
 */
interface ModuleExports {
  exports: CSSLoaderModule;
  id: string;
}

/**
 * Thumbnail view CSS styles module
 * 
 * Exports compiled CSS for thumbnail view components including:
 * - `.thumbnail-view-container` - Main container with rounded corners and overflow handling
 * - `.editor2dContainer`, `.editor3dContainer` - Full-size editor containers
 * - `.thumbnail-view-editor-container` - Absolute positioned editor wrapper
 * - `.thumbnail-view-aux-container` - Auxiliary content container
 * - `.thumbnail-view-topbar` - Top action bar
 * - `.thumbnail-view-actions` - Bottom action buttons container
 * - `.thumbnail-view-button` - Individual action button styles
 * - Visibility modifiers (`.hidden-container`, `.thumbnail-view-hidden`, etc.)
 * 
 * @param moduleExports - The module exports object to attach CSS to
 * @param _exports - Unused parameter (TypeScript module placeholder)
 * @param require - Module loader function for dependencies
 */
declare function thumbnailViewStyles(
  moduleExports: ModuleExports,
  _exports: unknown,
  require: (moduleId: number) => CSSLoaderFactory
): void;

export default thumbnailViewStyles;

/**
 * CSS class names exported by this module
 */
export interface ThumbnailViewClassNames {
  /** Main thumbnail view container */
  'thumbnail-view-container': string;
  
  /** 2D editor container */
  editor2dContainer: string;
  
  /** 3D editor container */
  editor3dContainer: string;
  
  /** Editor wrapper container */
  'thumbnail-view-editor-container': string;
  
  /** Auxiliary content container */
  'thumbnail-view-aux-container': string;
  
  /** Hidden container modifier */
  'hidden-container': string;
  
  /** Top bar container */
  'thumbnail-view-topbar': string;
  
  /** Actions container */
  'thumbnail-view-actions': string;
  
  /** Visible actions modifier */
  'thumbnail-view-actions-visible': string;
  
  /** Hidden actions modifier */
  'thumbnail-view-actions-hidden': string;
  
  /** Action button */
  'thumbnail-view-button': string;
  
  /** Button text wrapper */
  buttonText: string;
  
  /** Switcher icon wrapper */
  'switcher-icon': string;
  
  /** Draggable container */
  'thumbnailview-draggable': string;
  
  /** Visible thumbnail view modifier */
  'thumbnail-view-visible': string;
  
  /** Hidden thumbnail view modifier */
  'thumbnail-view-hidden': string;
  
  /** Main editor container */
  editor: string;
  
  /** Smart scroll content wrapper */
  'smart-scroll-content': string;
  
  /** Auxiliary 3D element */
  aux3d: string;
}