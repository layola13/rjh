/**
 * Command for flipping content in the editor
 * @module FlipContentCommand
 */

import { Command } from 'HSApp.Cmd';

/**
 * Command that handles flipping/mirroring content items
 * @extends HSApp.Cmd.Command
 */
export default class FlipContentCommand extends Command {
  /**
   * The content to be flipped
   * @private
   */
  private _content: unknown;

  /**
   * The transaction request for this operation
   * @private
   */
  private _request: unknown | null;

  /**
   * Creates a new FlipContentCommand
   * @param content - The content item to flip
   */
  constructor(content: unknown);

  /**
   * Executes the flip content operation
   * Creates a request through the transaction manager and commits it
   */
  onExecute(): void;

  /**
   * Indicates whether this command can be undone or redone
   * @returns Always returns false as flip operations cannot be undone
   */
  canUndoRedo(): boolean;

  /**
   * Gets the human-readable description of this command
   * @returns Chinese description "翻转物品" (Flip Item)
   */
  getDescription(): string;

  /**
   * Gets the category/group this command belongs to
   * @returns The ContentOperation log group type
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}