/**
 * Module: CmdCreateOutdoorSpace
 * Command for creating outdoor space areas in 2D view
 */

import type { HSCore } from './HSCore';
import type { CreateOutdoorSpace } from './CreateOutdoorSpace';
import type { Command } from './Command';
import type { TransactionManager, Session, Request } from './TransactionManager';
import type { GizmoManager } from './GizmoManager';
import type { View2D } from './View2D';
import type { SignalHook } from './SignalHook';
import type { CommandManager } from './CommandManager';
import type { CursorEnum } from './CursorEnum';

/**
 * Message types received by the command
 */
type MessageType = 
  | 'gizmo.createoutdoorspace' 
  | 'gizmo.createuirequest' 
  | 'click';

/**
 * Message data payload
 */
interface MessageData {
  /** Path points for outdoor space boundary */
  path?: Array<{ x: number; y: number }>;
  /** Mouse event data */
  event?: MouseEvent;
}

/**
 * Transaction session options
 */
interface SessionCommitOptions {
  /** Whether to merge this transaction with previous ones */
  mergeRequest: boolean;
}

/**
 * Command for creating outdoor space areas in the 2D floor plan view.
 * Provides interactive drawing of outdoor space boundaries using a gizmo.
 * 
 * @extends {HSApp.Cmd.Command}
 */
export declare class CmdCreateOutdoorSpace extends Command {
  /**
   * Signal hook for managing event subscriptions
   * @private
   */
  private _signalHook: HSCore.Util.SignalHook<this>;

  /**
   * Command manager instance
   */
  cmdManager: CommandManager;

  /**
   * Active gizmo for drawing outdoor space
   */
  gizmo: CreateOutdoorSpace | undefined;

  /**
   * Current UI session
   * @private
   */
  private _UISession: Session | undefined;

  constructor();

  /**
   * Creates and initializes the outdoor space drawing gizmo
   */
  createGizmo(): void;

  /**
   * Removes and cleans up the drawing gizmo
   */
  destroyGizmo(): void;

  /**
   * Initializes command state and ends any active UI session
   * @private
   */
  private _init(): void;

  /**
   * Updates the cursor appearance
   * @param cursorStyle - CSS cursor style string
   * @private
   */
  private _updateCursorStatus(cursorStyle: string): void;

  /**
   * Called when command execution starts.
   * Sets up transaction listeners and initializes the gizmo.
   */
  onExecute(): void;

  /**
   * Ends the current UI session if active
   * @private
   */
  private _endUISession(): void;

  /**
   * Handler for transaction state changes (undo/redo events)
   * @private
   */
  private _onTransactionStateChanged(): void;

  /**
   * Indicates whether the command operates in center mode
   * @returns Always returns true
   */
  isCenterMode(): boolean;

  /**
   * Completes the outdoor space creation.
   * Commits the transaction and resets the gizmo.
   * @private
   */
  private _onComplete(): void;

  /**
   * Cancels the current operation and rolls back the transaction
   * @private
   */
  private _onCancel(): void;

  /**
   * Cleanup method called when command is terminated.
   * Disposes resources and resets cursor.
   */
  onCleanup(): void;

  /**
   * Handler for ESC key press.
   * Cancels current drawing step or entire command.
   */
  onESC(): void;

  /**
   * Receives and processes messages from gizmos and UI events
   * @param messageType - Type of message received
   * @param data - Message payload data
   * @returns True if message was handled
   */
  onReceive(messageType: MessageType, data: MessageData): boolean;

  /**
   * Returns human-readable description of this command
   * @returns Localized description string
   */
  getDescription(): string;

  /**
   * Indicates whether this command requires user interaction
   * @returns Always returns true
   */
  isInteractive(): boolean;
}