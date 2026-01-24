/**
 * Monitor crash and heartbeat tracking for plugin client
 * Sends periodic heartbeat signals and tracks user activity logs
 */

/**
 * Configuration for the monitor crash system
 */
interface MonitorConfig {
  /** Log service API server URL */
  LOG_SERVICE_API_SERVER: string;
}

/**
 * Global HSApp configuration
 */
declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRenderer;
    };
    HSApp: {
      Config: MonitorConfig;
    };
  }

  interface Document {
    /** Legacy Microsoft hidden property */
    msHidden?: boolean;
    /** Legacy Webkit hidden property */
    webkitHidden?: boolean;
  }
}

/**
 * IPC Renderer interface for Electron communication
 */
interface IpcRenderer {
  /**
   * Send message to main process
   * @param channel - IPC channel name
   * @param data - Message payload
   */
  send(channel: string, data: unknown): void;
}

/**
 * User tracking log entry
 */
interface UserTrackLog {
  [key: string]: unknown;
}

/**
 * User track logger interface
 */
interface UserTrackLogger {
  /**
   * Get stored logs
   * @param limit - Maximum number of logs to retrieve
   * @returns Array of user track logs
   */
  getStoreLog(limit: number): UserTrackLog[];
}

/**
 * Error information details
 */
interface ErrorInfo {
  /** Additional error information */
  info: unknown;
  /** Error location details */
  path: {
    /** Source file path */
    file: string;
    /** Function name where error occurred */
    functionName: string;
  };
}

/**
 * Error logger push options
 */
interface ErrorLoggerOptions {
  /** Error stack trace */
  errorStack: Error;
  /** Human-readable error description */
  description: string;
  /** Additional error information */
  errorInfo: ErrorInfo;
}

/**
 * Error logger interface
 */
interface ErrorLogger {
  /**
   * Push error to logging system
   * @param message - Error message
   * @param options - Error details and context
   */
  push(message: string, options: ErrorLoggerOptions): void;
}

/**
 * Application parameters
 */
interface AppParams {
  /** Unique page identifier */
  pageId: string;
}

/**
 * Application instance interface
 */
interface App {
  /** User tracking logger instance */
  userTrackLogger: UserTrackLogger;
  /** Error logger instance */
  errorLogger: ErrorLogger;
  /** Application parameters */
  appParams: AppParams;
}

/**
 * Constructor options for MonitorCrash
 */
interface MonitorCrashOptions {
  /** Application instance */
  app: App;
}

/**
 * Heartbeat message payload
 */
interface HeartbeatMessage {
  /** Message type */
  type: 'monitor';
  /** Page identifier */
  pageId: string;
  /** Log server URL */
  logServer: string;
  /** User tracking logs */
  userTrackLogs: UserTrackLog[];
}

/**
 * Page lifecycle message payload
 */
interface PageLifecycleMessage {
  /** Page identifier */
  pageId: string;
  /** Whether page is hidden (only for visibilitychange) */
  hidden?: boolean;
}

/**
 * Monitor crash and heartbeat tracking class
 * Sends periodic heartbeat signals with user tracking logs to the main process
 */
export default class MonitorCrash {
  /** User tracking logger instance */
  private readonly _userTrackLogger: UserTrackLogger;
  
  /** Unique page identifier */
  private readonly _pageId: string;
  
  /** Electron IPC renderer for communication with main process */
  private readonly _ipcRenderer: IpcRenderer;
  
  /** Application instance */
  private readonly _app: App;

  /**
   * Creates a new MonitorCrash instance
   * @param options - Configuration options
   */
  constructor(options: MonitorCrashOptions) {
    const { app } = options;
    this._app = app;
    this._userTrackLogger = app.userTrackLogger;
    this._pageId = app.appParams.pageId;
    this._ipcRenderer = window.electron.ipcRenderer;
  }

  /**
   * Start monitoring and send periodic heartbeats
   * Sets up event listeners for page lifecycle events and sends heartbeat every 5 seconds
   */
  public monitor(): void {
    const logServer = window.HSApp.Config.LOG_SERVICE_API_SERVER;
    
    /** Heartbeat interval in milliseconds */
    const HEARTBEAT_INTERVAL = 5000;
    
    /** Maximum number of logs to retrieve per heartbeat */
    const MAX_LOG_COUNT = 30;

    /**
     * Send heartbeat with user tracking logs
     */
    const sendHeartbeat = (): void => {
      try {
        const userTrackLogs = this._userTrackLogger.getStoreLog(MAX_LOG_COUNT);
        
        this._ipcRenderer.send('monitor:heartbeat', {
          type: 'monitor',
          pageId: this._pageId,
          logServer,
          userTrackLogs: JSON.parse(JSON.stringify(userTrackLogs))
        } as HeartbeatMessage);
      } catch (error) {
        this._handleHeartbeatError(error);
      }
    };

    /**
     * Handle page unload event
     */
    const handleBeforeUnload = (): void => {
      this._ipcRenderer.send('monitor:beforeunload', {
        pageId: this._pageId
      } as PageLifecycleMessage);
    };

    /**
     * Handle page visibility change event
     */
    const handleVisibilityChange = (): void => {
      this._ipcRenderer.send('monitor:visibilitychange', {
        pageId: this._pageId,
        hidden: document.hidden || document.msHidden || document.webkitHidden
      } as PageLifecycleMessage);
    };

    // Register event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start periodic heartbeat
    setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
  }

  /**
   * Handle errors that occur during heartbeat sending
   * @param error - Error that occurred
   */
  private _handleHeartbeatError(error: unknown): void {
    const errorMessage = 'plugin client api send heartbeat error';
    
    this._app.errorLogger.push(errorMessage, {
      errorStack: new Error(errorMessage),
      description: errorMessage,
      errorInfo: {
        info: error,
        path: {
          file: 'homestyler-tools-web/web/plugin/client/monitorCrash.ts',
          functionName: 'monitor()'
        }
      }
    });
  }
}