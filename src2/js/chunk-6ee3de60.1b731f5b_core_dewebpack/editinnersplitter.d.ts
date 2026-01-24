import type { Point } from 'konva/lib/types';
import type { ShapeManager } from './ShapeManager';
import type { MomentoManager } from './MomentoManager';
import type { Tool, ToolType } from './Tool';

/**
 * View interface containing required managers and properties
 */
interface IView {
  /** Shape manager for handling shape operations */
  shapeManager: ShapeManager;
  /** Momento manager for undo/redo functionality */
  mometoManager: MomentoManager;
}

/**
 * Virtual shape interface representing the draggable shape element
 */
interface IVShape {
  /** Shape attributes containing robot reference */
  attrs: {
    /** Robot instance associated with this shape */
    robot: unknown;
  };
}

/**
 * Mouse/touch event interface for drag operations
 */
interface IDragEvent {
  /** The target shape element being dragged */
  target: IVShape;
}

/**
 * Tool for editing inner splitter elements within shapes.
 * Handles drag operations to adjust internal split points or dividers.
 * 
 * @extends Tool
 */
declare class EditInnerSplitter extends Tool {
  /** Reference to the parent view containing managers */
  private readonly view: IView;
  
  /** Previous point position during drag operation */
  private prevPt: Point;
  
  /** Current point position during drag operation */
  private curPt: Point;
  
  /** The virtual shape being dragged, undefined when no drag is active */
  private vshape?: IVShape;

  /**
   * Creates an instance of EditInnerSplitter
   * 
   * @param view - The view instance containing shape and momento managers
   */
  constructor(view: IView);

  /**
   * Handler called when drag operation starts
   * Initializes the drag state and captures the target shape
   * 
   * @param event - Drag event containing target shape information
   */
  dragstart(event: IDragEvent): void;

  /**
   * Handler called continuously during drag movement
   * Requests animation frame to perform the drag task smoothly
   * 
   * @param event - Drag event with current position data
   */
  dragmove(event: IDragEvent): void;

  /**
   * Handler called when mouse/touch interaction completes
   * Finalizes the drag operation, creates checkpoint, and restores shape state
   * 
   * @param event - Final mouse event
   */
  mousedone(event: IDragEvent): void;

  /**
   * Executes the drag task by calculating movement delta and updating shape
   * 
   * @param isFinalized - Whether this is the final update (default: false)
   * @internal
   */
  private doTask(isFinalized?: boolean): void;
}

export { EditInnerSplitter };