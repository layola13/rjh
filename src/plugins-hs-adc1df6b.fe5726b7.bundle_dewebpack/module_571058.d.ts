import { IPlugin } from 'HSApp/Plugin';
import { Application } from 'HSApp/Application';
import { CommandManager } from 'HSApp/CommandManager';
import { TransactionManager } from 'HSApp/TransactionManager';

/**
 * Command for adding wall molding
 */
export class CmdAddWallMolding {
  execute(): void;
  undo(): void;
  redo(): void;
}

/**
 * Command for changing molding auto-fit property
 */
export class CmdChangeMoldingAutoFit {
  execute(): void;
  undo(): void;
  redo(): void;
}

/**
 * Command for changing molding height
 */
export class CmdChangeMoldingHeight {
  execute(): void;
  undo(): void;
  redo(): void;
}

/**
 * Command for changing molding offset
 */
export class CmdChangeMoldingOffset {
  execute(): void;
  undo(): void;
  redo(): void;
}

/**
 * Command for changing molding width
 */
export class CmdChangeMoldingWidth {
  execute(): void;
  undo(): void;
  redo(): void;
}

/**
 * Command for resetting wall molding to default state
 */
export class CmdResetWallMolding {
  execute(): void;
  undo(): void;
  redo(): void;
}

/**
 * Command for deleting mitre molding
 */
export class CmdDeleteMitreMolding {
  execute(): void;
  undo(): void;
  redo(): void;
}

/**
 * Command for cutting molding
 */
export class CmdCutMolding {
  execute(): void;
  undo(): void;
  redo(): void;
}

/**
 * Command for connecting molding pieces
 */
export class CmdConnectMolding {
  execute(): void;
  undo(): void;
  redo(): void;
}

/**
 * Request handler for adding wall molding
 */
export class AddWallMoldingRequest {
  handle(): Promise<void>;
}

/**
 * Request handler for adding mitre molding
 */
export class AddMitreMoldingRequest {
  handle(): Promise<void>;
}

/**
 * Request handler for changing molding texture
 */
export class ChangeMoldingTextureRequest {
  handle(): Promise<void>;
}

/**
 * Request handler for changing molding type
 */
export class ChangeMoldingTypeRequest {
  handle(): Promise<void>;
}

/**
 * Request handler for changing molding size
 */
export class ChangeMoldingSizeRequest {
  handle(): Promise<void>;
}

/**
 * Request handler for changing molding offset
 */
export class ChangeMoldingOffsetRequest {
  handle(): Promise<void>;
}

/**
 * Request handler for changing molding autofit property
 */
export class ChangeMoldingAutofitRequest {
  handle(): Promise<void>;
}

/**
 * Request handler for deleting mitre molding
 */
export class DeleteMitreMoldingRequest {
  handle(): Promise<void>;
}

/**
 * Request handler for cutting molding
 */
export class CutMoldingRequest {
  handle(): Promise<void>;
}

/**
 * Request handler for connecting molding pieces
 */
export class ConnectMoldingRequest {
  handle(): Promise<void>;
}

/**
 * Plugin configuration interface
 */
export interface IPluginConfig {
  /** Plugin name identifier */
  name: string;
  /** Plugin description */
  description: string;
  /** Array of plugin dependencies */
  dependencies: string[];
}

/**
 * Context passed during plugin lifecycle events
 */
export interface IPluginContext {
  /** Application instance */
  app: {
    /** Command manager for registering commands */
    cmdManager: CommandManager;
    /** Transaction manager for registering request handlers */
    transManager: TransactionManager;
  };
}

/**
 * Molding editing plugin
 * 
 * Provides functionality for editing wall moldings including:
 * - Adding and deleting moldings
 * - Modifying molding properties (height, width, offset, texture, type)
 * - Cutting and connecting molding pieces
 * - Auto-fit adjustments
 * 
 * @extends {IPlugin}
 */
export class MoldingEditPlugin extends IPlugin {
  /**
   * Creates a new molding editing plugin instance
   */
  constructor();

  /**
   * Called when the plugin is activated
   * Registers all molding-related commands and request handlers
   * 
   * @param context - Plugin context containing app instance
   */
  onActive(context: IPluginContext): void;

  /**
   * Called when the plugin is deactivated
   * Cleanup operations if needed
   */
  onDeactive(): void;
}

/**
 * Plugin registration namespace
 */
declare namespace HSApp.Plugin {
  /**
   * Registers a plugin with the application
   * 
   * @param pluginId - Unique identifier for the plugin
   * @param pluginClass - Plugin class constructor
   */
  function registerPlugin(pluginId: string, pluginClass: typeof IPlugin): void;
}

/**
 * HSFPConstants namespace for command and request type constants
 */
declare namespace HSFPConstants {
  /**
   * Command type enumeration
   */
  enum CommandType {
    AddWallMolding = 'AddWallMolding',
    ChangeMoldingAutoFit = 'ChangeMoldingAutoFit',
    ChangeMoldingHeight = 'ChangeMoldingHeight',
    ChangeMoldingOffset = 'ChangeMoldingOffset',
    ChangeMoldingWidth = 'ChangeMoldingWidth',
    ResetWallMolding = 'ResetWallMolding',
    DeleteMitreMolding = 'DeleteMitreMolding',
    CutMolding = 'CutMolding',
    ConnectMolding = 'ConnectMolding',
  }

  /**
   * Request type enumeration
   */
  enum RequestType {
    AddWallMolding = 'AddWallMolding',
    AddMiterMolding = 'AddMiterMolding',
    ChangeMoldingTexture = 'ChangeMoldingTexture',
    ChangeMoldingType = 'ChangeMoldingType',
    ChangeMoldingSize = 'ChangeMoldingSize',
    ChangeMoldingOffset = 'ChangeMoldingOffset',
    ChangeMoldingAutofit = 'ChangeMoldingAutofit',
    DeleteMitreMolding = 'DeleteMitreMolding',
    CutMolding = 'CutMolding',
    ConnectMolding = 'ConnectMolding',
  }
}

export default MoldingEditPlugin;