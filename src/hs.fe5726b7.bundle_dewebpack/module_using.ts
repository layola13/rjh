function adjustPosition(cssProperties: { top: number }): void {
  const element = this as HTMLElement;
  const offset = element.getBoundingClientRect().top + window.pageYOffset;
  
  if (offset < 0) {
    element.style.top = `${cssProperties.top - offset}px`;
  }
}