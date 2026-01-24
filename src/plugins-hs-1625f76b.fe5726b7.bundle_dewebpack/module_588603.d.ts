/**
 * Base class for managing property bar items and content changes.
 * Provides hooks for handling content field changes, content flag changes,
 * and contextual tools plugin configuration.
 */
export default class PropertyBarManager {
  /**
   * Retrieves the property bar items.
   * Override this method in subclasses to provide specific property bar items.
   * @returns {void}
   */
  protected getPropertyBarItems_(): void;

  /**
   * Callback invoked when a content field is changed.
   * Override this method in subclasses to handle content field changes.
   * @returns {void}
   */
  protected onContentFieldChanged_(): void;

  /**
   * Callback invoked when a content flag is changed.
   * Override this method in subclasses to handle content flag changes.
   * @returns {void}
   */
  protected onContentFlagChanged_(): void;

  /**
   * Sets the contextual tools plugin instance.
   * @param plugin - The contextual tools plugin to be configured
   * @returns {void}
   */
  protected setContextualToolsPlugin_(plugin: unknown): void;
}