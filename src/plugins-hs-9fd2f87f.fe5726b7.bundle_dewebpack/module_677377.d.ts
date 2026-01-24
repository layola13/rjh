/**
 * Command for adding a customized model light slot
 * 
 * @module hsw.plugin.customizedmodeling.cmd
 */

/**
 * Metadata information for the customized model light slot
 */
export interface CustomizedModelMeta {
  [key: string]: unknown;
}

/**
 * Customized model data structure
 */
export interface CustomizedModel {
  [key: string]: unknown;
}

/**
 * Transaction request interface
 */
export interface TransactionRequest {
  [key: string]: unknown;
}

/**
 * Transaction manager interface for handling model operations
 */
export interface TransactionManager {
  /**
   * Creates a transaction request
   * @param requestType - Type of the request
   * @param params - Request parameters
   * @returns The created transaction request
   */
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  
  /**
   * Commits a transaction request
   * @param request - The request to commit
   */
  commit(request: TransactionRequest): void;
}

/**
 * Command context interface
 */
export interface CommandContext {
  /** Transaction manager for handling operations */
  transManager: TransactionManager;
}

/**
 * Command manager interface
 */
export interface CommandManager {
  /**
   * Marks a command as complete
   * @param command - The command to complete
   */
  complete(command: CmdAddCustomizedModelLightSlot): void;
}

/**
 * Base command class from HSApp framework
 */
export declare class Command {
  /** Command execution context */
  context: CommandContext;
  
  /** Optional command manager */
  mgr?: CommandManager;
}

/**
 * Command for adding a customized model light slot to the scene
 * 
 * This command handles the creation and addition of light slots
 * to customized 3D models within the HSApp framework.
 * 
 * @extends {Command}
 */
export default class CmdAddCustomizedModelLightSlot extends Command {
  /** Metadata for the light slot */
  private _meta: CustomizedModelMeta;
  
  /** The customized model to add the light slot to */
  private _customizedModel: CustomizedModel;
  
  /** Transaction request created during execution */
  private _request?: TransactionRequest;
  
  /**
   * Creates a new command instance for adding a customized model light slot
   * 
   * @param meta - Metadata configuration for the light slot
   * @param customizedModel - The target customized model
   */
  constructor(meta: CustomizedModelMeta, customizedModel: CustomizedModel);
  
  /**
   * Executes the command to add the light slot
   * 
   * Creates a transaction request of type AddCustomizedModelLightSlot,
   * commits it through the transaction manager, and completes the command.
   */
  onExecute(): void;
}

/**
 * Namespace export for HSApp plugin system
 */
export namespace hsw.plugin.customizedmodeling.cmd {
  export { CmdAddCustomizedModelLightSlot };
}