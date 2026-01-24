/**
 * Save service module for managing design save operations
 * Handles various save stages including validation, data export, and post-save actions
 */

import { BaseSaveService } from './BaseSaveService';
import { SavePostDataStage } from './SavePostDataStage';
import { SaveStageEnum } from './SaveStageEnum';
import {
  LoadingCheckTask,
  LoginCheckTask,
  DesignEditStateTask,
  ReadonlyCheckTask,
  ReadonlyModeCheckTask,
  VersionCheckTask,
  RoomClosedCheckTask,
  SaveFormCheckTask,
  SaveAsCheckTask,
  UploadThumbTask,
  ExportRoominfoTask,
  UpdateSceneJson
} from './tasks';
import type { HSCore } from './HSCore';
import type { App } from './App';

/**
 * Parameters for save operations
 */
export interface SaveParams {
  /** Whether this is a "save as" operation (creates new design) */
  isSaveas?: boolean;
  /** Whether to include underlay data in the save */
  needUnderlay?: boolean;
  /** Whether this is an auto-create operation */
  isAutoCreate?: boolean;
}

/**
 * Form data collected from save dialog
 */
export interface SaveFormData {
  /** Design name */
  designName: string;
  /** Design description */
  description?: string;
  /** Document visibility/sharing status */
  documentStatus: string;
  /** Custom attributes */
  attributes?: Record<string, unknown>;
  /** Physical address associated with design */
  address?: string;
  /** Basic design attributes */
  basicAttributes?: Record<string, unknown>;
}

/**
 * Result returned from save dialog
 */
export interface SaveDialogResult {
  /** Operation status */
  status: 'success' | 'cancel';
  /** Form data if successful */
  data?: {
    formData: SaveFormData;
  };
}

/**
 * Save operation result
 */
export interface SaveResult {
  /** Operation status */
  status: 'success' | 'error';
  /** Error message if failed */
  error?: string;
}

/**
 * Signal data for tracking save operations
 */
export interface SaveSignalData {
  /** Whether this is a create operation */
  create: boolean;
  /** Type of save: 'save', 'update', or 'saveas' */
  saveType: 'save' | 'update' | 'saveas';
  [key: string]: unknown;
}

/**
 * Thumbnail export options
 */
export interface ThumbnailOptions {
  /** Image width in pixels */
  width: number;
  /** Image height in pixels */
  height: number;
  /** Whether to include foreground elements */
  forground: boolean;
}

/**
 * Design metadata interface
 */
export interface DesignMetadata {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
}

/**
 * SaveService handles all aspects of saving design data
 * Manages validation checks, data collection, server communication, and post-save updates
 */
export declare class SaveService extends BaseSaveService {
  /** Stage for handling POST request to save endpoint */
  private savePostDataStage: SavePostDataStage;
  
  /** Current save operation parameters */
  private currentSaveParams?: SaveParams;

  /**
   * Initialize save service and register all validation/processing tasks
   * @param app - Application instance
   */
  constructor(app: App);

  /**
   * Main save entry point
   * Validates parameters and initiates save workflow
   * @param params - Save operation parameters
   * @returns Promise resolving when save completes
   */
  save(params: SaveParams): Promise<SaveResult>;

  /**
   * Collect and prepare save data
   * Handles soft cloth simulation data if present
   * @param params - Save parameters
   * @param additionalData - Additional context data
   * @returns Promise resolving to prepared save data
   */
  saveGetData(params: SaveParams, additionalData?: unknown): Promise<unknown>;

  /**
   * Execute subsequent tasks after successful save
   * Triggers post-save operations like scene updates
   * @param saveData - Data from save operation
   * @param context - Execution context
   * @returns Promise resolving when subsequent tasks complete
   */
  saveSubsequent(saveData: unknown, context: unknown): Promise<void>;

  /**
   * Extract save request data from floorplan
   * @param params - Save parameters
   * @returns Serialized design data ready for server
   */
  getData(params: SaveParams): unknown;

  /**
   * POST save data to server endpoint
   * @param data - Prepared save data
   * @param context - Request context
   * @returns Promise resolving to server response
   */
  savePostDate(data: unknown, context: unknown): Promise<unknown>;

  /**
   * Handle successful save completion
   * Updates URL, clears dirty flag, notifies parent frames
   * @param saveData - Data that was saved
   * @param response - Server response
   * @returns Promise resolving to success result
   */
  onSaveSucceeded(saveData: unknown, response: unknown): Promise<SaveResult>;

  /**
   * Generate tracking/telemetry data for save operation
   * @param params - Save parameters
   * @param context - Additional context
   * @returns Signal data object
   */
  getSignalData(params: SaveParams, context: unknown): SaveSignalData;

  /**
   * Display save dialog to collect design metadata
   * @param params - Save parameters (determines dialog behavior)
   * @returns Promise resolving to dialog result
   */
  showSaveDialog(params: SaveParams): Promise<SaveDialogResult>;

  /**
   * Generate and save 3D thumbnail image
   * @param shouldUpdate - Whether to actually generate thumbnail (default: true)
   * @returns Promise resolving when thumbnail is saved
   */
  updateThumbnail(shouldUpdate?: boolean): Promise<string>;

  /**
   * Collect list of soft cloth items needing simulation
   * @returns Array of soft cloth JIDs
   */
  private getSoftClothList(): string[];

  /**
   * Record timestamp of first successful save (for analytics/surveys)
   */
  private saveSuccessfullyTime(): void;
}