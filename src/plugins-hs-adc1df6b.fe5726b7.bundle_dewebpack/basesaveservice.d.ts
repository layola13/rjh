/**
 * Base save service for handling save operations with multiple stages
 * @module BaseSaveService
 */

import type { SaveSignal } from './save-signal';
import type { SaveStageEnum } from './save-stage-enum';
import type { SaveHasTaskStage, SaveStage } from './save-stages';
import type { SaveGetDataStage } from './save-get-data-stage';
import type { HSApp } from './hs-app';

/**
 * Parameters passed to save operations
 */
export interface SaveParams {
  /** Whether to display live hint UI during save */
  showLiveHint?: boolean;
  /** Whether to include underlay data in save */
  needUnderlay?: boolean;
  /** Additional extension data */
  ext?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Result returned from save operations
 */
export interface SaveReturnData {
  /** Status of the save operation */
  status: 'success' | 'error' | 'cancel';
  /** Data returned from successful save */
  data?: Record<string, unknown>;
  /** Error information for failed saves */
  error?: Error | unknown;
  /** Additional information about the save result */
  info?: string;
  /** Time taken for the operation in milliseconds */
  time?: number;
  /** Stage where error occurred (if applicable) */
  stage?: SaveStageEnum;
}

/**
 * Configuration for stage execution
 */
interface StageConfig {
  /** Function to execute for this stage */
  execute: (params: SaveParams, previousData?: unknown) => Promise<SaveReturnData>;
}

/**
 * Signal data dispatched during save process
 */
interface SignalData {
  saveParams?: SaveParams;
  saveReturnData?: SaveReturnData;
  stageName?: SaveStageEnum;
  processType?: 'start' | 'end';
  taskName?: string;
  saveInfo?: string;
  error?: Error | unknown;
  [key: string]: unknown;
}

/**
 * Task signal event data
 */
interface TaskSignalData {
  data: {
    saveParams: SaveParams;
    [key: string]: unknown;
  };
}

/**
 * Service that can be registered for save tasks
 */
interface TaskService {
  /** Optional signal for task events */
  signal?: {
    listen: (callback: (data: TaskSignalData) => void, context: unknown) => void;
    unlisten: (callback: (data: TaskSignalData) => void, context: unknown) => void;
  };
  [key: string]: unknown;
}

/**
 * Constructor options for BaseSaveService
 */
interface BaseSaveServiceOptions {
  /** Function to get dump services */
  getDumpServices: () => Map<string, unknown>;
  /** Application instance */
  app: HSApp;
  /** Optional signal for save start event */
  signalSaveStart?: SaveSignal;
  /** Optional signal for save succeeded event */
  signalSaveSucceeded?: SaveSignal;
  /** Optional signal for save cancel event */
  signalSaveCancel?: SaveSignal;
  /** Optional signal for save failed event */
  signalSaveFailed?: SaveSignal;
  /** Optional signal for save process event */
  signalSaveProcess?: SaveSignal;
}

/**
 * Request data for save operations
 */
interface SaveRequestData {
  ext?: string;
  [key: string]: unknown;
}

/**
 * Design metadata interface
 */
interface DesignMetadata {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
}

/**
 * Floorplan interface
 */
interface Floorplan {
  designMetadata: DesignMetadata;
  [key: string]: unknown;
}

/**
 * Base service for handling save operations with multiple stages (Check, GetData, PostData, Subsequent)
 * Manages save lifecycle, signals, and task registration
 */
export declare class BaseSaveService {
  /** Signal dispatched when save starts */
  signalSaveStart: SaveSignal;
  
  /** Signal dispatched when save succeeds */
  signalSaveSucceeded: SaveSignal;
  
  /** Signal dispatched when save is cancelled */
  signalSaveCancel: SaveSignal;
  
  /** Signal dispatched when save fails */
  signalSaveFailed: SaveSignal;
  
  /** Signal dispatched during save process stages */
  signalSaveProcess: SaveSignal;
  
  /** Whether a save operation is currently in progress */
  saving: boolean;
  
  /** Current save parameters being processed */
  currentSaveParams?: SaveParams;
  
  /** Stage for save checks */
  saveCheckStage: SaveHasTaskStage;
  
  /** Stage for getting save data */
  saveGetDataStage: SaveGetDataStage;
  
  /** Stage for posting save data */
  savePostDataStage: SaveStage;
  
  /** Stage for subsequent save operations */
  saveSubsequentStage: SaveHasTaskStage;
  
  /** Map of save stages to their execution configuration */
  stageMap: Map<SaveStageEnum, StageConfig>;
  
  /** API instance for making requests */
  API: unknown;
  
  /** Global API instance */
  globalAPI: unknown;
  
  /** Application instance */
  app: HSApp;
  
  /** Map of task services to their signal listeners */
  taskSignalMap: Map<TaskService, (data: TaskSignalData) => void>;
  
  /** Function to get dump services */
  getDumpServices: () => Map<string, unknown>;

  /**
   * Creates an instance of BaseSaveService
   * @param options - Configuration options
   */
  constructor(options: BaseSaveServiceOptions);

