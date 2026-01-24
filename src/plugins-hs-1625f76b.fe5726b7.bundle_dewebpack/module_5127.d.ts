/**
 * CSS module exports for draw-room-page component styles
 * This module provides stylesheet definitions for the room drawing interface panel
 * 
 * @module DrawRoomPageStyles
 */

/**
 * CSS module loader function type
 * Represents a webpack css-loader module that exports CSS content
 * 
 * @param exports - The module exports object to be populated
 * @param module - The webpack module metadata
 * @param require - The webpack require function for loading dependencies
 */
declare function loadDrawRoomPageStyles(
  exports: CSSModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * CSS Module exports interface
 * Contains methods for managing CSS content in the module system
 */
interface CSSModuleExports {
  /**
   * Push CSS content to the module's style array
   * 
   * @param content - Array containing module ID and CSS string content
   */
  push(content: [string | number, string]): void;
}

/**
 * Webpack module metadata
 * Contains information about the current module being processed
 */
interface WebpackModule {
  /**
   * Unique identifier for this module
   * Original ID: 5127
   */
  id: string | number;
  
  /**
   * Module exports object that will be populated
   */
  exports: CSSModuleExports;
}

/**
 * Webpack require function type
 * Used to load other modules as dependencies
 * 
 * @param moduleId - The ID of the module to require
 * @returns The required module's exports
 */
type WebpackRequire = (moduleId: number) => CSSModuleExports;

/**
 * Draw Room Page CSS Styles
 * 
 * This module contains all stylesheet definitions for the draw room page component including:
 * - Main container layout (280px width panel with white background)
 * - Scroll area configuration (calc(100% - 50px) height)
 * - Button groups for house type selection
 * - Large buttons (232x50px) for primary actions
 * - Small buttons (107x90px) for secondary options
 * - Auto-layout button configurations
 * - Door/window and structure area catalog styling
 * - Icon and content wrapper positioning
 * 
 * Key component classes:
 * - .draw-room-page: Main container
 * - .house-type-button-large: Primary action buttons
 * - .house-type-button-small: Secondary option buttons
 * - .house-type-button-auto-layout: Flexible layout buttons
 * - .catalog-image-button: Asset catalog items
 */
declare const drawRoomPageStyles: string;

export = loadDrawRoomPageStyles;