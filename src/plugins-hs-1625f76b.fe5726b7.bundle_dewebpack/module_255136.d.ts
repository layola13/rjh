/**
 * Carousel panel viewer styles module
 * 
 * This module exports CSS styles for a carousel panel viewer component,
 * including loading states, VIP marks, panorama indicators, and interactive elements.
 * 
 * @module CarouselPanelViewerStyles
 */

/**
 * CSS module loader function signature
 * 
 * @param exports - The module exports object
 * @param require - The require function for importing dependencies
 * @param module - The module metadata object
 */
declare function carouselPanelViewerStylesLoader(
  exports: CSSModuleExports,
  require: RequireFunction,
  module: ModuleMetadata
): void;

/**
 * CSS module exports interface
 */
interface CSSModuleExports {
  /** Module identifier */
  id: string | number;
  
  /** 
   * Pushes CSS content to the stylesheet collection
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * Module require function
 * 
 * @param moduleId - The numeric or string identifier of the module to import
 * @returns The required module's exports
 */
interface RequireFunction {
  (moduleId: number | string): any;
}

/**
 * Module metadata object
 */
interface ModuleMetadata {
  /** Unique module identifier */
  id: string | number;
  
  /** Module exports object */
  exports: any;
  
  /** Whether the module has been loaded */
  loaded?: boolean;
  
  /** Parent module reference */
  parent?: ModuleMetadata;
  
  /** Child module references */
  children?: ModuleMetadata[];
}

/**
 * CSS class names exported by this module
 */
interface CarouselPanelViewerStyles {
  /** Main container for the carousel panel viewer */
  'carousel-panel-viewer': string;
  
  /** Canvas container positioned absolutely with rounded corners */
  'carousel-panel-viewer-canvas-container': string;
  
  /** Image container positioned absolutely with rounded corners */
  'carousel-panel-viewer-img-container': string;
  
  /** Loading state overlay with background image */
  'carousel-panel-viewer-loading': string;
  
  /** Loading text display */
  'carousel-panel-viewer-loading-text': string;
  
  /** VIP badge marker positioned at top-right */
  'carousel-panel-viewer-vip-mark': string;
  
  /** Panorama indicator badge positioned at top-left */
  'carousel-panel-viewer-pano-mark': string;
  
  /** Panorama interaction tip centered on viewer */
  'carousel-panel-viewer-pano-tip': string;
  
  /** Tooltip shown when cursor action is not allowed */
  'carousel-panel-viewer-cursor-not-allowed-tip': string;
  
  /** Tooltip shown when cursor can add items */
  'carousel-panel-viewer-cursor-add-tip': string;
  
  /** Overlay shown when VIP content is not selected/accessible */
  'carousel-panel-viewer-vip-not-selected': string;
  
  /** General tips text styling */
  'carousel-panel-viewer-tips': string;
  
  /** Exclusive content promotion block with gradient background */
  'carousel-panel-viewer-exclusive-block': string;
  
  /** Pick all button positioned at bottom-right */
  'carousel-panel-viewer-pickall': string;
  
  /** Hover state for pick all button */
  'carousel-panel-viewer-pickall-hover': string;
}

export default carouselPanelViewerStylesLoader;
export type { CarouselPanelViewerStyles, CSSModuleExports, RequireFunction, ModuleMetadata };