/**
 * Carousel panel toast notification manager
 * Manages the display and persistence of toast messages for carousel panel interactions
 */

/**
 * Storage key for permanently disabling the carousel panel toast
 */
declare const STORAGE_KEY_DISABLED_FOREVER = "CAROUSEL_PANEL_TOAST_DISABLED_FOREVER";

/**
 * Storage instance for persisting carousel panel toast preferences
 */
declare const storage: HSApp.Util.Storage;

/**
 * Flag indicating if the toast is temporarily disabled for the current session
 */
declare let isDisabledOnce: boolean;

/**
 * Configuration options for the LiveHint toast display
 */
interface LiveHintOptions {
  /**
   * Whether the toast can be manually closed by the user
   */
  canclose: boolean;
  
  /**
   * Callback function invoked when the toast is closed
   */
  closeCallback: () => void;
}

/**
 * Carousel panel toast notification controller
 * Provides methods to show, hide, and manage toast notifications for carousel panel interactions
 */
export interface CarouselPanelToast {
  /**
   * Gets whether the toast is temporarily disabled for the current session
   * @returns true if disabled once, false otherwise
   */
  get disabledOnce(): boolean;
  
  /**
   * Sets whether the toast is temporarily disabled for the current session
   * @param value - true to disable once, false to enable
   */
  set disabledOnce(value: boolean);
  
  /**
   * Gets whether the toast is permanently disabled across sessions
   * @returns true if disabled forever, false otherwise
   */
  get disabledForever(): boolean;
  
  /**
   * Sets whether the toast is permanently disabled across sessions
   * Persists the setting to local storage
   * @param value - true to disable forever, false to enable
   */
  set disabledForever(value: boolean);
  
  /**
   * Displays the carousel panel toast notification
   * Shows a hint about pressing Shift to enable multiple entity selection
   * Does not show if disabledOnce or disabledForever is true
   */
  show(): void;
  
  /**
   * Hides the currently displayed toast notification
   */
  hide(): void;
  
  /**
   * Closes the toast and resets the temporary disabled state
   * Allows the toast to be shown again in the current session
   */
  close(): void;
}

/**
 * Singleton instance of the carousel panel toast controller
 */
export declare const carouselPanelToast: CarouselPanelToast;