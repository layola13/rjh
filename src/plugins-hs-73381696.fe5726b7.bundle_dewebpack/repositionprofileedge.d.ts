/**
 * Gizmo for repositioning profile edges in 2D floor plan view.
 * Allows interactive editing of edge dimensions and handles edge/vertex movement.
 */

import { HSCore } from './core';
import { Gizmo } from './base/Gizmo';
import { DisplayController } from './base/DisplayController';
import { ProfileEdgeDimension } from './gizmo/ProfileEdgeDimension';
import { InputBoxType } from './ui/InputBox';
import { getUnitParam } from './utils/units';

/**
 * Represents a profile edge entity with geometric properties
 */
export interface IProfileEdge {
  /** Edge identifier */
  ID: string;
  /** Start point of the edge */
  from: IPoint;
  /** End point of the edge */
  to: IPoint;
  /** Direction vector of the edge */
  direction: IVector2;
  /** Associated edge reference */
  edge: IEdge;
  /** Partner edge (opposite side) */
  partner?: IProfileEdge;
  /** Associated coedge */
  coedge?: IProfileEdge;
  /** Check if entity is valid */
  isValid(): boolean;
}

/**
 * Represents a geometric point in 2D space
 */
export interface IPoint {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Represents a 2D vector with geometric operations
 */
export interface IVector2 {
  /** Create a copy of this vector */
  clone(): IVector2;
  /** Normalize the vector to unit length */
  normalize(): IVector2;
  /** Invert the vector direction */
  invert(): IVector2;
  /** Scale the vector by a factor */
  scale(factor: number): IVector2;
  /** Add another vector */
  add(other: IVector2): IVector2;
}

/**
 * Represents an edge in the geometric model
 */
export interface IEdge {
  /** Edge identifier */
  ID: string;
}

/**
 * Data passed when a dimension value changes
 */
export interface IValueChangeData {
  /** New dimension value */
  value: number;
  /** Gizmo that triggered the change */
  gizmo: ProfileEdgeDimension;
}

/**
 * Context for gizmo operations
 */
export interface IGizmoContext {
  /** Application instance */
  application: IApplication;
}

/**
 * Application interface
 */
export interface IApplication {
  /** Transaction manager for undo/redo */
  transManager: ITransactionManager;
  /** Signal emitted when view is activated */
  signalViewActivated: ISignal;
  /** Floor plan view */
  floorplan: IFloorPlan;
}

/**
 * Transaction manager for undo/redo operations
 */
export interface ITransactionManager {
  /** Signal emitted on undo */
  signalUndone: ISignal;
  /** Signal emitted on redo */
  signalRedone: ISignal;
}

/**
 * Generic signal for event listening
 */
export interface ISignal {
  /** Add a listener callback */
  addListener(callback: () => void): void;
}

/**
 * Floor plan view interface
 */
export interface IFloorPlan {
  /** Remove a child entity by ID */
  removeChild(id: string): void;
}

/**
 * Dimension update properties
 */
export interface IDimensionProps {
  /** Input box type */
  type: InputBoxType;
  /** Callback on Enter key */
  onEnter?: (value: number, confirmed: boolean, dimension: IDimension) => void;
  /** Callback on Tab key */
  onTab?: () => void;
}

/**
 * Dimension interface for displaying/editing measurements
 */
export interface IDimension {
  /** Whether the dimension is editable */
  editable: boolean;
  /** Update dimension properties */
  updateProps(props: IDimensionProps): void;
  /** Update dimension display */
  update(): void;
  /** Focus the input field */
  focus(): void;
  /** Blur the input field */
  blur(): void;
  /** Associated curve for length calculation */
  curve: ICurve;
}

/**
 * Curve interface for geometric calculations
 */
export interface ICurve {
  /** Get the length of the curve */
  getLength(): number;
}

/**
 * Command manager for executing geometric operations
 */
export interface ICommandManager {
  /** Create a command by name */
  createCommand(name: string, args: unknown[]): ICommand;
  /** Execute a command */
  execute(command: ICommand, data?: unknown): void;
  /** Send a message to the command */
  receive(message: string, data: unknown): void;
  /** Complete the command execution */
  complete(): void;
}

/**
 * Command interface for undoable operations
 */
export interface ICommand {
  /** Whether to show gizmo during execution */
  showGizmo: boolean;
}

/**
 * Vertex move operation data
 */
export interface IVertexMoveData {
  /** Target entity (point) */
  entity: IPoint;
  /** Current position */
  position: IVector2;
}

/**
 * Edge move operation data
 */
export interface IEdgeMoveData {
  /** Target entity (edge) */
  entity: IProfileEdge;
  /** Current position */
  position: IVector2;
}

/**
 * Gizmo for repositioning profile edges with interactive dimension editing.
 * Supports moving edges and vertices while maintaining geometric constraints.
 */
export declare class RepositionProfileEdge extends Gizmo {
  /** Currently editable dimension gizmos */
  private currentEditableDimensions: ProfileEdgeDimension[];
  
  /** Currently focused/active dimension gizmo */
  private _activeGizmo?: ProfileEdgeDimension;
  
  /** Gizmo type identifier */
  readonly type: 'hsw.view.svg.gizmo.RepositionProfileEdge';
  
  /** Associated profile edge entity */
  entity: IProfileEdge;
  
  /** Gizmo context with application reference */
  context: IGizmoContext;
  
  /** Signal hook for event listening */
  signalHook: ISignalHook;
  
  /** Display controller for handling user interactions */
  controller: RepositionProfileEdgeController;

