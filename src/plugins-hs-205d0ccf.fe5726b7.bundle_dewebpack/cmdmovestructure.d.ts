import type { Command } from './Command';
import type { Request } from './TransactionManager';
import type { Structure } from './Structure';
import type { SelectionManager } from './SelectionManager';
import type { TransactionManager } from './TransactionManager';
import type { Logger } from './Logger';

/**
 * Position in 3D space
 */
export interface Position3D {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Z coordinate */
  z: number;
}

/**
 * 2D point (typically screen/model coordinates)
 */
export interface Point2D {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Mouse event data
 */
export interface MouseEventData {
  /** Original DOM event */
  event: MouseEvent;
}

/**
 * Position event data
 */
export interface PositionEventData {
  /** Target position */
  position: Position3D;
}

/**
 * Keyboard event data
 */
export interface KeyboardEventData {
  /** Key code */
  keyCode: number;
}

/**
 * Command options for moving structures
 */
export interface MoveStructureOptions {
  /** If true, only move without additional interactions */
  _moveonly?: boolean;
}

/**
 * Command output containing the moved structure
 */
export interface MoveStructureOutput {
  /** The moved structure */
  content: Structure;
}

/**
 * Command for moving structures in the scene.
 * Handles drag operations, position updates, and transaction management.
 */
export declare class CmdMoveStructure extends Command {
  /** The structure being moved */
  structure: Structure;
  
  /** Target position for the move operation */
  targetPosition?: Position3D;
  
  /** Whether this is a move-only operation (no additional interactions) */
  moveonly: boolean;
  
  /** Selection manager instance */
  selectionMgr: SelectionManager;
  
  /** Flag indicating if the operation has completed */
  private _completed: boolean;
  
  /** Initial position of the structure before moving */
  beginPosition: Position3D;
  
  /** Initial mouse point when the drag started */
  mouseBeginPoint: Point2D;
  
  /** Transaction request for the move operation */
  private _request?: Request;
  
  /** Transaction manager instance */
  transMgr: TransactionManager;
  
  /** Performance logger for operation tracking */
  private _perfLog: Logger;
  
  /** Command output */
  output: MoveStructureOutput;

  /**
   * Creates a new CmdMoveStructure instance
   * @param structure - The structure to move
   * @param targetPosition - Optional target position for direct movement
   * @param options - Command options
   */
  constructor(
    structure: Structure,
    targetPosition: Position3D | undefined,
    options: MoveStructureOptions
  );

  /**
   * Called when the command begins execution
   * @param context - Optional execution context containing event data
   */
  onExecute(context?: MouseEventData): void;

  /**
   * Handles incoming events during command execution
   * @param eventType - Type of event ('dragstart', 'mousemove', 'dragmove', 'mousedown', 'mouseup', 'click', 'dragend', 'moveto', 'keydown', 'keyup')
   * @param eventData - Event-specific data
   * @returns true if event was handled, false otherwise
   */
  onReceive(
    eventType: string,
    eventData: MouseEventData | PositionEventData | KeyboardEventData
  ): boolean;

  /**
   * Called when the command is cancelled
   * @param reason - Optional cancellation reason
   */
  onCancel(reason?: unknown): void;

  /**
   * Called when the command completes successfully
   * @param result - Optional completion result
   */
  onComplete(result?: unknown): void;

  /**
   * Internal method to finalize the move operation
   * @private
   */
  private _onComplete(): void;

  /**
   * Checks if the structure can be dragged
   * @returns true if the structure is draggable
   */
  isDraggable(): boolean;

  /**
   * Checks if the structure has moved from a given position
   * @param position - Position to compare against
   * @returns true if the structure position differs from the given position
   * @private
   */
  private _notSamePosition(position: Position3D): boolean;
}