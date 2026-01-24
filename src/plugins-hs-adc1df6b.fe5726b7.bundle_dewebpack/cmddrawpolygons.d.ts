import { HSApp } from './HSApp';
import { DrawLine } from './DrawLine';
import { Vector2, Loop } from './Vector';
import { Sketch2dBuilder } from './Sketch2dBuilder';

/**
 * Command for drawing polygon roofs in 2D sketch mode.
 * Extends the base command for drawing extraordinary lines.
 */
export declare class CmdDrawPolygons extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExLines {
  /**
   * Reference to the 2D sketch builder instance.
   */
  sketch2dBuilder: Sketch2dBuilder;

  /**
   * Creates a new CmdDrawPolygons command instance.
   * @param sketch2dBuilder - The 2D sketch builder to use for polygon operations
   */
  constructor(sketch2dBuilder: Sketch2dBuilder);

  /**
   * Creates a 2D gizmo for visual feedback during polygon drawing.
   * @param params - Configuration parameters for gizmo creation
   * @param params.context - The rendering context
   * @param params.displayLayers - Display layer management object
   * @param params.displayLayers.temp - Temporary display layer for drawing
   * @returns A DrawLine gizmo instance for user interaction
   */
  protected _create2DGizmo(params: {
    context: any;
    displayLayers: {
      temp: any;
    };
  }): DrawLine;

  /**
   * Handles input events for the command.
   * Intercepts ESC key to cancel current operation.
   * @param eventType - Type of event (e.g., "keydown", "mousemove")
   * @param eventData - Event data object containing event details
   * @param eventData.keyCode - Keyboard key code for keyboard events
   * @returns True if event was handled, false otherwise
   */
  onReceive(eventType: string, eventData: { keyCode?: number }): boolean;

  /**
   * Creates a transaction request for drawing polygons.
   * Validates polygon data and creates loops from point arrays.
   * @param polygonData - Array of polygons, where each polygon is an array of Vector2 points
   * @returns A transaction request object for the roof polygon drawing operation
   */
  protected _createRequest(polygonData: Vector2[][]): any;

  /**
   * Displays toast notifications for invalid polygon conditions.
   * Shows warnings for self-intersecting or unclosed polygons.
   * @param polygonData - Array of polygons to validate
   */
  showToast(polygonData: Vector2[][]): void;

  /**
   * Returns the human-readable description of this command.
   * @returns Localized string "画直线屋顶" (Draw straight-line roof)
   */
  getDescription(): string;

  /**
   * Returns the category/group type for logging purposes.
   * @returns The RoofsDrawing log group type constant
   */
  getCategory(): string;
}