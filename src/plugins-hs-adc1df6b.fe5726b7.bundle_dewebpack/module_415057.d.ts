/**
 * Property bar radio button component module
 * Provides a radio button group component with label and tooltip support
 */

/**
 * Radio button option value type
 */
type RadioValue = string | number;

/**
 * Component data configuration
 */
interface RadioButtonData {
  /** Available radio button values */
  values: RadioValue[];
  /** Default selected value */
  defaultValue?: RadioValue;
  /** Currently selected value (controlled mode) */
  selectedValue?: RadioValue;
  /** Change event handler */
  onChange?: (event: RadioChangeEvent) => void;
  /** Label text displayed above the radio group */
  label?: string;
  /** Additional CSS class name */
  className?: string;
  /** Whether the radio group is disabled */
  disabled?: boolean;
  /** Tooltip text displayed on hover */
  tooltip?: string;
}

/**
 * Component props
 */
interface RadioButtonProps {
  /** Unique component identifier */
  id: string;
  /** Radio button configuration data */
  data: RadioButtonData;
}

/**
 * Radio button change event detail
 */
interface RadioChangeEventDetail {
  /** Selected radio button value */
  value: RadioValue;
}

/**
 * Radio button change event
 */
interface RadioChangeEvent {
  /** Event detail containing the selected value */
  detail: RadioChangeEventDetail;
}

/**
 * Resource manager interface for internationalization
 */
declare const ResourceManager: {
  /**
   * Get localized string by key
   * @param key - Resource key
   * @returns Localized string or undefined if not found
   */
  getString(key: string | number): string | undefined;
};

/**
 * Property bar radio button component
 * 
 * Renders a radio button group with optional label and tooltip.
 * Supports both controlled and uncontrolled modes.
 * 
 * @param props - Component properties
 * @returns React element representing the radio button group
 * 
 * @example
 *