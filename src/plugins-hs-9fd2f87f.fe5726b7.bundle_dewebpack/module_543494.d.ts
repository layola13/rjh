/**
 * Base class for property bar item management.
 * Provides hooks for handling corner window field and flag changes.
 */
export default class PropertyBarController {
  /**
   * Creates an instance of PropertyBarController.
   */
  constructor();

  /**
   * Retrieves the property bar items.
   * @returns {void}
   */
  protected getPropertyBarItems_(): void;

  /**
   * Handles corner window field change events.
   * @returns {void}
   */
  protected onCornerWindowFieldChanged_(): void;

  /**
   * Handles corner window flag change events.
   * @returns {void}
   */
  protected onCornerWindowFlagChanged_(): void;
}