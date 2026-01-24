/**
 * Module: ExtraDimArbitraryTool
 * A tool for creating arbitrary extra dimensions by snapping to existing vertices and dock points
 */

import { DragDrawTool } from './DragDrawTool';
import { Artisan, DrawParams } from './Artisan';
import { CirclePoly, ExtraDimArbitrary } from './Geometry';
import { ShapeColor, DockTaskStatus, Utils } from './Utils';
import type { View } from './View';
import type { Shape } from './Shape';
import type { Point } from './Point';
import type { Polygon } from './Polygon';
import type { DockPoint } from './DockPoint';

/**
 * Tuple containing a point and its associated shape
 * [0] - The point coordinates
 * [1] - The shape that owns the point
 */
type PointShapeTuple = [Point, Shape];

/**
 * Tool for creating arbitrary extra dimensions between points
 * Supports snapping to polygon vertices and dock points
 */
export declare class ExtraDimArbitraryTool extends DragDrawTool {
  /** The tool identifier */
  readonly tool: string;
  
  /** The view this tool operates on */
  readonly view: View;
  
  /** Visual shapes representing snappable points */
  private vshapes: Shape[];
  
  /** Snap distance threshold for point detection */
  private snapDist: number;
  
  /** The extra dimension being created */
  private extraDim?: ExtraDimArbitrary;
  
  /**
   * Creates a new ExtraDimArbitraryTool instance
   * @param tool - Tool identifier string
   * @param view - The view to operate on
   */
  constructor(tool: string, view: View);
  
  /**
   * Initialize the tool and display all snappable points
   */
  initialTool(): void;
  
  /**
   * Collect all snappable points from polygon vertices and dock points
   * @returns Array of point-shape tuples representing all snappable locations
   */
  getAllPoints(): PointShapeTuple[];
  
  /**
   * Visualize all snappable points as circles on the active layer
   */
  showAllPoints(): void;
  
  /**
   * Hide and clear all visualized snappable points
   */
  hideAllPoints(): void;
  
  /**
   * Find the nearest snappable point within snap distance
   * @param point - The point to test
   * @returns The nearest point-shape tuple if within snap distance, undefined otherwise
   */
  snapPoint(point: Point): PointShapeTuple | undefined;
  
  /**
   * Create a new extra dimension from a snapped point
   * @param pointData - Tuple containing the start point and host shape
   */
  createDim(pointData: PointShapeTuple): void;
  
  /**
   * Handle mouse down event - creates dimension if clicking on snappable point
   * @param event - Mouse event data
   */
  mousedown(event: MouseEvent): void;
  
  /**
   * Handle mouse move event - updates auxiliary drawing
   * @param event - Mouse event data
   */
  mousemove(event: MouseEvent): void;
  
  /**
   * Clean up auxiliary visual elements
   */
  recyleAux(): void;
  
  /**
   * Render auxiliary visual feedback
   */
  drawAux(): void;
  
  /**
   * Update auxiliary elements based on cursor position
   * Highlights nearby snap points and updates dimension preview
   */
  makeAux(): void;
  
  /**
   * Finalize the dimension creation
   * Snaps to nearest point if available, adds dimension to host shape
   * @param event - Mouse event data
   */
  finishDrag(event: MouseEvent): void;
}