/**
 * Application module providing core application lifecycle management
 * @module module_app
 */

/**
 * Application manager interface
 */
interface ApplicationManager {
  /**
   * Handles application state changes
   * @param event - Event data or identifier
   * @param shouldRemove - If true, removes the application; otherwise updates it
   */
  handleStateChange(event: unknown, shouldRemove: boolean): void;

  /**
   * Removes the application from the system
   * @param force - Force removal flag
   */
  removeApplication(force: boolean): void;

  /**
   * Triggers an application update
   */
  callUpdate(): void;
}