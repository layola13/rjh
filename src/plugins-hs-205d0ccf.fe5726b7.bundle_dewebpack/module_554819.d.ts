/**
 * Sign in/Register Plugin Module
 * Handles user authentication, session management, and sign-in UI
 */

declare namespace HSW.Plugin.SignIn {
  /**
   * Plugin configuration interface
   */
  interface PluginConfig {
    /** Plugin name */
    name: string;
    /** Plugin description */
    description: string;
    /** List of plugin dependencies */
    dependencies: string[];
  }

  /**
   * User session data stored in localStorage
   */
  interface UserSessionData {
    [key: string]: unknown;
  }

  /**
   * Window open options
   */
  interface WindowOpenOptions {
    /** Form/window name to display */
    name: string;
    /** Whether to preserve existing parameters */
    isNotResetParams?: boolean;
    /** Partner-specific configuration (if applicable) */
    partner?: string;
  }

  /**
   * Message event data structure for cross-frame communication
   */
  interface MessageEventData {
    /** Event type identifier */
    eType: 'logInSuccess' | 'logOutSuccess' | string;
    /** Event payload data */
    eData: {
      /** Authentication token */
      token?: string;
      [key: string]: unknown;
    };
  }

  /**
   * Signal collection for plugin events
   */
  interface SignalCollection {
    /** Fired when sign-in dialog is shown */
    signalSigninShown: HSCore.Util.Signal;
    /** Fired when submit button is clicked */
    signalSubmitClicked: HSCore.Util.Signal;
    /** Fired when sign-in succeeds */
    signalSigninSucceeded: HSCore.Util.Signal;
    /** Fired when sign-out succeeds */
    signalSignoutSucceeded: HSCore.Util.Signal;
    /** Fired when sign-out is clicked */
    signalSignoutClicked: HSCore.Util.Signal;
  }

  /**
   * Available form types in the sign-in UI
   */
  interface FormTypes {
    /** Standard sign-in form */
    signin: string;
    /** Taobao-specific sign-in form */
    singintaobaoform: string;
    /** User registration form */
    signup: string;
    /** Forgot password form */
    forgotpw: string;
  }

  /**
   * Main plugin class for sign-in/registration functionality
   */
  class Plugin extends HSApp.Plugin.IPlugin {
    /** LocalStorage wrapper for user session data */
    localStorage: HSApp.Util.Storage;
    /** Event signals for plugin lifecycle and user actions */
    signals: SignalCollection;

    constructor();

    /**
     * Called when plugin is activated
     * @param options - Activation options containing app instance
     */
    onActive(options: { app: HSApp.App }): void;

    /**
     * Called when plugin is deactivated
     */
    onDeactive(): void;

    /**
     * Clear all stored user session data
     */
    clearStorage(): void;

    /**
     * Retrieve stored user session data
     * @returns User session data or null if none exists
     */
    getStorage(): UserSessionData | null;

    /**
     * Add or update a key-value pair in user session storage
     * @param key - Storage key
     * @param value - Value to store
     */
    appendStorage(key: string, value: unknown): void;

    /**
     * Open the sign-in/registration modal window
     * @param name - Form name to display
     */
    openwindow(name: string): void;

    /**
     * Close the sign-in/registration modal window
     */
    closewindow(): void;

    /**
     * Get the current user session asynchronously
     * @returns Promise resolving to the authenticated user object
     */
    getUserSession(): Promise<typeof adskUser>;
  }

  /**
   * UI handler for sign-in modal and forms
   */
  namespace UI {
    /** Available form identifiers */
    const myforms: FormTypes;
    /** jQuery element reference to the modal container */
    let targetElement: JQuery | undefined;
    /** Signal collection reference */
    let Signals: SignalCollection;
    /** Application instance reference */
    let app: HSApp.App;

    /**
     * Initialize the UI handler
     * @param app - Application instance
     * @param signals - Signal collection for events
     * @param sessionPromise - Promise resolver for session initialization
     */
    function init(
      app: HSApp.App,
      signals: SignalCollection,
      sessionPromise: { _resolve: () => void; _reject: (reason?: unknown) => void }
    ): void;

    /**
     * Open the sign-in modal window
     * @param name - Form name to display
     * @param isNotResetParams - Whether to preserve existing URL parameters
     */
    function openwindow(name: string, isNotResetParams?: boolean): void;

    /**
     * Close the sign-in modal window
     * @returns Always returns false to prevent default behavior
     */
    function closewindow(): false;
  }

  /**
   * Event handler for authentication operations
   */
  namespace Handler {
    /** Promise that resolves when user session is ready */
    let _sessionPromise: Promise<typeof adskUser>;

    /**
     * Initialize the authentication handler
     * @param app - Application instance
     * @param signals - Signal collection for events
     */
    function init(app: HSApp.App, signals: SignalCollection): void;

    /**
     * Execute sign-out request based on tenant configuration
     * @returns Promise that resolves when sign-out completes
     */
    function signoutrequest(): Promise<unknown>;
  }
}

declare module 'hsw.plugin.signin' {
  export = HSW.Plugin.SignIn;
}

/**
 * Global plugin registration
 */
declare namespace HSApp.Plugin {
  /**
   * Register the sign-in plugin instance
   */
  function registerPlugin(
    id: 'hsw.plugin.signin.Plugin',
    plugin: typeof HSW.Plugin.SignIn.Plugin
  ): void;
}