/**
 * Command for replacing parametric stairs in the application.
 * This command handles the replacement of existing stair entities with new parametric stair configurations.
 * 
 * @module CmdReplaceParametricStair
 */

import type { Command } from 'HSApp.Cmd';
import type { Entity } from 'HSApp';
import type { TransactionRequest } from 'HSApp.TransactionManager';

/**
 * Metadata configuration for parametric stair replacement.
 * Contains parameters defining the new stair's properties.
 */
export interface ParametricStairMeta {
  /** Stair configuration parameters */
  [key: string]: unknown;
}

/**
 * Command class for replacing existing stairs with parametric stair entities.
 * Handles the transaction request, entity replacement, and selection updates.
 * 
 * @extends {HSApp.Cmd.Command}
 */
export declare class CmdReplaceParametricStair extends Command {
  /**
   * The original stair entities to be replaced.
   * @private
   */
  private _oldStairs: Entity[];

  /**
   * Metadata configuration for the new parametric stair.
   * @private
   */
  private _meta: ParametricStairMeta;

  /**
   * Transaction request for the stair replacement operation.
   * @private
   */
  private _request?: TransactionRequest;

  /**
   * The newly created parametric stair entity after replacement.
   * @private
   */
  private _newEntity?: Entity;

  /**
   * Creates a new CmdReplaceParametricStair command instance.
   * 
   * @param oldStairs - Array of existing stair entities to replace
   * @param meta - Configuration metadata for the new parametric stair
   */
  constructor(oldStairs: Entity[], meta: ParametricStairMeta);

  /**
   * Executes the stair replacement operation asynchronously.
   * 
   * Steps:
   * 1. Creates a transaction request for replacing parametric stairs
   * 2. Commits the transaction to the transaction manager
   * 3. Updates selection to the newly created entity
   * 4. Completes the current command if it's a ReplaceParametricStair command
   * 
   * @returns Promise resolving to the newly created stair entity
   */
  onExecute(): Promise<Entity>;

  /**
   * Gets the newly created parametric stair entity.
   * 
   * @returns The new stair entity created by this command, or undefined if not yet executed
   */
  get newEntity(): Entity | undefined;

  /**
   * Gets the localized description of this command for display purposes.
   * 
   * @returns Command description string (Chinese: "替换参数化楼梯" - "Replace Parametric Stair")
   */
  getDescription(): string;

  /**
   * Gets the log category for this command.
   * Used for operation logging and categorization.
   * 
   * @returns The category type from HSFPConstants.LogGroupTypes
   */
  getCategory(): string;
}