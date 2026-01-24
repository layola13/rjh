/**
 * VRadio Component Type Definitions
 * A radio button component that extends Vue component with various mixins
 * for styling, theming, grouping, and interaction features.
 */

import Vue, { VNode, VNodeData } from 'vue';
import { PropValidator } from 'vue/types/options';

/**
 * Props for the VRadio component
 */
export interface VRadioProps {
  /**
   * Disables the radio button, preventing user interaction
   */
  disabled?: boolean;

  /**
   * Unique identifier for the radio input element
   */
  id?: string;

  /**
   * Text label displayed next to the radio button
   */
  label?: string;

  /**
   * Name attribute for the radio input, used for form grouping
   */
  name?: string;

  /**
   * Icon displayed when the radio button is not selected
   * @default "$radioOff"
   */
  offIcon?: string;

  /**
   * Icon displayed when the radio button is selected
   * @default "$radioOn"
   */
  onIcon?: string;

  /**
   * Makes the radio button read-only, preventing changes but allowing focus
   */
  readonly?: boolean;

  /**
   * The value associated with this radio button option
   */
  value?: any;

  /**
   * Current color theme for the component
   */
  color?: string;

  /**
   * Enables ripple effect on interaction
   */
  ripple?: boolean | object;

  /**
   * Applies dark theme styling
   */
  dark?: boolean;

  /**
   * Applies light theme styling
   */
  light?: boolean;
}

/**
 * Computed properties interface for VRadio component
 */
export interface VRadioComputed {
  /**
   * CSS classes for the root element, including disabled, focused, theme, and group classes
   */
  classes: Record<string, boolean>;

  /**
   * Computed color value based on validation state or prop color
   */
  computedColor: string | undefined;

  /**
   * Icon to display based on active state (onIcon or offIcon)
   */
  computedIcon: string;

  /**
   * Computed ID for the input element, falling back to generated ID if not provided
   */
  computedId: string;

  /**
   * Whether the component has a label to display
   */
  hasLabel: boolean;

  /**
   * Whether the radio group has validation state
   */
  hasState: boolean;

  /**
   * Whether the radio button is disabled (from prop or radio group)
   */
  isDisabled: boolean;

  /**
   * Whether the radio button is read-only (from prop or radio group)
   */
  isReadonly: boolean;

  /**
   * Computed name attribute, inherited from radio group if available
   */
  computedName: string;

  /**
   * Color state for the ripple effect
   */
  rippleState: string | undefined;

  /**
   * Validation state from radio group or computed color
   */
  validationState: string | undefined;

  /**
   * Whether this radio button is currently selected
   */
  isActive: boolean;

  /**
   * Reference to the parent radio group component
   */
  radioGroup?: VRadioGroup;

  /**
   * Theme-specific CSS classes
   */
  themeClasses: Record<string, boolean>;

  /**
   * Group-specific CSS classes
   */
  groupClasses: Record<string, boolean>;

  /**
   * Bound attributes from the attrs mixin
   */
  attrs$: Record<string, any>;

  /**
   * Bound event listeners
   */
  listeners$: Record<string, Function | Function[]>;
}

/**
 * Data properties for VRadio component
 */
export interface VRadioData {
  /**
   * Whether the radio button currently has focus
   */
  isFocused: boolean;
}

/**
 * Methods interface for VRadio component
 */
export interface VRadioMethods {
  /**
   * Generates the input element for the radio button
   * @param attrs - Additional attributes to merge into the input element
   * @returns VNode representing the input element
   */
  genInput(attrs: Record<string, any>): VNode;

  /**
   * Generates the label element for the radio button
   * @returns VNode representing the label element, or null if no label
   */
  genLabel(): VNode | null;

  /**
   * Generates the radio button visual representation (icon, input, ripple)
   * @returns VNode representing the radio button visual elements
   */
  genRadio(): VNode;

  /**
   * Handler for focus events
   * @param event - The focus event object
   */
  onFocus(event: FocusEvent): void;

  /**
   * Handler for blur events
   * @param event - The blur event object
   */
  onBlur(event: FocusEvent): void;