  /**
   * Creates a new RepositionProfileEdge gizmo
   * @param canvas - Canvas reference
   * @param entity - Profile edge entity to manipulate
   * @param context - Gizmo context
   */
  constructor(canvas: unknown, entity: IProfileEdge, context: IGizmoContext);

  /**
   * Reset the gizmo state, clearing all active dimensions
   */
  reset(): void;

  /**
   * Called when gizmo is activated in the view
   */
  onActivate(): void;

  /**
   * Called when gizmo is deactivated
   */
  onDeactivate(): void;

  /**
   * Called when gizmo is being cleaned up
   */
  onCleanup(): void;

  /**
   * Draw the gizmo (no visual representation for this gizmo)
   */
  draw(): void;

  /**
   * Get all editable dimensions for the current edge.
   * Includes dimensions from connected non-parallel edges and special cases
   * where the edge endpoints have no other connections.
   * @returns Array of editable dimension gizmos
   */
  getEditableDimensions(): ProfileEdgeDimension[];

  /**
   * Update the editable dimensions based on current geometry.
   * Activates new dimensions and deactivates removed ones.
   */
  update(): void;

  /**
   * Activate a dimension for editing
   * @param dimension - Dimension gizmo to activate
   */
  private _activateDimension(dimension: ProfileEdgeDimension): void;

  /**
   * Deactivate a dimension, making it read-only
   * @param dimension - Dimension gizmo to deactivate
   */
  private _deactivateDimension(dimension: ProfileEdgeDimension): void;

  /**
   * Set the currently active (focused) dimension gizmo
   * @param gizmo - Dimension to make active, or undefined to clear
   */
  setActiveGizmo(gizmo: ProfileEdgeDimension | undefined): void;

  /**
   * Handle dimension value change commit (Enter key pressed)
   * @param value - New dimension value
   * @param confirmed - Whether the change was confirmed
   * @param dimension - Dimension that changed
   */
  private _onValueChangeCommit(value: number, confirmed: boolean, dimension: IDimension): void;

  /**
   * Handle input switching between dimensions (Tab key pressed)
   */
  private _onInputSwitching(): void;

  /**
   * Get the canvas this gizmo belongs to
   */
  getCanvas(): ICanvas;

  /**
   * Unlisten all registered event listeners
   */
  unlistenAllEvents(): void;
}

/**
 * Signal hook for managing event listeners
 */
export interface ISignalHook {
  /** Listen to a signal */
  listen(signal: ISignal, callback: () => void): ISignalHook;
}

/**
 * Canvas interface with gizmo management
 */
export interface ICanvas {
  /** Gizmo manager for the canvas */
  gizmoManager: IGizmoManager;
}

/**
 * Manages gizmos for entities
 */
export interface IGizmoManager {
  /** Get all gizmos associated with an entity */
  getEntityGizmos(entity: IProfileEdge): Array<Gizmo | null>;
}

/**
 * Controller for handling repositioning operations.
 * Dispatches commands to move edges and vertices.
 */
declare class RepositionProfileEdgeController extends DisplayController {
  /** Command manager for executing operations */
  protected _cmdMgr: ICommandManager;
  
  /** Associated profile edge entity */
  entity: IProfileEdge;

  /**
   * Creates a new controller
   * @param context - Gizmo context
   * @param entity - Profile edge entity
   */
  constructor(context: IGizmoContext, entity: IProfileEdge);

  /**
   * Dispatch a command based on the event and target entity
   * @param event - Event type (e.g., 'valueChanged')
   * @param entity - Target entity
   * @param data - Event data containing gizmo reference
   */
  dispatch(event: string, entity: IProfileEdge, data: { data: IValueChangeData }): void;

  /**
   * Handle moving a point/vertex when the dimension is on the main edge
   * @param event - Event type
   * @param entity - Target entity
   * @param data - Event data
   */
  private _movePointHandler(event: string, entity: IProfileEdge, data: { data: IValueChangeData }): void;

  /**
   * Handle moving a coedge when the dimension is on a connected edge
   * @param event - Event type
   * @param entity - Target entity
   * @param data - Event data
   */
  private _moveCoEdgeHandler(event: string, entity: IProfileEdge, data: { data: IValueChangeData }): void;
}

/**
 * Utility: Get edges connected to a point, excluding a specific edge
 * @param point - Point to check
 * @param excludeEdge - Edge to exclude from results
 * @returns Array of connected edges
 */
declare function getConnectedEdges(point: IPoint, excludeEdge: IEdge): IProfileEdge[];

/**
 * Utility: Check if two edges are parallel within tolerance
 * @param from1 - Start of first edge
 * @param to1 - End of first edge
 * @param from2 - Start of second edge
 * @param to2 - End of second edge
 * @param tolerance - Angle tolerance in radians
 * @returns True if edges are parallel
 */
declare function isParallel(
  from1: IPoint,
  to1: IPoint,
  from2: IPoint,
  to2: IPoint,
  tolerance: number
): boolean;

/**
 * Utility: Find all walls in a line with the given edge
 * @param edge - Starting edge
 * @returns Array of connected edges forming a line
 */
declare function findWallsInLine(edge: IProfileEdge): IProfileEdge[];

/**
 * Utility: Check if 2D view is currently active
 * @returns True if 2D view is active
 */
declare function is2DViewActive(): boolean;

/**
 * Extension to Array prototype for inserting at specific index
 */
declare global {
  interface Array<T> {
    /**
     * Insert an element at a specific index
     * @param index - Index to insert at
     * @param element - Element to insert
     */
    xInsert(index: number, element: T): void;
  }
}