  /**
   * Set attribute on the service
   * @param attribute - Attribute to set
   */
  setAttribute(attribute: unknown): void;

  /**
   * Check if a save operation is currently in progress
   * @returns True if saving, false otherwise
   */
  isSaving(): boolean;

  /**
   * Execute a save operation through all stages
   * @param params - Save parameters
   * @returns Promise resolving with save result
   */
  save(params: SaveParams): Promise<SaveReturnData>;

  /**
   * Execute all stages sequentially
   * @param stageMap - Map of stages to execute
   * @param params - Save parameters
   * @returns Promise resolving with combined stage results
   */
  forEachStage(
    stageMap: Map<SaveStageEnum, StageConfig>,
    params: SaveParams
  ): Promise<SaveReturnData>;

  /**
   * Show save dialog (can be overridden by subclasses)
   * @param params - Save parameters
   * @returns Promise resolving with dialog result
   */
  showSaveDialog(params: SaveParams): Promise<SaveReturnData>;

  /**
   * Get data for save operation (can be overridden by subclasses)
   * @param params - Save parameters
   * @returns Data object
   */
  getData(params: SaveParams): Record<string, unknown>;

  /**
   * Get signal data for dispatching (can be overridden by subclasses)
   * @param params - Save parameters
   * @param returnData - Optional return data
   * @returns Signal data object
   */
  getSignalData(params: SaveParams, returnData?: SaveReturnData): SignalData;

  /**
   * Called when a stage starts
   * @param stage - Stage name
   * @param params - Save parameters
   */
  startStage(stage: SaveStageEnum, params: SaveParams): void;

  /**
   * Called when a stage ends
   * @param stage - Stage name
   * @param params - Save parameters
   * @param returnData - Stage return data
   */
  endStage(stage: SaveStageEnum, params: SaveParams, returnData: SaveReturnData): void;

  /**
   * Register a service for a specific save stage
   * @param name - Service name
   * @param stage - Stage to register for
   * @param service - Service instance
   */
  registerService(name: string, stage: SaveStageEnum, service: TaskService): void;

  /**
   * Get task signal listener function
   * @param taskName - Name of the task
   * @param stage - Stage name
   * @returns Listener function
   */
  getrTaskSignalListen(
    taskName: string,
    stage: SaveStageEnum
  ): (data: TaskSignalData) => void;

  /**
   * Unregister a service from a save stage
   * @param name - Service name
   * @param stage - Stage to unregister from
   */
  unregisterService(name: string, stage: SaveStageEnum): void;

  /**
   * Execute the check stage
   * @param params - Save parameters
   * @param previousData - Data from previous stage
   * @returns Promise resolving with check result
   */
  saveCheck(params: SaveParams, previousData?: unknown): Promise<SaveReturnData>;

  /**
   * Execute the get data stage
   * @param params - Save parameters
   * @param previousData - Data from previous stage
   * @returns Promise resolving with data
   */
  saveGetData(params: SaveParams, previousData?: unknown): Promise<SaveReturnData>;

  /**
   * Execute the post data stage
   * @param params - Save parameters
   * @param previousData - Data from previous stage
   * @returns Promise resolving with post result
   */
  savePostDate(params: SaveParams, previousData?: unknown): Promise<SaveReturnData>;

  /**
   * Execute the subsequent stage
   * @param params - Save parameters
   * @param previousData - Data from previous stage
   * @returns Promise resolving with subsequent result
   */
  saveSubsequent(params: SaveParams, previousData?: unknown): Promise<SaveReturnData>;

  /**
   * Called when save succeeds (can be overridden by subclasses)
   * @param params - Save parameters
   * @param returnData - Save return data
   * @returns Promise resolving with success result
   */
  onSaveSucceeded(params: SaveParams, returnData: SaveReturnData): Promise<SaveReturnData>;

  /**
   * Called when save fails (can be overridden by subclasses)
   * @param params - Save parameters
   * @param returnData - Save return data
   * @returns Promise resolving with failure result
   */
  onSaveFailed(params: SaveParams, returnData: SaveReturnData): Promise<SaveReturnData>;

  /**
   * Transform request data
   * @param data - Data to transform
   * @returns Transformed data
   */
  transformRequest(data: unknown): unknown;

  /**
   * Called when save ends (success or failure)
   * @param params - Save parameters
   * @param returnData - Save return data
   */
  onSaveEnd(params: SaveParams, returnData?: SaveReturnData): void;

  /**
   * Update design metadata
   * @returns Promise resolving with true if successful, false otherwise
   */
  updateDesignMeta(): Promise<boolean>;

  /**
   * Refresh design metadata
   * @param designId - Design ID to refresh
   * @param force - Whether to force refresh
   * @returns Promise resolving with refreshed metadata
   */
  refreshDesignMeta(designId: string, force?: boolean): Promise<unknown>;

  /**
   * Execute save operation for a floorplan
   * @param params - Save parameters
   * @param floorplan - Floorplan to save
   * @param options - Additional save options
   * @returns Promise resolving with save result
   */
  executeFloorplanSave(
    params: SaveParams,
    floorplan: Floorplan,
    options?: { ext?: Record<string, unknown> }
  ): Promise<unknown>;
}