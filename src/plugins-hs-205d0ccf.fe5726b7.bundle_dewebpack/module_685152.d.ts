/**
 * Window selection command module
 * Handles rectangular selection of entities in the canvas
 */

/**
 * Point coordinate in 2D space
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Rectangular boundary definition
 */
export interface Bound {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Mouse event data passed to command handlers
 */
export interface MouseEventData {
  position: Point;
  event: MouseEvent;
  clientX: number;
  clientY: number;
}

/**
 * Selection manager interface for managing entity selection state
 */
export interface SelectionManager {
  /**
   * Get currently selected entities
   */
  selected(): Array<HSCore.Model.Entity>;
  
  /**
   * Unselect specified entities
   */
  unselect(entities: Array<HSCore.Model.Entity>): void;
  
  /**
   * Select specified entities
   */
  select(entities: Array<HSCore.Model.Entity>): void;
}

/**
 * Gizmo interface for interactive canvas overlays
 */
export interface Gizmo {
  onMouseMove(event: MouseEvent, x: number, y: number): void;
  onMouseUp(event: MouseEvent, x: number, y: number): void;
  onCleanup(): void;
}

/**
 * Environment interface representing the active editing context
 */
export interface Environment {
  id: string;
  paintMode?: string;
  
  /**
   * Get the active sketch 2D entity if in sketch mode
   */
  getSketch2dEntity?(): HSCore.Model.Sketch2dEntity | null;
  
  /**
   * Get the 2D canvas for sketch environments
   */
  getCanvas2d?(): Canvas2D;
  
  /**
   * Check if in free paint mode
   */
  isFreePaintMode?(): boolean;
}

/**
 * Canvas 2D interface for coordinate transformations
 */
export interface Canvas2D {
  context: CanvasRenderingContext2D;
  displayLayers: {
    temp: HTMLElement;
  };
  gizmoManager: GizmoManager;
  
  /**
   * Convert model bound to canvas coordinates
   */
  modelBoundToCanvas?(bound: Bound): Bound;
  
  /**
   * Convert canvas point to model coordinates
   */
  canvasPointToModel(point: Point): Point;
}

/**
 * Gizmo manager for adding/removing interactive overlays
 */
export interface GizmoManager {
  addGizmo(gizmo: Gizmo): void;
  removeGizmo(gizmo: Gizmo): void;
}

/**
 * Window selection command class
 * Implements rectangular selection functionality for entities in the canvas
 */
export default class WindowSelectCommand extends HSApp.Cmd.Command {
  /**
   * Starting point of selection rectangle
   */
  private _startPoint: Point;
  
  /**
   * Ending point of selection rectangle
   */
  private _endPoint: Partial<Point>;
  
  /**
   * Selection manager instance
   */
  private _selectionMgr: SelectionManager;
  
  /**
   * Application instance reference
   */
  private app: HSApp.App.Application;
  
  /**
   * Entities picked by the current selection operation
   */
  private pickedEntities: Array<HSCore.Model.Entity>;
  
  /**
   * Flag for positive selection mode (left-to-right drag)
   */
  private PositiveSelection: boolean;
  
  /**
   * Flag for negative selection mode (right-to-left drag)
   */
  private NegativeSelection: boolean;
  
  /**
   * Currently active environment
   */
  private activeEnv: Environment;
  
  /**
   * Interactive gizmo for visual feedback
   */
  private gizmo?: Gizmo;

  /**
   * @param startPoint - Initial mouse position when selection begins
   */
  constructor(startPoint: Point);

  /**
   * Execute command initialization
   * @param arg1 - First execution argument
   * @param arg2 - Second execution argument
   * @param arg3 - Third execution argument
   */
  onExecute(arg1: unknown, arg2: unknown, arg3: unknown): void;

  /**
   * Create and initialize the selection gizmo overlay
   */
  createGizmo(): void;

  /**
   * Remove and cleanup the selection gizmo
   */
  destroyGizmo(): void;

  /**
   * Pick sketch faces within the selection bounds
   * @param selectionBound - The rectangular selection area
   * @returns True if sketch faces were processed, false otherwise
   */
  pickSketchFaces(selectionBound: Bound): boolean;

  /**
   * Check if entity is a background model in sketch mode
   * @param entity - Entity to check
   * @returns True if entity is a background model
   */
  private _isBackgroundModel(entity: HSCore.Model.Entity): boolean;

  /**
   * Check if currently in sketch 2D environment
   * @returns True if in sketch 2D mode
   */
  isSketch2dEnv(): boolean;

  /**
   * Perform picking operation on entities
   * @param selectionBound - Rectangular selection area
   * @param shiftKeyPressed - Whether shift key is held for additive selection
   * @param isPositiveSelection - Selection mode (true = contain fully, false = intersect)
   */
  doPick(selectionBound: Bound, shiftKeyPressed: boolean, isPositiveSelection: boolean): void;

  /**
   * Apply selection to picked entities
   */
  private _doSelect(): void;

  /**
   * Pick blocks in mix paint environment
   * @param startPoint - Selection start point
   * @param endPoint - Selection end point
   * @param selectionBound - Rectangular selection area
   * @param paintContext - Mix paint context object
   */
  doPick_MixPaintBlock(
    startPoint: Point,
    endPoint: Point,
    selectionBound: Bound,
    paintContext: {
      mixpaint: unknown;
      ui: {
        mixpaintCanvas: Canvas2D;
      };
    }
  ): void;

  /**
   * Get block boundary in canvas coordinates
   * @param block - Block entity with points
   * @param canvas - Canvas for coordinate transformation
   * @returns Bound in canvas space
   */
  private _getBlockBoundInCanvas(block: { points: Array<Point> }, canvas: Canvas2D): Bound;

  /**
   * Pick entity if fully contained within selection bounds
   * @param entityBound - Boundary of the entity
   * @param selectionBound - Selection rectangle
   * @param entity - Entity to potentially pick
   */
  pickInnerBox(entityBound: Bound, selectionBound: Bound, entity: HSCore.Model.Entity): void;

  /**
   * Pick entity if intersecting with selection bounds
   * @param entityBound - Boundary of the entity
   * @param selectionBound - Selection rectangle
   * @param entity - Entity to potentially pick
   */
  pickBorderBox(entityBound: Bound, selectionBound: Bound, entity: HSCore.Model.Entity): void;

  /**
   * Handle incoming command messages
   * @param message - Message type identifier
   * @param data - Message payload data
   * @returns True if message was handled
   */
  onReceive(message: string, data: MouseEventData): boolean;

  /**
   * Check if currently in mix paint environment
   * @returns True if in mix paint mode
   */
  private _isMixPaintEnv(): boolean;

  /**
   * Check if in mix paint environment with free paint mode active
   * @returns True if in free paint mode
   */
  private _isMixPaintEnvFreeMode(): boolean;

  /**
   * Handle ESC key press to cancel command
   */
  onESC(): void;

  /**
   * Cleanup resources when command ends
   */
  onCleanup(): void;

  /**
   * Check if command supports undo/redo
   * @returns Always false - selection is not undoable
   */
  canUndoRedo(): boolean;

  /**
   * Check if command can be suspended
   * @returns Always false - selection cannot be suspended
   */
  canSuspend(): boolean;
}