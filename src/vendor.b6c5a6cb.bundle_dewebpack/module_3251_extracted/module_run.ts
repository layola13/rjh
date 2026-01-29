interface EasingFunction {
  (t: number, duration: number, start: number, end: number, totalDuration: number): number;
}

interface StepCallback {
  (now: number, tween: Tween): void;
}

interface TweenOptions {
  duration?: number;
  step?: StepCallback;
  easing?: string;
}

interface PropHook {
  set(tween: Tween): void;
}

interface PropHooks {
  [key: string]: PropHook | undefined;
  _default: PropHook;
}

interface EasingRegistry {
  [key: string]: EasingFunction;
}

interface AnimationRegistry {
  propHooks: PropHooks;
  easing: EasingRegistry;
}

declare const rr: AnimationRegistry;

class Tween {
  elem: HTMLElement;
  prop: string;
  options: TweenOptions;
  start: number;
  end: number;
  pos: number = 0;
  now: number = 0;
  easing: string;

  run(progress: number): this {
    let easedProgress: number;
    const propHook = rr.propHooks[this.prop];

    if (this.options.duration) {
      this.pos = easedProgress = rr.easing[this.easing](
        progress,
        this.options.duration * progress,
        0,
        1,
        this.options.duration
      );
    } else {
      this.pos = easedProgress = progress;
    }

    this.now = (this.end - this.start) * easedProgress + this.start;

    if (this.options.step) {
      this.options.step.call(this.elem, this.now, this);
    }

    if (propHook?.set) {
      propHook.set(this);
    } else {
      rr.propHooks._default.set(this);
    }

    return this;
  }
}