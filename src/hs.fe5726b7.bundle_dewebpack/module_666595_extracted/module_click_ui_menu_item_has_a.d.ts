/**
 * Module: module_click__ui_menu_item_has_a_
 * Original ID: click .ui-menu-item:has(a)
 * 
 * Handles click events on UI menu items.
 * Manages menu item selection, expansion of submenus, and focus behavior.
 */

/**
 * jQuery menu item click event handler
 * 
 * @param event - The click event object
 * @this MenuContext - The menu widget instance context
 */
declare function handleMenuItemClick(
  this: MenuContext,
  event: JQuery.ClickEvent
): void;

/**
 * Context interface for the menu widget instance
 */
interface MenuContext {
  /**
   * Flag indicating whether a mouse event has been handled to prevent duplicate processing
   */
  mouseHandled: boolean;

  /**
   * The root menu element
   */
  element: JQuery;

  /**
   * Reference to the document
   */
  document: Document[];

  /**
   * Currently active menu item
   */
  active: JQuery | null;

  /**
   * Timer for delayed operations (e.g., submenu collapse)
   */
  timer: number | undefined;

  /**
   * Selects the clicked menu item
   * @param event - The triggering event
   */
  select(event: JQuery.Event): void;

  /**
   * Expands a submenu
   * @param event - The triggering event
   */
  expand(event: JQuery.Event): void;
}