/**
 * Module: AddOpeningPocketRequest
 * Exports: AddOpeningPocketRequest transaction request and command
 */

import { HSCore } from 'hscore';

/**
 * Material metadata for pocket creation
 */
export interface MaterialMeta {
  [key: string]: unknown;
}

/**
 * Content metadata for pocket configuration
 */
export interface ContentMeta {
  [key: string]: unknown;
}

/**
 * Opening entity that can have a pocket (Door, Window, or Opening)
 */
export type OpeningEntity = 
  | HSCore.Model.Door 
  | HSCore.Model.Window 
  | HSCore.Model.Opening 
  | HSCore.Model.ParametricOpening;

/**
 * Transaction request for adding or modifying a pocket on an opening
 */
export declare class AddOpeningPocketRequest extends HSCore.Transaction.Request {
  /**
   * The opening entity receiving the pocket
   */
  opening: OpeningEntity;

  /**
   * Content metadata for pocket creation
   */
  contentMeta?: ContentMeta;

  /**
   * Material metadata for pocket material
   */
  materialMeta?: MaterialMeta;

  /**
   * Previously saved pocket (for undo)
   */
  savedPocket?: HSCore.Model.Pocket;

  /**
   * Restored pocket (for redo)
   */
  restoredPocket?: HSCore.Model.Pocket;

  /**
   * Creates a new AddOpeningPocketRequest
   * @param opening - The opening entity to add pocket to
   * @param contentMeta - Optional content metadata
   * @param materialMeta - Optional material metadata
   */
  constructor(
    opening: OpeningEntity,
    contentMeta?: ContentMeta,
    materialMeta?: MaterialMeta
  );

  /**
   * Executes the request: adds pocket to opening and updates geometry
   */
  onCommit(): void;

  /**
   * Reverts the request: removes added pocket and restores original
   */
  onUndo(): void;

  /**
   * Re-applies the request after undo
   */
  onRedo(): void;

  /**
   * Internal method to add pocket to opening and update door face materials
   * @param pocket - The pocket to add
   */
  private _addPocket(pocket: HSCore.Model.Pocket): void;
}

/**
 * Opening type mode identifier
 */
export type OpeningMode = 'hole' | 'window' | 'door';

/**
 * Command for adding/removing opening pocket with UI integration
 */
export default class AddOpeningPocketCommand extends HSApp.Cmd.Command {
  /**
   * The opening entity being modified
   */
  entity: OpeningEntity;

  /**
   * Flag indicating if pocket type was added (true) or removed (false)
   */
  private _addOpeningType: boolean;

  /**
   * Creates a new AddOpeningPocketCommand
   * @param entity - The opening entity to modify
   */
  constructor(entity: OpeningEntity);

  /**
   * Executes the command by creating and committing a transaction request
   * @param contentMeta - Optional content metadata for pocket
   * @param materialMeta - Optional material metadata for pocket
   */
  onExecute(contentMeta?: ContentMeta, materialMeta?: MaterialMeta): void;

  /**
   * Indicates this command cannot be undone/redone directly
   * @returns false - command uses transaction system for undo/redo
   */
  canUndoRedo(): boolean;

  /**
   * Returns localized description of the operation
   * @returns Description string: "打开门/垭口套线" or "关闭门/垭口套线"
   */
  getDescription(): string;

  /**
   * Returns the log category for this operation
   * @returns HSFPConstants.LogGroupTypes.ContentOperation
   */
  getCategory(): string;

  /**
   * Determines the opening mode based on entity type
   * @returns 'door' for Door, 'window' for Window, 'hole' for others
   */
  getMode(): OpeningMode;
}