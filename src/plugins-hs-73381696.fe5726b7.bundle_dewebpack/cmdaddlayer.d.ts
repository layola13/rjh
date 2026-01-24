/**
 * Module: CmdAddLayer
 * Command for adding a new layer (floor or basement) to the floorplan
 */

import { Command } from 'HSApp/Cmd/Command';
import { FloorPlan } from 'HSApp/FloorPlan';
import { TransactionManager, TransactionRequest } from 'HSApp/TransactionManager';
import { CameraTypeEnum } from 'HSCore/Model/CameraTypeEnum';
import { RequestType, LogGroupTypes } from 'HSFPConstants';

/**
 * Layer type enumeration
 */
export enum LayerType {
  /** Standard floor layer */
  Floor = 1,
  /** Basement layer */
  Basement = 2
}

/**
 * Context interface for command execution
 */
export interface ICommandContext {
  /** Transaction manager for handling operations */
  transManager: TransactionManager;
}

/**
 * Current parameters returned by the command
 */
export interface ICommandParams {
  /** Active section identifier */
  activeSection: LogGroupTypes;
  /** Click tracking information */
  clicksRatio: {
    /** Unique identifier for the operation */
    id: string;
    /** Display name for the operation */
    name: string;
  };
}

/**
 * Command for adding a new layer (floor or basement) to the floorplan.
 * Handles layer creation, wall copying, and camera adjustment.
 */
export declare class CmdAddLayer extends Command {
  /** Command execution context */
  private readonly context: ICommandContext;
  
  /** Type of layer to add (floor or basement) */
  private readonly _layerType: LayerType;
  
  /** Whether to copy walls from existing layer */
  private readonly needCopyWall: boolean;
  
  /** Transaction request handle */
  private _request?: TransactionRequest;

  /**
   * Creates a new CmdAddLayer command
   * @param context - Command execution context with transaction manager
   * @param layerType - Type of layer to add (1 for floor, 2 for basement)
   * @param needCopyWall - Whether to copy walls from the current layer
   */
  constructor(context: ICommandContext, layerType: LayerType, needCopyWall: boolean);

  /**
   * Executes the command by creating a transaction request to add a new layer
   */
  onExecute(): void;

  /**
   * Handles response from the transaction system
   * @param eventType - Type of event received
   * @param data - Event data
   */
  onReceive(eventType: string, data: unknown): void;

  /**
   * Adjusts camera to fit the newly created layer in view.
   * Handles both orthographic and orbit camera types.
   */
  fitScreen(): void;

  /**
   * Cleanup operations after command execution
   */
  onCleanup(): void;

  /**
   * Determines if this command supports undo/redo
   * @returns Always false - layer operations cannot be undone
   */
  canUndoRedo(): boolean;

  /**
   * Gets human-readable description of the command
   * @returns Description string indicating floor or basement addition
   */
  getDescription(): string;

  /**
   * Determines if this command requires user interaction
   * @returns Always true - command is interactive
   */
  isInteractive(): boolean;

  /**
   * Gets the logging category for this command
   * @returns Layer operation category
   */
  getCategory(): LogGroupTypes;

  /**
   * Gets current command parameters for logging/tracking
   * @returns Object containing operation details and tracking info
   */
  getCurrentParams(): ICommandParams;

  /**
   * Gets the operation mode identifier
   * @returns "addFloor" or "addBasement" based on layer type
   */
  getMode(): 'addFloor' | 'addBasement';
}