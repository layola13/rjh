/**
 * Module: MoveStructureRequest
 * Handles the movement and snapping of structure objects in the scene
 */

import { HSCore } from './HSCore';
import { SnapHelper, SnapHelperOptions, SnapResult } from './SnapHelper';
import { Vector2 } from './Vector2';

/**
 * Represents a 2D or 3D point
 */
interface Point {
  x: number;
  y: number;
  z?: number;
}

/**
 * Represents position with rotation information
 */
interface Position extends Point {
  ZRotation?: number;
  XRotation?: number;
  YRotation?: number;
}

/**
 * Event data for receive method
 */
interface ReceiveEventData {
  /** Position coordinates [x, y, z?] */
  position?: number[];
  /** View type identifier */
  viewType?: '2d' | '3d';
  /** The layer that was picked during interaction */
  pickedLayer?: HSCore.Layer;
}

/**
 * Signal dispatch payload when host changes
 */
interface HostChangedPayload {
  /** Previous host content */
  oldHost: HSCore.Content | null;
  /** New host content */
  newHost: HSCore.Content | null;
}

/**
 * Result of movement offset calculation
 */
interface MoveOffsetResult {
  /** Delta vector representing movement offset */
  delta: Vector2;
  /** New mouse position */
  newMousePos: Vector2;
}

/**
 * Structure object interface
 */
interface Structure extends HSCore.Content {
  x: number;
  y: number;
  z: number;
  rotation: number;
  XRotation: number;
  YRotation: number;
  
  /** Gets the unique parent layer */
  getUniqueParent(): HSCore.Layer;
  /** Gets the current host content */
  getHost(): HSCore.Content | null;
  /** Assigns structure to a new host */
  assignTo(host: HSCore.Content | null): void;
  /** Replaces the parent layer */
  replaceParent(layer: HSCore.Layer): void;
  /** Marks position as dirty for re-rendering */
  dirtyPosition(): void;
  /** Rebuilds the structure */
  rebuild(): void;
  /** Rotates structure around a center point */
  rotateAround(center: Point, angle: number): void;
  /** Checks if structure is part of a wall */
  isWallPart(): boolean;
}

/**
 * Request class for moving structures in the scene with snapping support
 * Extends the base StateRequest to handle drag-and-drop operations
 */
export declare class MoveStructureRequest extends HSCore.Transaction.Common.StateRequest {
  /** The structure being moved */
  readonly structure: Structure;
  
  /** The layer containing the structure */
  private layer: HSCore.Layer;
  
  /** Helper for snapping to other objects */
  private snaphelper: SnapHelper;
  
  /** Original position before movement started */
  private basePoint: Point;
  
  /** Mouse position when drag began */
  private mouseBeginPoint: Point;
  
  /** Signal dispatched when the structure's host changes */
  readonly signalHostChanged: HSCore.Util.Signal<HostChangedPayload>;
  
  /** Flag indicating if structure has been dragged */
  private dragged: boolean;
  
  /** Selection manager reference */
  private selectionMgr: HSCore.SelectionManager;

  /**
   * Creates a new MoveStructureRequest
   * @param structure - The structure to be moved
   * @param mouseBeginPoint - Initial mouse position as [x, y] array
   */
  constructor(structure: Structure, mouseBeginPoint: number[]);

  /**
   * Called when the movement operation is committed
   * Hides snap auxiliaries, rebuilds structure, and applies auto-fit
   * @returns The moved structure
   */
  onCommit(): Structure;

  /**
   * Handles incoming events during the move operation
   * @param eventType - Type of event ('moveto', 'dragstart', 'mousemove', 'dragmove')
   * @param data - Event-specific data
   * @returns Boolean indicating if event was handled
   */
  onReceive(eventType: string, data: ReceiveEventData): boolean;

  /**
   * Calculates movement offset based on event data
   * @param data - Event data containing position and picked layer
   * @returns Object containing delta vector and new mouse position
   */
  private _calcMoveOffset(data: ReceiveEventData): MoveOffsetResult;

  /**
   * Moves the structure by the given offset and applies snapping
   * @param delta - Movement offset vector
   * @param newMousePos - New mouse position
   */
  move(delta: Vector2, newMousePos: Vector2): void;

  /**
   * Updates the structure's position based on offset from base point
   * @param delta - Movement offset vector
   */
  private _updateStructurePosition(delta: Vector2): void;

  /**
   * Releases the cursor status in the active 2D view
   */
  private _changeCursorStatus(): void;

  /**
   * Adds structure to a new host if it has changed
   * @param newHost - The new host content
   */
  private _addToHost(newHost: HSCore.Content | null): void;

  /**
   * Moves structure to an absolute position
   * @param position - Target position with optional rotation values
   */
  private _moveTo(position: Position): void;

  /**
   * Indicates whether field transactions are allowed
   * @returns Always returns true
   */
  canTransactField(): boolean;

  /**
   * Hides all snap auxiliary visual aids
   */
  hideAllSnapAuxilaries(): void;
}