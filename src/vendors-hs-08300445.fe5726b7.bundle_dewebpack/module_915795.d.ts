/**
 * Custom hook for managing controlled and uncontrolled component state
 * Handles both controlled (with value prop) and uncontrolled (with defaultValue) modes
 * 
 * @template T - The type of the state value
 * @param initialValue - Initial value or factory function for uncontrolled mode
 * @param options - Configuration options
 * @returns Tuple of [current state, setState function]
 */
declare function useControllableValue<T>(
  initialValue: T | (() => T),
  options?: UseControllableValueOptions<T>
): [T, (value: T, ...args: any[]) => void];

/**
 * Options for useControllableValue hook
 * @template T - The type of the state value
 */
interface UseControllableValueOptions<T> {
  /**
   * Default value for uncontrolled mode
   * Can be a value or a factory function
   */
  defaultValue?: T | (() => T);

  /**
   * Current value for controlled mode
   * When provided, the component operates in controlled mode
   */
  value?: T;

  /**
   * Callback fired when the internal state changes
   * @param newValue - The new state value
   * @param prevValue - The previous state value
   */
  onChange?: (newValue: T, prevValue: T) => void;

  /**
   * Post-processing function to transform the state before returning
   * @param value - The current state value
   * @returns Transformed value
   */
  postState?: (value: T) => T;
}

export default useControllableValue;