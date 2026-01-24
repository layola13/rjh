/**
 * Animation step function that calculates and applies the current animation value.
 * This function is typically called on each animation frame to update the animated property.
 * 
 * @param progress - The animation progress value between 0 and 1, where 0 is the start and 1 is the end
 * @returns The current animation tween instance for method chaining
 */
declare function animationStep(this: AnimationTween, progress: number): AnimationTween;

/**
 * Represents a single animated property tween with easing and step callbacks.
 */
interface AnimationTween {
  /** The DOM element being animated */
  elem: Element;
  
  /** The name of the CSS property or attribute being animated */
  prop: string;
  
  /** The starting value of the animation */
  start: number;
  
  /** The ending value of the animation */
  end: number;
  
  /** The current calculated value of the animation */
  now: number;
  
  /** The current easing position (0 to 1) */
  pos: number;
  
  /** Animation configuration options */
  options: AnimationOptions;
}

/**
 * Configuration options for an animation tween.
 */
interface AnimationOptions {
  /** Duration of the animation in milliseconds */
  duration?: number;
  
  /** Name of the easing function to use (e.g., 'linear', 'swing', 'easeInOut') */
  easing: string;
  
  /** Callback function executed on each animation step */
  step?: (this: Element, currentValue: number, tween: AnimationTween) => void;
}

/**
 * Collection of property-specific hooks for custom animation handling.
 */
interface AnimationPropHooks {
  /** Default property hook used when no specific hook exists */
  _default: PropHook;
  
  /** Property-specific hooks indexed by property name */
  [propName: string]: PropHook | undefined;
}

/**
 * Hook interface for customizing how a specific property is animated.
 */
interface PropHook {
  /**
   * Applies the current animation value to the element.
   * @param tween - The animation tween containing the current state
   */
  set(tween: AnimationTween): void;
  
  /**
   * Optional getter for reading the current property value.
   * @param tween - The animation tween
   */
  get?(tween: AnimationTween): number | undefined;
}

/**
 * Easing functions collection for animation curves.
 */
interface EasingFunctions {
  /**
   * Calculates the eased position value.
   * @param progress - Current progress (0 to 1)
   * @param duration - Total animation duration in milliseconds
   * @param startValue - Starting value (typically 0)
   * @param changeAmount - Amount of change (typically 1)
   * @param totalDuration - Total duration (same as duration parameter)
   * @returns The eased position value
   */
  [easingName: string]: (
    progress: number,
    duration: number,
    startValue: number,
    changeAmount: number,
    totalDuration: number
  ) => number;
}

/**
 * Global animation registry containing easing functions and property hooks.
 */
declare namespace rr {
  /** Collection of property-specific animation hooks */
  export const propHooks: AnimationPropHooks;
}

/**
 * jQuery-like namespace containing animation utilities.
 */
declare namespace b {
  /** Collection of easing functions for animations */
  export const easing: EasingFunctions;
}