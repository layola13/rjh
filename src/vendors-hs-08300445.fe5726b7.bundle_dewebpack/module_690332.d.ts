/**
 * React DatePicker Component
 * A flexible date/time picker component with timezone support and customizable formats
 */

import type { CSSProperties, FocusEventHandler, KeyboardEventHandler, MouseEventHandler, ReactNode, Ref } from 'react';
import type { GenerateConfig } from './generate';
import type { Locale } from './interface';
import type { PickerMode } from './panels/types';

/**
 * Alignment configuration for dropdown popup
 */
export interface AlignType {
  /** Alignment points, e.g., ['tl', 'bl'] for top-left to bottom-left */
  points?: string[];
  /** Offset [x, y] in pixels */
  offset?: [number, number];
  /** Target offset [x, y] in pixels */
  targetOffset?: [number, number];
  /** Overflow adjustment configuration */
  overflow?: {
    adjustX?: boolean;
    adjustY?: boolean;
  };
}

/**
 * Main props for the Picker component
 */
export interface PickerProps<DateType = any> {
  /** Custom prefix class name, defaults to 'rc-picker' */
  prefixCls?: string;
  /** Component ID */
  id?: string;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Inline styles for the picker container */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
  /** Custom class name for dropdown */
  dropdownClassName?: string;
  /** Dropdown alignment configuration */
  dropdownAlign?: AlignType;
  /** Inline styles for popup panel */
  popupStyle?: CSSProperties;
  /** CSS transition name for popup animation */
  transitionName?: string;
  /** Date generation and manipulation utilities */
  generateConfig: GenerateConfig<DateType>;
  /** Internationalization locale object */
  locale: Locale;
  /** Whether the input is read-only */
  inputReadOnly?: boolean;
  /** Show clear button when value exists */
  allowClear?: boolean;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Show time picker panel */
  showTime?: boolean | Record<string, any>;
  /** Picker mode: 'date' | 'week' | 'month' | 'quarter' | 'year' | 'time' */
  picker?: PickerMode;
  /** Date format string or array of format strings */
  format?: string | string[] | ((value: DateType) => string);
  /** Use 12-hour time format */
  use12Hours?: boolean;
  /** Controlled value */
  value?: DateType | null;
  /** Default initial value */
  defaultValue?: DateType | null;
  /** Controlled open state */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Default value when panel opens (used when value is null) */
  defaultOpenValue?: DateType;
  /** Custom suffix icon */
  suffixIcon?: ReactNode;
  /** Custom clear icon */
  clearIcon?: ReactNode;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Function to disable specific dates */
  disabledDate?: (date: DateType) => boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Function to get popup container element */
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  /** Ref to access picker instance methods */
  pickerRef?: Ref<PickerRefObject>;
  /** Custom render function for the panel */
  panelRender?: (panelNode: ReactNode) => ReactNode;
  /** Callback when value changes */
  onChange?: (value: DateType | null, dateString: string) => void;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Focus event handler */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /** Blur event handler */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /** Mouse down event handler */
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  /** Mouse up event handler */
  onMouseUp?: MouseEventHandler<HTMLDivElement>;
  /** Mouse enter event handler */
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  /** Mouse leave event handler */
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  /** Context menu event handler */
  onContextMenu?: MouseEventHandler<HTMLDivElement>;
  /** Click event handler */
  onClick?: MouseEventHandler<HTMLDivElement>;
  /** Key down event handler */
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  /** Callback when date is selected (before onChange) */
  onSelect?: (value: DateType) => void;
  /** Layout direction: 'ltr' | 'rtl' */
  direction?: 'ltr' | 'rtl';
  /** HTML autocomplete attribute */
  autoComplete?: string;
  /** Current picker panel value (for controlled panel) */
  pickerValue?: DateType;
  /** Callback when picker panel value changes */
  onPickerValueChange?: (value: DateType) => void;
  /** Callback when panel mode changes (e.g., date -> month) */
  onPanelChange?: (value: DateType | null, mode: PickerMode) => void;
}

/**
 * Methods exposed via ref
 */
export interface PickerRefObject {
  /** Programmatically focus the input */
  focus: () => void;
  /** Programmatically blur the input */
  blur: () => void;
}

/**
 * Internal operation ref for panel control
 */
export interface OperationRefObject {
  /** Handle keyboard events in panel */
  onKeyDown?: (event: KeyboardEvent) => boolean;
  /** Close panel callback */
  onClose?: () => void;
}

/**
 * Context value provided to child components
 */
export interface PickerContextValue<DateType = any> {
  /** Reference to operation handlers */
  operationRef: React.MutableRefObject<OperationRefObject | null>;
  /** Whether to hide panel header */
  hideHeader: boolean;
  /** Reference to panel DOM element */
  panelRef: React.RefObject<HTMLDivElement>;
  /** Callback when date is selected with selection type */
  onSelect: (value: DateType, type: 'key' | 'mouse' | 'submit') => void;
  /** Whether picker is open */
  open: boolean;
  /** Default value when opening panel */
  defaultOpenValue?: DateType;
  /** Callback when mouse enters a date cell */
  onDateMouseEnter: (date: DateType) => void;
  /** Callback when mouse leaves a date cell */
  onDateMouseLeave: () => void;
}

/**
 * Functional picker component with hooks
 */
declare function Picker<DateType = any>(props: PickerProps<DateType>): JSX.Element;

/**
 * Class-based picker component wrapper
 * Provides focus() and blur() methods via ref
 */
declare class PickerComponent<DateType = any> extends React.Component<PickerProps<DateType>> {
  /** Internal ref to functional picker */
  private pickerRef: React.RefObject<PickerRefObject>;
  
  /** Focus the picker input */
  focus(): void;
  
  /** Blur the picker input */
  blur(): void;
  
  render(): JSX.Element;
}

export default PickerComponent;