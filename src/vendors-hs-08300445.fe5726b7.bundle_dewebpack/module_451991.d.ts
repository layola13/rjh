/**
 * Props for the Select component validation function
 */
interface SelectProps<ValueType = any> {
  /** Selection mode: 'multiple', 'tags', or 'combobox' */
  mode?: 'multiple' | 'tags' | 'combobox' | 'single';
  
  /** Array of option data */
  options?: OptionData[];
  
  /** Child elements (Option or OptGroup components) */
  children?: React.ReactNode;
  
  /** Whether to automatically fill the input with the first option in combobox mode */
  backfill?: boolean;
  
  /** Whether to show clear button */
  allowClear?: boolean;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Custom input element (combobox mode only) */
  getInputElement?: () => React.ReactElement;
  
  /** Whether to show search input */
  showSearch?: boolean;
  
  /** Search callback function */
  onSearch?: (value: string) => void;
  
  /** Whether to open dropdown by default */
  defaultOpen?: boolean;
  
  /** Whether to auto focus */
  autoFocus?: boolean;
  
  /** Whether value is in label-value pair format */
  labelInValue?: boolean;
  
  /** Current selected value(s) */
  value?: ValueType | ValueType[] | LabeledValue | LabeledValue[];
  
  /** Input value (deprecated, use searchValue instead) */
  inputValue?: string;
  
  /** Property name to use as label from option */
  optionLabelProp?: string;
}

/**
 * Option data structure
 */
interface OptionData {
  /** Option value */
  value?: string | number;
  
  /** Option key */
  key?: string | number;
  
  /** Option label */
  label?: React.ReactNode;
  
  /** Whether option is disabled */
  disabled?: boolean;
  
  /** Nested options for option group */
  options?: OptionData[];
}

/**
 * Labeled value structure when labelInValue is true
 */
interface LabeledValue {
  /** Option key */
  key?: string | number;
  
  /** Option value */
  value?: string | number;
  
  /** Option label */
  label?: React.ReactNode;
}

/**
 * Validates Select component props and logs warnings for invalid configurations.
 * 
 * This function performs comprehensive validation of Select component properties
 * to ensure correct usage patterns and prevent common mistakes.
 * 
 * @param props - The Select component props to validate
 * 
 * @remarks
 * Validation checks include:
 * - Mode-specific constraints (tags, combobox, multiple)
 * - Value format validation (labelInValue, array format)
 * - Prop compatibility (backfill with combobox, showSearch with onSearch)
 * - Children structure validation (Option/OptGroup components)
 * - Deprecated prop warnings (inputValue)
 * 
 * @example
 *