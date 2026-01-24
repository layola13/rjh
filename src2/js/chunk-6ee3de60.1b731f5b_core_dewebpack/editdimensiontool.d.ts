import type { Point, Vector } from 'geometry-library';
import type { EventType } from './event-types';
import type { Tool, ToolType } from './tool-base';
import type { VShape } from './vshape';
import type { DrawView } from './draw-view';

/**
 * Dimension information interface
 */
interface DimensionInfo {
  /** Dimension name/label */
  name: string;
  /** Dimension value (in internal units) */
  value: number;
  /**
   * Apply a difference to the dimension value
   * @param diff - The difference to apply
   */
  applyDiff(diff: number): void;
}

/**
 * Robot shape attributes interface
 */
interface RobotShape {
  /** Start point of the dimension line */
  from: Point;
  /** End point of the dimension line */
  to: Point;
  /** Offset vector for dimension positioning */
  offset: Vector;
  /**
   * Update the polygon representation
   */
  updatePoly(): void;
  /**
   * Draw the robot shape
   * @param view - The drawing view
   */
  draw(view: DrawView): void;
}

/**
 * Shape attributes interface
 */
interface ShapeAttributes {
  /** Associated robot shape */
  robot: RobotShape;
  /** Shape data containing dimension info */
  data: {
    dimInfo: DimensionInfo;
  };
}

/**
 * Visual shape interface
 */
interface VShape {
  /** Shape attributes */
  attrs: ShapeAttributes;
}

/**
 * Mouse/touch event wrapper
 */
interface ToolEvent {
  /** The target shape being interacted with */
  target: VShape;
  /** Original DOM event */
  evt: MouseEvent | TouchEvent;
}

/**
 * Custom dimension editor event payload
 */
interface DimEditPayload {
  /** Original DOM event */
  event: Event;
  /** Initial value to display in editor */
  initValue: number;
  /**
   * Callback when user confirms the edit
   * @param value - The new value entered by user
   */
  onConfirm: (value: number) => void;
}

/**
 * Dimension mode enumeration
 */
declare enum DimModeEnum {
  /** Calculate mode - edit dimension names */
  calculate = 'calculate',
  /** Edit mode - edit dimension values */
  edit = 'edit'
}

/**
 * Tool for editing dimension annotations on shapes.
 * Supports:
 * - Double-click to edit dimension name or value
 * - Drag to adjust dimension line offset
 */
export declare class EditDimensionTool extends Tool {
  /** The drawing view this tool operates on */
  private readonly view: DrawView;
  
  /** Currently selected visual shape */
  private vshape?: VShape;
  
  /** Previous cursor/touch position during drag */
  private prevPt: Point;

  /**
   * Create a new EditDimensionTool instance
   * @param view - The drawing view
   */
  constructor(view: DrawView);

  /**
   * Get attributes of the currently selected shape
   */
  get attrs(): ShapeAttributes;

  /**
   * Get the robot shape associated with the current dimension
   */
  get robot(): RobotShape;

  /**
   * Handle double-click event to edit dimension
   * - In calculate mode: edit dimension name
   * - In edit mode: edit dimension value
   * @param event - The tool event
   */
  dbclick(event: ToolEvent): void;

  /**
   * Handle drag start event
   * @param event - The tool event
   */
  dragstart(event: ToolEvent): void;

  /**
   * Handle drag move event to adjust dimension offset
   * @param event - The tool event
   */
  dragmove(event: ToolEvent): void;

  /**
   * Handle mouse/touch done event to finalize changes
   * @param event - The tool event
   */
  mousedone(event: ToolEvent): void;

  /**
   * Show text editor for dimension name
   * @param x - Screen X coordinate
   * @param y - Screen Y coordinate
   * @param initialValue - Initial name value
   * @param onConfirm - Callback when name is confirmed
   */
  private showEditor(
    x: number,
    y: number,
    initialValue: string,
    onConfirm: (newName: string) => void
  ): void;

  /**
   * Show number editor for dimension value
   * @param event - The tool event
   * @param initialValue - Initial numeric value
   * @param onConfirm - Callback when value is confirmed
   */
  private showNumberEditor(
    event: ToolEvent,
    initialValue: number,
    onConfirm: (newValue: number) => void
  ): void;
}