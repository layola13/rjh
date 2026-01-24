/**
 * Command for changing structure mode in a 3D modeling/architecture application.
 * Handles the creation, execution, and completion of structure mode change requests.
 */

import { Command } from 'HSApp.Cmd';
import { TransactionManager, TransactionRequest } from 'HSApp.TransactionManager';
import { RequestType } from 'HSFPConstants';

/**
 * Options for executing the structure mode change command.
 */
interface ChangeStructureModeOptions {
  /**
   * The wall part mode to apply to the structure.
   * Determines how walls and structural elements are displayed or modified.
   */
  wallpartmode: number | string;
}

/**
 * Represents a structure object that can have its display/edit mode changed.
 */
interface Structure {
  // Structure properties would be defined based on the application context
  id?: string;
  type?: string;
  // Additional structure-specific properties
}

/**
 * Command class for changing the mode of a structure (e.g., wall display mode).
 * Extends the base Command class to provide structure mode modification functionality.
 * 
 * @remarks
 * This command creates a transaction request, waits for server response,
 * and commits the change to the transaction manager.
 */
export class CmdChangeStructureMode extends Command {
  /**
   * The structure object whose mode will be changed.
   */
  private readonly structure: Structure;

  /**
   * Transaction manager for handling undo/redo and server communication.
   */
  private readonly transMgr: TransactionManager;

  /**
   * The transaction request created during command execution.
   */
  private _request?: TransactionRequest;

  /**
   * Creates a new CmdChangeStructureMode command.
   * 
   * @param structure - The structure object to modify
   */
  constructor(structure: Structure) {
    super();
    this.structure = structure;
    this.transMgr = HSApp.App.getApp().transManager;
  }

  /**
   * Executes the command by creating a structure mode change request.
   * 
   * @param options - Configuration options including the wall part mode
   */
  public onExecute(options: ChangeStructureModeOptions): void {
    this._request = this.transMgr.createRequest(
      RequestType.ChangeStructureMode,
      [this.structure, options.wallpartmode]
    );
  }

  /**
   * Handles the response received from the server after request submission.
   * Delegates to the parent class implementation for standard response handling.
   * 
   * @param response - The server response data
   * @param metadata - Additional metadata about the response
   * @returns True if the response was handled successfully, false otherwise
   */
  public onReceive(response: unknown, metadata: unknown): boolean {
    return super.onReceive(response, metadata);
  }

  /**
   * Completes the command execution by committing the transaction request.
   * This finalizes the structure mode change and enables undo/redo functionality.
   */
  public onComplete(): void {
    if (this._request) {
      this.transMgr.commit(this._request);
    }
  }
}