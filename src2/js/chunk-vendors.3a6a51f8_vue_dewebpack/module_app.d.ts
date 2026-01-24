/**
 * Application module - handles application lifecycle operations
 * @module module_app
 */

/**
 * Handles application update or removal based on condition
 * @param event - The event object or identifier
 * @param shouldRemove - If true, removes the application; otherwise triggers an update
 */
declare function handleApplicationAction(
  event: unknown,
  shouldRemove: boolean
): void;

/**
 * Application manager interface
 */
declare interface ApplicationManager {
  /**
   * Removes the application instance
   * @param force - Force removal without cleanup
   */
  removeApplication(force: boolean): void;

  /**
   * Triggers an application update cycle
   */
  callUpdate(): void;

  /**
   * Handles application action based on parameters
   * @param event - Event or data object
   * @param shouldRemove - Whether to remove or update
   */
  handleAction(event: unknown, shouldRemove: boolean): void;
}