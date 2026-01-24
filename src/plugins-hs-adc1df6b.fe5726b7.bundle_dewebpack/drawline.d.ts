import { HSApp } from './518193';
import { Line2d } from './815362';

/**
 * DrawLine class - A gizmo component for drawing lines with customization support
 * Extends the DrawExLinesWithAngle base class to provide specialized line drawing functionality
 */
export declare class DrawLine extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExLinesWithAngle {
  /**
   * Creates a new DrawLine instance
   */
  constructor();

  /**
   * Retrieves all customized lines from the active layer
   * Includes guidelines from roof sketches and curves from drawing regions
   * 
   * @returns An array of line segments, where each segment is represented as a tuple of two anchor points [start, end]
   */
  protected _getCustomizedLines(): Array<[unknown, unknown]>;

  /**
   * Updates the dimension display for the currently picked point
   * This method is called when the user selects a point during the drawing operation
   * 
   * @returns void
   */
  updatePickPointDimension(): void;
}

/**
 * Type alias for anchor point coordinates
 * Represents a point in 2D space used as line endpoints
 */
export type AnchorPoint = unknown;

/**
 * Type alias for line segment representation
 * A tuple containing start and end anchor points
 */
export type LineSegment = [AnchorPoint, AnchorPoint];