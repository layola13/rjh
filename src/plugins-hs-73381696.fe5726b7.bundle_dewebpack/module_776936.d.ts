/**
 * Performance monitoring utility for tracking memory and graphics metrics
 * @module PerformanceMonitor
 */

/**
 * Memory usage statistics in megabytes
 */
export interface MemoryStats {
  /** Used JavaScript heap size in MB */
  used?: number;
  /** JavaScript heap size limit in MB */
  limit?: number;
}

/**
 * Graphics performance metrics
 */
export interface GraphicsStats {
  /** Memory used by graphics in MB (not yet implemented) */
  memory: number;
  /** Render time or performance metric (not yet implemented) */
  render: number;
}

/**
 * View context interface for 2D SVG rendering
 */
export interface SVGView {
  // Add specific SVG view methods/properties as needed
}

/**
 * View context interface for 3D WebGL rendering
 */
export interface WebGLView {
  // Add specific WebGL view methods/properties as needed
}

/**
 * Application context providing access to rendering views
 */
export interface ApplicationContext {
  /** Get the active 2D SVG view */
  getActive2DView(): SVGView;
  /** Get the active 3D WebGL view */
  getActive3DView(): WebGLView;
}

/**
 * Performance monitor class for tracking application performance metrics
 * Monitors memory usage and graphics performance for both SVG and WebGL views
 */
export default class PerformanceMonitor {
  /** Reference to the active 2D SVG view */
  private _svgView: SVGView;
  
  /** Reference to the active 3D WebGL view */
  private _webGLView: WebGLView;

  /**
   * Creates a new PerformanceMonitor instance
   * @param context - Application context containing view references
   */
  constructor(context: ApplicationContext);

  /**
   * Get current memory usage statistics
   * Uses the Performance Memory API if available
   * @returns Memory statistics with used and limit in MB, or empty object if API unavailable
   */
  memory(): MemoryStats;

  /**
   * Get graphics performance metrics
   * @returns Graphics statistics (currently returns NaN placeholders)
   * @todo Implement actual graphics performance tracking
   */
  graphics(): GraphicsStats;
}