interface SpinnerButtonEvent {
  currentTarget: HTMLElement;
}

interface SpinnerContext {
  _start(event: SpinnerButtonEvent): boolean;
  _repeat(
    value: null,
    direction: 1 | -1,
    event: SpinnerButtonEvent
  ): void;
}

function handleMouseEnterSpinnerButton(
  this: SpinnerContext,
  event: SpinnerButtonEvent
): boolean | void {
  const currentTarget = event.currentTarget;
  
  if (currentTarget.classList.contains("ui-state-active")) {
    return false;
  }

  const startResult = this._start(event);
  if (startResult === true) {
    const direction = currentTarget.classList.contains("ui-spinner-up") ? 1 : -1;
    this._repeat(null, direction, event);
  }
}