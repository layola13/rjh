/**
 * Bootstrap Alert Plugin Type Definitions
 * Provides dismissible alert functionality with fade transitions
 * @module AlertPlugin
 */

/**
 * jQuery interface extension for Alert plugin
 */
interface JQuery {
  /**
   * Initialize or execute alert plugin methods
   * @param method - Method name to execute (e.g., 'close') or options object
   * @returns jQuery object for chaining
   */
  alert(method?: string): JQuery;
}

/**
 * jQuery static interface extension
 */
interface JQueryStatic {
  fn: {
    alert: AlertPlugin & {
      /**
       * Alert constructor reference
       */
      Constructor: typeof Alert;
      
      /**
       * Restore previous alert plugin definition
       * @returns The Alert plugin function
       */
      noConflict(): AlertPlugin;
    };
  };
  
  /**
   * Browser feature support detection
   */
  support: {
    /**
     * CSS transition support flag
     */
    transition: boolean;
  };
}

/**
 * Alert plugin function interface
 */
interface AlertPlugin {
  (this: JQuery, method?: string): JQuery;
}

/**
 * Alert component class for dismissible alert boxes
 */
declare class Alert {
  /**
   * Plugin version number
   */
  static readonly VERSION: '3.3.7';
  
  /**
   * Transition duration in milliseconds for fade effects
   */
  static readonly TRANSITION_DURATION: 150;
  
  /**
   * Creates an Alert instance
   * @param element - The DOM element to attach alert functionality to
   */
  constructor(element: HTMLElement);
  
  /**
   * Close the alert with optional fade transition
   * @param event - Optional click event that triggered the close
   */
  close(event?: JQuery.Event): void;
}

/**
 * Alert plugin data-api selector
 */
declare const ALERT_DISMISS_SELECTOR: '[data-dismiss="alert"]';

/**
 * Custom Bootstrap alert events
 */
interface JQuery {
  /**
   * Triggered when alert close method is called
   * @event close.bs.alert
   */
  on(event: 'close.bs.alert', handler: (event: JQuery.Event) => void): this;
  
  /**
   * Triggered after alert is closed and removed from DOM
   * @event closed.bs.alert
   */
  on(event: 'closed.bs.alert', handler: (event: JQuery.Event) => void): this;
}

/**
 * Alert plugin stored data interface
 */
interface AlertData {
  'bs.alert': Alert;
}

/**
 * Extended JQuery interface for alert data storage
 */
interface JQuery {
  /**
   * Get or set alert plugin instance data
   * @param key - Data key
   * @param value - Data value to set
   */
  data(key: 'bs.alert'): Alert | undefined;
  data(key: 'bs.alert', value: Alert): this;
}