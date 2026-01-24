/**
 * Module: ReactCSS
 * A utility library for generating dynamic CSS-in-JS styles based on component state and props.
 * Supports hover, active states, loops, and conditional styling.
 */

/**
 * Hover state handler type
 * Manages hover interactions for components
 */
export type HoverHandler = unknown;

/**
 * Active state handler type
 * Manages active/pressed interactions for components
 */
export type ActiveHandler = unknown;

/**
 * Loop utility type
 * Enables iteration-based style generation
 */
export type LoopUtility = unknown;

/**
 * Style definition object
 * Can contain nested styles, pseudo-states, and conditional rules
 */
export interface StyleDefinition {
  [key: string]: React.CSSProperties | StyleDefinition | unknown;
}

/**
 * Hover state handler
 * Use this to track and apply hover styles to components
 */
export const hover: HoverHandler;

/**
 * Hover state handler (alias)
 * @deprecated Use `hover` instead
 */
export const handleHover: HoverHandler;

/**
 * Active state handler
 * Use this to track and apply active/pressed styles to components
 */
export const handleActive: ActiveHandler;

/**
 * Loop utility for generating repeated styles
 * Useful for creating styles based on arrays or iterative data
 */
export const loop: LoopUtility;

/**
 * Main ReactCSS function
 * Merges style objects based on component state and conditions
 * 
 * @param styles - Primary style definition object
 * @param conditions - Additional condition objects (state flags, props, etc.)
 * @returns Merged and flattened CSS style object
 * 
 * @example
 *