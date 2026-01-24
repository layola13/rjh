/**
 * Positionable mixin factory for Vue components
 * Provides props for positioning elements (absolute, fixed, top, bottom, left, right)
 */

/**
 * Available positioning prop names
 */
export type PositionableProps = 'absolute' | 'bottom' | 'fixed' | 'left' | 'right' | 'top';

/**
 * Props definition for positionable components
 */
export interface PositionablePropsDef {
  /** Position element absolutely */
  absolute: BooleanConstructor;
  /** Align element to bottom */
  bottom: BooleanConstructor;
  /** Position element with fixed positioning */
  fixed: BooleanConstructor;
  /** Align element to left */
  left: BooleanConstructor;
  /** Align element to right */
  right: BooleanConstructor;
  /** Align element to top */
  top: BooleanConstructor;
}

/**
 * Runtime values for positionable props
 */
export interface PositionablePropsValues {
  absolute?: boolean;
  bottom?: boolean;
  fixed?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
}

/**
 * Factory function to create a positionable mixin
 * 
 * @param propsToInclude - Optional array of specific props to include. If empty or undefined, includes all props.
 * @returns Vue component mixin with positionable props
 * 
 * @example
 *