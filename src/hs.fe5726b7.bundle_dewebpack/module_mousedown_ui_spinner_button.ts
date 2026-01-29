interface SpinnerMouseDownContext {
  element: JQuery;
  document: JQuery;
  previous?: string;
  cancelBlur?: boolean;
  _delay(callback: () => void): void;
  _start(event: MouseEvent): boolean;
  _repeat(value: null, direction: number, event: MouseEvent): void;
}

function handleSpinnerMouseDown(
  this: SpinnerMouseDownContext,
  event: MouseEvent
): void {
  const previousValue =
    this.element[0] === this.document[0].activeElement
      ? this.previous
      : this.element.val() as string;

  event.preventDefault();

  focusElement.call(this, previousValue);

  this.cancelBlur = true;

  this._delay(() => {
    delete this.cancelBlur;
    focusElement.call(this, previousValue);
  });

  if (this._start(event) !== false) {
    const target = event.currentTarget as HTMLElement;
    const isUpButton = target.classList.contains('ui-spinner-up');
    const direction = isUpButton ? 1 : -1;
    this._repeat(null, direction, event);
  }
}

function focusElement(this: SpinnerMouseDownContext, storedValue?: string): void {
  if (this.element[0] !== this.document[0].activeElement) {
    this.element.focus();
    this.previous = storedValue;
    this._delay(() => {
      this.previous = storedValue;
    });
  }
}