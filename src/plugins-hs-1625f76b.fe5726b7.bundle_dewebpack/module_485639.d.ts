/**
 * Material UV change command for handling material texture coordinate modifications.
 * This command manages UV mapping changes for materials on 3D entities.
 */

import { HSApp } from './518193';

/**
 * Material data interface containing UV mapping information
 */
export interface MaterialData {
  /** UV offset X coordinate */
  offsetX?: number;
  /** UV offset Y coordinate */
  offsetY?: number;
  /** UV scale X factor */
  scaleX?: number;
  /** UV scale Y factor */
  scaleY?: number;
  /** UV rotation angle in degrees */
  rotation?: number;
  /** Additional material properties */
  [key: string]: unknown;
}

/**
 * Material interface representing a material component
 */
export interface Material {
  /**
   * Gets the current material data
   * @returns The material data object
   */
  getMaterialData(): MaterialData;
  
  /**
   * Marks the entity as dirty, requiring re-render
   */
  onEntityDirty(): void;
}

/**
 * Entity interface representing a 3D object in the scene
 */
export interface Entity {
  /**
   * Gets the material for a specific component
   * @param componentName - The name of the component
   * @returns The material instance or undefined
   */
  getMaterial(componentName: string): Material | undefined;
  
  /**
   * Marks the material as dirty, requiring update
   */
  dirtyMaterial(): void;
}

/**
 * Message event interface for UV change notifications
 */
export interface ChangeUVMessage {
  /** Message type identifier */
  msg: 'changeUV';
  /** Material data payload */
  data: MaterialData;
}

/**
 * Transaction request interface
 */
export interface TransactionRequest {
  /** Request type */
  type: string;
  /** Request parameters */
  params: unknown[];
}

/**
 * Transaction manager interface for handling command execution
 */
export interface TransactionManager {
  /**
   * Creates a transaction request
   * @param requestType - The type of request to create
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
  /** Transaction manager instance */
  transManager: TransactionManager;
}

/**
 * Command class for changing material UV coordinates.
 * Extends the HSApp Command system to handle material texture mapping modifications.
 */
export default class MaterialUVChangeCommand extends HSApp.Cmd.Command {
  /** The target entity containing the material */
  protected entity: Entity;
  
  /** The name of the component whose material will be modified */
  protected componentName: string;
  
  /** The material data containing UV mapping information */
  protected materialData: MaterialData | undefined;
  
  /** Command execution context */
  protected context: CommandContext;

  /**
   * Creates a new MaterialUVChangeCommand instance
   * @param entity - The entity containing the material to modify
   * @param componentName - The name of the component
   * @param materialData - Optional material data; if not provided, uses current material data
   */
  constructor(entity: Entity, componentName: string, materialData?: MaterialData);

  /**
   * Executes the command by creating and committing a UV change request
   */
  onExecute(): void;

  /**
   * Handles incoming messages related to UV changes
   * @param message - The message event to process
   * @returns True if the message was handled, false otherwise
   */
  onReceive(message: ChangeUVMessage | { msg: string; data?: unknown }): boolean;

  /**
   * Determines if this command can be undone or redone
   * @returns False, as UV changes are not undoable
   */
  canUndoRedo(): boolean;
}