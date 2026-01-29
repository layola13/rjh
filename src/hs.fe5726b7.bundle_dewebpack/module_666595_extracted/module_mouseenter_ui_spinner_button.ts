function handleMouseEnter(event: MouseEvent): void | false {
  const currentTarget = event.currentTarget as HTMLElement;
  
  if (currentTarget.classList.contains('ui-state-active')) {
    return false;
  }
  
  const isSpinnerUp = currentTarget.classList.contains('ui-spinner-up');
  const direction = isSpinnerUp ? 1 : -1;
  
  if (this._start(event) !== false) {
    this._repeat(null, direction, event);
  }
}