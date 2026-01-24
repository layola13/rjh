/**
 * Space Rebuild Save Module
 * Handles saving and duplicating floor plan designs for the Space Rebuild plugin.
 */

import type HSApp from 'homestyler-app';
import type { Floorplan, DesignMetadata, Plugin, PluginManager } from 'homestyler-types';

/**
 * Configuration options for saving floor plan design to JSON.
 */
interface SaveToJSONOptions {
  /** Whether to ignore mixed paint texture URIs in the export */
  ignoreMixPaintTextureURI: boolean;
  /** Whether to ignore underlay layers in the export */
  ignoreUnderlay: boolean;
  /** Whether to encrypt the exported data */
  encrypt: boolean;
}

/**
 * Metadata for creating a new design document.
 */
interface DesignMetadata {
  /** Target design ID for the new document */
  designId: string;
  /** ID of the main asset being duplicated */
  mainAssetId: string;
  /** Type of asset (7 = design copy) */
  assetType: number;
  /** ID of the user creating the design */
  userId: string;
  /** Name of the design */
  designName: string;
}

/**
 * Result object returned after save operation.
 */
interface SaveResult {
  /** Whether the save operation succeeded */
  isSave: boolean;
  /** Error details if the save failed */
  error?: Error;
}

/**
 * Event payload dispatched by the save signal.
 */
interface SaveSignalPayload {
  /** Whether the save operation succeeded */
  isSave: boolean;
}

/**
 * Space Rebuild plugin interface.
 */
interface SpaceRebuildPlugin extends Plugin {
  /** Signal dispatched when original design is saved */
  signalSaveOriginDesign?: {
    dispatch(payload: SaveSignalPayload): void;
  };
}

/**
 * Persistence plugin interface for saving floor plans.
 */
interface PersistencePlugin extends Plugin {
  /**
   * Saves a floor plan to the server.
   * @param floorplan - The floor plan to save
   * @param autoSave - Whether this is an auto-save operation
   * @returns Promise resolving to true if save succeeded
   */
  saveFloorplan(floorplan: Floorplan, autoSave: boolean): Promise<boolean>;
}

/**
 * Manages saving original designs for the Space Rebuild feature.
 * Creates a duplicate of the current floor plan before rebuilding operations.
 */
declare class SpaceRebuildSaveManager {
  /** Reference to the main HSApp application instance */
  private readonly _app: typeof HSApp.App;

  constructor();

  /**
   * Exports the current floor plan design to JSON format.
   * @returns Serialized design data, or undefined if export fails
   * @private
   */
  private _dumpCurrentDesign(): string | undefined;

  /**
   * Saves the current design as a new document before space rebuild operations.
   * Creates a duplicate design with metadata linking to the original.
   * 
   * @param targetDesignId - The ID to assign to the new saved design
   * @returns Promise resolving with save result
   * 
   * @example
   *