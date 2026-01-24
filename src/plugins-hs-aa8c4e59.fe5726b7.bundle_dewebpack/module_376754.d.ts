/**
 * BOM Filter Box Styles Module
 * 
 * This module exports CSS styles for the BOM (Bill of Materials) filter box component.
 * It customizes the modal content wrapper dimensions for the homestyler UI components.
 * 
 * @module BomFilterBoxStyles
 */

/**
 * CSS module export containing styles for BOM filter box modal
 * 
 * Styles include:
 * - Custom width (auto) for homestyler modal outer container within BOM filter box
 * 
 * @remarks
 * This is typically used with CSS-in-JS loaders (e.g., css-loader, style-loader)
 * The styles target: .bom-filter-box .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-outer
 */
declare const styles: string[];

export default styles;

/**
 * Alternative named export interface for CSS module
 */
export interface BomFilterBoxStyles {
  /**
   * CSS rule ID/identifier from the build system
   */
  readonly id: string | number;
  
  /**
   * Raw CSS content string
   */
  readonly content: string;
  
  /**
   * Source map reference (if available)
   */
  readonly sourceMap?: string;
}