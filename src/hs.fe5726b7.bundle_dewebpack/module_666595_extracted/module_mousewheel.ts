interface MousewheelOptions {
  step: number;
}

interface MousewheelComponent {
  spinning: boolean;
  options: MousewheelOptions;
  mousewheelTimer: number | undefined;
  _start(event: Event): boolean;
  _spin(delta: number, event: Event): void;
  _stop(event: Event): void;
  _delay(callback: () => void, delay: number): number;
  handleMousewheel(event: Event, delta: number): boolean | void;
}

class Mousewheel implements MousewheelComponent {
  spinning = false;
  options: MousewheelOptions = { step: 1 };
  mousewheelTimer: number | undefined;

  _start(event: Event): boolean {
    throw new Error('Method _start must be implemented');
  }

  _spin(delta: number, event: Event): void {
    throw new Error('Method _spin must be implemented');
  }

  _stop(event: Event): void {
    throw new Error('Method _stop must be implemented');
  }

  _delay(callback: () => void, delay: number): number {
    return window.setTimeout(callback, delay);
  }

  handleMousewheel(event: Event, delta: number): boolean | void {
    if (!delta) {
      return;
    }

    if (!this.spinning && !this._start(event)) {
      return false;
    }

    const spinDelta = (delta > 0 ? 1 : -1) * this.options.step;
    this._spin(spinDelta, event);

    clearTimeout(this.mousewheelTimer);
    this.mousewheelTimer = this._delay(() => {
      if (this.spinning) {
        this._stop(event);
      }
    }, 100);

    event.preventDefault();
  }
}

export { Mousewheel, MousewheelComponent, MousewheelOptions };