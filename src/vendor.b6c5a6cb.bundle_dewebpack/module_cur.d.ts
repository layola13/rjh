/**
 * Animation property hooks registry for handling custom property animations.
 * Provides getter/setter methods for animating CSS and DOM properties.
 */
interface PropHooks {
  /**
   * Default property hook with standard get/set behavior
   */
  _default: PropertyHook;
  
  /**
   * Custom property hooks indexed by property name
   */
  [propName: string]: PropertyHook;
}

/**
 * Individual property hook for custom animation behavior
 */
interface PropertyHook {
  /**
   * Gets the current value of the animated property
   * @param tween - The tween object containing animation state
   * @returns The current property value
   */
  get?(tween: Tween): any;
  
  /**
   * Sets the value of the animated property
   * @param tween - The tween object containing animation state
   */
  set?(tween: Tween): void;
}

/**
 * Tween object representing a single property animation
 */
interface Tween {
  /**
   * The name of the property being animated
   */
  prop: string;
  
  /**
   * The DOM element being animated
   */
  elem: HTMLElement;
  
  /**
   * Current animation progress (0-1)
   */
  pos: number;
  
  /**
   * Starting value of the animation
   */
  start: number;
  
  /**
   * Ending value of the animation
   */
  end: number;
  
  /**
   * Current value of the animation
   */
  now: number;
  
  /**
   * Unit for the property value (e.g., 'px', '%', 'em')
   */
  unit: string;
  
  /**
   * Animation options
   */
  options: AnimationOptions;
}

/**
 * Animation options configuration
 */
interface AnimationOptions {
  /**
   * Animation duration in milliseconds
   */
  duration?: number;
  
  /**
   * Easing function name
   */
  easing?: string;
  
  /**
   * Callback when animation completes
   */
  complete?: () => void;
  
  /**
   * Callback on each animation step
   */
  step?: (now: number, tween: Tween) => void;
}

/**
 * Animation registry containing property hooks
 */
declare const rr: {
  propHooks: PropHooks;
};

/**
 * Retrieves the current value of the animated property.
 * Uses custom property hook if available, otherwise falls back to default behavior.
 * 
 * @this {Tween} The tween object context
 * @returns {any} The current value of the animated property
 */
declare function getCurrentPropertyValue(this: Tween): any;