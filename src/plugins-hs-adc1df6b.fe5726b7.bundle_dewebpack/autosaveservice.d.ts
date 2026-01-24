/**
 * Auto-save service for managing the save lifecycle of floor plan data.
 * Handles pre-save checks, data export, and persistence (both local and remote).
 */

import { BaseSaveService } from './BaseSaveService';
import { SaveStageEnum } from './SaveStageEnum';
import { SaveHasTaskStage } from './SaveHasTaskStage';
import {
  LoadingCheckTask,
  DesignEditStateTask,
  ReadonlyModeCheckTask,
  ExportRoominfoTask,
  AutoRemotePersisterTask,
  AutoLocalPersisterTask
} from './tasks';

/**
 * Configuration options for AutoSaveService
 */
interface AutoSaveServiceConfig {
  /** Whether to perform actual save operations */
  doSave?: boolean;
}

/**
 * Options for saving floor plan data
 */
interface SaveOptions {
  /** Whether to ignore mixed paint texture URIs during save */
  ignoreMixPaintTextureURI?: boolean;
}

/**
 * Result of a save operation
 */
interface SaveResult {
  /** Status of the save operation */
  status: 'success' | 'error';
  /** Optional error message if status is 'error' */
  message?: string;
}

/**
 * Floor plan data structure returned by getData
 */
interface FloorPlanData {
  [key: string]: unknown;
}

/**
 * Application instance with floor plan capability
 */
interface App {
  floorplan: {
    saveToJSON(options: SaveOptions): FloorPlanData;
  };
}

/**
 * Auto-save service that orchestrates the complete save workflow.
 * 
 * The service executes saves in stages:
 * 1. Check stage - validates conditions (loading state, edit state, readonly mode)
 * 2. Subsequent stage - exports room info
 * 3. Post-save stage - persists data locally and remotely
 */
export declare class AutoSaveService extends BaseSaveService {
  /**
   * Stage responsible for post-save data persistence
   */
  private savePostDataStage: SaveHasTaskStage;

  /**
   * Flag controlling whether save operations should actually execute
   */
  private doSave: boolean;

  /**
   * Creates a new AutoSaveService instance
   * @param app - Application instance containing floor plan data
   */
  constructor(app: App);

  /**
   * Updates service configuration
   * @param config - Configuration object
   */
  setAttribute(config: AutoSaveServiceConfig): void;

  /**
   * Triggers a save operation
   * @param options - Save operation options
   * @returns Promise resolving to save result
   */
  save(options?: SaveOptions): Promise<SaveResult>;

  /**
   * Retrieves the current floor plan data for saving
   * @param options - Options controlling data serialization
   * @returns Floor plan data in JSON format
   */
  getData(options?: SaveOptions): FloorPlanData;

  /**
   * Executes post-save persistence tasks
   * @param data - Floor plan data to persist
   * @param metadata - Additional metadata for save operation
   * @returns Promise resolving to save result
   */
  savePostDate(data: FloorPlanData, metadata: unknown): Promise<SaveResult>;
}