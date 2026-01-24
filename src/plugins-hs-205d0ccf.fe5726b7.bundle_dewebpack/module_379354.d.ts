/**
 * Task Center Plugin module
 * Manages task center functionality including task registration, hints, and workflow
 */

import { Signal } from 'HSCore.Util';
import { IPlugin } from 'HSApp.Plugin';
import { TaskHander } from './TaskHandler';
import { TaskTemplate, TaskConfig, TaskItem } from './TaskTemplate';
import { showTips, closeTips } from './TipsUtils';

/**
 * Plugin dependencies state
 */
interface PluginDependencies {
  /** Whether permission check is completed */
  permission: boolean;
  /** Whether a document has been opened */
  documentOpened: boolean;
  /** Whether task configuration is ready */
  configReady: boolean;
}

/**
 * Plugin initialization options
 */
interface PluginOptions {
  name: string;
  description: string;
  dependencies: string[];
}

/**
 * Task hint configuration
 */
interface TaskHint {
  /** MDS key-value for content localization */
  contentMdsKeyValue?: string;
  /** Additional hint properties */
  [key: string]: unknown;
}

/**
 * First login plugin interface
 */
interface FirstLoginPlugin {
  /** Signal emitted when permission check completes */
  signalCheckPermissionsCompleted: Signal;
}

/**
 * Plugin map type
 */
interface PluginMap {
  'hsw.brand.ezhome.firstlogin.Plugin'?: FirstLoginPlugin;
  [key: string]: unknown;
}

/**
 * Document opened event data
 */
interface DocumentOpenedData {
  /** Whether this is a new document */
  isNewDocument: boolean;
}

/**
 * Task registration overrides
 */
interface TaskRegistration {
  /** Task code identifier */
  taskCode?: string;
  /** Listen callback */
  listen?: () => void;
  /** Additional task properties */
  [key: string]: unknown;
}

/**
 * Task Center Plugin
 * Handles task management, hints display, and workflow coordination
 */
declare class TaskCenterPlugin extends IPlugin {
  /** Signal for importing floorplan */
  importFloorplanSignal: Signal;
  
  /** Signal for panorama rendering */
  panoramarenderSignal: Signal;
  
  /** Signal for inspiration library */
  inspirationLibrarySignal: Signal;

  /** Task handler instance */
  private _handler: TaskHander;

  /** Plugin dependencies tracking */
  private _dependencies: PluginDependencies;

  /**
   * Constructor
   * Initializes plugin with metadata and signals
   */
  constructor();

  /**
   * Get task handler instance
   */
  get handler(): TaskHander;

  /**
   * Initialize plugin
   * @private
   */
  private _init(): void;

  /**
   * Called when plugin becomes active
   * Sets up event listeners for permissions, document opening, and config loading
   * @param context - Plugin context
   * @param plugins - Map of available plugins
   */
  onActive(context: unknown, plugins: PluginMap): void;

  /**
   * Start task center when all dependencies are satisfied
   * Checks all dependencies and loads task center if ready
   */
  start(): void;

  /**
   * Show task hint/tooltip
   * @param hint - Hint configuration object
   * @param tipIndex - Index of tip to show from config (default: 0)
   */
  showHint(hint: TaskHint, tipIndex?: number): void;

  /**
   * Proceed to next step in task workflow
   * @param taskCode - Code of the task to advance
   */
  nextStep(taskCode: string): void;

  /**
   * Hide currently displayed hint
   */
  hideHint(): void;

  /**
   * Register or update a task with custom configuration
   * @param taskCode - Unique task identifier
   * @param overrides - Properties to override on the task
   */
  registerTask(taskCode: string, overrides: TaskRegistration): void;
}

/**
 * Register the Task Center plugin with the application
 */
declare function registerTaskCenterPlugin(): void;

export { TaskCenterPlugin, PluginDependencies, TaskHint, TaskRegistration };