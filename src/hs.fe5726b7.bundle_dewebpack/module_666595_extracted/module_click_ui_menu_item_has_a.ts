function handleMenuItemClick(event: MouseEvent): void {
  const targetElement = event.target as HTMLElement;
  const menuItem = targetElement.closest(".ui-menu-item") as HTMLElement | null;

  if (!menuItem) {
    return;
  }

  const isDisabled = menuItem.classList.contains("ui-state-disabled");
  const hasAlreadyHandledMouse = (this as any).mouseHandled;

  if (hasAlreadyHandledMouse || isDisabled) {
    return;
  }

  (this as any).select(event);

  if (!event.isPropagationStopped()) {
    (this as any).mouseHandled = true;
  }

  const hasSubmenu = menuItem.querySelector(".ui-menu") !== null;

  if (hasSubmenu) {
    (this as any).expand(event);
  } else {
    const element = (this as any).element as HTMLElement;
    const isFocused = element.matches(":focus");
    
    if (!isFocused) {
      const document = (this as any).document[0] as Document;
      const activeElement = document.activeElement as HTMLElement;
      const isActiveInMenu = activeElement.closest(".ui-menu") !== null;

      if (isActiveInMenu) {
        element.dispatchEvent(new CustomEvent("focus", { detail: [true] }));

        const active = (this as any).active as HTMLElement | null;
        if (active) {
          const parentMenus = Array.from(active.querySelectorAll(".ui-menu"));
          if (parentMenus.length === 1) {
            const timer = (this as any).timer as number;
            clearTimeout(timer);
          }
        }
      }
    }
  }
}