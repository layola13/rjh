/**
 * Positionable mixin factory for Vue components
 * Provides props for absolute/fixed positioning
 */

/**
 * Available positioning property keys
 */
export type PositionableProps = 
  | 'absolute'
  | 'bottom'
  | 'fixed'
  | 'left'
  | 'right'
  | 'top';

/**
 * Positioning props definition object
 */
export interface PositionablePropsDefinition {
  /** Apply absolute positioning */
  absolute: BooleanConstructor;
  /** Align to bottom */
  bottom: BooleanConstructor;
  /** Apply fixed positioning */
  fixed: BooleanConstructor;
  /** Align to left */
  left: BooleanConstructor;
  /** Align to right */
  right: BooleanConstructor;
  /** Align to top */
  top: BooleanConstructor;
}

/**
 * Positionable component instance
 */
export interface PositionableInstance {
  /** Component name identifier */
  name: string;
  /** Component props definition (full or filtered) */
  props: PositionablePropsDefinition | Partial<PositionablePropsDefinition>;
}

/**
 * Factory function to create a positionable mixin
 * 
 * @param propKeys - Optional array of prop keys to include. If empty or undefined, includes all positioning props
 * @returns Vue component definition with positionable props
 * 
 * @example
 *