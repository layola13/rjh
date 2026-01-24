/**
 * Bootloader Module - Application initialization and resource loading system
 * Handles configuration loading, plugin management, and application startup
 */

declare module 'bootloader' {
  import { HSApp } from '@homestyler/app';
  import { ABManager } from '@homestyler/ab-manager';
  import { ResourceManager } from '@homestyler/resource-manager';

  /**
   * Loading task definition
   */
  interface TaskDefinition {
    /** Resource URL to load */
    url: string;
    /** Resource type: 'css' | 'json' | 'html' | 'config' */
    type: 'css' | 'json' | 'html' | 'config';
  }

  /**
   * Task handler interface
   */
  interface LoadingTask {
    /**
     * Get task definition
     * @param app - Application instance
     * @returns Task definition or Promise resolving to definition
     */
    getTaskDefinition(app?: HSApp.App): TaskDefinition | Promise<TaskDefinition | void>;
    
    /**
     * Called when task completes successfully
     * @param data - Loaded data
     * @returns Processing result or Promise
     */
    onTaskCompleted?(data: unknown): unknown | Promise<unknown>;
    
    /**
     * Called when task fails
     * @param error - Error object
     * @returns Recovery result or Promise
     */
    onTaskFailed?(error: Error): unknown | Promise<unknown>;
  }

  /**
   * Task loader manager
   */
  interface TaskLoader {
    /** Promise tracking all completed tasks */
    completed: Promise<unknown>;
    
    /**
     * Initialize loader with app instance
     * @param app - Application instance
     * @returns Loader instance for chaining
     */
    init(app: HSApp.App): this;
    
    /**
     * Cleanup and reset loader state
     */
    uninit(): void;
    
    /**
     * Register a named loading task
     * @param taskId - Unique task identifier
     * @param task - Task handler
     */
    registerTask(taskId: string, task: LoadingTask): void;
    
    /**
     * Execute registered tasks by ID
     * @param taskIds - Task identifiers to load
     * @returns Loader instance for chaining
     */
    loadTask(...taskIds: string[]): this;
    
    /**
     * Load a file resource
     * @param url - Resource URL
     * @param type - Resource type
     * @returns Promise resolving to loaded content
     */
    loadFile(url: string, type: string): Promise<unknown>;
  }

  /**
   * Page loading UI manager
   */
  class PageLoading {
    /** Start loading animation */
    startLoading(): void;
    
    /** Stop loading animation and hide UI */
    stopLoading(): void;
  }

  /**
   * Global preloader namespace
   */
  interface PreLoader {
    /** Cached XML resource content */
    xmlResource: string;
  }

  /**
   * Get XML resource synchronously
   * @param url - Resource URL
   * @param callback - Success callback receiving jQuery wrapped XML
   * @param selector - CSS selector for DEBUG mode
   */
  function getXMLResource(
    url: string,
    callback: (xml: JQuery) => void,
    selector: string
  ): void;

  /**
   * Get XML resource asynchronously
   * @param url - Resource URL
   * @param selector - CSS selector for DEBUG mode
   * @returns Promise resolving to jQuery wrapped XML
   */
  function getXMLResourceAsync(url: string, selector: string): Promise<JQuery>;

  /**
   * MTOP API configuration
   */
  interface MtopConfig {
    /** API prefix */
    prefix: string;
    /** Subdomain */
    subDomain: string;
    /** Main domain */
    mainDomain: string;
    /** Page domain */
    pageDomain: string;
    /** Use HTTPS */
    secure: boolean;
    /** SameSite cookie attribute */
    sameSite: 'None' | 'Lax' | 'Strict';
    /** Sync cookie mode */
    syncCookieMode: boolean;
  }

  /**
   * MTOP request options
   */
  interface MtopRequestOptions {
    /** Request data */
    data?: Record<string, unknown>;
    /** Additional options */
    options?: Record<string, unknown>;
    /** Enable ARMS monitoring */
    needArms?: boolean;
    /** Require login */
    needLogin?: boolean;
  }

