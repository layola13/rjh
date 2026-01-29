function handleFocus(event: Event, shouldSkipFocus: boolean): void {
    const activeElement = this.active || this.element.children(".ui-menu-item").eq(0);
    
    if (!shouldSkipFocus) {
        this.focus(event, activeElement);
    }
}