import Vue, { VNode } from 'vue';
import { VInput } from '../VInput';

/**
 * VRadioGroup component - A group container for radio button inputs
 * Extends VInput and provides radio group functionality with row/column layouts
 */
export default class VRadioGroup extends VInput {
  /** Component name identifier */
  static readonly name: 'v-radio-group';

  // Props
  
  /**
   * Display radio buttons in a column layout
   * @default true
   */
  column: boolean;

  /**
   * Height of the radio group container
   * @default 'auto'
   */
  height: number | string;

  /**
   * Name attribute for the radio group (used for form submission)
   */
  name?: string;

  /**
   * Display radio buttons in a row layout
   * @default false
   */
  row: boolean;

  /**
   * Currently selected radio button value
   */
  value: any;

  // Computed Properties

  /**
   * Computed CSS classes for the radio group
   * Combines base VInput classes with radio-group specific classes
   */
  readonly classes: Record<string, boolean>;

  // Methods

  /**
   * Generates the default slot content wrapped in a radio group container
   * @returns VNode with radiogroup role and appropriate ARIA attributes
   */
  genDefaultSlot(): VNode;

  /**
   * Generates the input slot without click handlers
   * @returns VNode for the input slot
   */
  genInputSlot(): VNode;

  /**
   * Generates the label element as a legend tag for accessibility
   * @returns VNode configured as legend or null if no label
   */
  genLabel(): VNode | null;

  /**
   * Handles click events on radio group items
   * Inherited from BaseItemGroup
   */
  onClick(value: any): void;

  // Provide/Inject

  /**
   * Provides radio group context to child radio components
   * @internal
   */
  provide(): {
    radioGroup: this;
  };
}

/**
 * Type definition for VRadioGroup component props
 */
export interface VRadioGroupProps {
  column?: boolean;
  height?: number | string;
  name?: string;
  row?: boolean;
  value?: any;
}