  /**
   * Handler for change/click events, toggles the radio button if not disabled/readonly
   */
  onChange(): void;

  /**
   * Handler for keydown events (currently empty implementation)
   */
  onKeydown(): void;

  /**
   * Toggles the radio button selection state
   */
  toggle(): void;

  /**
   * Sets text color utility
   * @param color - Color to apply
   * @param data - VNode data to merge color into
   * @returns VNodeData with color applied
   */
  setTextColor(color: string | undefined, data?: VNodeData): VNodeData;

  /**
   * Generates ripple effect element
   * @param data - VNode data for ripple configuration
   * @returns VNode representing the ripple element
   */
  genRipple(data?: VNodeData): VNode;
}

/**
 * Radio Group component interface (parent component reference)
 */
export interface VRadioGroup {
  /**
   * Whether the radio group has validation state
   */
  hasState: boolean;

  /**
   * Whether the radio group is disabled
   */
  isDisabled: boolean;

  /**
   * Whether the radio group is read-only
   */
  isReadonly: boolean;

  /**
   * Name attribute for all radio buttons in the group
   */
  name?: string;

  /**
   * Unique identifier for the radio group
   */
  _uid: number;

  /**
   * Validation state of the radio group
   */
  validationState?: string;

  /**
   * Whether the radio group uses dense styling
   */
  dense?: boolean;
}

/**
 * Main VRadio component interface
 */
export interface VRadio extends Vue {
  readonly $props: VRadioProps;
  readonly $data: VRadioData;
  
  // Computed properties
  readonly classes: VRadioComputed['classes'];
  readonly computedColor: VRadioComputed['computedColor'];
  readonly computedIcon: VRadioComputed['computedIcon'];
  readonly computedId: VRadioComputed['computedId'];
  readonly hasLabel: VRadioComputed['hasLabel'];
  readonly hasState: VRadioComputed['hasState'];
  readonly isDisabled: VRadioComputed['isDisabled'];
  readonly isReadonly: VRadioComputed['isReadonly'];
  readonly computedName: VRadioComputed['computedName'];
  readonly rippleState: VRadioComputed['rippleState'];
  readonly validationState: VRadioComputed['validationState'];
  readonly isActive: VRadioComputed['isActive'];
  readonly radioGroup: VRadioComputed['radioGroup'];
  readonly themeClasses: VRadioComputed['themeClasses'];
  readonly groupClasses: VRadioComputed['groupClasses'];
  readonly attrs$: VRadioComputed['attrs$'];
  readonly listeners$: VRadioComputed['listeners$'];

  // Methods
  genInput: VRadioMethods['genInput'];
  genLabel: VRadioMethods['genLabel'];
  genRadio: VRadioMethods['genRadio'];
  onFocus: VRadioMethods['onFocus'];
  onBlur: VRadioMethods['onBlur'];
  onChange: VRadioMethods['onChange'];
  onKeydown: VRadioMethods['onKeydown'];
  toggle: VRadioMethods['toggle'];
  setTextColor: VRadioMethods['setTextColor'];
  genRipple: VRadioMethods['genRipple'];
}

/**
 * VRadio component constructor
 */
declare const VRadioComponent: {
  new (): VRadio;
  options: {
    name: 'v-radio';
    inheritAttrs: false;
    props: Record<keyof VRadioProps, PropValidator<any>>;
    data(): VRadioData;
    computed: Record<keyof VRadioComputed, () => any>;
    methods: VRadioMethods;
    render(createElement: typeof Vue.prototype.$createElement): VNode;
  };
};

export default VRadioComponent;

/**
 * Event payload interfaces
 */

/**
 * Focus event payload emitted by VRadio
 */
export interface VRadioFocusEvent {
  /**
   * The native FocusEvent
   */
  event: FocusEvent;
}

/**
 * Blur event payload emitted by VRadio
 */
export interface VRadioBlurEvent {
  /**
   * The native FocusEvent
   */
  event: FocusEvent;
}

/**
 * Change event payload emitted by VRadio
 */
export interface VRadioChangeEvent {
  /**
   * The selected value
   */
  value: any;
}