/**
 * Module: module_value
 * Original ID: value
 * 
 * Gizmo control handler for cycling through linear dimensions and updating their focus state
 */

/**
 * Context interface for the gizmo dimension cycling method
 */
interface IGizmoDimensionContext {
  /**
   * Currently active dimension index (0 or 1)
   */
  activeDimIndex: number;
  
  /**
   * Array of linear dimension controllers (typically X and Y axes)
   */
  linearDimensions: ILinearDimension[];
}

/**
 * Linear dimension controller interface
 */
interface ILinearDimension {
  /**
   * Updates the input state of this dimension
   * @param state - The gizmo input state type
   * @param isFocused - Whether the dimension should be focused
   */
  updateState(state: GizmoInputStateEnum, isFocused: boolean): void;
}

/**
 * Enum representing possible gizmo input states
 */
declare enum GizmoInputStateEnum {
  /** Dimension is focused/active */
  focus = 'focus',
  /** Dimension is being hovered */
  hover = 'hover',
  /** Dimension is in idle state */
  idle = 'idle'
}

/**
 * Cycles to the next linear dimension and updates its focus state
 * 
 * This method alternates between two linear dimensions (0 and 1) and
 * applies the specified focus state to the newly active dimension.
 * 
 * @param this - The gizmo dimension context
 * @param focus - Whether the next dimension should receive focus
 */
declare function cycleDimensionFocus(this: IGizmoDimensionContext, focus: boolean): void;