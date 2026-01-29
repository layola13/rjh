function handleKeydown(event: KeyboardEvent): void {
  if (this._start(event) && this._keydown(event)) {
    event.preventDefault();
  }
}