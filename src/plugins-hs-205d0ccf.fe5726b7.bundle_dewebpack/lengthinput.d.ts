import { IValueChange } from './IValueChange';

/**
 * Length unit types supported by the application
 */
enum LengthUnitType {
  Foot = 'foot',
  Inch = 'inch',
  Meter = 'meter',
  Centimeter = 'centimeter',
  Millimeter = 'millimeter',
  Kilometer = 'kilometer'
}

/**
 * Label positioning options for the input component
 */
type LabelPosition = 'left' | 'bottom';

/**
 * Range validation rules for input values
 */
interface RangeRules {
  /** Minimum allowed value (in meters for length units) */
  min?: number;
  /** Maximum allowed value (in meters for length units) */
  max?: number;
  /** Whether to check minimum constraint */
  checkMin?: boolean;
  /** Whether to check maximum constraint */
  checkMax?: boolean;
}

/**
 * Validation and constraint rules for the length input
 */
interface ValidationRules {
  /** Range constraints for the input value */
  range?: RangeRules;
  /** Whether only positive values are allowed */
  positiveOnly?: boolean;
  /** Whether only integer values are allowed */
  integerOnly?: boolean;
  /** Warning message to display when validation fails */
  warningText?: string;
}

/**
 * Configuration options for the LengthInput component
 */
interface LengthInputOptions {
  /** Unit type for display and input parsing */
  unitType?: LengthUnitType;
  /** Number of decimal places to display */
  displayDigits?: number;
  /** Whether to show the unit label */
  includeUnit?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Validation rules for the input */
  rules?: ValidationRules;
  /** Tooltip text shown when input is disabled */
  disabledTooltip?: string;
  /** Whether to show increment/decrement buttons */
  includeTunning?: boolean;
  /** Whether to force integer values */
  forceInt?: boolean;
  /** Custom step value for increment/decrement */
  step?: number;
  /** Whether to always commit value changes even if unchanged */
  alwaysCommitValueChange?: boolean;
}

/**
 * Event detail for value change events
 */
interface ValueChangeDetail {
  /** The new value in database units (meters) */
  value: number;
}

/**
 * Custom event for value changes
 */
interface ValueChangeEvent {
  detail: ValueChangeDetail;
}

/**
 * Event handlers for the input component
 */
interface LengthInputEventHandlers {
  /** Called when input gains focus */
  onFocus?: (params: { e: React.FocusEvent<HTMLInputElement> }) => void;
  /** Called when input loses focus */
  onBlur?: (params: { e: React.FocusEvent<HTMLInputElement> }) => void;
  /** Called on keydown events */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Called when value change starts */
  onChangeStart?: (e: ValueChangeEvent) => void;
  /** Called during value change */
  onChange?: (e: ValueChangeEvent) => void;
  /** Called when value change completes */
  onChangeEnd?: (e: ValueChangeEvent) => void;
}

/**
 * Data props for the LengthInput component
 */
interface LengthInputData extends LengthInputEventHandlers {
  /** Current value in database units (meters) */
  value: number | string;
  /** Configuration options */
  options: LengthInputOptions;
  /** CSS class name for styling */
  className?: string;
  /** Label text to display */
  label?: string;
  /** Position of the label relative to input */
  labelPosition?: LabelPosition;
  /** List of predefined values for selection */
  listValues?: string[];
  /** Whether to disable value change events */
  disableChange?: boolean;
  /** Whether to show color indicator */
  showColor?: boolean;
  /** Inline styles for color indicator */
  colorStyle?: React.CSSProperties;
}

/**
 * Props for the LengthInput component
 */
interface LengthInputProps {
  /** Data configuration for the input */
  data: LengthInputData;
  /** Label text (deprecated, use data.label instead) */
  label?: string;
  /** CSS class name (deprecated, use data.className instead) */
  className?: string;
  /** Whether to disable change events (deprecated, use data.disableChange instead) */
  disableChange?: boolean;
  /** Options configuration (deprecated, use data.options instead) */
  options?: LengthInputOptions;
  /** Checkbox options (currently unused) */
  checkboxOptions?: unknown;
  /** Custom scale step (deprecated, use options.step instead) */
  scaleStep?: number;
  /** Whether the input represents multiple different values */
  multiValueState?: boolean;
}

/**
 * Internal state for the LengthInput component
 */
interface LengthInputState {
  /** Reference to the data prop */
  data: LengthInputData;
  /** Current display value */
  value: string | number;
  /** Current options configuration */
  options: LengthInputOptions;
  /** Whether to show increment/decrement buttons */
  showTunningButtons: boolean;
  /** Step value for increment/decrement in database units */
  tunningStep: number;
  /** Current unit type being displayed */
  unitType: LengthUnitType;
  /** Number of decimal places to display */
  displayDigits: number;
  /** Whether to show unit label */
  includeUnit: boolean;
  /** Whether the input currently has focus */
  focus: boolean;
  /** Whether the current value is invalid */
  invalid: boolean;
  /** Last valid value entered */
  lastValue: number | undefined;
}

/**
 * Result of floorplan configuration calculation
 */
interface FloorplanConfig {
  /** Unit type for display */
  unitType: LengthUnitType;
  /** Number of decimal places */
  displayDigits: number;
  /** Whether to include unit label */
  includeUnit: boolean;
  /** Step value for tuning in database units */
  tunningStep: number;
  /** Formatted text expression of the value */
  textExpression: string | number;
}

/**
 * Assembled props for internal use
 */
interface AssembledProps extends Omit<LengthInputProps, 'label' | 'className' | 'disableChange' | 'options' | 'checkboxOptions' | 'scaleStep'> {
  /** Unit type for display */
  unit?: LengthUnitType;
  /** Whether to include unit label */
  includeUnit?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Number of decimal places to display */
  precision?: number;
  /** Whether this is a standard length unit */
  isLenghtUnit?: boolean;
  /** Tooltip shown when disabled */
  disabledTooltip?: string;
  /** Step value for increment/decrement */
  step?: number;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
}

/**
 * Assembles and normalizes props for the LengthInput component
 * 
 * @param props - Raw component props
 * @returns Assembled props with computed values
 */
export declare function assembleProps(props: LengthInputProps): AssembledProps;

/**
 * A specialized input component for length values with unit conversion and validation
 * 
 * Features:
 * - Automatic unit conversion between different length units
 * - Configurable precision and display format
 * - Increment/decrement buttons for fine-tuning values
 * - Validation rules (range, positive-only, integer-only)
 * - Support for imperial (feet/inches) and metric units
 * - Keyboard navigation (arrow keys, enter)
 * - Focus/blur state management
 * 
 * @example
 *