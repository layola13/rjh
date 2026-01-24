import { ToolType } from './ToolType';
import { DragDrawTool } from './DragDrawTool';
import { WinPolygon } from './WinPolygon';
import { View } from './View';
import { DragEvent } from './DragEvent';

/**
 * Square selection tool for selecting and highlighting mullion bars within shapes.
 * Allows users to draw a rectangular selection area and automatically highlights
 * intersecting mullion bars.
 * 
 * @extends DragDrawTool
 */
export declare class SquareSelectTool extends DragDrawTool {
  /**
   * Creates a new SquareSelectTool instance.
   * 
   * @param view - The view instance to associate with this tool
   */
  constructor(view: View);

  /**
   * Fill color for the selection rectangle with 30% opacity.
   * 
   * @readonly
   * @returns Semi-transparent black color
   */
  get fillColor(): string;

  /**
   * Stroke width for the selection rectangle border.
   * 
   * @readonly
   * @returns Border width in pixels
   */
  get strokeWidth(): number;

  /**
   * Stroke color for the selection rectangle border with 90% opacity.
   * 
   * @readonly
   * @returns Nearly opaque black color
   */
  get strokeColor(): string;

  /**
   * Indicates whether the selection rectangle border should be dashed.
   * 
   * @readonly
   * @returns Always false for solid border
   */
  get dashed(): boolean;

  /**
   * Creates the polygon shape used for click detection and selection.
   * 
   * @readonly
   * @returns A new WinPolygon instance
   */
  get clickShape(): WinPolygon;

  /**
   * Handles the completion of a drag operation. Checks for intersections
   * between the drawn selection area and mullion bars, highlighting any
   * intersecting or contained bars. If selections are made, equalizes
   * mullions; otherwise releases the tool.
   * 
   * @param event - The drag event containing the selection polygon
   */
  finishDrag(event: DragEvent): void;
}