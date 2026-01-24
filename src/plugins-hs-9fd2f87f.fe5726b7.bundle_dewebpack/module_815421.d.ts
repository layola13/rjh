/**
 * Top bar edit tip management module for customized modeling plugin.
 * Handles creation, display, and dismissal of edit tips in the toolbar.
 */

/**
 * Cookie key for storing the edit tip dismissal state.
 */
declare const EDIT_TIP_COOKIE_KEY = "plugin_customizedModeling_top_bar_edit_cookie";

/**
 * Manages the top bar edit tip functionality.
 * This class provides static methods to create, check, and destroy edit tips
 * that appear in the customized modeling toolbar.
 */
declare class TopBarEditTipManager {
  /**
   * Creates and displays the edit tip in the toolbar.
   * Only creates the tip if it hasn't been dismissed before (checked via cookie).
   * The tip is appended to the toolbar item with data-toolbar-path="plugin_customized_toolBar_edit".
   * 
   * @returns void
   */
  static create(): void;

  /**
   * Checks if the edit tip has been dismissed by the user.
   * 
   * @returns The cookie value if it exists, undefined otherwise
   */
  static getCookie(): string | undefined;

  /**
   * Marks the edit tip as dismissed by setting a cookie.
   * 
   * @returns void
   */
  static setCookie(): void;

  /**
   * Removes the edit tip from the DOM and marks it as dismissed.
   * Unmounts any React component attached to the tip element,
   * removes the element from the DOM, and sets the dismissal cookie.
   * 
   * @returns void
   */
  static destroy(): void;
}

export default TopBarEditTipManager;