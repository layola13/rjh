import Vue, { VNode, VNodeData } from 'vue';
import { PropType } from 'vue';

/**
 * VRadio Component Props Interface
 * Defines all properties that can be passed to the VRadio component
 */
export interface VRadioProps {
  /** Whether the radio button is disabled */
  disabled?: boolean;
  /** Unique identifier for the radio input element */
  id?: string;
  /** Text label displayed next to the radio button */
  label?: string;
  /** Name attribute for the radio input (used for grouping) */
  name?: string;
  /** Icon to display when radio is not selected */
  offIcon?: string;
  /** Icon to display when radio is selected */
  onIcon?: string;
  /** Whether the radio button is read-only */
  readonly?: boolean;
  /** Value associated with this radio button */
  value?: any;
  /** Theme color for the radio button */
  color?: string;
  /** Whether to use dark theme */
  dark?: boolean;
  /** Whether to use light theme */
  light?: boolean;
  /** Whether to show ripple effect */
  ripple?: boolean | object;
}

/**
 * VRadio Component Data Interface
 * Internal state of the VRadio component
 */
export interface VRadioData {
  /** Whether the radio button currently has focus */
  isFocused: boolean;
}

/**
 * VRadio Component Computed Properties Interface
 */
export interface VRadioComputed {
  /** CSS classes applied to the component root element */
  classes: Record<string, boolean>;
  /** Computed color value based on validation state */
  computedColor: string | undefined;
  /** Icon to display based on active state */
  computedIcon: string;
  /** Computed ID for the input element */
  computedId: string;
  /** Whether the component has a label */
  hasLabel: boolean;
  /** Whether the component has validation state */
  hasState: boolean;
  /** Whether the radio button is disabled (from props or radio group) */
  isDisabled: boolean;
  /** Whether the radio button is read-only (from props or radio group) */
  isReadonly: boolean;
  /** Computed name attribute (from props or radio group) */
  computedName: string;
  /** Ripple effect state */
  rippleState: string | undefined;
  /** Validation state from radio group or computed color */
  validationState: string | undefined;
  /** Theme classes for dark/light mode */
  themeClasses: Record<string, boolean>;
  /** Classes from the parent radio group */
  groupClasses: Record<string, boolean>;
  /** Whether this radio button is currently selected */
  isActive: boolean;
}

/**
 * VRadio Component Methods Interface
 */
export interface VRadioMethods {
  /**
   * Generates the hidden input element for the radio button
   * @param type - Input type (always 'radio')
   * @param attrs - Additional attributes to apply
   * @returns VNode for the input element
   */
  genInput(type: string, attrs: VNodeData): VNode;
  
  /**
   * Generates the label element for the radio button
   * @returns VNode for the label or null if no label
   */
  genLabel(): VNode | null;
  
  /**
   * Generates the radio button visual element
   * @returns VNode containing the radio button UI
   */
  genRadio(): VNode;
  
  /**
   * Handles focus event on the radio button
   * @param event - Focus event object
   */
  onFocus(event: FocusEvent): void;
  
  /**
   * Handles blur event on the radio button
   * @param event - Blur event object
   */
  onBlur(event: FocusEvent): void;
  
  /**
   * Handles change event when radio button is clicked
   */
  onChange(): void;
  
  /**
   * Handles keydown events on the radio button
   * @param event - Keyboard event object
   */
  onKeydown(event: KeyboardEvent): void;
  
  /**
   * Toggles the radio button selection
   */
  toggle(): void;
  
  /**
   * Generates ripple effect element
   * @param data - VNode data configuration
   * @returns VNode for ripple effect
   */
  genRipple(data: VNodeData): VNode;
  
  /**
   * Sets text color based on validation state
   * @param color - Color to apply
   * @param data - Optional VNode data to merge
   * @returns VNode data with color applied
   */
  setTextColor(color: string | undefined, data?: VNodeData): VNodeData;
}

/**
 * VRadio Component
 * A radio button component that can be used standalone or within a VRadioGroup
 * 
 * @example
 *