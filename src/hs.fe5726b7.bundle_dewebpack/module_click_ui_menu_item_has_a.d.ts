/**
 * Handles click events on UI menu items.
 * 
 * This handler manages menu item selection, expansion of submenus,
 * and focus management within the menu hierarchy.
 * 
 * @param event - The mouse click event
 */
(event: MouseEvent): void => {
  const closestMenuItem = $(event.target).closest(".ui-menu-item");
  
  if (
    !this.mouseHandled &&
    closestMenuItem.not(".ui-state-disabled").length
  ) {
    // Select the clicked menu item
    this.select(event);
    
    // Set mouse handled flag if propagation is stopped
    if (event.isPropagationStopped()) {
      this.mouseHandled = true;
    }
    
    // Expand submenu if menu item contains one
    if (closestMenuItem.has(".ui-menu").length) {
      this.expand(event);
    } 
    // Handle focus management when clicking outside focused menu
    else if (
      !this.element.is(":focus") &&
      $(this.document[0].activeElement).closest(".ui-menu").length
    ) {
      this.element.trigger("focus", [true]);
      
      // Clear timer if active item is in top-level menu
      if (
        this.active &&
        this.active.parents(".ui-menu").length === 1
      ) {
        clearTimeout(this.timer);
      }
    }
  }
};

/**
 * Type definitions for the menu context
 */
interface MenuContext {
  /** Flag indicating if mouse event has been handled */
  mouseHandled: boolean;
  
  /** The root menu element */
  element: JQuery;
  
  /** The document reference */
  document: Document[];
  
  /** The currently active menu item */
  active?: JQuery;
  
  /** Timer handle for delayed operations */
  timer?: number;
  
  /**
   * Selects a menu item
   * @param event - The triggering event
   */
  select(event: Event): void;
  
  /**
   * Expands a submenu
   * @param event - The triggering event
   */
  expand(event: Event): void;
}