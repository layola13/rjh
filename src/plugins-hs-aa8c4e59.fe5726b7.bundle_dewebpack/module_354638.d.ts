/**
 * Auxiliary Line Plugin Module
 * Handles the creation and management of auxiliary lines in the floor plan editor
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { CmdCreateAuxiliaryLine, CmdRemoveAuxiliaryLines } from './commands';
import { CreateAuxiliaryLineRequest, RemoveAuxiliaryLinesRequest } from './requests';

/**
 * Plugin initialization options
 */
interface PluginInitOptions {
  name: string;
  description: string;
  dependencies: HSFPConstants.PluginType[];
}

/**
 * Plugin activation event data
 */
interface PluginActivationEvent {
  app: HSApp.Application;
}

/**
 * Environment activation signal data
 */
interface EnvironmentActivationData {
  newEnvironmentId: HSFPConstants.Environment;
}

/**
 * Auxiliary line entity interface
 */
interface AuxiliaryLine extends HSCore.Model.Entity {
  setFlagOn(flag: HSCore.Model.EntityFlagEnum): void;
  setFlagOff(flag: HSCore.Model.EntityFlagEnum): void;
  dirty(): void;
}

/**
 * Active layer containing auxiliary lines
 */
interface ActiveLayer {
  auxiliaryLines: Record<string, AuxiliaryLine>;
}

/**
 * Scene containing the active layer
 */
interface Scene {
  activeLayer: ActiveLayer;
}

/**
 * Floor plan with scene
 */
interface FloorPlan {
  scene: Scene;
}

/**
 * Application interface extension
 */
declare module HSApp {
  interface Application {
    cmdManager: CommandManager;
    transManager: TransactionManager;
    signalEnvironmentActivated: HSCore.Util.Signal<EnvironmentActivationData>;
    floorplan: FloorPlan;
  }

  interface CommandManager {
    register(commands: Array<[HSFPConstants.CommandType, new (...args: unknown[]) => unknown]>): void;
  }

  interface TransactionManager {
    register(requests: Array<[HSFPConstants.RequestType, new (...args: unknown[]) => unknown]>): void;
  }
}

/**
 * Auxiliary Line Plugin
 * Manages auxiliary lines in the floor plan, handling their visibility
 * based on the active environment and providing commands for creation/removal
 */
declare class AuxiliaryLinePlugin extends HSApp.Plugin.IPlugin {
  /**
   * Signal hook for managing event subscriptions
   */
  private _signalHook?: HSCore.Util.SignalHook<AuxiliaryLinePlugin>;

  /**
   * Creates a new AuxiliaryLinePlugin instance
   */
  constructor();

  /**
   * Called when the plugin is activated
   * Registers commands, transaction handlers, and environment listeners
   * @param event - Plugin activation event containing the application instance
   */
  onActive(event: PluginActivationEvent): void;

  /**
   * Called when the plugin is deactivated
   * Cleans up all signal listeners
   */
  onDeactive(): void;
}

/**
 * Plugin registration
 */
declare namespace HSApp.Plugin {
  /**
   * Base plugin interface
   */
  abstract class IPlugin {
    abstract onActive(event: PluginActivationEvent): void;
    abstract onDeactive(): void;
  }

  /**
   * Registers a plugin with the application
   * @param pluginType - Type identifier for the plugin
   * @param pluginClass - Plugin class constructor
   * @param callback - Optional callback executed after registration
   */
  function registerPlugin(
    pluginType: HSFPConstants.PluginType,
    pluginClass: new () => IPlugin,
    callback?: () => void
  ): void;
}

declare namespace HSFPConstants {
  enum PluginType {
    Toolbar = 'Toolbar',
    AuxiliaryLine = 'AuxiliaryLine'
  }

  enum CommandType {
    CreateAuxiliaryLine = 'CreateAuxiliaryLine',
    RemoveAuxiliaryLines = 'RemoveAuxiliaryLines'
  }

  enum RequestType {
    CreateAuxiliaryLine = 'CreateAuxiliaryLine',
    RemoveAuxiliaryLines = 'RemoveAuxiliaryLines'
  }

  enum Environment {
    Default = 'Default'
  }
}

declare namespace HSCore.Model {
  enum EntityFlagEnum {
    hidden = 'hidden'
  }

  interface Entity {
    setFlagOn(flag: EntityFlagEnum): void;
    setFlagOff(flag: EntityFlagEnum): void;
    dirty(): void;
  }
}

declare namespace HSCore.Util {
  /**
   * Signal for event-driven communication
   */
  class Signal<T = unknown> {
    // Signal implementation details
  }

  /**
   * Utility for managing signal subscriptions
   */
  class SignalHook<TContext = unknown> {
    constructor(context: TContext);
    listen<T>(signal: Signal<T>, handler: (data: T) => void): void;
    unlistenAll(): void;
  }
}

export { AuxiliaryLinePlugin };