import type { Point, Vector } from 'snap.svg';
import type { ShapeHelper } from './ShapeHelper';
import type { Tool, ToolType } from './Tool';

/**
 * Represents a label entity with geometry and offset information
 */
interface ILabel {
  /** Offset vector for label positioning */
  offvec: Vector;
  
  /** Updates the polygon geometry of the label */
  updatePoly(): void;
  
  /** Renders the label on the given view */
  draw(view: IView): void;
}

/**
 * Visual shape element with custom attributes
 */
interface IVShape {
  /** Shape attributes including robot label reference */
  attrs: {
    /** Associated label/robot data */
    robot?: ILabel;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Drag event interface
 */
interface IDragEvent {
  /** The target shape being dragged */
  target: IVShape;
  [key: string]: unknown;
}

/**
 * Memento manager for undo/redo functionality
 */
interface IMementoManager {
  /** Creates a checkpoint in the edit history */
  checkPoint(): void;
}

/**
 * View/canvas context interface
 */
interface IView {
  /** Manager for tracking edit history */
  mometoManager: IMementoManager;
  [key: string]: unknown;
}

/**
 * Tool for editing label positions by dragging
 * 
 * Allows users to interactively adjust label offsets relative to their
 * associated shapes through mouse drag operations.
 * 
 * @extends Tool
 */
export declare class EditLabelTool extends Tool {
  /** The view/canvas context this tool operates on */
  protected view: IView;
  
  /** Previous mouse position during drag operation */
  protected prevPt: Point;
  
  /** Current mouse position during drag operation */
  protected curPt?: Point;
  
  /** The visual shape currently being manipulated */
  protected vshape?: IVShape;
  
  /** The label associated with the current shape */
  protected label?: ILabel;

  /**
   * Creates a new EditLabelTool instance
   * 
   * @param view - The view context to operate on
   */
  constructor(view: IView);

  /**
   * Handles the start of a drag operation
   * 
   * Captures the initial state including the target shape and its label.
   * 
   * @param event - The drag start event
   */
  dragstart(event: IDragEvent): void;

  /**
   * Handles drag movement
   * 
   * Updates label position in real-time as the user drags.
   * Uses requestAnimationFrame for smooth rendering.
   * 
   * @param event - The drag move event
   */
  dragmove(event: IDragEvent): void;

  /**
   * Handles the end of a drag operation
   * 
   * Finalizes the label position change and creates an undo checkpoint.
   * 
   * @param event - The mouse/drag end event
   */
  mousedone(event: IDragEvent): void;

  /**
   * Executes the core label update logic
   * 
   * Calculates the offset delta and updates the label's position,
   * then triggers a redraw.
   */
  protected doTask(): void;
}