/**
 * Command for changing layer visibility in 3D context
 * @module CmdChangeLayerVisibility3d
 */

/**
 * Layer interface representing a 3D layer
 */
export interface Layer3d {
  id: string | number;
  name?: string;
  visible?: boolean;
  [key: string]: unknown;
}

/**
 * Transaction request interface
 */
export interface TransactionRequest {
  type: string;
  params: unknown[];
  id?: string | number;
}

/**
 * Transaction manager interface for handling 3D operations
 */
export interface TransactionManager {
  /**
   * Creates a new transaction request
   * @param requestType - Type of request from HSFPConstants.RequestType
   * @param params - Parameters for the request
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
 * Command manager interface
 */
export interface CommandManager {
  /**
   * Marks a command as complete
   * @param command - The command to complete
   */
  complete(command: unknown): void;
}

/**
 * 3D context interface containing transaction manager
 */
export interface Context3d {
  transManager: TransactionManager;
  [key: string]: unknown;
}

/**
 * Base command class from HSApp framework
 */
export declare class Command {
  /** Command manager instance */
  protected mgr: CommandManager;
  
  /**
   * Execute the command
   */
  onExecute(): void;
  
  /**
   * Cleanup resources after command execution
   */
  onCleanup(): void;
  
  /**
   * Check if command supports undo/redo
   * @returns true if command can be undone/redone
   */
  canUndoRedo(): boolean;
}

/**
 * Command for changing layer visibility in 3D context
 * Handles both single layer and multi-layer visibility modes
 */
export declare class CmdChangeLayerVisibility3d extends Command {
  /** 3D context containing transaction manager */
  readonly context: Context3d;
  
  /** Target layer to change visibility */
  readonly layer: Layer3d;
  
  /** Desired visibility state */
  readonly visible: boolean;
  
  /** Whether to operate in single layer mode (hide others) */
  readonly singleLayerMode: boolean;
  
  /** Internal transaction request */
  private _request?: TransactionRequest;
  
  /**
   * Creates a new layer visibility change command
   * @param context - 3D context with transaction manager
   * @param layer - Target layer to modify
   * @param visible - Desired visibility state (default: true)
   * @param singleLayerMode - If true, hides all other layers (default: false)
   */
  constructor(
    context: Context3d,
    layer: Layer3d,
    visible?: boolean,
    singleLayerMode?: boolean
  );
  
  /**
   * Executes the visibility change via transaction manager
   * Creates and commits a ChangeLayerVisibility request
   */
  onExecute(): void;
  
  /**
   * Cleanup resources after execution
   */
  onCleanup(): void;
  
  /**
   * Indicates this command supports undo/redo operations
   * @returns Always returns true
   */
  canUndoRedo(): boolean;
}