/**
 * Prevents the default behavior of an event
 * @param e - The event to prevent
 */
export declare function prevent(e: Event): void;

/**
 * Props for the Selectable component
 */
export interface SelectableProps {
  /** Unique identifier for the input element */
  id?: string;
  /** Current value of the input */
  inputValue?: any;
  /** Value when the input is unchecked (for non-multiple mode) */
  falseValue?: any;
  /** Value when the input is checked (for non-multiple mode) */
  trueValue?: any;
  /** Whether multiple selections are allowed */
  multiple?: boolean | null;
  /** Label text for the input */
  label?: string;
}

/**
 * Data structure for the Selectable component
 */
export interface SelectableData {
  /** Whether the component currently has a color applied */
  hasColor: boolean;
  /** Lazily updated value for performance optimization */
  lazyValue: any;
}

/**
 * Computed properties for the Selectable component
 */
export interface SelectableComputed {
  /** Computed color based on active state and theme */
  computedColor?: string;
  /** Whether the component is in multiple selection mode */
  isMultiple: boolean;
  /** Whether the component is currently active/checked */
  isActive: boolean;
  /** Whether the component value has been modified */
  isDirty: boolean;
  /** Ripple effect state based on validation and disabled state */
  rippleState?: string;
}

/**
 * Methods for the Selectable component
 */
export interface SelectableMethods {
  /**
   * Generates the label element with click prevention
   * @returns The generated label VNode or undefined
   */
  genLabel(): any;
  
  /**
   * Generates the input element
   * @param type - The input type and role (e.g., 'checkbox', 'radio')
   * @param attrs - Additional HTML attributes for the input
   * @returns The generated input VNode
   */
  genInput(type: string, attrs?: Record<string, any>): any;
  
  /**
   * Handles blur event on the input
   */
  onBlur(): void;
  
  /**
   * Handles click event on the component
   * @param event - The click event
   */
  onClick(event: MouseEvent): void;
  
  /**
   * Handles change event on the input
   * Updates internal value based on selection mode and current state
   */
  onChange(): void;
  
  /**
   * Handles focus event on the input
   */
  onFocus(): void;
  
  /**
   * Handles keydown event on the input
   * @param event - The keyboard event
   */
  onKeydown(event: KeyboardEvent): void;
}

/**
 * Selectable mixin component
 * Provides functionality for selectable inputs (checkbox, radio, etc.)
 * Extends VInput, Rippleable, and Comparable mixins
 */
declare const Selectable: {
  /** Component name */
  name: 'selectable';
  
  /** v-model configuration */
  model: {
    /** Property bound to v-model */
    prop: 'inputValue';
    /** Event emitted for v-model updates */
    event: 'change';
  };
  
  /** Component props */
  props: SelectableProps;
  
  /** Component data factory */
  data(): SelectableData;
  
  /** Computed properties */
  computed: SelectableComputed;
  
  /** Watchers */
  watch: {
    /**
     * Watches inputValue changes and updates internal state
     * @param value - The new input value
     */
    inputValue(value: any): void;
  };
  
  /** Component methods */
  methods: SelectableMethods;
};

export default Selectable;