/**
 * Structure Edit Plugin Module
 * Handles structure editing commands, gizmos, and related operations for building structures and beams
 */

import type { IPlugin, PluginContext } from 'HSApp.Plugin';
import type { CommandManager } from 'HSApp.CommandManager';
import type { TransactionManager } from 'HSApp.TransactionManager';

/**
 * Command types for structure editing operations
 */
declare enum CommandType {
  AddStructure = 'AddStructure',
  MoveStructure = 'MoveStructure',
  MoveBeam = 'MoveBeam',
  RotateStructure = 'RotateStructure',
  RotateBeam = 'RotateBeam',
  CopyPasteStructure = 'CopyPasteStructure',
  CopyPasteBeam = 'CopyPasteBeam',
  DeleteStructure = 'DeleteStructure',
  DeleteBeam = 'DeleteBeam',
  ChangeStructureMode = 'ChangeStructureMode',
  ChangeBeamType = 'ChangeBeamType',
  ResizeStructure = 'ResizeStructure',
  ResizeBeam = 'ResizeBeam',
}

/**
 * Request types for transaction management
 */
declare enum RequestType {
  AddStructure = 'AddStructure',
  MoveStructure = 'MoveStructure',
  MoveBeam = 'MoveBeam',
  RotateStructure = 'RotateStructure',
  RotateBeam = 'RotateBeam',
  CopyPasteStructure = 'CopyPasteStructure',
  CopyPasteBeam = 'CopyPasteBeam',
  DeleteStructure = 'DeleteStructure',
  DeleteBeam = 'DeleteBeam',
  ChangeStructureMode = 'ChangeStructureMode',
  ChangeBeamType = 'ChangeBeamType',
  AddBeam = 'AddBeam',
  ResizeStructure = 'ResizeStructure',
  ResizeBeam = 'ResizeBeam',
}

/**
 * Plugin types registry
 */
declare enum PluginType {
  Structure = 'Structure',
}

/**
 * Global constants namespace
 */
declare namespace HSFPConstants {
  export { CommandType, RequestType, PluginType };
}

/**
 * Command class definitions for structure operations
 */
export declare class CmdAddStructure {}
export declare class CmdMoveStructure {}
export declare class CmdMoveBeam {}
export declare class CmdRotateStructure {}
export declare class CmdRotateBeam {}
export declare class CmdCopyPasteStructure {}
export declare class CmdCopyPasteBeam {}
export declare class CmdDeleteStructure {}
export declare class CmdDeleteBeam {}
export declare class CmdChangeStructureMode {}
export declare class CmdChangeBeamType {}
export declare class CmdResizeStructure {}
export declare class CmdResizeBeam {}

/**
 * Request class definitions for transaction processing
 */
export declare class AddStructureRequest {}
export declare class MoveStructureRequest {}
export declare class MoveBeamRequest {}
export declare class RotateStructureRequest {}
export declare class RotateBeamRequest {}
export declare class CopyPasteStructureRequest {}
export declare class CopyPasteBeamRequest {}
export declare class DeleteStructureRequest {}
export declare class DeleteBeamRequest {}
export declare class ChangeStructureModeRequest {}
export declare class ChangeBeamTypeRequest {}
export declare class AddBeamRequest {}
export declare class ResizeStructureRequest {}
export declare class ResizeBeamRequest {}

/**
 * Plugin context interface passed to lifecycle methods
 */
export interface IPluginContext {
  /** Application instance containing managers and services */
  app: {
    /** Command manager for registering executable commands */
    cmdManager: CommandManager;
    /** Transaction manager for handling requests */
    transManager: TransactionManager;
  };
}

/**
 * Structure Edit Plugin
 * 
 * Processes structure edit commands and manages associated gizmos for:
 * - Adding, moving, rotating, resizing structures and beams
 * - Copy/paste operations
 * - Deletion operations
 * - Mode and type changes
 */
export declare class StructureEditPlugin extends IPlugin {
  /**
   * Creates an instance of the Structure Edit Plugin
   * Initializes with plugin metadata and no external dependencies
   */
  constructor();

  /**
   * Activates the plugin and registers all commands and requests
   * 
   * Registers command handlers for:
   * - Structure operations (add, move, rotate, resize, delete, copy/paste, change mode)
   * - Beam operations (add, move, rotate, resize, delete, copy/paste, change type)
   * 
   * Registers transaction request handlers for all corresponding operations
   * 
   * @param context - Plugin context containing app instance with managers
   */
  onActive(context: IPluginContext): void;

  /**
   * Deactivates the plugin and cleans up resources
   * Currently performs no cleanup operations
   */
  onDeactive(): void;
}

/**
 * Plugin registration with the HSApp Plugin system
 * Registers StructureEditPlugin under the Structure plugin type
 */
declare module 'HSApp.Plugin' {
  function registerPlugin(
    pluginType: PluginType.Structure,
    pluginClass: typeof StructureEditPlugin
  ): void;
}