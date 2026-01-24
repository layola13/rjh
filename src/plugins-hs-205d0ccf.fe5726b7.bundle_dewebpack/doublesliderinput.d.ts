/**
 * DoubleSliderInput Component
 * A compound input component combining a slider and a numeric input field
 * Supports bidirectional value changes, unit conversion, and range validation
 */

import React from 'react';
import { Slider, NumberInput } from './ComponentLibrary';
import { IValueChange } from './IValueChange';

/**
 * Range validation rules for the input value
 */
interface RangeRules {
  /** Minimum allowed value */
  min?: number | string;
  /** Maximum allowed value */
  max?: number | string;
}

/**
 * Validation rules configuration
 */
interface ValidationRules {
  /** Range constraints for the value */
  range?: RangeRules;
}

/**
 * Options for configuring the DoubleSliderInput behavior
 */
interface DoubleSliderInputOptions {
  /** Type of unit (e.g., 'm', 'cm', 'ft') */
  unitType?: string;
  /** Number of decimal places to display */
  displayDigits?: number;
  /** Whether to include unit label in display */
  includeUnit?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Validation rules */
  rules?: ValidationRules;
}

/**
 * Value change event detail
 */
interface ValueChangeEvent {
  detail?: {
    value: number;
  };
}

/**
 * Props for the DoubleSliderInput component
 */
interface DoubleSliderInputData {
  /** Additional CSS class names */
  className?: string;
  /** Label text displayed above the slider */
  label?: string;
  /** Current value of the input */
  value: number | string;
  /** Whether to delay change events (debounce) */
  delay?: boolean;
  /** Tooltip text for the number input */
  tooltip?: string;
  /** Whether slider supports bidirectional movement */
  twoWays?: boolean;
  /** Starting value for two-way slider */
  startValue?: number;
  /** Step increment for value changes */
  step?: number;
  /** Configuration options */
  options?: DoubleSliderInputOptions;
  /** Callback fired when value change starts */
  onValueChangeStart?: (value: number) => void;
  /** Callback fired when value is changing */
  onValueChange?: (value: number) => void;
  /** Callback fired when value change ends */
  onValueChangeEnd?: (value: number) => void;
  /** Callback fired on focus */
  onFocus?: () => void;
  /** Callback fired on blur */
  onBlur?: () => void;
}

/**
 * Props interface for DoubleSliderInput component
 */
interface DoubleSliderInputProps {
  /** Component configuration data */
  data: DoubleSliderInputData;
}

/**
 * Internal state of the DoubleSliderInput component
 */
interface DoubleSliderInputState {
  /** Current value */
  value: number;
  /** Whether the input is read-only */
  readOnly: boolean;
}

/**
 * Properties for the number input component
 */
interface NumberInputProps {
  /** Whether the value represents a length unit */
  isLengthUnit?: boolean;
  /** Current unit type */
  unit?: string;
  /** Additional number input specific properties */
  [key: string]: unknown;
}

/**
 * DoubleSliderInput Component
 * Provides a dual-input interface with synchronized slider and numeric input
 * Supports unit conversion, range validation, and flexible event handling
 */
export declare class DoubleSliderInput extends IValueChange<
  DoubleSliderInputProps,
  DoubleSliderInputState
> {
  /** Assembled properties for the number input */
  numberInputProps: NumberInputProps;
  
  /** Flag indicating if the slider has been moved (dirty state) */
  dirty: boolean;

  /**
   * Constructor
   * @param props - Component props
   */
  constructor(props: DoubleSliderInputProps);

  /**
   * Lifecycle hook - called when component receives new props
   * @param nextProps - New props
   * @deprecated Use componentDidUpdate or getDerivedStateFromProps
   */
  UNSAFE_componentWillReceiveProps(nextProps: DoubleSliderInputProps): void;

  /**
   * Handler for value change start event
   * @param event - Event or value
   */
  onValueChangeStart(event: ValueChangeEvent | number): void;

  /**
   * Handler for value change event
   * @param event - Event or value
   */
  valueChange(event: ValueChangeEvent | number): void;

  /**
   * Handler for value change end event
   * @param event - Event or value
   */
  onValueChangeEnd(event: ValueChangeEvent | number): void;

  /**
   * Handler for focus event
   */
  onFocus(): void;

  /**
   * Handler for blur event
   */
  onBlur(): void;

  /**
   * Handler for direct input changes (number input field)
   * Triggers start, change, and end events
   * @param event - Event or value
   */
  handleInputChange(event: ValueChangeEvent | number): void;

  /**
   * Handler called before slider starts changing
   * Converts units if necessary
   * @param value - Raw slider value
   */
  handleBeforeSliderChange(value: number): void;

  /**
   * Handler for slider value changes
   * Manages dirty state and optional delayed updates
   * @param value - New slider value
   */
  handleSliderChange(value: number): void;

  /**
   * Handler called after slider change completes
   * Finalizes the value change and resets dirty state
   * @param value - Final slider value
   */
  handleAfterSliderChange(value: number): void;

  /**
   * Renders the component
   * @returns React element
   */
  render(): React.ReactElement;

  /** PropTypes validation (legacy) */
  static propTypes: {
    data: unknown;
  };

  /** Default props */
  static defaultProps: {
    data: {
      className: string;
      label: string;
      value: number;
      delay: boolean;
      options: {
        unitType: undefined;
        displayDigits: undefined;
        includeUnit: undefined;
        readOnly: boolean;
        rules: {
          range: Record<string, never>;
        };
      };
    };
  };
}