/**
 * jQuery UI Menu - Mouse Enter Handler
 * Handles mouse enter events on menu items, managing focus and active states.
 * 
 * @module MouseEnterMenuItemHandler
 */

/**
 * Handler function for mouseenter events on .ui-menu-item elements.
 * When a user hovers over a menu item, this function:
 * 1. Removes active state from sibling menu items
 * 2. Sets focus to the current menu item
 * 
 * @param this - The menu widget instance context
 * @param event - The jQuery mouse enter event object
 */
declare function handleMenuItemMouseEnter(
  this: UIMenuWidget,
  event: JQuery.MouseEnterEvent
): void;

/**
 * Represents a jQuery UI Menu widget instance with focus management capabilities.
 */
interface UIMenuWidget {
  /**
   * Sets focus to the specified menu item element.
   * 
   * @param event - The triggering event
   * @param target - The jQuery-wrapped menu item element to focus
   */
  focus(event: JQuery.TriggeredEvent, target: JQuery): void;
}

/**
 * Type alias for the menu item mouseenter event handler signature.
 * Used in jQuery UI Menu widget event binding.
 */
type MenuItemMouseEnterHandler = (this: UIMenuWidget, event: JQuery.MouseEnterEvent) => void;

export { handleMenuItemMouseEnter, UIMenuWidget, MenuItemMouseEnterHandler };