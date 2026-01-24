/**
 * CircleArc module for outdoor drawing functionality
 * Provides SVG-based circular arc rendering and interaction
 */

import { HSApp } from './HSApp';
import { EdgeUtil } from './EdgeUtil';
import { HSFPConstants } from './HSFPConstants';

/**
 * Circular arc view component for 2D extraordinary sketches
 * Extends the base CircleArc2d view with background topology support
 */
export declare class CircleArc extends HSApp.View.SVG.ExtraordinarySketch2d.CircleArc2d {
  /**
   * Creates a new CircleArc instance
   * @param startPoint - Starting point of the arc
   * @param endPoint - Ending point of the arc
   * @param center - Center point of the arc
   * @param radius - Radius of the circular arc
   */
  constructor(
    startPoint: unknown,
    endPoint: unknown,
    center: unknown,
    radius: unknown
  );

  /**
   * SVG element reference (Snap.svg or similar)
   */
  element: Array<{
    attr(attributes: Record<string, unknown>): void;
  }>;

  /**
   * Associated entity containing the source model
   */
  entity: {
    srcModel: {
      /**
       * Topology identifiers (e.g., "background")
       */
      topos: string[];
    };
  };

  /**
   * Updates the visual style of the arc
   * Applies special stroke width for background topology elements
   * @protected
   */
  protected _updateStyle(): void;

  /**
   * Handles flag change events for the arc
   * Synchronizes point flags for background topology elements
   * @param flag - The new flag value
   */
  onFlagChanged(flag: unknown): void;
}

/**
 * Controller for CircleArc2d interaction and command generation
 * Handles movement and manipulation of circular arc entities
 * @internal
 */
declare class CircleArc2dController extends HSApp.View.SVG.ExtraordinarySketch2d.CircleArc2dController {
  /**
   * Determines the command type for move operations
   * @returns The command type for moving curves in outdoor drawings
   * @protected
   */
  protected _getMoveCmdType(): typeof HSFPConstants.CommandType.OutdoorDrawing.MoveCurve;
}