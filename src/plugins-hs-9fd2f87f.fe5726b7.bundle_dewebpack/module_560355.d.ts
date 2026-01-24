/**
 * Command for deleting a customized model light slot
 * @module hsw.plugin.customizedmodeling.cmd
 */

/**
 * Light slot identifier or reference
 */
export type LightSlot = unknown;

/**
 * Transaction request interface
 */
export interface TransactionRequest {
  /** Request type identifier */
  type: string;
  /** Request parameters */
  params: unknown[];
}

/**
 * Transaction manager interface for handling model operations
 */
export interface TransactionManager {
  /**
   * Creates a new transaction request
   * @param type - Request type constant
   * @param params - Request parameters
   * @returns Created transaction request
   */
  createRequest(type: string, params: unknown[]): TransactionRequest;
  
  /**
   * Commits the transaction request
   * @param request - Request to commit
   */
  commit(request: TransactionRequest): void;
}

/**
 * Command execution context
 */
export interface CommandContext {
  /** Transaction manager instance */
  transManager: TransactionManager;
}

/**
 * Command manager interface
 */
export interface CommandManager {
  /**
   * Marks the command as completed
   * @param command - Command instance
   */
  complete(command: Command): void;
}

/**
 * Base command class
 */
export declare class Command {
  /** Command execution context */
  protected context: CommandContext;
  
  /** Optional command manager */
  protected mgr?: CommandManager;
  
  /**
   * Executes the command
   */
  onExecute(): void;
}

/**
 * Command for deleting a customized model light slot
 * Removes a light slot from a customized 3D model
 */
export declare class CmdDeleteCustomizedModelLightSlot extends Command {
  /** The light slot to be deleted */
  private _lightSlot: LightSlot;
  
  /** Transaction request handle */
  private _request?: TransactionRequest;
  
  /**
   * Creates a new delete light slot command
   * @param lightSlot - The light slot to delete
   */
  constructor(lightSlot: LightSlot);
  
  /**
   * Executes the command to delete the light slot
   * Creates and commits a delete request via the transaction manager
   */
  onExecute(): void;
}

export default CmdDeleteCustomizedModelLightSlot;