/**
 * DrawRectangleGizmo Module
 * Provides a gizmo for drawing rectangular regions on a 2D canvas with inference guides
 */

import type { HSApp } from './HSApp';
import type { Line2d } from './Line2d';

/**
 * Represents a 2D point with x and y coordinates
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * SVG path styling properties for the drawing gizmo
 */
export interface PathStyleConfig {
  'stroke-dasharray': string;
  'vector-effect': string;
  'stroke-width': number;
  'stroke-opacity': number;
  stroke: string;
  fill: string;
  opacity: number;
  'pointer-events': string;
}

/**
 * SVG element wrapper representing a drawable path
 */
export interface SvgPathElement {
  attr(attributes: Record<string, string | number>): this;
  show(): void;
  hide(): void;
  remove(): void;
}

/**
 * Represents a guideline defined by two anchor points
 */
export type GuideLine = [Point2D, Point2D];

/**
 * Gizmo for drawing rectangular regions with visual feedback and snap-to-grid inference
 * 
 * @extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExRectangleGizmo
 */
export declare class DrawRectangleGizmo extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExRectangleGizmo {
  /**
   * SVG path element representing the stroke outline of the rectangle being drawn
   */
  strokeLine?: SvgPathElement;

  /**
   * Creates a new DrawRectangleGizmo instance
   * 
   * @param param1 - First constructor parameter (inherited from base class)
   * @param param2 - Second constructor parameter (inherited from base class)
   * @param param3 - Third constructor parameter (inherited from base class)
   */
  constructor(param1: unknown, param2: unknown, param3: unknown);

  /**
   * Called during the drawing process to render the rectangle
   * Updates or creates the stroke line visualization
   */
  onDraw(): void;

  /**
   * Updates the stroke line path based on current drawing points
   * Only updates when exactly 2 points have been placed
   */
  updateStrokeLine(): void;

  /**
   * Retrieves inference guide lines from the active layer's roof sketch
   * Used for snapping and alignment assistance
   * 
   * @param param - Input parameter (usage depends on implementation)
   * @returns Array of guideline pairs
   */
  getInferenceGuideLines(param: unknown): GuideLine[];

  /**
   * Cleanup method called when the gizmo is destroyed or reset
   * Removes the stroke line element from the DOM
   */
  onCleanup(): void;

  /**
   * Handles ESC key press to cancel the current drawing operation
   * Marks the graph as dirty to trigger re-render
   */
  onESC(): void;

  /**
   * Retrieves construction inference lines including region boundaries
   * Collects lines from existing roof drawing regions and their outer loops
   * 
   * @returns Array of inference lines for snapping
   */
  getConstructInferenceLines(): GuideLine[];

  /**
   * Returns the localization key for the normal state tooltip
   * 
   * @returns Translation key for the drawing region tooltip
   * @internal
   */
  _getNormalTipKey(): string;

  /**
   * Internal method to generate SVG path strings from point arrays
   * 
   * @param paths - Array of path segments, each containing an array of points
   * @returns SVG path string or empty string
   * @internal
   */
  protected _getPathsSvg(paths: Point2D[][]): string;

  /**
   * Path points collected during the drawing operation
   * @internal
   */
  protected path: Point2D[];

  /**
   * Rendering context providing SVG manipulation methods
   * @internal
   */
  protected context: {
    path(d: string): SvgPathElement;
  };

  /**
   * Style configuration for the path element
   * @internal
   */
  protected styles: {
    pathStyle: PathStyleConfig;
  };

  /**
   * Marks the scene graph as requiring re-render
   * @internal
   */
  protected dirtyGraph(): void;
}