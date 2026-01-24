/**
 * Click handler module for version selection
 * @module module_onClick
 */

/**
 * Version identifier type
 */
type VersionId = string | number;

/**
 * Context object containing version information
 */
interface VersionContext {
  /** Unique identifier for the version */
  versionId: VersionId;
  [key: string]: unknown;
}

/**
 * Event handler interface with click handling capability
 */
interface ClickEventHandler {
  /**
   * Handles click events for version selection
   * @param versionId - The ID of the version to handle
   * @returns Result of the click handling operation
   */
  handleClick(versionId: VersionId): void | Promise<void> | boolean | Promise<boolean>;
}

/**
 * Creates a click handler function for version selection
 * @param e - Event handler instance
 * @param t - Version context object
 * @returns Click handler function
 */
declare function onClick(e: ClickEventHandler, t: VersionContext): () => ReturnType<ClickEventHandler['handleClick']>;

export { onClick, VersionId, VersionContext, ClickEventHandler };