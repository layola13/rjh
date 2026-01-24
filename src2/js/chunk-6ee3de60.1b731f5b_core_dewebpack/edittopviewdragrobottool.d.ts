import type { Point, Vector } from 'some-geometry-library';
import type { ShapeHelper } from './shape-helper';
import type { Tool, ToolType } from './tool';

/**
 * Attributes interface for the visual shape containing robot reference
 */
export interface VShapeAttrs {
  /** The robot instance associated with this shape */
  robot: Robot;
}

/**
 * Visual shape interface representing a draggable robot element
 */
export interface VShape {
  /** Shape attributes containing robot reference */
  attrs: VShapeAttrs;
}

/**
 * Robot interface with position and rendering capabilities
 */
export interface Robot {
  /** Current offset position of the robot */
  offset: Point;
  
  /**
   * Refresh the corner presentation of the robot
   */
  refreshCornerPresent(): void;
  
  /**
   * Update the robot's polygon representation
   */
  updatePoly(): void;
  
  /**
   * Draw the robot on the specified view
   * @param view - The view context to render on
   */
  draw(view: EditTopView): void;
}

/**
 * Edit top view interface with rendering and history management
 */
export interface EditTopView {
  /** History/undo manager instance */
  mometoManager: MomentoManager;
}

/**
 * Momento pattern manager for undo/redo operations
 */
export interface MomentoManager {
  /**
   * Create a checkpoint in the undo history
   */
  checkPoint(): void;
}

/**
 * Drag event interface for mouse/touch interactions
 */
export interface DragEvent {
  /** The target shape being dragged */
  target: VShape;
}

/**
 * Tool for dragging and repositioning robots in the top view editor.
 * Handles drag start, move, and end events to update robot position
 * along the Y-axis only.
 * 
 * @extends Tool
 */
export declare class EditTopViewDragRobotTool extends Tool {
  /** The view context this tool operates on */
  private readonly view: EditTopView;
  
  /** The visual shape currently being dragged */
  private vshape?: VShape;
  
  /** Previous cursor/pointer position */
  private prevPt: Point;
  
  /**
   * Creates a new EditTopViewDragRobotTool instance
   * @param view - The edit top view context
   */
  constructor(view: EditTopView);
  
  /**
   * Gets the attributes of the currently dragged shape
   */
  get attrs(): VShapeAttrs;
  
  /**
   * Gets the robot instance from the current shape's attributes
   */
  get robot(): Robot;
  
  /**
   * Handles drag start event
   * Stores the target shape and initial position
   * @param event - The drag event
   */
  dragstart(event: DragEvent): void;
  
  /**
   * Handles drag move event
   * Updates robot position by projecting movement onto Y-axis
   * @param event - The drag event
   */
  dragmove(event: DragEvent): void;
  
  /**
   * Handles drag end event
   * Creates an undo checkpoint and cleans up drag state
   * @param event - The mouse event
   */
  mousedone(event: MouseEvent): void;
}