import { VNode } from 'vue';
import VTextField from '../VTextField/VTextField';

/**
 * VTextarea component interface
 * A textarea input component that extends VTextField with additional features
 * like auto-grow and row height customization
 */
export default interface VTextarea extends VTextField {
  /**
   * Component name identifier
   */
  name: 'v-textarea';

  /**
   * Component properties
   */
  props: {
    /**
     * Automatically grows the textarea height based on content
     * @default false
     */
    autoGrow: boolean;

    /**
     * Disables manual resizing of the textarea
     * @default false
     */
    noResize: boolean;

    /**
     * Height of a single row in pixels
     * @default 24
     */
    rowHeight: number | string;

    /**
     * Number of visible text rows
     * @default 5
     */
    rows: number | string;
  };

  /**
   * Computed properties
   */
  computed: {
    /**
     * Generates CSS classes for the textarea component
     * Combines base classes with conditional modifiers
     * @returns Object map of CSS class names to boolean values
     */
    classes(): Record<string, boolean>;

    /**
     * Determines if resize handle should be disabled
     * Returns true if noResize prop is set or autoGrow is enabled
     * @returns Whether resize handle should be hidden
     */
    noResizeHandle(): boolean;
  };

  /**
   * Watchers for reactive properties
   */
  watch: {
    /**
     * Watches for changes to the lazy value (textarea content)
     * Recalculates height on next tick when autoGrow is enabled
     */
    lazyValue(): void;

    /**
     * Watches for changes to row height
     * Recalculates input height on next tick when autoGrow is enabled
     */
    rowHeight(): void;
  };

  /**
   * Lifecycle hook - called after component is mounted
   * Initializes auto-grow calculation if enabled
   */
  mounted(): void;

  /**
   * Component methods
   */
  methods: {
    /**
     * Calculates and sets the appropriate height for the textarea input
     * Based on content scrollHeight and minimum rows configuration
     * Only applies when autoGrow is enabled
     */
    calculateInputHeight(): void;

    /**
     * Generates the textarea input VNode
     * Overrides parent method to use textarea tag instead of input
     * @returns VNode configuration object for the textarea element
     */
    genInput(): VNode;

    /**
     * Handles input events on the textarea
     * Triggers auto-grow recalculation if enabled
     * @param event - The native input event
     */
    onInput(event: Event): void;

    /**
     * Handles keydown events on the textarea
     * Stops propagation for Enter key when focused
     * @param event - The native keyboard event
     */
    onKeyDown(event: KeyboardEvent): void;
  };
}

/**
 * Validator functions for props
 */
export interface VTextareaValidators {
  /**
   * Validates that rowHeight can be parsed as a float
   * @param value - The rowHeight value to validate
   * @returns True if value is a valid number
   */
  rowHeightValidator(value: number | string): boolean;

  /**
   * Validates that rows can be parsed as an integer
   * @param value - The rows value to validate
   * @returns True if value is a valid integer
   */
  rowsValidator(value: number | string): boolean;
}