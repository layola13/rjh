/**
 * Command for rotating a hole in the application.
 * Manages the rotation transformation through a session-based transaction system.
 * @module CmdRotateHole
 */

import { Command } from 'HSApp/Cmd/Command';
import { TransactionManager, TransactionSession } from 'HSApp/TransactionManager';
import { TransformRequest } from 'HSApp/TransformRequest';
import { Hole } from 'HSApp/Geometry/Hole';
import { HSFPConstants } from 'HSApp/Constants';

/**
 * Event data for drag and rotation operations
 */
interface RotationEventData {
  /** The delta value for rotation amount */
  delta: number;
  [key: string]: unknown;
}

/**
 * Supported event types for hole rotation command
 */
type RotationEventType = 
  | 'mouseup'
  | 'sliderdragend'
  | 'hotkeyend'
  | 'sliderdragmove'
  | 'dragmove'
  | 'hotkey'
  | string;

/**
 * Command class for rotating hole objects.
 * Handles user interactions (mouse, slider, hotkey) to apply rotation transformations.
 * Uses transaction manager for undo/redo support.
 */
export declare class CmdRotateHole extends Command {
  /**
   * The hole object being rotated
   */
  private hole: Hole;

  /**
   * Transaction manager for handling transformation requests
   */
  private transMgr: TransactionManager;

  /**
   * Current transaction session
   */
  private _session?: TransactionSession;

  /**
   * Current rotation transformation request
   */
  private _request?: TransformRequest;

  /**
   * Flag indicating whether any rotation has been applied
   */
  private rotated: boolean;

  /**
   * Creates a new CmdRotateHole command instance.
   * @param hole - The hole object to be rotated
   */
  constructor(hole: Hole);

  /**
   * Executes the rotation command, initializing the transaction session and request.
   * @param eventData - Optional initial event data to apply rotation immediately
   */
  onExecute(eventData?: RotationEventData): void;

  /**
   * Receives and processes rotation events during command execution.
   * Handles various input methods: mouse drag, slider, hotkeys.
   * @param eventType - Type of the rotation event
   * @param eventData - Event data containing rotation parameters
   * @returns True if event was handled, false otherwise
   */
  onReceive(eventType: RotationEventType, eventData: RotationEventData): boolean;

  /**
   * Completes the rotation command, committing changes if rotation occurred.
   * Finalizes the transaction session.
   */
  onComplete(): void;

  /**
   * Cancels the rotation command, aborting any pending requests and session.
   * Reverts all changes made during the command execution.
   */
  onCancel(): void;

  /**
   * Indicates whether this command supports undo/redo operations.
   * @returns Always returns false for rotation commands
   */
  canUndoRedo(): boolean;

  /**
   * Gets the logging category for this command.
   * @returns The content operation log group type
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}