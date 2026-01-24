/**
 * SliderInput component module
 * Provides a combined slider and numeric input control for value selection
 */

import { IValueChange } from './IValueChange';

/**
 * Range validation rules for slider and input boundaries
 */
interface RangeRules {
  /** Maximum value allowed on the slider */
  max?: number | string;
  /** Minimum value allowed on the slider */
  min?: number | string;
  /** Maximum value allowed in the numeric input (overrides max if set) */
  maxInput?: number | string;
  /** Minimum value allowed in the numeric input (overrides min if set) */
  minInput?: number | string;
  /** Whether to enforce minimum value validation */
  checkMin?: boolean;
  /** Whether to enforce maximum value validation */
  checkMax?: boolean;
}

/**
 * Validation and behavior rules
 */
interface ValidationRules {
  /** Range constraints for the slider and input */
  range?: RangeRules;
  /** Whether to restrict input to positive numbers only */
  positiveOnly?: boolean;
}

/**
 * Configuration options for the SliderInput component
 */
interface SliderInputOptions {
  /** Whether the component is in read-only mode */
  readOnly?: boolean;
  /** Validation rules for value constraints */
  rules?: ValidationRules;
  /** Tooltip text to display on hover */
  tips?: string;
  /** Whether the slider should start from minimum value */
  startFromMin?: boolean;
  /** Unit type for display (e.g., 'px', '%', 'em') */
  unitType?: string;
  /** Number of decimal places to display */
  displayDigits?: number;
  /** Whether to include unit in display */
  includeUnit?: boolean;
}

/**
 * Data structure for SliderInput component
 */
interface SliderInputData {
  /** Current numeric value */
  value: number | string;
  /** Display label for the component */
  label?: string;
  /** Icon source URL */
  iconSrc?: string;
  /** CSS class name for styling */
  className?: string;
  /** Debounce delay in milliseconds */
  delay?: number;
  /** Configuration options */
  options?: SliderInputOptions;
  /** Callback fired when value change starts */
  onValueChangeStart?: (event: ValueChangeEvent) => void;
  /** Callback fired when value changes */
  onValueChange?: (event: ValueChangeEvent) => void;
  /** Callback fired when value change ends */
  onValueChangeEnd?: (event: ValueChangeEvent) => void;
}

/**
 * Props for the SliderInput component
 */
interface SliderInputProps {
  /** Component data configuration */
  data: SliderInputData;
  /** State management for multi-value scenarios */
  multiValueState?: unknown;
}

/**
 * Internal component state
 */
interface SliderInputState {
  /** Current value */
  value: number;
  /** Read-only mode flag */
  readOnly: boolean;
}

/**
 * Event detail for value change events
 */
interface ValueChangeDetail {
  /** The new value */
  value: number;
}

/**
 * Custom event structure for value changes
 */
interface ValueChangeEvent {
  /** Event detail containing the new value */
  detail: ValueChangeDetail;
}

/**
 * SliderInput component
 * 
 * A composite control combining a slider and numeric input field.
 * Supports range constraints, read-only mode, tooltips, and unit display.
 * 
 * @extends IValueChange
 */
export declare class SliderInput extends IValueChange<SliderInputProps, SliderInputState> {
  /**
   * Creates a new SliderInput instance
   * @param props - Component properties
   */
  constructor(props: SliderInputProps);

  /**
   * Component state containing current value and read-only status
   */
  state: SliderInputState;

  /**
   * Legacy lifecycle method for updating state from props
   * @deprecated Use getDerivedStateFromProps or componentDidUpdate instead
   * @param nextProps - Incoming props
   */
  UNSAFE_componentWillReceiveProps(nextProps: SliderInputProps): void;

  /**
   * Handles the start of a value change interaction
   * @param event - Event object containing the new value
   */
  onValueChangeStart(event: ValueChangeEvent | number): void;

  /**
   * Handles ongoing value changes during interaction
   * @param event - Event object containing the new value
   */
  onValueChange(event: ValueChangeEvent | number): void;

  /**
   * Handles the end of a value change interaction
   * @param event - Event object containing the new value
   */
  onValueChangeEnd(event: ValueChangeEvent | number): void;

  /**
   * Updates tooltip display at mouse position
   * @param content - Tooltip text content
   * @param mouseEvent - Mouse event containing position
   */
  updateTips(content: string, mouseEvent: { clientX: number; clientY: number }): void;

  /**
   * Removes tooltip from display
   */
  deleteTips(): void;

  /**
   * Renders the component
   * @returns React element
   */
  render(): React.ReactElement;
}