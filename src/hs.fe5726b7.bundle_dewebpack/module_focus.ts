function handleMenuFocus(
  event: Event | undefined,
  shouldSkipFocus: boolean
): void {
  const defaultItem = this.element.children(".ui-menu-item").eq(0);
  const activeItem = this.active ?? defaultItem;
  
  if (!shouldSkipFocus) {
    this.focus(event, activeItem);
  }
}