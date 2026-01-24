/**
 * Focuses on a menu item, either the currently active one or the first child item
 * @param event - The event object that triggered the focus action
 * @param shouldFocus - Optional flag to determine if focus should be applied (default: true when falsy)
 */
function focusMenuItem(
  this: {
    active?: JQuery;
    element: JQuery;
    focus: (event: Event, target: JQuery) => void;
  },
  event: Event,
  shouldFocus?: boolean
): void {
  // Get the currently active menu item, or default to the first child menu item
  const targetItem: JQuery = 
    this.active ?? this.element.children(".ui-menu-item").eq(0);
  
  // Apply focus unless explicitly told not to
  if (!shouldFocus) {
    this.focus(event, targetItem);
  }
}