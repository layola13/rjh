/**
 * SVG dimension type enumeration for various opening dimension gizmos.
 * Defines string literal types used in the HSW SVG view system.
 * 
 * @module SVGDimensionType
 * @moduleId 478346
 */

/**
 * Enumeration of SVG dimension types used for opening calculations and parametric dimensions.
 * Each type corresponds to a specific gizmo class in the hsw.view.svg.gizmo namespace.
 */
export enum SVGDimensionType {
  /**
   * Base type for calculated opening dimensions.
   * @type {string}
   */
  OpeningCalculatedDimensionBase = "hsw.view.svg.gizmo.OpeningCalculatedDimensionBase",
  
  /**
   * Standard calculated dimension for openings.
   * @type {string}
   */
  OpeningCalculatedDimension = "hsw.view.svg.gizmo.OpeningCalculatedDimension",
  
  /**
   * Parametric dimension type for openings.
   * @type {string}
   */
  ParametricopeningDimension = "hsw.view.svg.gizmo.ParametricOpeningDimension",
  
  /**
   * Calculated parametric dimension for openings.
   * @type {string}
   */
  ParametricopeningCalculatedDimension = "hsw.view.svg.gizmo.ParametricopeningCalculatedDimension"
}