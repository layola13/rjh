/**
 * Command for deleting outdoor space and its related contents
 * @module CmdDeleteOutdoorSpace
 */

import { Command } from 'HSApp/Cmd/Command';
import type { Floor, Content, Layer, TransactionManager, Request } from 'HSCore/Types';

/**
 * Command to delete an outdoor space floor along with all its associated contents
 * This command handles removal of products, assemblies, and the floor slab itself
 */
export declare class CmdDeleteOutdoorSpace extends Command {
  /**
   * The floor representing the outdoor space to be deleted
   */
  protected floor: Floor;

  /**
   * The composite transaction request for all deletion operations
   */
  protected _request?: Request;

  /**
   * Creates a new CmdDeleteOutdoorSpace command
   * @param floor - The outdoor space floor to delete
   */
  constructor(floor: Floor);

  /**
   * Analyzes and collects all contents related to the floor that need to be processed
   * @returns Object containing contents to be removed or reassigned
   */
  getRelateContents(): {
    /**
     * Contents that need to be reassigned to another floor (currently empty)
     */
    toBeReassign: Content[];
    /**
     * Contents that will be removed along with the floor
     */
    toBeRemoved: Content[];
  };

  /**
   * Executes the deletion command
   * - Collects all related contents from the floor
   * - Creates deletion requests for groups/assemblies and products
   * - Deletes the floor slab
   * - Commits all operations as a composite transaction
   */
  onExecute(): void;

  /**
   * Callback invoked when the command completes successfully
   * Notifies the command manager that execution is finished
   * @internal
   */
  protected _onComplete(): void;

  /**
   * Cleanup operations after command execution or cancellation
   */
  onCleanup(): void;

  /**
   * Indicates whether this command supports undo/redo operations
   * @returns Always false - this command cannot be undone
   */
  canUndoRedo(): boolean;
}