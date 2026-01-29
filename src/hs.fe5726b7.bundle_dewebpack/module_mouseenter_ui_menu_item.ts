interface FocusEvent {
  currentTarget: HTMLElement;
}

interface MenuItemHandler {
  focus(event: FocusEvent, element: JQuery): void;
}

function handleMouseEnter(this: MenuItemHandler, event: FocusEvent): void {
  const currentMenuItem = $(event.currentTarget);
  
  currentMenuItem
    .siblings()
    .children(".ui-state-active")
    .removeClass("ui-state-active");
  
  this.focus(event, currentMenuItem);
}