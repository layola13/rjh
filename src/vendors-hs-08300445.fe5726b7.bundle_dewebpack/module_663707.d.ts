/**
 * Motion configuration module for React components
 * Provides utility function to determine motion/animation settings
 */

/**
 * Motion configuration object
 */
export interface Motion {
  /** The CSS class name used for transition/animation */
  motionName: string;
}

/**
 * Parameters for getting motion configuration
 */
export interface GetMotionParams {
  /** Prefix for CSS class names */
  prefixCls: string;
  /** Direct motion configuration object */
  motion?: Motion | null;
  /** Animation name to be combined with prefixCls */
  animation?: string;
  /** Transition class name */
  transitionName?: string;
}

/**
 * Determines the motion configuration based on provided parameters.
 * Priority order: motion > animation > transitionName
 * 
 * @param params - Configuration parameters
 * @returns Motion configuration object or null if no motion is specified
 * 
 * @example
 *