import { Vector3, Vector2, Line2d, OffsetCurve2d, Interval, Loop } from './geometry';
import { HSApp } from './app';
import { HSCore } from './core';
import { HSFPConstants } from './constants';

/**
 * Command for cutting/splitting molding (baseboard or crown molding) into segments.
 * Provides interactive gizmo-based dimension control and intersection detection.
 */
export declare class CmdCutMolding extends HSApp.Cmd.Command {
  /** The molding entity being cut */
  private molding: HSCore.Model.Baseboard | HSCore.Model.CrownMolding;
  
  /** Reference to the main application instance */
  private app: HSApp.Application;
  
  /** Start position of the molding path */
  private startPos: Vector3;
  
  /** End position of the molding path */
  private endPos: Vector3;
  
  /** Current pick/cursor position in 3D space */
  private pickPoint: Vector3;
  
  /** Interactive dimension gizmo for visual feedback */
  private gizmo?: HSApp.Gizmo.CutMoldingDimensionGizmo;
  
  /** Signal hook manager for event handling */
  private signalHook?: HSCore.Util.SignalHook;
  
  /** Display list mapping entity IDs to display objects */
  private displayList: Record<string, HSApp.View.DisplayObject>;
  
  /** Array of intersection positions with room contents */
  private intersectContentPos: Vector3[];
  
  /** Maximum length of the molding line */
  private lineMaxLength: number;
  
  /** Height of the layer containing the molding */
  private layerHeight: number;

  /**
   * Creates a new CmdCutMolding command instance.
   * @param molding - The molding entity to be cut
   */
  constructor(molding: HSCore.Model.Baseboard | HSCore.Model.CrownMolding);

  /**
   * Gets the altitude/height of the layer containing the molding.
   * @returns Layer height in world units
   */
  private getLayerHeight(): number;

  /**
   * Extracts and caches the start/end positions from the molding's sweep path.
   */
  private getMoldingPos(): void;

  /**
   * Creates and initializes the interactive dimension gizmo.
   * Sets up event listeners for value changes.
   * @returns The created gizmo instance
   */
  private createGizmo(): HSApp.Gizmo.CutMoldingDimensionGizmo;

  /**
   * Handles dimension value changes from the gizmo.
   * Updates cut position or performs the cut operation.
   * @param event - Value changed event data
   */
  private handleValueChanged(event: { data: { dim: { start: Vector3; end: Vector3 }; value: number } }): void;

  /**
   * Updates the gizmo position based on pick point.
   * @param point - New position for the gizmo
   */
  private updateGizmo(point?: Vector3): void;

  /**
   * Cleans up and destroys the gizmo and its event listeners.
   */
  private destroyGizmo(): void;

  /**
   * Executes when the command starts.
   * Initializes intersection detection and sets up the cursor.
   */
  onExecute(): void;

  /**
   * Handles user input events (click, mousemove, etc.).
   * @param eventType - Type of event received
   * @param eventData - Event data containing entity and position information
   * @returns Whether the event was handled
   */
  onReceive(
    eventType: string,
    eventData: {
      event: MouseEvent;
      entity: HSCore.Model.Entity;
      modelPos: Vector3;
    }
  ): boolean;

  /**
   * Snaps the pick point to nearby intersection positions.
   * @param position - Current cursor position
   */
  private doSnappingIntersectPos(position: Vector3): void;

  /**
   * Calculates intersection positions between molding and room contents.
   * Populates intersectContentPos array.
   */
  private getIntersectPos(): void;

  /**
   * Checks if a content item's Z-interval intersects with the molding.
   * @param moldingInterval - Z-range of the molding
   * @param content - Room content entity to check
   * @returns True if intervals intersect
   */
  private isIntersected(moldingInterval: Interval, content: HSCore.Model.Content): boolean;

  /**
   * Extracts 2D outline lines from a content entity's bounding box.
   * @param content - Content entity
   * @returns Array of 2D lines representing the outline
   */
  private getContentBoxLine(content: HSCore.Model.Content): Line2d[];

  /**
   * Converts a generic curve to a Line2d.
   * @param curve - Curve to convert
   * @returns Line2d representation
   */
  private curveToLine(curve: HSCore.Geometry.Curve2d): Line2d;

  /**
   * Finds intersection points between molding line and content outline lines.
   * @param moldingLine - Offset molding path line
   * @param contentLines - Array of content outline lines
   * @returns Array of intersection points
   */
  private getContentLinesIntersected(moldingLine: Line2d, contentLines: Line2d[]): Vector2[];

  /**
   * Cleanup when command exits.
   * Removes gizmo, resets cursor, and clears highlights.
   */
  onCleanup(): void;

  /**
   * Performs the actual molding cut operation at the specified position.
   * Creates a transaction request and updates the molding reference.
   * @param position - 3D position where to cut the molding
   */
  private cutMolding(position: Vector3): void;

  /**
   * Highlights or unhighlights the molding's outline mesh.
   * @param highlight - Whether to highlight (true) or unhighlight (false)
   * @param force - Force update even if state hasn't changed
   */
  private highlightOutlineMesh(highlight: boolean, force?: boolean): void;

  /**
   * Updates the 3D view cursor style.
   * @param cursorStyle - CSS cursor style string or cursor enum
   */
  private updateViewCursor(cursorStyle: string | HSApp.View.CursorEnum): void;

  /**
   * Handles ESC key press to cancel the command.
   */
  private onESC(): void;

  /**
   * Gets the human-readable description of this command.
   * @returns Localized description string
   */
  getDescription(): string;

  /**
   * Gets the logging category for this command.
   * @returns Log group type identifier
   */
  getCategory(): string;
}