interface MouseWheelOptions {
  step: number;
}

interface MouseWheelHandler {
  spinning: boolean;
  options: MouseWheelOptions;
  mousewheelTimer: number | undefined;
  
  _start(event: Event): boolean;
  _spin(value: number, event: Event): void;
  _stop(event: Event): void;
  _delay(callback: () => void, delay: number): number;
  handleMouseWheel(event: Event, delta: number): boolean | void;
}

function handleMouseWheel(this: MouseWheelHandler, event: Event, delta: number): boolean | void {
  if (!delta) {
    return;
  }

  if (this.spinning || !this._start(event)) {
    return false;
  }

  const direction = delta > 0 ? 1 : -1;
  this._spin(direction * this.options.step, event);

  clearTimeout(this.mousewheelTimer);

  this.mousewheelTimer = this._delay(() => {
    if (this.spinning) {
      this._stop(event);
    }
  }, 100);

  event.preventDefault();
}

export { handleMouseWheel, MouseWheelHandler, MouseWheelOptions };