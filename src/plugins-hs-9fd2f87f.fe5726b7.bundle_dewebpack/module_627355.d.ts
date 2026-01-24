/**
 * Status bar item manager interface
 * Handles status bar items and corner window events
 */
interface IStatusBarManager {
  /**
   * Retrieves the current status bar items
   * @returns Collection of status bar items
   */
  getStatusBarItems_(): void;

  /**
   * Handles changes to corner window field properties
   * @param field - The field that was changed
   * @param value - The new value of the field
   */
  onCornerWindowFieldChanged_(field?: string, value?: unknown): void;

  /**
   * Handles changes to corner window flag states
   * @param flag - The flag identifier that was changed
   * @param enabled - Whether the flag is enabled
   */
  onCornerWindowFlagChanged_(flag?: string, enabled?: boolean): void;
}

/**
 * Default status bar manager implementation
 * Provides base functionality for managing status bar items and corner window state
 */
declare class StatusBarManager implements IStatusBarManager {
  constructor();

  /**
   * Retrieves the current status bar items
   * @returns Collection of status bar items
   */
  getStatusBarItems_(): void;

  /**
   * Handles changes to corner window field properties
   * @param field - The field that was changed
   * @param value - The new value of the field
   */
  onCornerWindowFieldChanged_(field?: string, value?: unknown): void;

  /**
   * Handles changes to corner window flag states
   * @param flag - The flag identifier that was changed
   * @param enabled - Whether the flag is enabled
   */
  onCornerWindowFlagChanged_(flag?: string, enabled?: boolean): void;
}

export default StatusBarManager;