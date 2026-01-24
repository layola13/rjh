import { HSApp } from './path-to-hsapp-module';

/**
 * Entity type with material support
 */
interface MaterialEntity {
  // Define entity properties based on your application's entity structure
  id: string;
  materials?: Map<string, unknown>;
  [key: string]: unknown;
}

/**
 * Material data map type
 */
type MaterialDataMap = Map<string, unknown> | Record<string, unknown>;

/**
 * Transaction manager interface
 */
interface TransactionManager {
  /**
   * Creates a new request
   * @param requestType - Type of request from HSFPConstants.RequestType
   * @param args - Arguments for the request
   * @returns Created request object
   */
  createRequest(requestType: unknown, args: unknown[]): unknown;
  
  /**
   * Commits the transaction
   * @param request - Request to commit
   */
  commit(request: unknown): void;
  
  /**
   * Clears the transaction manager state
   */
  clear(): void;
}

/**
 * Command context interface
 */
interface CommandContext {
  transManager: TransactionManager;
  [key: string]: unknown;
}

/**
 * Command for resetting all materials on an entity to their previous state.
 * This command creates a ContentMaterialResetAllRequest and commits it through
 * the transaction manager.
 * 
 * @remarks
 * This command cannot be undone or redone as indicated by the canUndoRedo method.
 */
declare class ContentMaterialResetAllCommand extends HSApp.Cmd.Command {
  /**
   * The entity whose materials are being reset
   */
  entity: MaterialEntity;
  
  /**
   * Map containing the old material data to restore
   */
  oldMaterialDataMap: MaterialDataMap;
  
  /**
   * Keys identifying which materials in the map should be reset
   */
  materialMapKeys: string[];
  
  /**
   * Creates a new ContentMaterialResetAllCommand
   * 
   * @param entity - The entity whose materials will be reset
   * @param oldMaterialDataMap - Previous material data to restore
   * @param materialMapKeys - Keys of materials to reset
   */
  constructor(
    entity: MaterialEntity,
    oldMaterialDataMap: MaterialDataMap,
    materialMapKeys: string[]
  );
  
  /**
   * Executes the command by creating and committing a material reset request
   * through the transaction manager
   */
  onExecute(): void;
  
  /**
   * Indicates whether this command supports undo/redo operations
   * 
   * @returns false - This command cannot be undone or redone
   */
  canUndoRedo(): false;
}

export default ContentMaterialResetAllCommand;