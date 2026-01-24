import Flatten from '@flatten-js/core';
import { DragDrawTool } from './DragDrawTool';
import { Shape } from './Shape';
import { CirclePoly, ExtraDimRadius } from './Polygon';
import { View } from './View';
import { Point, Vector } from './Geometry';
import { ShapeManager } from './ShapeManager';

/**
 * Extra dimension radius tool for creating radius dimension annotations
 * Extends DragDrawTool to provide interactive dimension creation functionality
 */
export declare class ExtraDimRadiusTool extends DragDrawTool {
  /**
   * Reference to the tool instance
   */
  tool: unknown;

  /**
   * The active view where dimensions are created
   */
  view: View;

  /**
   * Virtual shapes used for displaying snap points
   */
  vshapes: Shape[];

  /**
   * Distance threshold for snapping to arc midpoints
   */
  snapDist: number;

  /**
   * The currently created extra dimension object
   */
  extraDim?: ExtraDimRadius;

  /**
   * Current cursor position
   */
  curPt: Point;

  /**
   * Creates a new ExtraDimRadiusTool instance
   * @param tool - The tool configuration or reference
   * @param view - The view where dimensions will be created
   */
  constructor(tool: unknown, view: View);

  /**
   * Initializes the tool and displays all available snap points
   * Called when the tool becomes active
   */
  initialTool(): void;

  /**
   * Cleans up resources and hides all snap points
   * Called when the tool is deactivated
   */
  cleanup(): void;

  /**
   * Retrieves all arc midpoints from shapes in the view
   * @returns Array of tuples containing [midpoint, shape, arc]
   */
  getAllPoints(): Array<[Point, unknown, Flatten.Arc]>;

  /**
   * Displays visual indicators (circles) at all available snap points
   * Creates CirclePoly shapes at arc midpoints for user feedback
   */
  showAllPoints(): void;

  /**
   * Hides and removes all snap point visual indicators
   * Clears the vshapes array
   */
  hideAllPoints(): void;

  /**
   * Finds the closest snap point within snap distance threshold
   * @param point - The point to snap from (typically cursor position)
   * @returns Tuple of [midpoint, shape, arc] if snap found, undefined otherwise
   */
  snapPoint(point: Point): [Point, unknown, Flatten.Arc] | undefined;

  /**
   * Handles mouse move events
   * Updates snap indicators based on cursor position
   * @param event - Mouse move event data
   */
  mousemove(event: MouseEvent): void;

  /**
   * Completes the dimension creation operation
   * Creates an ExtraDimRadius object at the snapped location
   * Calculates offset vector based on arc geometry
   */
  finishDrag(): void;

  /**
   * Renders auxiliary graphics and refreshes the view
   */
  drawAux(): void;

  /**
   * Displays a circular snap indicator at the given point
   * @param point - Location to display the snap indicator
   */
  displayCircleSnap(point: Point): void;

  /**
   * Hides all active snap indicators
   */
  hideSnaps(): void;
}