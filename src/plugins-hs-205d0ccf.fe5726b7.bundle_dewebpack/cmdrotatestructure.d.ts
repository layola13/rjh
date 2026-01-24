/**
 * Module: CmdRotateStructure
 * Represents a command for rotating a structure in the application.
 * This command handles user interactions (mouse, slider, hotkey) to rotate 3D structures.
 */

import { Command } from 'HSApp/Cmd/Command';
import { TransactionManager, TransactionRequest } from 'HSApp/TransactionManager';
import { RequestType, LogGroupTypes } from 'HSFPConstants';

/**
 * Event types that can be received during structure rotation
 */
type RotateEventType = 
  | 'mouseup'
  | 'sliderdragend'
  | 'hotkeyend'
  | 'sliderdragmove'
  | 'dragmove'
  | 'hotkey';

/**
 * Event data passed to rotation handlers
 */
interface RotateEventData {
  /** The rotation delta value in degrees or radians */
  delta?: number;
  [key: string]: unknown;
}

/**
 * Represents a rotatable structure in the application
 */
interface Structure {
  // Structure properties would be defined based on actual implementation
  [key: string]: unknown;
}

/**
 * Command for rotating structures in the 3D scene.
 * Handles interactive rotation via mouse drag, slider, or keyboard hotkeys.
 * Supports transaction-based undo/redo through the TransactionManager.
 */
export class CmdRotateStructure extends Command {
  /** The structure being rotated */
  private structure: Structure;
  
  /** Transaction manager for handling undo/redo operations */
  private transMgr: TransactionManager;
  
  /** Current transaction request for this rotation operation */
  private _request?: TransactionRequest;
  
  /** Flag indicating whether rotation has actually occurred */
  private rotated: boolean = false;

  /**
   * Creates a new structure rotation command
   * @param structure - The structure to be rotated
   */
  constructor(structure: Structure) {
    super();
    this.structure = structure;
    this.transMgr = HSApp.App.getApp().transManager;
  }

  /**
   * Executes the rotation command, initializing the transaction request
   * @param eventData - Optional initial event data for immediate rotation
   */
  onExecute(eventData?: RotateEventData): void {
    this._request = this.transMgr.createRequest(
      RequestType.RotateStructure,
      [this.structure]
    );
    
    if (eventData) {
      this.onReceive('dragmove', eventData);
    }
  }

  /**
   * Receives and processes rotation events during command execution
   * @param eventType - Type of event received
   * @param eventData - Event-specific data containing rotation parameters
   * @returns true if event was handled successfully, false otherwise
   */
  onReceive(eventType: RotateEventType, eventData: RotateEventData): boolean {
    let handled = true;

    switch (eventType) {
      case 'mouseup':
      case 'sliderdragend':
      case 'hotkeyend':
      case 'sliderdragmove':
        // Terminal events - no action needed
        break;

      case 'dragmove':
      case 'hotkey': {
        const delta = eventData.delta;
        
        // Validate rotation delta
        if (delta === undefined || isNaN(delta)) {
          break;
        }
        
        this.rotated = true;
        this._request?.receive(eventType, eventData);
        break;
      }

      default:
        // Delegate unknown events to parent class
        handled = super.onReceive(eventType, eventData);
    }

    return handled;
  }

  /**
   * Completes the rotation command, committing changes if rotation occurred
   */
  onComplete(): void {
    if (this.rotated && this._request) {
      this.transMgr.commit(this._request);
    }
  }

  /**
   * Cancels the rotation command, aborting any pending transaction
   */
  onCancel(): void {
    if (this._request) {
      this.transMgr.abort(this._request);
      this._request = undefined;
    }
  }

  /**
   * Indicates whether this command supports undo/redo operations
   * @returns false - rotation uses transaction-based undo/redo instead
   */
  canUndoRedo(): boolean {
    return false;
  }

  /**
   * Gets the logging category for this command
   * @returns The content operation log group type
   */
  getCategory(): LogGroupTypes {
    return LogGroupTypes.ContentOperation;
  }
}