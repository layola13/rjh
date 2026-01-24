/**
 * Tween animation controller for DOM element property animations.
 * Manages the state and configuration of a single property animation.
 */
interface Tween {
  /**
   * The DOM element being animated
   */
  elem: HTMLElement;

  /**
   * The CSS property name being animated (e.g., 'opacity', 'width', 'left')
   */
  prop: string;

  /**
   * The easing function name or reference used for animation timing
   * @default "swing" or library-specific default easing
   */
  easing: string | EasingFunction;

  /**
   * Animation options containing duration, complete callbacks, and other settings
   */
  options: AnimationOptions;

  /**
   * The starting value of the property when animation begins
   */
  start: number;

  /**
   * The current value of the property during animation
   */
  now: number;

  /**
   * The target end value for the property
   */
  end: number;

  /**
   * The CSS unit for the property value (e.g., 'px', 'em', '%', or empty string for unitless properties)
   */
  unit: string;

  /**
   * Gets the current computed value of the animated property
   * @returns The current numeric value of the property
   */
  cur(): number;
}

/**
 * Easing function type for animation timing curves
 * @param progress - Normalized time progress (0 to 1)
 * @returns Eased progress value
 */
type EasingFunction = (progress: number) => number;

/**
 * Configuration options for animations
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
   * Callback function when animation completes
   */
  complete?: () => void;

  /**
   * Callback function for each animation step
   */
  step?: (now: number, tween: Tween) => void;

  /**
   * Additional animation-specific options
   */
  [key: string]: unknown;
}

/**
 * Tween constructor function
 * Creates a new animation tween for a DOM element property
 * 
 * @param elem - The DOM element to animate
 * @param options - Animation configuration options
 * @param prop - The CSS property name to animate
 * @param end - The target end value for the property
 * @param easing - Optional easing function (defaults to library default)
 * @param unit - Optional CSS unit (defaults to 'px' for numeric properties, empty string for unitless)
 */
declare function TweenConstructor(
  elem: HTMLElement,
  options: AnimationOptions,
  prop: string,
  end: number,
  easing?: string | EasingFunction,
  unit?: string
): void;