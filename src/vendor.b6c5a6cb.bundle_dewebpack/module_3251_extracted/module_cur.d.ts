/**
 * Property hook interface for animation/transition properties
 */
interface PropHook<T = any> {
  /**
   * Custom getter for retrieving the current property value
   * @param elem - The animation tween object
   * @returns The computed property value
   */
  get?(elem: AnimationTween): T;
  
  /**
   * Custom setter for applying property values
   * @param elem - The animation tween object
   */
  set?(elem: AnimationTween): void;
}

/**
 * Collection of property-specific animation hooks
 */
interface PropHooksRegistry {
  /**
   * Default fallback hook used when no specific hook exists
   */
  _default: Required<PropHook>;
  
  /**
   * Property-specific hooks indexed by property name
   */
  [propertyName: string]: PropHook | undefined;
}

/**
 * Animation tween object representing a single property animation
 */
interface AnimationTween {
  /**
   * The CSS property being animated
   */
  prop: string;
  
  /**
   * Current animation progress (0-1)
   */
  pos?: number;
  
  /**
   * Animation easing function name
   */
  easing?: string;
  
  /**
   * Start value of the animation
   */
  start?: number;
  
  /**
   * End value of the animation
   */
  end?: number;
  
  /**
   * Unit of measurement (e.g., 'px', '%', 'em')
   */
  unit?: string;
  
  /**
   * Retrieve the current computed value of the animated property
   * @returns The current property value
   */
  cur(this: AnimationTween): any;
}

/**
 * Animation runtime registry containing property hooks
 */
interface AnimationRuntime {
  /**
   * Registry of property-specific animation hooks
   */
  propHooks: PropHooksRegistry;
}

/**
 * Global animation runtime instance
 */
declare const rr: AnimationRuntime;

/**
 * Retrieves the current computed value of the animated property.
 * Uses a property-specific hook if available, otherwise falls back to the default hook.
 * 
 * @this {AnimationTween} The animation tween context
 * @returns {any} The current computed property value
 */
declare function cur(this: AnimationTween): any;