/**
 * Utility function to prevent default event behavior
 * @param e - The event object
 */
export declare function prevent(e: Event): void;

/**
 * Props for the Selectable mixin
 */
export interface SelectableProps {
  /** Unique identifier for the input element */
  id?: string;
  /** Current input value */
  inputValue?: any;
  /** Value to use when unchecked (for non-multiple mode) */
  falseValue?: any;
  /** Value to use when checked (for non-multiple mode) */
  trueValue?: any;
  /** Whether multiple values can be selected. Null for auto-detection based on internalValue type */
  multiple?: boolean | null;
  /** Label text for the input */
  label?: string;
}

/**
 * Data properties for the Selectable mixin
 */
export interface SelectableData {
  /** Whether the component currently has color applied */
  hasColor: any;
  /** Lazy-loaded copy of the input value */
  lazyValue: any;
}

/**
 * Computed properties for the Selectable mixin
 */
export interface SelectableComputed {
  /** 
   * Computed color based on active state and theme
   * Returns color prop, or "white" for dark theme, or "primary" as fallback
   */
  computedColor(): string | undefined;
  
  /** 
   * Whether the component is in multiple selection mode
   * True if multiple prop is true, or if internalValue is an array
   */
  isMultiple(): boolean;
  
  /** 
   * Whether the component is currently active/checked
   * For multiple mode: checks if value exists in internalValue array
   * For single mode: compares value with trueValue or checks boolean state
   */
  isActive(): boolean;
  
  /** 
   * Whether the component has been modified (alias for isActive)
   */
  isDirty(): boolean;
  
  /** 
   * State for ripple effect
   * Returns validation state if disabled or invalid, otherwise undefined
   */
  rippleState(): string | undefined;
}

/**
 * Methods for the Selectable mixin
 */
export interface SelectableMethods {
  /**
   * Generate the label element with click prevention
   * @returns VNode for the label or undefined
   */
  genLabel(): any;
  
  /**
   * Generate the input element
   * @param type - Input type (e.g., "checkbox", "radio")
   * @param attrs - Additional HTML attributes
   * @returns VNode for the input element
   */
  genInput(type: string, attrs?: Record<string, any>): any;
  
  /**
   * Handle blur event - sets isFocused to false
   */
  onBlur(): void;
  
  /**
   * Handle click event - triggers onChange and emits click event
   * @param e - Mouse event
   */
  onClick(e: MouseEvent): void;
  
  /**
   * Handle change event - updates internal value based on selection state
   * For multiple mode: toggles value in array
   * For single mode: toggles between trueValue/falseValue or value/null
   */
  onChange(): void;
  
  /**
   * Handle focus event - sets isFocused to true
   */
  onFocus(): void;
  
  /**
   * Handle keydown event
   * @param e - Keyboard event
   */
  onKeydown(e: KeyboardEvent): void;
}

/**
 * Selectable mixin component
 * Provides checkbox/radio button functionality with validation and ripple effects
 * Extends VInput, Rippleable, and Comparable mixins
 */
declare const Selectable: {
  name: 'selectable';
  model: {
    prop: 'inputValue';
    event: 'change';
  };
  props: SelectableProps;
  data(): SelectableData;
  computed: SelectableComputed;
  methods: SelectableMethods;
};

export default Selectable;