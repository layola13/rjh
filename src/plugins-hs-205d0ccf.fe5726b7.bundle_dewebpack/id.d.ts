/**
 * Delete Selection Command
 * Handles deletion of various entities in the scene including products, walls, lights, and custom features
 */

import type { HSApp } from './HSApp';
import type { HSCore } from './HSCore';
import type { HSCatalog } from './HSCatalog';
import type { HSFPConstants } from './HSFPConstants';
import type { HSConstants } from './HSConstants';
import type { ResourceManager } from './ResourceManager';

/**
 * Represents a selectable entity that can be deleted
 */
interface SelectableEntity {
  ID: string;
  metadata?: {
    contentType?: ContentType;
    seekId?: string;
  };
  contentType?: ContentType;
  group?: SelectableEntity;
  instanceOf(modelClass: string): boolean;
  isFlagOn(flag: number): boolean;
  getHost?(): SelectableEntity | undefined;
}

/**
 * Content type descriptor for entities
 */
interface ContentType {
  getTypeString(): string;
  isTypeOf(typeEnum: string): boolean;
}

/**
 * Transaction session for managing command execution
 */
interface TransactionSession {
  commit(): void;
}

/**
 * Transaction manager for creating and managing requests
 */
interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(requestType: string, args: unknown[]): Request;
  commit(request: Request, updateWallMoldings?: boolean): void;
}

/**
 * Request object for transaction operations
 */
interface Request {
  type: string;
  args: unknown[];
}

/**
 * Command context containing application state and managers
 */
interface CommandContext {
  transManager: TransactionManager;
  app: {
    environmentManager: {
      isWallCeilingPlatformEnv(): boolean;
    };
  };
}

/**
 * Command manager for creating and executing commands
 */
interface CommandManager {
  cancel(command: Command): void;
  complete(command?: Command): void;
  createCommand(commandType: string, args: unknown[]): Command;
  execute(command: Command): void;
  receive(event: string, data?: Record<string, unknown>): void;
}

/**
 * Base command class
 */
declare abstract class Command {
  protected context: CommandContext;
  protected mgr: CommandManager;
  
  abstract onExecute(): void;
  abstract canUndoRedo(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

/**
 * Command for deleting selected entities from the scene
 * Supports deletion of:
 * - Products and content
 * - Walls and rooms
 * - Lights (physical and mesh)
 * - Custom features and sketches
 * - Moldings and parametric ceilings
 */
export default class DeleteSelectionCommand extends Command {
  /**
   * Selected entities to be deleted
   */
  private selected: SelectableEntity[] = [];

  /**
   * Execute the delete command
   * Checks for paint plugin compatibility and validates selection before deletion
   */
  onExecute(): void;

  /**
   * Internal method to execute the deletion logic
   * Validates selection, filters undeletable entities, and processes deletion
   * @private
   */
  private _executeCmd(): void;

  /**
   * Delete a customized feature model
   * Handles environment-specific deletion logic
   * @param entity - The customized feature model to delete
   * @private
   */
  private _deleteCustomizedFeatureModel(entity: HSCore.Model.CustomizedFeatureModel): void;

  /**
   * Delete a customized sketch model (NCustomizedSketchModel)
   * Handles platform-specific deletion and multi-brep models
   * @param entity - The customized sketch model to delete
   * @private
   */
  private _deleteNCustomizedSketchModel(entity: HSCore.Model.NCustomizedSketchModel): void;

  /**
   * Delete a molding from a customized model
   * Routes to appropriate molding deletion command based on ceiling type
   * @param entity - The content entity containing the molding
   * @param moldingId - ID of the molding to delete (may include 'manualAddMolding' prefix)
   * @private
   */
  private _deleteMolding(entity: HSCore.Model.Content, moldingId: string): void;

  /**
   * Get the ID of the picked molding from current selection
   * @param selectedEntities - Currently selected entities
   * @returns Molding ID if a molding is selected, undefined otherwise
   * @private
   */
  private _getPickedMolding(selectedEntities: SelectableEntity[]): string | undefined;

  /**
   * Check if this command can be undone or redone
   * @returns Always false - deletion cannot be undone through standard undo/redo
   */
  canUndoRedo(): boolean;

  /**
   * Validate that all selected entities are of compatible types
   * @param selectedEntities - Entities to validate
   * @returns True if all entities are of the same compatible type
   * @private
   */
  private _isValid(selectedEntities: SelectableEntity[]): boolean;

  /**
   * Get human-readable description of this command
   * @returns Localized description string
   */
  getDescription(): string;

  /**
   * Get the log category for this command
   * @returns Category identifier for logging
   */
  getCategory(): string;
}