/**
 * Autostyler Plugin Module
 * Provides design template creation and import functionality for floorplans
 */

import { HSCore } from 'HSCore';
import { HSApp } from 'HSApp';
import { HSFPConstants } from 'HSFPConstants';

/**
 * Configuration options for initializing the Autostyler handler
 */
interface AutostylerHandlerConfig {
  /** Application instance */
  app: HSApp.Application;
  /** Plugin dependencies map */
  dependencies: Map<string, HSApp.Plugin.IPlugin>;
  /** Signal for sending styler template data */
  signalSendingStylerTemplate: HSCore.Util.Signal;
  /** Signal for logging template design events */
  signalTemplateDesignToLog: HSCore.Util.Signal;
}

/**
 * Options for importing a styler template
 */
interface ImportTemplateOptions {
  /** Template data to import */
  templateData: unknown;
  /** Additional import configuration */
  options?: Record<string, unknown>;
}

/**
 * Options for creating a template room
 */
interface CreateTemplateRoomOptions {
  /** Room configuration data */
  roomData: unknown;
  /** Template metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Strategy manager interface for handling different import/export strategies
 */
interface IStrategyManager {
  /** Execute a specific strategy */
  executeStrategy(strategyName: string, ...args: unknown[]): unknown;
}

/**
 * Meta processor interface for handling template metadata
 */
interface IMetaProcessor {
  /** Process template metadata */
  processMetadata(metadata: Record<string, unknown>): unknown;
  /** Validate metadata structure */
  validateMetadata(metadata: Record<string, unknown>): boolean;
}

/**
 * Internal handler for Autostyler plugin operations
 */
declare class AutostylerHandler {
  /**
   * Initialize the handler with configuration
   */
  init(config: AutostylerHandlerConfig): void;

  /**
   * Cleanup and uninitialize the handler
   */
  uninit(): void;

  /**
   * Add customized UI to the editing panel
   * @param uiElement - Custom UI element to add
   */
  addEditingPanelCustomizedUI_(uiElement: HTMLElement | unknown): void;

  /**
   * Import a styler template into the floorplan
   * @param templateData - Template data to import
   * @param options - Import options
   */
  importStylerTemplate(templateData: unknown, options?: unknown): void;

  /**
   * Import a styler template for a specific room
   * @param roomId - Target room identifier
   * @param templateData - Template data to import
   * @param options - Import options
   */
  importStylerTemplateForSingleRoom(
    roomId: string,
    templateData: unknown,
    options?: unknown
  ): void;

  /**
   * Get the metadata processor instance
   * @returns Meta processor for handling template metadata
   */
  getMetaProcessor(): IMetaProcessor;

  /**
   * Create a template room and add to library
   * @param roomData - Room data to create template from
   * @param metadata - Template metadata
   */
  onClickedAddtoStylerTemplateLibrary(
    roomData: unknown,
    metadata?: unknown
  ): void;

  /**
   * Create a pickup model from given data
   * @param modelData - Model data
   * @param options - Creation options
   */
  createPickupModel(modelData: unknown, options?: unknown): void;

  /**
   * Create a pickup model by room identifier
   * @param roomId - Room identifier
   * @param options - Creation options
   */
  createPickupModelByRoomId(roomId: string, options?: unknown): void;

  /**
   * Get the strategy manager instance
   * @returns Strategy manager for handling various operations
   */
  getStrategyManager(): IStrategyManager;

  /**
   * Merge duplicate IDs in an ID mapping
   * @param idMap - Map of IDs to merge
   * @returns Merged ID map
   */
  mergeSameIdsForIdMap(idMap: Map<string, unknown>): Map<string, unknown>;

  /**
   * Display the material pickup page
   * @param options - Display options
   */
  showMaterialPickUpPage(options?: unknown): void;

  /**
   * Save imported template to floorplan extension data
   * @param templateData - Template data to save
   * @param extensionData - Extension data to update
   */
  saveImportTemplateToFloorplanExt(
    templateData: unknown,
    extensionData: unknown
  ): void;
}

/**
 * Autostyler Plugin
 * Enables creation and import of design templates for floorplans
 */
export declare class AutostylerPlugin extends HSApp.Plugin.IPlugin {
  /** Internal handler for plugin operations */
  private _handler: AutostylerHandler;

  /** Signal emitted when sending styler template data */
  readonly signalSendingStylerTemplate: HSCore.Util.Signal;

  /** Signal emitted when logging template design events */
  readonly signalTemplateDesignToLog: HSCore.Util.Signal;

  constructor();

  /**
   * Called when plugin is activated
   * @param pluginContext - Plugin context information
   * @param dependencies - Map of dependent plugins
   */
  onActive(
    pluginContext: { app: HSApp.Application },
    dependencies: Map<string, HSApp.Plugin.IPlugin>
  ): void;

  /**
   * Called when plugin is deactivated
   */
  onDeactive(): void;

  /**
   * Add customized UI elements to the editing panel
   * @param uiElement - Custom UI element to add
   */
  addEditingPanelCustomizedUI(uiElement: HTMLElement | unknown): void;

  /**
   * Import a styler template into the current floorplan
   * @param templateData - Template data to import
   * @param options - Import configuration options
   */
  importStylerTemplate(templateData: unknown, options?: unknown): void;

  /**
   * Import a styler template for a single room
   * @param roomId - Target room identifier
   * @param templateData - Template data to import
   * @param options - Import configuration options
   */
  importStylerTemplateForSingleRoom(
    roomId: string,
    templateData: unknown,
    options?: unknown
  ): void;

  /**
   * Get the metadata processor for template operations
   * @returns Metadata processor instance
   */
  getMetaProcessor(): IMetaProcessor;

  /**
   * Create a new template room and add to library
   * @param roomData - Room data to create template from
   * @param metadata - Optional template metadata
   */
  createTemplateRoom(roomData: unknown, metadata?: unknown): void;

  /**
   * Create a pickup model from provided data
   * @param modelData - Model data
   * @param options - Creation options
   */
  createPickupModel(modelData: unknown, options?: unknown): void;

  /**
   * Create a pickup model using a room identifier
   * @param roomId - Room identifier
   * @param options - Creation options
   */
  createPickupModelByRoomId(roomId: string, options?: unknown): void;

  /**
   * Get the strategy manager for handling various operations
   * @returns Strategy manager instance
   */
  getStrategyManager(): IStrategyManager;

  /**
   * Merge duplicate IDs in an ID mapping
   * @param idMap - Map containing IDs to merge
   * @returns Merged ID map with duplicates resolved
   */
  mergeSameIdsForIdMap(idMap: Map<string, unknown>): Map<string, unknown>;

  /**
   * Display the material pickup interface
   * @param options - Display configuration options
   */
  showMaterialPickUpPage(options?: unknown): void;

  /**
   * Save imported template data to floorplan extension storage
   * @param templateData - Template data to save
   * @param extensionData - Extension data to update
   */
  saveImportTemplateToFloorplanExt(
    templateData: unknown,
    extensionData: unknown
  ): void;
}

/**
 * Plugin registration
 * Registers the Autostyler plugin with the HSApp plugin system
 */
declare module 'HSApp' {
  namespace Plugin {
    interface PluginRegistry {
      [HSFPConstants.PluginType.Autostyler]: typeof AutostylerPlugin;
    }
  }
}