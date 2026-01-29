interface EasingFunction {
  (progress: number, duration: number, start: number, end: number, totalDuration: number): number;
}

interface EasingRegistry {
  [key: string]: EasingFunction;
}

interface StepCallback {
  (currentValue: number, animation: Tween): void;
}

interface TweenOptions {
  duration?: number;
  step?: StepCallback;
  easing: string;
}

interface PropHook {
  set: (tween: Tween) => void;
}

interface PropHooksRegistry {
  [key: string]: PropHook;
  _default: PropHook;
}

interface AnimationRegistry {
  propHooks: PropHooksRegistry;
  easing: EasingRegistry;
}

declare const b: AnimationRegistry;
declare const rr: AnimationRegistry;

class Tween {
  prop: string;
  options: TweenOptions;
  pos: number;
  now: number;
  start: number;
  end: number;
  elem: HTMLElement;
  easing: string;

  run(progress: number): this {
    let easedProgress: number;
    const propHook = rr.propHooks[this.prop];

    if (this.options.duration) {
      this.pos = easedProgress = b.easing[this.easing](
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