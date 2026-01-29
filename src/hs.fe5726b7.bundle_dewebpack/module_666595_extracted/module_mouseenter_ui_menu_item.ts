interface FocusEvent {
  currentTarget: HTMLElement;
}

interface MenuItem {
  siblings: () => MenuItem;
  children: (selector: string) => MenuItem;
  removeClass: (className: string) => void;
}

interface MenuContext {
  focus: (event: FocusEvent, item: MenuItem) => void;
}

function handleMouseEnterMenuItem(this: MenuContext, event: FocusEvent): void {
  const currentItem: MenuItem = e(event.currentTarget);
  currentItem
    .siblings()
    .children(".ui-state-active")
    .removeClass("ui-state-active");
  
  this.focus(event, currentItem);
}