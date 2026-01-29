interface SpinnerMouseDownContext {
  element: JQuery;
  document: JQuery;
  previous: string | undefined;
  cancelBlur?: boolean;
  _delay(callback: () => void): void;
  _start(event: MouseEvent): boolean;
  _repeat(value: null, direction: number, event: MouseEvent): void;
}

function handleSpinnerButtonMouseDown(
  this: SpinnerMouseDownContext,
  event: MouseEvent
): void {
  let previousValue: string | undefined;

  function focusElement(this: SpinnerMouseDownContext): void {
    if (this.element[0] === this.document[0].activeElement) {
      return;
    }

    this.element.focus();
    this.previous = previousValue;
    this._delay(() => {
      this.previous = previousValue;
    });
  }

  previousValue =
    this.element[0] === this.document[0].activeElement
      ? this.previous
      : this.element.val() as string;

  event.preventDefault();
  focusElement.call(this);

  this.cancelBlur = true;
  this._delay(() => {
    delete this.cancelBlur;
    focusElement.call(this);
  });

  if (this._start(event) === false) {
    return;
  }

  const isUpButton = (event.currentTarget as HTMLElement).classList.contains(
    "ui-spinner-up"
  );
  const direction = isUpButton ? 1 : -1;

  this._repeat(null, direction, event);
}