function handleMenuItemClick(event: MouseEvent): void {
  const targetMenuItem = findClosestMenuItem(event.target as HTMLElement);
  
  if (this.mouseHandled || targetMenuItem.hasClass('ui-state-disabled')) {
    return;
  }

  this.select(event);

  if (!event.isPropagationStopped()) {
    this.mouseHandled = true;
  }

  if (targetMenuItem.has('.ui-menu').length > 0) {
    this.expand(event);
  } else {
    handleMenuFocus.call(this, targetMenuItem);
  }
}

function findClosestMenuItem(target: HTMLElement): JQuery {
  return $(target).closest('.ui-menu-item');
}

function handleMenuFocus(this: UIMenu, menuItem: JQuery): void {
  const isElementFocused = this.element.is(':focus');
  const activeElement = this.document[0].activeElement;
  const activeElementInMenu = $(activeElement).closest('.ui-menu').length > 0;

  if (!isElementFocused && activeElementInMenu) {
    this.element.trigger('focus', [true]);

    const shouldClearTimer = 
      this.active && 
      this.active.parents('.ui-menu').length === 1;

    if (shouldClearTimer) {
      clearTimeout(this.timer);
    }
  }
}

interface UIMenu {
  mouseHandled: boolean;
  element: JQuery;
  document: Document[];
  active?: JQuery;
  timer?: number;
  select(event: MouseEvent): void;
  expand(event: MouseEvent): void;
}