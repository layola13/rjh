function adjustElementPosition(this: HTMLElement, cssProperties: { top: number }): void {
  const $element = $(this);
  const offsetTop = $element.css(cssProperties).offset()?.top ?? 0;
  
  if (offsetTop < 0) {
    $element.css("top", cssProperties.top - offsetTop);
  }
}