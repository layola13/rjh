/**
 * Carousel panel container CSS module type definitions
 * This module exports CSS styles for a fixed-position carousel panel component
 * with header, content, and footer sections supporting multiple theme variants.
 */

/**
 * CSS module exports interface
 * Contains CSS class names and their corresponding style definitions
 */
interface CarouselPanelStyles {
  /** Main container with fixed positioning and shadow */
  'carousel-panel-container': string;
  
  /** Header section with flex layout (48px height) */
  'carousel-panel-header': string;
  
  /** Title text styling (PingFangSC-Semibold, 14px) */
  'carousel-panel-title': string;
  
  /** Content area with bottom margin */
  'carousel-panel-content': string;
  
  /** Footer section with flex centering */
  'carousel-panel-footer': string;
  
  /** A-variant footer (space-between layout) */
  A: string;
  
  /** EZHome theme variant footer */
  ezhome: string;
  
  /** Unlock feature block with gradient background */
  'unlock-block': string;
  
  /** Unlock prompt text (12px, bold) */
  'unlock-text': string;
  
  /** Unlock action button (dark background, rounded) */
  'unlock-btn': string;
  
  /** A-variant unlock block (centered, 182px min-width) */
  'unlock-block-a': string;
  
  /** Color picker container with background */
  'color-container': string;
  
  /** Left section of color container */
  left: string;
  
  /** Descriptive text label */
  text: string;
  
  /** Horizontal list of color swatches */
  'color-list': string;
  
  /** Individual color block (45x30px) */
  'color-block': string;
  
  /** "More" action section */
  more: string;
  
  /** A-variant color container (no background) */
  'color-container-a': string;
  
  /** Text wrapper container with space-between */
  'text-container': string;
  
  /** Right-aligned text section */
  'text-right': string;
  
  /** Homestyler UI component integration classes */
  'homestyler-ui-components': string;
  'ant-btn': string;
  'ant-btn-default': string;
  
  /** Icon font class for view toggle */
  'hsc-iconfont-view': string;
}

/**
 * CSS module loader result
 * Returns an array containing module metadata and CSS content
 */
type CSSModuleExport = [
  /** Module identifier */
  moduleId: string,
  /** Compiled CSS string */
  cssContent: string
];

/**
 * Webpack CSS loader function interface
 * @param sourceMap - Whether to include source maps
 * @returns CSS module push function
 */
interface CSSLoader {
  (sourceMap: boolean): {
    /** Push CSS content to module exports */
    push(content: CSSModuleExport): void;
  };
}

/**
 * Module factory parameters
 * Standard webpack module pattern
 */
interface ModuleFactoryParams {
  /** Module exports object */
  exports: {
    /** CSS module content and metadata */
    id: string;
    [key: string]: unknown;
  };
  /** Module identifier */
  id: string;
}

/**
 * Main module export type
 * This module integrates with webpack's CSS loader (module 986380)
 * to inject compiled styles for the carousel panel component.
 */
declare module 'module_917210' {
  const styles: CarouselPanelStyles;
  export default styles;
}

/**
 * Module factory function signature
 * @param e - Module exports container
 * @param t - Module dependencies (unused)
 * @param n - Webpack require function for loading dependencies
 */
type ModuleFactory = (
  e: ModuleFactoryParams['exports'],
  t: unknown,
  n: (moduleId: number) => CSSLoader
) => void;

export type { 
  CarouselPanelStyles, 
  CSSModuleExport, 
  CSSLoader, 
  ModuleFactoryParams,
  ModuleFactory 
};