  /**
   * MTOP response
   */
  interface MtopResponse<T = unknown> {
    /** API endpoint */
    api: string;
    /** Response data */
    data: T | null;
    /** Return status array */
    ret: string[];
    /** Mock API flag */
    mockApi?: boolean;
    /** Trace IDs for debugging */
    traceIds?: {
      /** Backend trace ID */
      BETraceId: string;
      /** Frontend trace ID */
      FDTraceId: string;
    };
    /** Response headers */
    responseHeaders?: string;
  }

  /**
   * MTOP API method
   */
  type MtopMethod = (options?: MtopRequestOptions) => Promise<MtopResponse>;

  /**
   * MTOP API namespace
   */
  interface MtopAPI {
    [category: string]: {
      [method: string]: MtopMethod;
    };
  }

  /**
   * Error status enumeration
   */
  enum ErrorStatusEnum {
    NETWORK_ERR_FAILED = 'NETWORK_ERR_FAILED',
    FAIL_SYS_SESSION_EXPIRED = 'FAIL_SYS_SESSION_EXPIRED',
    FAIL_BIZ_SESSION_NOT_MATCH_ENV = 'FAIL_BIZ_SESSION_NOT_MATCH_ENV'
  }

  /**
   * NWTK global namespace extension
   */
  interface NWTK {
    /** MTOP API methods */
    mtop: MtopAPI & {
      /** Error status enum */
      ErrorStatusEnum: typeof ErrorStatusEnum;
      /**
       * Register error handler
       * @param handler - Error callback
       */
      registerErrorHandler(handler: (error: MtopResponse) => void): void;
    };
    
    /**
     * Combine MTOP APIs
     * @param category - API category
     * @param defaultApis - Default API definitions
     * @param ezhomeApis - EZHome specific APIs
     * @param fpApis - FP specific APIs
     */
    combineMtop(
      category: string,
      defaultApis: Record<string, unknown>,
      ezhomeApis?: Record<string, unknown>,
      fpApis?: Record<string, unknown>
    ): void;
    
    /**
     * Configure NWTK
     * @param config - Configuration object
     */
    configure(config: Record<string, unknown>): void;
    
    /** AJAX utilities */
    ajax: {
      get<T = unknown>(url: string, options?: { dataType?: string }): Promise<T>;
    };
    
    /** Image utilities */
    image: {
      setOptions(options: { enableWebP: boolean; qualityLevel: string }): void;
    };
  }

  // Global augmentations
  global {
    interface Window {
      /** Debug mode flag */
      DEBUG: boolean;
      /** Preloader instance */
      preLoader: PreLoader;
      /** Get XML resource synchronously */
      getXMLResource: typeof getXMLResource;
      /** Get XML resource asynchronously */
      getXMLResourceAsync: typeof getXMLResourceAsync;
      /** Preview percentage */
      _previewPercentage: number;
      /** T3D model switch */
      t3dModelSwitch: string;
      /** Custom plugin configuration */
      customizedPluginCfg?: unknown;
      /** App version configuration */
      AppVersionConfig: {
        configVersion: {
          pluginsConfig: string;
        };
      };
      /** Trace log */
      traceLog: unknown;
      /** NWTK namespace */
      NWTK: NWTK;
      /** Enable frame task */
      enableFrameTask(): void;
    }

    /** jQuery utilities */
    interface JQueryStatic {
      /**
       * Get URL parameter
       * @param name - Parameter name
       * @returns Parameter value or null
       */
      getURLParameter(name: string): string | null;
    }
  }

  export {
    TaskDefinition,
    LoadingTask,
    TaskLoader,
    PageLoading,
    PreLoader,
    MtopConfig,
    MtopRequestOptions,
    MtopResponse,
    MtopMethod,
    MtopAPI,
    ErrorStatusEnum,
    NWTK
  };
}