import type { Point, Vector, Line } from 'flatten-js';
import type { FrameUtil } from './FrameUtil';
import type { Tool, ToolType } from './Tool';
import type { VShape } from './VShape';
import type { View } from './View';

/**
 * Connector robot type representing the geometric connector being edited
 */
export interface ConnectorRobot {
  /**
   * Array of outer edges of the connector
   */
  outerEdges: Array<{
    start: Point;
    end: Point;
  }>;
  
  /**
   * Translates the connector by the given vector
   * @param vector - Translation vector
   */
  translate(vector: Vector): void;
  
  /**
   * Draws the connector on the view
   * @param view - The view to draw on
   */
  draw(view: View): void;
}

/**
 * VShape attributes containing connector robot
 */
export interface VShapeAttrs {
  /**
   * The connector robot instance
   */
  robot: ConnectorRobot;
}

/**
 * Extended VShape interface with connector-specific attributes
 */
export interface ConnectorVShape extends VShape {
  attrs: VShapeAttrs;
}

/**
 * Drag event interface
 */
export interface DragEvent {
  /**
   * The target VShape being dragged
   */
  target: ConnectorVShape;
}

/**
 * Tool for editing connector shapes with magnetic snapping functionality
 * 
 * Provides interactive editing of connector geometries with:
 * - Drag and drop manipulation
 * - Magnetic point snapping to edges
 * - Automatic offset calculation for alignment
 * - Undo/redo support through memento manager
 */
export declare class EditConnector extends Tool {
  /**
   * The view instance this tool operates on
   */
  private readonly view: View;
  
  /**
   * Previous cursor point during drag operation
   */
  private prevPt: Point;
  
  /**
   * Current cursor point during drag operation
   */
  private curPt: Point;
  
  /**
   * Offset vector for magnetic snapping alignment
   */
  private dragOffsetVec: Vector;
  
  /**
   * Utility for frame-related operations
   */
  private readonly viewUtil: FrameUtil;
  
  /**
   * The VShape currently being edited
   */
  private vshape?: ConnectorVShape;
  
  /**
   * Detected magnetic snap point during drag
   */
  private magneticPoint?: Point;
  
  /**
   * Creates an instance of EditConnector tool
   * @param view - The view instance to operate on
   */
  constructor(view: View);
  
  /**
   * Gets the connector robot from the current VShape
   * @returns The connector robot instance
   */
  get connector(): ConnectorRobot;
  
  /**
   * Handles drag start event
   * @param event - The drag event
   */
  dragstart(event: DragEvent): void;
  
  /**
   * Handles drag move event with magnetic snapping detection
   * @param event - The drag event
   */
  dragmove(event: DragEvent): void;
  
  /**
   * Executes the translation task
   * @param useMagneticSnap - Whether to apply magnetic snapping offset (default: false)
   */
  doTask(useMagneticSnap?: boolean): void;
  
  /**
   * Handles mouse/drag completion event
   * @param event - The drag event
   */
  mousedone(event: DragEvent): void;
  
  /**
   * Detects magnetic snap points along connector edges
   * @param edge - The edge to detect snaps for
   * @param connector - The connector robot
   * @param checkAlignment - Whether to check alignment
   * @returns The detected magnetic point or undefined
   */
  private detectSnaps(
    edge: { start: Point; end: Point },
    connector: ConnectorRobot,
    checkAlignment: boolean
  ): Point | undefined;
  
  /**
   * Hides all snap indicators
   */
  private hideSnaps(): void;
}