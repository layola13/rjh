/**
 * Animation tween step function
 * Calculates and applies intermediate values during animation
 * @module module_run
 * @originalId run
 */

/**
 * Options for animation tweening
 */
interface TweenOptions {
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Easing function name (e.g., 'linear', 'swing', 'easeInOut') */
  easing?: string;
  /** Callback function executed at each animation step */
  step?: (now: number, tween: Tween) => void;
}

/**
 * Property-specific hook for custom animation handling
 */
interface PropHook {
  /** Sets the animated property value on the element */
  set: (tween: Tween) => void;
}

/**
 * Collection of property hooks indexed by property name
 */
interface PropHooks {
  [propertyName: string]: PropHook | undefined;
  /** Default hook used when no specific hook is defined */
  _default: PropHook;
}

/**
 * Easing functions collection
 */
interface EasingFunctions {
  [easingName: string]: (
    progress: number,
    elapsedTime: number,
    startValue: number,
    changeInValue: number,
    duration: number
  ) => number;
}

/**
 * Global animation registry
 */
interface AnimationRegistry {
  /** Property-specific animation hooks */
  propHooks: PropHooks;
}

/**
 * Represents a single property animation (tween)
 */
interface Tween {
  /** The DOM element being animated */
  elem: HTMLElement;
  /** The CSS property being animated */
  prop: string;
  /** Starting value of the animation */
  start: number;
  /** Ending value of the animation */
  end: number;
  /** Current calculated value */
  now: number;
  /** Current progress position (0-1) */
  pos: number;
  /** Animation options */
  options: TweenOptions;
  /** Easing function name */
  easing: string;
  
  /**
   * Executes one step of the animation
   * @param t - Progress ratio (0 to 1)
   * @returns The tween instance for chaining
   */
  run(t: number): this;
}

declare const rr: AnimationRegistry;
declare namespace b {
  export const easing: EasingFunctions;
}

/**
 * Executes one step of the animation tween
 * Updates the current position and value based on progress and easing
 * 
 * @param this - The tween instance
 * @param t - Animation progress (0 = start, 1 = complete)
 * @returns The tween instance for method chaining
 */
declare function run(this: Tween, t: number): Tween;