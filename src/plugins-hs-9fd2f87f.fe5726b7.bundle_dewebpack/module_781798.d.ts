/**
 * CSS Module Definition for Auto Ceiling Preview Panel
 * 
 * This module exports CSS styles for the ceiling preview panel component,
 * including panel frame, header, content area, and action buttons.
 * 
 * @module AutoCeilingPreviewPanelStyles
 */

/**
 * Type definition for Webpack CSS loader module
 */
type CSSLoaderModule = (sourceMap: boolean) => {
  push: (entry: [string, string, string]) => void;
};

/**
 * Module exports interface for Webpack module system
 */
interface WebpackModuleExports {
  /** Module identifier */
  id: string;
  /** Module exports object */
  exports: unknown;
}

/**
 * CSS Module Export Function
 * 
 * Registers CSS styles for the auto ceiling preview panel component.
 * Styles include:
 * - Main panel frame positioning and background
 * - Header section with title and sketch map
 * - Content area for ceiling polygon visualization
 * - Footer with front face and side face action buttons
 * 
 * @param moduleExports - Webpack module exports object containing module ID
 * @param _unused - Unused parameter (module context)
 * @param require - Webpack require function for loading dependencies
 */
declare function registerCeilingPreviewStyles(
  moduleExports: WebpackModuleExports,
  _unused: unknown,
  require: (moduleId: number) => CSSLoaderModule
): void;

/**
 * CSS Class Names for Auto Ceiling Preview Panel
 */
declare namespace AutoCeilingPreviewPanelStyles {
  /**
   * Root container class for the ceiling preview panel
   * - Position: absolute, bottom left
   * - Width: 300px
   * - Background: #fafafa
   * - Z-index: 80
   */
  const ROOT_CONTAINER = 'autoceiling-preview-panel';
  
  /**
   * Main panel frame
   * - Contains header, content, and tail sections
   */
  const CEILING_PANEL_FRAME = 'ceilingPanelFrame';
  
  /**
   * Panel header section
   * - Height: 64px
   * - Background: #f9f9f9
   * - Contains title and sketch map
   */
  const CEILING_PANEL_HEADER = 'ceilingPanelHeader';
  
  /**
   * Sketch map image container (right-aligned)
   * - Image height: 60px
   */
  const CEILING_SKETCH_MAP = 'ceilingSketchMap';
  
  /**
   * Panel title text
   * - Font size: 18px
   * - Color: #848084
   * - Centered with letter spacing
   */
  const CEILING_PANEL_TITLE = 'ceilingPanelTitle';
  
  /**
   * Content area for ceiling visualization
   * - Height: 248px
   * - Background: #f9f9f9
   */
  const CEILING_PANEL_CONTENT = 'ceilingPanelContent';
  
  /**
   * Front face polygon rendering area
   * - Height: 248px
   */
  const CEILING_FRONT_FACE_POLYGON = 'ceilingFrontFacePolygon';
  
  /**
   * Panel footer section
   * - Height: 54px
   * - Contains action buttons
   * - Border top: 1px solid #d4d4d4
   */
  const CEILING_PANEL_TAIL = 'ceilingPanelTail';
  
  /**
   * Front face action button
   * - Width: 105px, Height: 24px
   * - Background: #1B79BB (blue)
   * - Border radius: 15px
   * - Positioned left with 36px margin
   */
  const CEILING_FRONT_FACE = 'ceilingFrontFace';
  
  /**
   * Side face action button
   * - Width: 105px, Height: 24px
   * - Background: #dbdbdb (gray)
   * - Border radius: 15px
   * - Positioned right with 38px margin
   */
  const CEILING_SIDE_FACE = 'ceilingSideFace';
}

export = AutoCeilingPreviewPanelStyles;