import type { VNode } from 'vue';
import type { PropType } from 'vue';

/**
 * VTextField Component Type Definitions
 * A versatile text input component with extensive customization options
 */

/**
 * Counter value calculation function type
 * @param value - The current input value
 * @returns The counter value to display
 */
export type CounterValueFunction = (value: any) => number;

/**
 * VTextField component props interface
 */
export interface VTextFieldProps {
  /** Icon to display in the outer append slot */
  appendOuterIcon?: string;
  
  /** Automatically focuses the input when mounted */
  autofocus?: boolean;
  
  /** Enables clearable functionality with a clear icon */
  clearable?: boolean;
  
  /** Icon used for the clearable button */
  clearIcon?: string;
  
  /** Displays a character counter. Can be boolean, number (max length), or string */
  counter?: boolean | number | string;
  
  /** Custom function to calculate counter value */
  counterValue?: CounterValueFunction;
  
  /** Applies the filled style variant */
  filled?: boolean;
  
  /** Removes elevation (shadow) from solo or filled variants */
  flat?: boolean;
  
  /** Forces input to take full available width */
  fullWidth?: boolean;
  
  /** Sets the input label text */
  label?: string;
  
  /** Applies the outlined style variant */
  outlined?: boolean;
  
  /** Sets placeholder text for the input */
  placeholder?: string;
  
  /** Displays prefix text before the input */
  prefix?: string;
  
  /** Icon to display in the inner prepend slot */
  prependInnerIcon?: string;
  
  /** Reverses the input orientation (RTL/LTR) */
  reverse?: boolean;
  
  /** Applies rounded corners styling */
  rounded?: boolean;
  
  /** Applies shaped styling (rounded on one side) */
  shaped?: boolean;
  
  /** Forces single line display mode */
  singleLine?: boolean;
  
  /** Applies the solo style variant (elevated box) */
  solo?: boolean;
  
  /** Applies the solo-inverted style variant */
  soloInverted?: boolean;
  
  /** Displays suffix text after the input */
  suffix?: string;
  
  /** HTML input type attribute */
  type?: string;
}

/**
 * VTextField component data interface
 */
export interface VTextFieldData {
  /** Indicates if the input has bad/invalid native HTML5 validation */
  badInput: boolean;
  
  /** Computed width of the label element (for outlined variant) */
  labelWidth: number;
  
  /** Computed width of the prefix element */
  prefixWidth: number;
  
  /** Computed width of the prepend-inner element */
  prependWidth: number;
  
  /** Initial value when component was created/focused */
  initialValue: any;
  
  /** Indicates if component has completed initial boot animation */
  isBooted: boolean;
  
  /** Temporary flag set during clear operation */
  isClearing: boolean;
}

/**
 * VTextField computed properties interface
 */
export interface VTextFieldComputed {
  /** Combined CSS classes for the component root element */
  classes: Record<string, boolean>;
  
  /** Computed color considering state and props */
  computedColor: string | undefined;
  
  /** Calculated counter value based on counterValue prop or default length */
  computedCounterValue: number;
  
  /** Determines if counter should be displayed */
  hasCounter: boolean;
  
  /** Determines if details section (messages/counter) should be shown */
  hasDetails: boolean;
  
  /** Internal value getter/setter for v-model binding */
  internalValue: any;
  
  /** Indicates if input has content or badInput state */
  isDirty: boolean;
  
  /** Indicates if input uses enclosed style (filled/solo/outlined) */
  isEnclosed: boolean;
  
  /** Indicates if label should be in active/floating state */
  isLabelActive: boolean;
  
  /** Indicates if input is in single-line mode */
  isSingle: boolean;
  
  /** Indicates if input uses solo or solo-inverted variant */
  isSolo: boolean;
  
  /** Computed CSS positioning for the label */
  labelPosition: { left: number | string; right: number | string };
  
  /** Determines if label should be rendered */
  showLabel: boolean;
  
  /** Determines label floating state value */
  labelValue: boolean;
}

/**
 * VTextField methods interface
 */
export interface VTextFieldMethods {
  /** Programmatically focus the input element */
  focus(): void;
  
  /** Programmatically blur the input element */
  blur(event?: FocusEvent): void;
  
  /** Callback executed when clear icon is clicked */
  clearableCallback(): void;
  
  /** Generates the outer append slot VNode */
  genAppendSlot(): VNode | null;
  
  /** Generates the inner prepend slot VNode */
  genPrependInnerSlot(): VNode | null;
  
  /** Generates the inner append/icon slot VNode */
  genIconSlot(): VNode | null;
  
  /** Generates the main input slot VNode */
  genInputSlot(): VNode;
  
  /** Generates the clear icon VNode */
  genClearIcon(): VNode | null;
  
  /** Generates the counter component VNode */
  genCounter(): VNode | null;
  
  /** Generates the control wrapper VNode */
  genControl(): VNode;
  
  /** Generates all default slot content */
  genDefaultSlot(): VNode[];
  
  /** Generates the fieldset element (for outlined variant) */
  genFieldset(): VNode | null;
  
  /** Generates the label component VNode */
  genLabel(): VNode | null;
  
  /** Generates the legend element inside fieldset */
  genLegend(): VNode;
  
  /** Generates the native input element VNode */
  genInput(): VNode;
  
  /** Generates the messages/details section VNode */
  genMessages(): VNode | null;
  
  /** Generates the text field slot container VNode */
  genTextFieldSlot(): VNode;
  
  /** Generates prefix or suffix affix elements */
  genAffix(type: 'prefix' | 'suffix'): VNode;
  
  /** Handler for input blur event */
  onBlur(event?: FocusEvent): void;
  
  /** Handler for component click event */
  onClick(): void;
  
  /** Handler for input focus event */
  onFocus(event?: FocusEvent): void;
  
  /** Handler for input event (value change) */
  onInput(event: Event): void;
  
  /** Handler for keydown event */
  onKeyDown(event: KeyboardEvent): void;
  
  /** Handler for mousedown event */
  onMouseDown(event: MouseEvent): void;
  
  /** Handler for mouseup event */
  onMouseUp(event: MouseEvent): void;
  
  /** Calculates and sets label width (for outlined variant) */
  setLabelWidth(): void;
  
  /** Calculates and sets prefix width */
  setPrefixWidth(): void;
  
  /** Calculates and sets prepend-inner width */
  setPrependWidth(): void;
  
  /** Attempts to autofocus the input if autofocus prop is true */
  tryAutofocus(): boolean;
  
  /** Updates internal state when focus changes */
  updateValue(isFocused: boolean): void;
  
  /** Handler for resize events to recalculate widths */
  onResize(): void;
}

/**
 * VTextField component instance interface
 */
export interface VTextField extends VTextFieldProps, VTextFieldData, VTextFieldComputed, VTextFieldMethods {
  /** Component name identifier */
  readonly name: 'v-text-field';
}

/**
 * VTextField component constructor
 */
declare const VTextField: {
  new (): VTextField;
};

export default VTextField;